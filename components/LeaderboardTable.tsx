'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Trophy, Medal } from 'lucide-react';
import { localeFlags, type Locale } from '@/lib/i18n';

interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  best_score: number;
  language: string;
  updated_at: string;
}

interface LeaderboardTableProps {
  locale: Locale;
  currentUsername?: string;
}

export default function LeaderboardTable({ locale, currentUsername }: LeaderboardTableProps) {
  const t = useTranslations('leaderboard');
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/leaderboard?level=${activeLevel}&limit=50`);
        if (res.ok) {
          const data = await res.json() as { entries: LeaderboardEntry[] };
          setEntries(data.entries);
        }
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [activeLevel]);

  const getRankStyle = (rank: number, username: string) => {
    if (username === currentUsername) return 'rank-self';
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return '';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={14} style={{ color: '#FFD700' }} />;
    if (rank === 2) return <Medal size={14} style={{ color: '#C0C0C0' }} />;
    if (rank === 3) return <Medal size={14} style={{ color: '#CD7F32' }} />;
    return null;
  };

  return (
    <div>
      {/* Level tabs */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '4px',
          width: 'fit-content',
          marginBottom: '24px',
        }}
      >
        {([1, 2] as const).map(level => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            style={{
              padding: '8px 24px',
              borderRadius: '7px',
              border: 'none',
              background: activeLevel === level ? 'var(--accent-primary)' : 'transparent',
              color: activeLevel === level ? '#0a0c0f' : 'var(--text-secondary)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.04em',
            }}
          >
            {level === 1 ? t('level1Tab') : t('level2Tab')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="glass-card"
        style={{ borderRadius: '16px', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 100px 80px 120px',
            gap: '8px',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
          }}
        >
          {[t('rank'), t('username'), t('score'), t('language'), t('date')].map(h => (
            <div
              key={h}
              style={{
                fontSize: '0.65rem',
                fontFamily: "'IBM Plex Mono', monospace",
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {loading ? (
          <div
            style={{
              padding: '48px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8rem',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <span className="typing-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', marginRight: '4px' }} />
              <span className="typing-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', marginRight: '4px' }} />
              <span className="typing-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
            </div>
          </div>
        ) : entries.length === 0 ? (
          <div
            style={{
              padding: '48px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8rem',
            }}
          >
            {t('empty')}
          </div>
        ) : (
          entries.map((entry, i) => (
            <motion.div
              key={entry.username + entry.rank}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={getRankStyle(entry.rank, entry.username)}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 100px 80px 120px',
                gap: '8px',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color:
                    entry.rank === 1 ? '#FFD700' :
                    entry.rank === 2 ? '#C0C0C0' :
                    entry.rank === 3 ? '#CD7F32' :
                    'var(--text-secondary)',
                }}
              >
                {getRankIcon(entry.rank)}
                #{entry.rank}
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.85rem',
                  color: entry.username === currentUsername ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: entry.username === currentUsername ? 600 : 400,
                }}
              >
                {entry.username}
                {entry.username === currentUsername && (
                  <span style={{ marginLeft: '8px', fontSize: '0.65rem', color: 'var(--accent-primary)', letterSpacing: '0.08em' }}>
                    YOU
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: entry.best_score >= 81 ? 'var(--accent-primary)' : 'var(--text-primary)',
                }}
              >
                {entry.best_score}%
              </div>
              <div style={{ fontSize: '1rem' }}>
                {localeFlags[entry.language as Locale] || '🌐'}
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}
              >
                {new Date(entry.updated_at).toLocaleDateString(locale, {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
