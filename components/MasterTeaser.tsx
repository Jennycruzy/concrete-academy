'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function MasterTeaser() {
  const t = useTranslations('masterTeaser');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="master-teaser-border"
      style={{
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(0,212,170,0.04), rgba(0,153,204,0.03))',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: '16px',
        }}
      />

      {/* Blurred silhouette */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00d4aa30, var(--bg-elevated))',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          filter: 'blur(4px) brightness(0.4)',
          position: 'relative',
        }}
      >
        🗿
      </div>

      {/* Question mark overlay */}
      <div
        style={{
          marginTop: '-60px',
          marginBottom: '12px',
          fontSize: '2.5rem',
          filter: 'drop-shadow(0 0 12px #00d4aa80)',
        }}
      >
        ✨
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
        <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
          className="gradient-text"
        >
          {t('title')}
        </h3>
        <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
      </div>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
          fontFamily: "'IBM Plex Mono', monospace",
          lineHeight: 1.7,
          marginBottom: '8px',
        }}
      >
        {t('subtitle')}
      </p>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontFamily: "'IBM Plex Mono', monospace",
          lineHeight: 1.7,
          marginBottom: '24px',
          fontStyle: 'italic',
        }}
      >
        {t('body')}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href="https://x.com/ConcreteXYZ"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'rgba(0,212,170,0.1)',
            border: '1px solid rgba(0,212,170,0.3)',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            fontSize: '0.75rem',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,212,170,0.18)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,212,170,0.1)';
          }}
        >
          <ExternalLink size={12} />
          {t('follow')}
        </a>
      </div>
    </motion.div>
  );
}
