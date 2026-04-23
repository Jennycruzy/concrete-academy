import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react';
import { routing, type Locale } from '@/lib/i18n';
import Footer from '@/components/Footer';
import modulesData from '@/data/modules.json';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'link';
  text?: string;
  items?: string[];
  url?: string;
}

type ModuleContent = Record<string, ContentBlock[]>;

export default async function ModuleReadPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = (modulesData as any[]).find((m) => m.slug === slug);
  if (!mod) notFound();

  const t = await getTranslations({ locale, namespace: 'learn' });

  const title =
    (mod.title as Record<string, string>)[locale] ||
    (mod.title as Record<string, string>)['en'];

  const description =
    (mod.description as Record<string, string>)[locale] ||
    (mod.description as Record<string, string>)['en'];

  const content: ContentBlock[] =
    (mod.content as ModuleContent)[locale] ||
    (mod.content as ModuleContent)['en'] ||
    [];

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Back link */}
          <Link href={`/${locale}/learn`} className="quiz-back-link">
            <ArrowLeft size={14} />
            {t('backToModules')}
          </Link>

          {/* Module header */}
          <div style={{ marginTop: '32px', marginBottom: '40px' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: '20px', lineHeight: 1 }}>
              {mod.icon}
            </div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '14px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontFamily: "'IBM Plex Mono', monospace",
                lineHeight: 1.75,
                marginBottom: '16px',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-muted)',
                fontSize: '0.7rem',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              <Clock size={12} />
              {mod.readingTime} {t('readTime')}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ height: '1px', background: 'var(--border)', marginBottom: '40px' }}
          />

          {/* Article content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {content.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      color: 'var(--accent-primary)',
                      marginTop: '8px',
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'paragraph') {
                return (
                  <p
                    key={i}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      fontFamily: "'IBM Plex Mono', monospace",
                      lineHeight: 1.85,
                    }}
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'list') {
                return (
                  <ul
                    key={i}
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {block.items?.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          color: 'var(--text-secondary)',
                          fontSize: '0.875rem',
                          fontFamily: "'IBM Plex Mono', monospace",
                          lineHeight: 1.75,
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--accent-primary)',
                            flexShrink: 0,
                            marginTop: '3px',
                            fontSize: '0.7rem',
                          }}
                        >
                          ▸
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'link') {
                return (
                  <div key={i}>
                    <a
                      href={block.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--accent-primary)',
                        fontSize: '0.78rem',
                        fontFamily: "'IBM Plex Mono', monospace",
                        textDecoration: 'none',
                        padding: '10px 18px',
                        border: '1px solid rgba(0,212,170,0.25)',
                        borderRadius: '8px',
                        background: 'rgba(0,212,170,0.04)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {block.text}
                      <ExternalLink size={13} />
                    </a>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Bottom back link */}
          <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <Link href={`/${locale}/learn`} className="quiz-back-link">
              <ArrowLeft size={14} />
              {t('backToModules')}
            </Link>
          </div>
        </div>
      </div>
      <Footer locale={locale as Locale} />
    </>
  );
}
