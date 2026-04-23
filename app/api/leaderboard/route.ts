import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const levelParam = searchParams.get('level');
  const limitParam = searchParams.get('limit');

  const level = levelParam === '2' ? 2 : 1;
  const limit = Math.min(parseInt(limitParam ?? '50', 10) || 50, 100);

  try {
    const entries = await query<{
      username: string;
      level: number;
      best_score: number;
      language: string;
      updated_at: string;
    }>(
      `SELECT username, level, best_score, language, updated_at
       FROM leaderboard
       WHERE level = $1
       ORDER BY best_score DESC, updated_at ASC
       LIMIT $2`,
      [level, limit]
    );

    const ranked = entries.map((e, i) => ({ ...e, rank: i + 1 }));

    return NextResponse.json(
      { entries: ranked },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (err) {
    console.error('[leaderboard/route] DB error:', err);
    return NextResponse.json({ entries: [] });
  }
}
