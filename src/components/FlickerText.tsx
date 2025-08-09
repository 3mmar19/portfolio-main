/*
  Lightweight FlickerText component inspired by a Framer module.
  Uses framer-motion only (no Framer design-time APIs), suitable for Next.js.
*/
'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export type FlickerTextProps = {
  text: string;
  textColor?: string; // CSS color
  animationSpeed?: number; // multiplier, 1 = default
  animationPattern?: 'sequential' | 'random' | 'sync';
  repeatBehavior?: 'loop' | 'once';
  strokeWidth?: number; // px
  autoPlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function FlickerText({
  text,
  textColor = '#10B981', // emerald-500
  animationSpeed = 1,
  animationPattern = 'sequential',
  repeatBehavior = 'loop',
  strokeWidth = 1.5,
  autoPlay = true,
  className,
  style,
}: FlickerTextProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: false });

  // Split characters including spaces preserved
  const characters = useMemo(
    () => text.split('').map((ch, idx) => ({ ch: ch === ' ' ? '\u00A0' : ch, key: `${ch}-${idx}` })),
    [text]
  );

  // Timings
  const baseDelay = 0.1 / Math.max(animationSpeed, 0.0001);
  const flickerDuration = 0.3 / Math.max(animationSpeed, 0.0001);
  const totalDuration = characters.length * baseDelay + flickerDuration;

  const getDelay = (index: number) => {
    switch (animationPattern) {
      case 'sequential':
        return index * baseDelay;
      case 'random':
        return Math.random() * totalDuration * 0.7;
      case 'sync':
      default:
        return 0;
    }
  };


  useEffect(() => {
    if (autoPlay && isInView) setIsPlaying(true);
  }, [autoPlay, isInView]);

  const characterVariants = {
    initial: {
      opacity: 1,
      color: textColor,
      WebkitTextStroke: `${strokeWidth}px ${textColor}`,
      textShadow: 'none',
      filter: 'none',
    },
    flicker: (index: number) => ({
      opacity: [1, 0.3, 1, 0.1, 1, 0.7, 1],
      color: textColor,
      WebkitTextStroke: `${strokeWidth}px ${textColor}`,
      transition: {
        duration: flickerDuration,
        delay: getDelay(index),
        ease: 'easeInOut',
        repeat: repeatBehavior === 'loop' ? Infinity : 0,
        repeatDelay: repeatBehavior === 'loop' ? totalDuration : 0,
      },
    }),
  } as const;

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 0, ...style }}
    >
      {characters.map((c, index) => (
        <motion.span
          key={`${c.key}-${index}`}
          custom={index}
          variants={characterVariants}
          initial="initial"
          animate={isPlaying ? 'flicker' : 'initial'}
          style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 'small', lineHeight: 'inherit', letterSpacing: 'inherit', fontFamily: 'inherit', whiteSpace: 'pre' }}
        >
          {c.ch}
        </motion.span>
      ))}
    </span>
  );
}
