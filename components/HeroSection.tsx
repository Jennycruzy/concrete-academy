'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particle mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      particles.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      const colors = ['#00d4aa', '#0099cc', '#00d4aa88', '#0099cc88'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const resizeObs = new ResizeObserver(() => { resize(); init(); });
    resizeObs.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
    };
  }, []);

  const stats = [
    { value: t('stat1') },
    { value: t('stat2') },
    { value: t('stat3') },
    { value: t('stat4') },
  ];

  return (
    <section
      className="mesh-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Radial gradient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,170,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,170,0.08)',
              border: '1px solid rgba(0,212,170,0.2)',
              color: 'var(--accent-primary)',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '0.7rem',
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            <Zap size={10} />
            {t('badge')}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}
        >
          {t('title')}{' '}
          <span className="gradient-text">{t('titleHighlight')}</span>
        </motion.h1>

        {/* Platform name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '28px' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, var(--text-primary) 0%, var(--accent-primary) 50%, var(--accent-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CONCRETE ACADEMY
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.875rem, 2vw, 1.05rem)',
            lineHeight: 1.8,
            maxWidth: '620px',
            margin: '0 auto 40px',
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          <Link
            href={`/${locale}/learn`}
            className="glow-btn-primary"
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {t('ctaLearn')} <ArrowRight size={16} />
          </Link>
          <Link
            href={`/${locale}/quiz`}
            className="glow-btn-secondary"
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {t('ctaQuiz')}
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '0',
            justifyContent: 'center',
            flexWrap: 'wrap',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 140px',
                padding: '16px 20px',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
            animation: 'float-particle 2s ease-in-out infinite',
          }}
        />
      </motion.div>
    </section>
  );
}
