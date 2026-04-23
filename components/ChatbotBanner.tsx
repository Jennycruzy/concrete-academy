'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageSquare, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface ChatbotBannerProps {
  locale: Locale;
}

export default function ChatbotBanner({ locale: _locale }: ChatbotBannerProps) {
  const t = useTranslations('chatbot');

  const openChat = () => {
    // Dispatch custom event to trigger chatbot open
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <section
      style={{
        padding: '0 24px 80px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,153,204,0.04) 50%, rgba(10,12,15,0) 100%)',
          border: '1px solid rgba(0,212,170,0.15)',
          borderRadius: '24px',
          padding: '56px 40px',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(0,212,170,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Hex icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(0,212,170,0.08)',
            border: '1px solid rgba(0,212,170,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <MessageSquare size={28} style={{ color: 'var(--accent-primary)' }} />
        </div>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            color: 'var(--text-primary)',
            marginBottom: '16px',
            maxWidth: '560px',
          }}
        >
          {t('bannerTitle')}
        </h2>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontFamily: "'IBM Plex Mono', monospace",
            lineHeight: 1.75,
            maxWidth: '480px',
            marginBottom: '32px',
          }}
        >
          {t('bannerDesc')}
        </p>

        <button
          onClick={openChat}
          className="glow-btn-primary"
          style={{
            padding: '14px 28px',
            borderRadius: '10px',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {t('openChat')} <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}
