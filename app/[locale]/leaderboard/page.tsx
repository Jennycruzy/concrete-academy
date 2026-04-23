import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n';
import LeaderboardTable from '@/components/LeaderboardTable';
import Footer from '@/components/Footer';
import { Trophy } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeaderboardPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'leaderboard' });

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px 80px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
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
              <Trophy size={12} /> Top Performers
            </div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
              }}
            >
              {t('title')}{' '}
              <span className="gradient-text">{t('titleHighlight')}</span>
            </h1>
          </div>

          <LeaderboardTable locale={locale as Locale} />
        </div>
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
