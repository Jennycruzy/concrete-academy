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

  const { username, level, score, language } = body as {
    username?: unknown;
    level?: unknown;
    score?: unknown;
    language?: unknown;
  };

  // Validate
  if (
    typeof username !== 'string' ||
    !username.trim() ||
    username.length > 50 ||
    !/^[a-zA-Z0-9_-]+$/.test(username.trim())
  ) {
    return NextResponse.json(
      { error: 'Invalid username. Use alphanumeric, underscore, or hyphen. Max 50 chars.' },
      { status: 400 }
    );
  }

  if (typeof level !== 'number' || (level !== 1 && level !== 2)) {
    return NextResponse.json({ error: 'level must be 1 or 2' }, { status: 400 });
  }

  if (typeof score !== 'number' || score < 0 || score > 100) {
    return NextResponse.json({ error: 'score must be 0-100' }, { status: 400 });
  }

  const safeLanguage = typeof language === 'string' ? language.slice(0, 10) : 'en';
  const safeUsername = username.trim();

  try {
    // Upsert user
    await query(
      `INSERT INTO users (username) VALUES ($1)
       ON CONFLICT (username) DO NOTHING`,
      [safeUsername]
    );

    // Insert attempt
    const users = await query<{ id: number }>(
      'SELECT id FROM users WHERE username = $1',
      [safeUsername]
    );
    if (users.length === 0) throw new Error('User not found after insert');

    const userId = users[0].id;

    await query(
      `INSERT INTO quiz_attempts (user_id, level, language, score)
       VALUES ($1, $2, $3, $4)`,
      [userId, level, safeLanguage, score]
    );

    // Upsert leaderboard (keep best score)
    await query(
      `INSERT INTO leaderboard (username, level, best_score, language, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (username, level) DO UPDATE
         SET best_score = GREATEST(leaderboard.best_score, EXCLUDED.best_score),
             language = EXCLUDED.language,
             updated_at = NOW()`,
      [safeUsername, level, score, safeLanguage]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[quiz/submit] DB error:', err);
    // Don't expose DB errors to client
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}
