import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n';
import Footer from '@/components/Footer';
import QuizLevelCards from '@/components/QuizLevelCards';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'quiz' });

  const cards = [
    {
      level: 1,
      label: t('level1'),
      title: t('level1Title'),
      desc: t('level1Desc'),
      duration: t('level1Duration'),
      badge: t('recommended'),
      startLabel: t('startLevel1'),
      color: 'var(--accent-primary)',
      borderColor: 'rgba(0,212,170,0.2)',
      bg: 'rgba(0,212,170,0.06)',
    },
    {
      level: 2,
      label: t('level2'),
      title: t('level2Title'),
      desc: t('level2Desc'),
      duration: t('level2Duration'),
      badge: t('advanced'),
      startLabel: t('startLevel2'),
      color: 'var(--accent-amber)',
      borderColor: 'rgba(245,166,35,0.2)',
      bg: 'rgba(245,166,35,0.05)',
    },
  ];

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
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

          <QuizLevelCards
            locale={locale}
            cards={cards}
            teaserText="The Concrete Protocol grows. A new challenge is being forged."
          />
        </div>
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
