'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export type Rank = 'newbie' | 'navigator' | 'guru' | 'master';

interface RankMascotProps {
  score: number;
  animate?: boolean;
}

export function getRank(score: number): Rank {
  if (score <= 25) return 'newbie';
  if (score <= 50) return 'navigator';
  if (score <= 80) return 'guru';
  return 'master';
}

const rankConfig = {
  newbie: {
    emoji: '🪨',
    color: '#8a9ab0',
    glow: 'none',
    label: 'NEWBIE',
    cssClass: 'mascot-newbie',
    motionRotate: -8,
    motionY: 10,
  },
  navigator: {
    emoji: '🧭',
    color: '#f5a623',
    glow: '0 0 20px rgba(245,166,35,0.2)',
    label: 'NAVIGATOR',
    cssClass: 'mascot-navigator',
    motionRotate: -3,
    motionY: 0,
  },
  guru: {
    emoji: '🧠',
    color: '#f5a623',
    glow: '0 0 25px rgba(245,166,35,0.35)',
    label: 'GURU',
    cssClass: 'mascot-guru',
    motionRotate: 0,
    motionY: 0,
  },
  master: {
    emoji: '💎',
    color: '#00d4aa',
    glow: '0 0 40px rgba(0,212,170,0.5)',
    label: 'MASTER',
    cssClass: 'mascot-master',
    motionRotate: 0,
    motionY: 0,
  },
};

export default function RankMascot({ score, animate = true }: RankMascotProps) {
  const t = useTranslations('ranks');
  const rank = getRank(score);
  const config = rankConfig[rank];

  const isMaster = rank === 'master';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Mascot image / placeholder */}
      <motion.div
        initial={animate ? { scale: 0.5, opacity: 0 } : {}}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 0.6,
        }}
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
        }}
      >
        {/* Glow ring for master */}
        {isMaster && (
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(0,212,170,0.4)',
                '0 0 60px rgba(0,212,170,0.7)',
                '0 0 30px rgba(0,212,170,0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Mascot image */}
        <motion.img
          src="/mascot/moai.png"
          alt={`Moai ${config.label}`}
          className={config.cssClass}
          animate={
            rank === 'newbie'
              ? { rotate: -8, y: 10 }
              : rank === 'navigator'
              ? { rotate: -3 }
              : {}
          }
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* Rank badge */}
      <motion.div
        initial={animate ? { opacity: 0, y: 10 } : {}}
        animate={animate ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background:
            isMaster
              ? 'linear-gradient(135deg, rgba(0,212,170,0.15), rgba(0,153,204,0.1))'
              : `rgba(${config.color === '#00d4aa' ? '0,212,170' : '245,166,35'},0.1)`,
          border: `1px solid ${config.color}40`,
          borderRadius: '100px',
          padding: '8px 20px',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>{config.emoji}</span>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.12em',
            color: config.color,
          }}
        >
          {t(rank)}
        </span>
      </motion.div>
    </div>
  );
}
