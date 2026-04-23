import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { email, username } = body as { email?: unknown; username?: unknown };

  if (
    typeof email !== 'string' ||
    !email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const safeEmail = email.trim().toLowerCase().slice(0, 255);
  const safeUsername = typeof username === 'string' ? username.trim().slice(0, 50) : null;

  try {
    await query(
      `INSERT INTO level3_waitlist (email, username)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [safeEmail, safeUsername]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[waitlist/route] DB error:', err);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}
