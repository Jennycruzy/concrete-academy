import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { routing, type Locale } from '@/lib/i18n';
import Footer from '@/components/Footer';
import { Clock, ArrowRight, Lock } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'quiz' });

  const levels = [
    {
      level: 1,
      labelKey: 'level1' as const,
      titleKey: 'level1Title' as const,
      descKey: 'level1Desc' as const,
      durationKey: 'level1Duration' as const,
      badgeKey: 'recommended' as const,
      startKey: 'startLevel1' as const,
      color: 'var(--accent-primary)',
      borderColor: 'rgba(0,212,170,0.2)',
      bg: 'rgba(0,212,170,0.06)',
      locked: false,
    },
    {
      level: 2,
      labelKey: 'level2' as const,
      titleKey: 'level2Title' as const,
      descKey: 'level2Desc' as const,
      durationKey: 'level2Duration' as const,
      badgeKey: 'advanced' as const,
      startKey: 'startLevel2' as const,
      color: 'var(--accent-amber)',
      borderColor: 'rgba(245,166,35,0.2)',
      bg: 'rgba(245,166,35,0.05)',
      locked: false,
    },
  ];

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '60px 24px 80px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              {t('title')}{' '}
              <span className="gradient-text">{t('titleHighlight')}</span>
            </h1>
          </div>

          {/* Level cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            {levels.map(lv => (
              <div
                key={lv.level}
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
                {/* Header row */}
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
                    {t(lv.badgeKey)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'IBM Plex Mono', monospace" }}>
                    <Clock size={11} /> {t(lv.durationKey)}
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
                  {t(lv.labelKey)}
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
                  {t(lv.titleKey)}
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
                  {t(lv.descKey)}
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
                  {t(lv.startKey)} <ArrowRight size={15} />
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
              <div
                style={{
                  fontSize: '3rem',
                  lineHeight: 1,
                  marginBottom: '12px',
                  filter: 'blur(4px) brightness(0.3)',
                }}
              >
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
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                }}
              >
                The Concrete Protocol grows. A new challenge is being forged.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
