import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n';
import Footer from '@/components/Footer';
import { Trophy } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeaderboardPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '60px 24px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              fontSize: '0.65rem',
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              padding: '5px 14px',
              background: 'rgba(0,212,170,0.06)',
              border: '1px solid rgba(0,212,170,0.15)',
              borderRadius: '100px',
            }}
          >
            <Trophy size={12} /> Leaderboard
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Coming <span className="gradient-text">Soon</span>
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontFamily: "'IBM Plex Mono', monospace",
              maxWidth: '420px',
              lineHeight: 1.75,
            }}
          >
            The global leaderboard is under construction. Check back soon.
          </p>
        </div>
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
