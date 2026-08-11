'use client';

import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  style = {},
  hover = true,
  intensity = 'default',
  as: Component = 'div',
  ...props
}) {
  const intensityStyles = {
    subtle: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    default: {
      background: 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.35)',
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.55)',
    },
  };

  return (
    <motion.div
      className={className}
      style={{
        ...intensityStyles[intensity],
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(212, 168, 67, 0.08)',
        overflow: 'hidden',
        ...style,
      }}
      whileHover={hover ? {
        y: -6,
        boxShadow: '0 16px 48px rgba(212, 168, 67, 0.15)',
        transition: { duration: 0.3, ease: 'easeOut' },
      } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
