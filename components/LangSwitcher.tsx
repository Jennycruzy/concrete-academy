'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';

interface LangSwitcherProps {
  currentLocale: Locale;
}

export default function LangSwitcher({ currentLocale }: LangSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(locale: Locale) {
    setOpen(false);
    // Replace current locale segment in path
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          padding: '6px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontFamily: "'IBM Plex Mono', monospace",
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-primary)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
        }}
      >
        <span style={{ fontSize: '1rem' }}>{localeFlags[currentLocale]}</span>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {currentLocale}
        </span>
        <ChevronDown
          size={12}
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '6px',
            minWidth: '180px',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {locales.map(locale => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: locale === currentLocale ? 'rgba(0,212,170,0.08)' : 'transparent',
                color: locale === currentLocale ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: "'IBM Plex Mono', monospace",
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                if (locale !== currentLocale) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,212,170,0.05)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                if (locale !== currentLocale) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              <span style={{ fontSize: '1rem' }}>{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
              {locale === currentLocale && (
                <span
                  style={{
                    marginLeft: 'auto',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    flexShrink: 0,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
