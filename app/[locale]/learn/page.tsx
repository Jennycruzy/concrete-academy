import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n';
import ModuleCard from '@/components/ModuleCard';
import Footer from '@/components/Footer';
import modules from '@/data/modules.json';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LearnPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'learn' });

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        {/* Header */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '60px 24px 48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              marginBottom: '16px',
              padding: '5px 14px',
              background: 'rgba(0,212,170,0.06)',
              border: '1px solid rgba(0,212,170,0.15)',
              borderRadius: '100px',
            }}
          >
            Education · Official Sources Only
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
            {t('title')}{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontFamily: "'IBM Plex Mono', monospace",
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px 80px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {modules.map((mod, i) => (
            <ModuleCard
              key={mod.id}
              id={mod.id}
              slug={mod.slug}
              icon={mod.icon}
              readingTime={mod.readingTime}
              title={mod.title}
              description={mod.description}
              locale={locale as Locale}
              index={i}
            />
          ))}
        </div>
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
