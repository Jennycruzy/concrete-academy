'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BookOpen, Zap, Trophy, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface LearningPathProps {
  locale: Locale;
}

export default function LearningPath({ locale }: LearningPathProps) {
  const t = useTranslations('learning');

  const steps = [
    {
      num: '01',
      icon: <BookOpen size={20} style={{ color: 'var(--accent-primary)' }} />,
      title: t('step1Title'),
      desc: t('step1Desc'),
      color: 'var(--accent-primary)',
    },
    {
      num: '02',
      icon: <Zap size={20} style={{ color: 'var(--accent-secondary)' }} />,
      title: t('step2Title'),
      desc: t('step2Desc'),
      color: 'var(--accent-secondary)',
    },
    {
      num: '03',
      icon: <Trophy size={20} style={{ color: 'var(--accent-amber)' }} />,
      title: t('step3Title'),
      desc: t('step3Desc'),
      color: 'var(--accent-amber)',
    },
  ];

  return (
    <section
      style={{
        padding: '80px 24px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'var(--text-primary)',
            }}
          >
            {t('title')}{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            position: 'relative',
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  color: step.color,
                  opacity: 0.08,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {step.num}
              </div>

              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: 1.7,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/${locale}/learn`}
            className="glow-btn-secondary"
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {t('viewModules')} <ArrowRight size={14} />
          </Link>
          <Link
            href={`/${locale}/quiz`}
            className="glow-btn-primary"
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {t('takeQuiz')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
