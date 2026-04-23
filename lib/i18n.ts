import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'zh', 'vi', 'id', 'tr', 'pcm'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  tr: 'Türkçe',
  pcm: 'Naija',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  zh: '🇨🇳',
  vi: '🇻🇳',
  id: '🇮🇩',
  tr: '🇹🇷',
  pcm: '🇳🇬',
};

export const localeFullNames: Record<Locale, string> = {
  en: 'English',
  zh: 'Chinese (Mandarin)',
  vi: 'Vietnamese',
  id: 'Indonesian',
  tr: 'Turkish',
  pcm: 'Nigerian Pidgin',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
});
