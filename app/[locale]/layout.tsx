import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import ChatBot from '@/components/ChatBot';
import type { Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale as Locale} />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <ChatBot locale={locale as Locale} />
    </NextIntlClientProvider>
  );
}
