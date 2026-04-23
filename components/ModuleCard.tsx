'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n';

interface ModuleCardProps {
  id: string;
  slug: string;
  icon: string;
  readingTime: number;
  title: Record<string, string>;
  description: Record<string, string>;
  locale: Locale;
  index: number;
}

export default function ModuleCard({
  slug, icon, readingTime, title, description, locale, index,
}: ModuleCardProps) {
  const t = useTranslations('learn');
  const getStr = (obj: Record<string, string>) => obj[locale] || obj['en'] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={`/${locale}/learn/${slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          className="glass-card"
          style={{
            borderRadius: '14px',
            padding: '24px',
            height: '100%',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = 'translateY(0)';
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(0,212,170,0.08)',
                border: '1px solid rgba(0,212,170,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
              }}
            >
              {icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: "'IBM Plex Mono', monospace" }}>
              <Clock size={11} />
              {readingTime} {t('readTime')}
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              marginBottom: '10px',
              lineHeight: 1.3,
            }}
          >
            {getStr(title)}
          </h3>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontFamily: "'IBM Plex Mono', monospace",
              lineHeight: 1.7,
              marginBottom: '20px',
            }}
          >
            {getStr(description)}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-primary)',
              fontSize: '0.72rem',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {t('readMore')} <ArrowRight size={13} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
