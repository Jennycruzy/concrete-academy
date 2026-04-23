import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing, type Locale } from '@/lib/i18n';
import QuizEngine from '@/components/QuizEngine';
import level1Data from '@/data/quiz-level1.json';
import level2Data from '@/data/quiz-level2.json';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; level: string }>;
}

export default async function QuizLevelPage({ params }: PageProps) {
  const { locale, level } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  if (level !== '1' && level !== '2') notFound();

  const data = level === '1' ? level1Data : level2Data;
  const getStr = (obj: Record<string, string>) => obj[locale] || obj['en'] || '';

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top bar */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '32px 24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Link
          href={`/${locale}/quiz`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.75rem',
            fontFamily: "'IBM Plex Mono', monospace",
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = 'var(--accent-primary)')}
          onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={14} /> Back to Quiz
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: level === '1' ? 'var(--accent-primary)' : 'var(--accent-amber)',
              padding: '4px 10px',
              borderRadius: '6px',
              background: level === '1' ? 'rgba(0,212,170,0.08)' : 'rgba(245,166,35,0.08)',
              border: `1px solid ${level === '1' ? 'rgba(0,212,170,0.2)' : 'rgba(245,166,35,0.2)'}`,
            }}
          >
            Level {level}
          </span>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            {getStr(data.title)}
          </h1>
        </div>
      </div>

      {/* Quiz */}
      <QuizEngine data={data} locale={locale as Locale} />
    </div>
  );
}
