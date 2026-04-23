'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

const externalLinks = [
  { key: 'docs', href: 'https://docs.concrete.xyz/' },
  { key: 'app', href: 'https://app.concrete.xyz/' },
  { key: 'blog', href: 'https://mirror.xyz/concretexyz.eth' },
  { key: 'audit', href: 'https://www.halborn.com/audits/blueprint-finance' },
  { key: 'twitter', href: 'https://x.com/ConcreteXYZ' },
  { key: 'points', href: 'https://points.concrete.xyz/home' },
];

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tLinks = useTranslations('footer.links');

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        padding: '48px 24px 32px',
        marginTop: '80px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0a0c0f',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                CA
              </div>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                Concrete <span className="gradient-text">Academy</span>
              </span>
            </Link>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontFamily: "'IBM Plex Mono', monospace",
                lineHeight: 1.6,
                maxWidth: '200px',
              }}
            >
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontFamily: "'IBM Plex Mono', monospace",
                marginBottom: '16px',
              }}
            >
              Official Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {externalLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
                >
                  {tLinks(link.key as Parameters<typeof tLinks>[0])}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontFamily: "'IBM Plex Mono', monospace",
                marginBottom: '16px',
              }}
            >
              Platform
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: `/${locale}/learn`, label: 'Learn' },
                { href: `/${locale}/quiz`, label: 'Quiz' },
                { href: `/${locale}/leaderboard`, label: 'Leaderboard' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {t('disclaimer')}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                display: 'inline-block',
              }}
            />
            Built on{' '}
            <a
              href="https://www.concrete.xyz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
            >
              concrete.xyz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
