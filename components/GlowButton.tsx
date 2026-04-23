'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-md',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-base rounded-xl',
  };

  const variantClass = variant === 'primary'
    ? 'glow-btn-primary'
    : variant === 'amber'
    ? 'glow-btn-amber'
    : 'glow-btn-secondary';

  const baseClass = `${variantClass} ${sizeClasses[size]} font-bold tracking-wide inline-flex items-center gap-2 transition-all duration-250 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} style={{ display: 'inline-block' }}>
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      style={
        variant === 'amber'
          ? { background: 'var(--accent-amber)', color: '#0a0c0f' }
          : {}
      }
    >
      {children}
    </motion.button>
  );
}
