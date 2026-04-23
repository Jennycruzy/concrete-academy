import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n';
import Footer from '@/components/Footer';
import FullChatSection from '@/components/FullChatSection';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ChatPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'chatPage' });

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '52px 24px 32px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.65rem',
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              marginBottom: '20px',
              padding: '5px 14px',
              background: 'rgba(0,212,170,0.06)',
              border: '1px solid rgba(0,212,170,0.15)',
              borderRadius: '100px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block', animation: 'hexPulse 2s ease-in-out infinite' }} />
            AI · DOCS GROUNDED · 6 LANGUAGES
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {t('title')}{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontFamily: "'IBM Plex Mono', monospace",
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Chat interface */}
        <FullChatSection
          locale={locale as Locale}
          welcomeMessage={t('welcome')}
          inputPlaceholder={t('inputPlaceholder')}
          clearLabel={t('clearChat')}
          thinkingLabel={t('thinking')}
          suggestedTitle={t('suggestedTitle')}
          poweredBy={t('poweredBy')}
        />
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
