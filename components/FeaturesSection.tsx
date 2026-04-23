'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Layers, BarChart2, Shield, Link2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface FeaturesSectionProps {
  locale: Locale;
}

const features = [
  {
    icon: <Layers size={22} style={{ color: 'var(--accent-primary)' }} />,
    titleKey: 'modular' as const,
    descKey: 'modularDesc' as const,
    gradient: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,212,170,0.02))',
    border: 'rgba(0,212,170,0.15)',
  },
  {
    icon: <BarChart2 size={22} style={{ color: 'var(--accent-secondary)' }} />,
    titleKey: 'quant' as const,
    descKey: 'quantDesc' as const,
    gradient: 'linear-gradient(135deg, rgba(0,153,204,0.1), rgba(0,153,204,0.02))',
    border: 'rgba(0,153,204,0.15)',
  },
  {
    icon: <Shield size={22} style={{ color: 'var(--accent-amber)' }} />,
    titleKey: 'risk' as const,
    descKey: 'riskDesc' as const,
    gradient: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(245,166,35,0.02))',
    border: 'rgba(245,166,35,0.15)',
  },
  {
    icon: <Link2 size={22} style={{ color: 'var(--accent-primary)' }} />,
    titleKey: 'crosschain' as const,
    descKey: 'crosschainDesc' as const,
    gradient: 'linear-gradient(135deg, rgba(0,212,170,0.08), rgba(0,153,204,0.05))',
    border: 'rgba(0,212,170,0.12)',
  },
];

export default function FeaturesSection({ locale: _locale }: FeaturesSectionProps) {
  const t = useTranslations('features');

  return (
    <section
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
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
          Protocol Architecture
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
          }}
        >
          {t('title')}{' '}
          <span className="gradient-text">{t('titleHighlight')}</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.titleKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              style={{
                background: f.gradient,
                border: `1px solid ${f.border}`,
                borderRadius: '16px',
                padding: '28px',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = 'var(--glow-teal)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${f.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                {f.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}
              >
                {t(f.titleKey)}
              </h3>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: 1.75,
                }}
              >
                {t(f.descKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
