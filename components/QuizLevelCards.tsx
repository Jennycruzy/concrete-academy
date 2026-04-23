'use client';

import Link from 'next/link';
import { Clock, ArrowRight, Lock } from 'lucide-react';

interface LevelCard {
  level: number;
  label: string;
  title: string;
  desc: string;
  duration: string;
  badge: string;
  startLabel: string;
  color: string;
  borderColor: string;
  bg: string;
}

interface QuizLevelCardsProps {
  locale: string;
  cards: LevelCard[];
  teaserText: string;
}

export default function QuizLevelCards({ locale, cards, teaserText }: QuizLevelCardsProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
      }}
    >
      {cards.map(lv => (
        <div
          key={lv.level}
          className="quiz-level-card"
          style={{
            background: `linear-gradient(145deg, ${lv.bg}, var(--bg-secondary))`,
            border: `1px solid ${lv.borderColor}`,
            borderRadius: '20px',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${lv.color}20`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: lv.color,
                padding: '4px 10px',
                borderRadius: '6px',
                background: `${lv.color}12`,
                border: `1px solid ${lv.color}25`,
              }}
            >
              {lv.badge}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'IBM Plex Mono', monospace" }}>
              <Clock size={11} /> {lv.duration}
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '3rem',
              lineHeight: 1,
              color: lv.color,
              marginBottom: '12px',
              letterSpacing: '-0.02em',
            }}
          >
            {lv.label}
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              marginBottom: '14px',
            }}
          >
            {lv.title}
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontFamily: "'IBM Plex Mono', monospace",
              lineHeight: 1.75,
              marginBottom: '28px',
              flex: 1,
            }}
          >
            {lv.desc}
          </p>

          <Link
            href={`/${locale}/quiz/${lv.level}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 20px',
              borderRadius: '10px',
              background: lv.color,
              color: '#0a0c0f',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            {lv.startLabel} <ArrowRight size={15} />
          </Link>
        </div>
      ))}

      {/* Level 3 locked teaser */}
      <div
        style={{
          background: 'linear-gradient(145deg, rgba(0,212,170,0.02), var(--bg-secondary))',
          border: '1px dashed rgba(0,212,170,0.25)',
          borderRadius: '20px',
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          animation: 'masterTeaserGlow 3s ease-in-out infinite',
        }}
      >
        <div style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '12px', filter: 'blur(4px) brightness(0.3)' }}>
          🗿
        </div>
        <div style={{ marginTop: '-32px', marginBottom: '16px' }}>
          <Lock size={22} style={{ color: 'var(--accent-primary)', opacity: 0.5 }} />
        </div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '3rem',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '10px',
          }}
          className="gradient-text"
        >
          L3
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.7, fontStyle: 'italic' }}>
          {teaserText}
        </p>
      </div>
    </div>
  );
}
