'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LangSwitcher from './LangSwitcher';
import type { Locale } from '@/lib/i18n';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/learn`, label: t('learn') },
    { href: `/${locale}/quiz`, label: t('quiz') },
    { href: `/${locale}/leaderboard`, label: t('leaderboard') },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(10, 12, 15, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
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
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            Concrete{' '}
            <span className="gradient-text">Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="hidden-mobile"
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e =>
                ((e.target as HTMLAnchorElement).style.color = 'var(--accent-primary)')
              }
              onMouseLeave={e =>
                ((e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)')
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LangSwitcher currentLocale={locale} />
          <Link
            href={`/${locale}/quiz`}
            className="glow-btn-primary"
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              textDecoration: 'none',
            }}
          >
            {t('startLearning')}
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              display: 'none',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border)',
            padding: '16px 24px',
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontFamily: "'IBM Plex Mono', monospace",
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
