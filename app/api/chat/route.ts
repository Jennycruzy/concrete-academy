import { NextRequest, NextResponse } from 'next/server';
import { queryOllama } from '@/lib/ollama';
import type { ChatMessage } from '@/lib/ollama';

// Rate limiting — simple in-memory store (use Redis in production at scale)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 20) return false;

  entry.count++;
  return true;
}

// Sanitize input
function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim().slice(0, 500);
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Maximum 20 requests per minute.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { message, language, history } = body as {
    message?: unknown;
    language?: unknown;
    history?: unknown;
  };

  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  const safeMessage = sanitize(message);
  const safeLanguage = typeof language === 'string' ? language.slice(0, 10) : 'en';

  let safeHistory: ChatMessage[] = [];
  if (Array.isArray(history)) {
    safeHistory = history
      .slice(-10) // Keep last 10 turns max
      .filter(
        (m): m is ChatMessage =>
          m !== null &&
          typeof m === 'object' &&
          (m as ChatMessage).role !== undefined &&
          typeof (m as ChatMessage).content === 'string'
      )
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: sanitize(m.content),
      }));
  }

  try {
    const response = await queryOllama(safeMessage, safeLanguage, safeHistory);
    return NextResponse.json({ response });
  } catch (err) {
    console.error('[chat/route] Ollama error:', err);
    return NextResponse.json(
      {
        response:
          'The Concrete Analyst is temporarily unavailable. Please ensure Ollama is running on the server and try again.',
      },
      { status: 200 } // Return 200 so frontend displays the message
    );
  }
}
