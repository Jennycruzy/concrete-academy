import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';
import LearningPath from '@/components/LearningPath';
import QuizCTA from '@/components/QuizCTA';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: `Concrete Academy — ${t('title')} ${t('titleHighlight')}`,
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <HeroSection locale={locale as Locale} />
      <FeaturesSection locale={locale as Locale} />
      <LearningPath locale={locale as Locale} />
      <QuizCTA locale={locale as Locale} />
      <Footer locale={locale as Locale} />
    </>
  );
}
