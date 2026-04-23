'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Clock, ArrowRight, Lock } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface QuizCTAProps {
  locale: Locale;
}

export default function QuizCTA({ locale }: QuizCTAProps) {
  const t = useTranslations('quiz');

  return (
    <section style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {/* Level 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(0,212,170,0.06), var(--bg-secondary))',
              border: '1px solid rgba(0,212,170,0.2)',
              borderRadius: '20px',
              padding: '32px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--glow-teal)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,212,170,0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,212,170,0.2)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                  background: 'rgba(0,212,170,0.08)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0,212,170,0.2)',
                }}
              >
                {t('recommended')}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                <Clock size={11} /> {t('level1Duration')}
              </span>
            </div>

            <div
              style={{
                fontSize: '2.5rem',
                marginBottom: '12px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: 'var(--accent-primary)',
              }}
            >
              L1
            </div>

            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}
            >
              {t('level1Title')}
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontFamily: "'IBM Plex Mono', monospace",
                lineHeight: 1.7,
                marginBottom: '28px',
                flex: 1,
              }}
            >
              {t('level1Desc')}
            </p>

            <Link
              href={`/${locale}/quiz/1`}
              className="glow-btn-primary"
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              {t('startLevel1')} <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Level 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(245,166,35,0.05), var(--bg-secondary))',
              border: '1px solid rgba(245,166,35,0.18)',
              borderRadius: '20px',
              padding: '32px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(245,166,35,0.15)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,166,35,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,166,35,0.18)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-amber)',
                  background: 'rgba(245,166,35,0.08)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(245,166,35,0.2)',
                }}
              >
                {t('advanced')}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                <Clock size={11} /> {t('level2Duration')}
              </span>
            </div>

            <div
              style={{
                fontSize: '2.5rem',
                marginBottom: '12px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: 'var(--accent-amber)',
              }}
            >
              L2
            </div>

            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}
            >
              {t('level2Title')}
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontFamily: "'IBM Plex Mono', monospace",
                lineHeight: 1.7,
                marginBottom: '28px',
                flex: 1,
              }}
            >
              {t('level2Desc')}
            </p>

            <Link
              href={`/${locale}/quiz/2`}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
                background: 'var(--accent-amber)',
                color: '#0a0c0f',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.05em',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 25px rgba(245,166,35,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              {t('startLevel2')} <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Level 3 Teaser card - coming soon, no functionality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="master-teaser-border"
            style={{
              background: 'linear-gradient(145deg, rgba(0,212,170,0.03), var(--bg-secondary))',
              borderRadius: '20px',
              padding: '32px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer */}
            <div
              className="shimmer"
              style={{ position: 'absolute', inset: 0, borderRadius: '20px', pointerEvents: 'none' }}
            />

            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--bg-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '24px',
                filter: 'blur(3px) brightness(0.4)',
                position: 'relative',
              }}
            >
              🗿
            </div>
            <div
              style={{
                fontSize: '2rem',
                marginTop: '-48px',
                marginBottom: '16px',
                position: 'relative',
              }}
            >
              <Lock size={20} style={{ color: 'var(--accent-primary)', opacity: 0.7 }} />
            </div>

            <div
              style={{
                fontSize: '0.65rem',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
                marginBottom: '12px',
                opacity: 0.7,
              }}
            >
              Coming Soon
            </div>

            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: '10px',
              }}
              className="gradient-text"
            >
              Level 3
            </h3>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontFamily: "'IBM Plex Mono', monospace",
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              The Concrete Protocol grows. A new challenge is being forged.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
