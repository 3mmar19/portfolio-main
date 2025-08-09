'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, FolderIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { siteConfig } from '@/config/site';
import { useTranslation } from '../utils/i18n';
import FlickerText from './FlickerText';

// Simple typewriter effect component for inline text with optional blinking cursor
type TypewriterProps = {
  text: string;
  speed?: number; // ms per character
  startDelay?: number; // ms before starting
  cursor?: boolean;
  dir?: 'ltr' | 'rtl';
  respectReducedMotion?: boolean;
  // Optional haptics per character (supported on some mobile browsers)
  hapticsEnabled?: boolean;
  hapticsPattern?: number | number[]; // e.g., 8 or [10]
  hapticsThrottleMs?: number; // minimum ms between vibrations
};

function Typewriter({ text, speed = 125, startDelay = 200, cursor = true, dir, respectReducedMotion = true, hapticsEnabled = false, hapticsPattern = 8, hapticsThrottleMs = 40 }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const lastHapticAt = useRef(0);
  const prevIndex = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = () => {
    try {
      // Create or reuse audio context
      const AC: any = (typeof window !== 'undefined' && ((window as any).AudioContext || (window as any).webkitAudioContext)) || null;
      if (!AC) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      // Subtle, short click
      osc.type = 'square';
      osc.frequency.setValueAtTime(2200, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  };

  // Reset when text changes
  useEffect(() => {
    setIndex(0);
    setDone(false);
    prevIndex.current = 0;
  }, [text]);

  useEffect(() => {
    // Optionally respect reduced motion preference: show immediately if enabled
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (respectReducedMotion && reduce) {
      setIndex(text.length);
      setDone(true);
      return;
    }

    const startTimer = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        setIndex((i) => {
          if (i >= text.length) {
            window.clearInterval(interval);
            setDone(true);
            return i;
          }
          return i + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
    };
  }, [text, speed, startDelay, respectReducedMotion]);

  // Haptic per-character feedback where supported (with reduced-motion gating)
  useEffect(() => {
    if (!hapticsEnabled) return;
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (respectReducedMotion && reduce) {
      prevIndex.current = index;
      return;
    }
    // Only vibrate on forward progress and not when finished
    if (index <= prevIndex.current || index > text.length) return;

    const now = Date.now();
    if (now - lastHapticAt.current < hapticsThrottleMs) {
      prevIndex.current = index;
      return;
    }

    const nav: any = navigator as any;
    let providedFeedback = false;
    if (nav && typeof nav.vibrate === 'function') {
      try {
        nav.vibrate(hapticsPattern);
        providedFeedback = true;
      } catch {}
    }
    if (!providedFeedback) {
      // Fallback to subtle click
      playClick();
      providedFeedback = true;
    }

    if (providedFeedback) {
      lastHapticAt.current = now;
    }

    prevIndex.current = index;
  }, [index, hapticsEnabled, hapticsPattern, hapticsThrottleMs, text.length, respectReducedMotion]);

  return (
    <span dir={dir} aria-label={text} className="whitespace-pre">
      {text.slice(0, index)}
      {cursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-current align-[-0.1em] ml-1"
          style={{ visibility: done ? 'hidden' : 'visible' }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  // Use language context directly for language state
  const { language } = useLanguageContext();
  // Use translation hook for text translations
  const { t } = useTranslation();

  // Fun click burst state per stat card index
  const [bursts, setBursts] = React.useState<Record<number, number[]>>({});

  const triggerBurst = (idx: number) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setBursts((prev) => ({ ...prev, [idx]: [...(prev[idx] || []), id] }));
    // Auto-clean this burst after animation completes
    window.setTimeout(() => {
      setBursts((prev) => {
        const nextArr = (prev[idx] || []).filter((b) => b !== id);
        const next = { ...prev, [idx]: nextArr };
        if (nextArr.length === 0) delete next[idx];
        return next;
      });
    }, 900);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  // Staggered animation for tech stack tags
  const tagsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.20, delayChildren: 0.3 }
    }
  };
  const tagItemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 20 } }
  };

  const socialLinks = [
    { name: 'GitHub', url: siteConfig.links.github, icon: FaGithub },
    { name: 'LinkedIn', url: siteConfig.links.linkedin, icon: FaLinkedinIn },
    { name: 'Twitter', url: siteConfig.links.twitter, icon: FaTwitter },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4" id="home">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 -left-12 w-64 h-64 rounded-full ${theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-100/50'} blur-3xl`} />
        <div className={`absolute bottom-1/4 -right-12 w-64 h-64 rounded-full ${theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-100/50'} blur-3xl`} />
      </div>

      {/* Main content container */}
      <motion.div
        className="w-full max-w-3xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <motion.span 
            className={`px-4 py-2 rounded-full text-sm font-medium relative overflow-hidden group cursor-pointer
              ${theme === 'dark' 
                ? 'bg-gray-800/80 text-green-400 border border-green-400/30 hover:border-green-400/50' 
                : 'bg-green-50/90 text-green-600 border border-green-200 hover:border-green-300'
              } inline-flex items-center backdrop-blur-sm`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Gradient background effect */}
            <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${theme === 'dark'
                ? 'from-green-500/10 via-green-400/5 to-green-500/10'
                : 'from-green-100/50 via-green-50/30 to-green-100/50'
              }`}
            />

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-2">
              {/* Animated dot */}
              <motion.div 
                className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <FlickerText
                text={t('hero.availableForWork')}
                className={`tracking-wide ${language === 'ar' ? 'font-domine' : ''}`}
                textColor={theme === 'dark' ? '#34D399' : '#059669'}
                glowColor={theme === 'dark' ? '#10B981' : '#10B981'}
                animationSpeed={1}
                animationPattern="sequential"
                repeatBehavior="loop"
                strokeWidth={1.5}
                glowIntensity={8}
              />

              {/* Check icon with animation */}
              <motion.div
                className="relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110
                    ${theme === 'dark' ? 'stroke-green-400' : 'stroke-green-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            </div>
          </motion.span>
        </motion.div>

        {/* Main heading */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight
            ${theme === 'dark' ? 'text-white' : 'text-gray-800'} ${language === 'ar' ? 'font-domine' : ''}`}
          >
            {t('hero.greeting')}{' '}
            <span className={`relative inline-block ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              <Typewriter 
                text={t('hero.name')} 
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                respectReducedMotion={false}
                hapticsEnabled={true}
                hapticsPattern={10}
                hapticsThrottleMs={60}
              />
              <span className={`absolute -bottom-2 ${language === 'ar' ? 'right-0' : 'left-0'} w-full h-1 rounded ${
                theme === 'dark' ? 'bg-blue-400/30' : 'bg-blue-200/70'
              }`} />
            </span>
          </h1>
          <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mb-6 ${language === 'ar' ? 'font-domine' : ''}`}>
            {t('hero.title')}
          </p>

          {/* Tech Stack Tags */}
          <motion.div className="flex flex-wrap justify-center gap-2 mb-8" variants={tagsContainerVariants}>
            {[
              { key: 'windowsOS', value: t('hero.techStack.windowsOS') },
              { key: 'linuxOS', value: t('hero.techStack.linuxOS') },
              { key: 'reactjs', value: t('hero.techStack.reactjs') },
              { key: 'customPcBuilding', value: t('hero.techStack.customPcBuilding') },
              { key: 'javascript', value: t('hero.techStack.javascript') },
              { key: 'python', value: t('hero.techStack.python') },
              { key: 'htmlCss', value: t('hero.techStack.htmlCss') },
              { key: 'seo', value: t('hero.techStack.seo') },
            ].map((tech) => (
              <motion.span
                variants={tagItemVariants}
                key={tech.key}
                className={`px-3 py-1 text-sm rounded-full border-2 font-medium shadow-sm transition-all duration-300 hover:scale-105 ${language === 'ar' ? 'font-domine' : ''} ` +

                  (theme === 'dark'
                    ? 'bg-blue-800/60 text-blue-100 border-blue-500 hover:bg-blue-700/80'
                    : 'bg-blue-100/60 text-blue-800 border-blue-300 hover:bg-blue-200/80'
                  )}
              >
                {tech.value}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex  sm:flex-row items-center justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <motion.a
              href="#projects"
              className={`group relative flex items-center justify-center w-full sm:w-44 h-12 px-6
                ${theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-blue-400 border border-blue-500/20' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-600 border border-blue-200'
                } rounded-lg text-sm font-medium transition-all duration-500 backdrop-blur-sm`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FolderIcon className="w-5 h-5 relative z-10 mr-2 ml-2 group-hover:rotate-6 transition-transform duration-300" />
              <span className={`relative z-10 text-base group-hover:translate-x-1 transition-transform duration-300 ${language === 'ar' ? 'font-domine' : ''}`}>
                {t('hero.viewProjects')}
              </span>
            </motion.a>

            <motion.a
              href="https://wa.me/+966535676369"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center w-full sm:w-44 h-12 px-6
                ${theme === 'dark' 
                  ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 text-green-400 border border-green-500/20' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-600 border border-green-200'
                } rounded-lg text-sm font-medium transition-all duration-500 backdrop-blur-sm`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="w-5 h-5 relative z-10 mr-2 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className={`relative z-10 text-base group-hover:translate-x-1 transition-transform duration-300 ${language === 'ar' ? 'font-domine' : ''}`}>
                {t('hero.letsTalk')}
              </span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {[
              { value: '2+', label: t('hero.stats.yearsExperience') },
              { value: '10+', label: t('hero.stats.projectsDone') },
              { value: '7+', label: t('hero.stats.technologies') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`group relative glass rounded-xl p-5 text-center transition-all duration-300 overflow-hidden hover:-translate-y-0.5`}
                role="button"
                tabIndex={0}
                aria-label={typeof stat.label === 'string' ? stat.label : 'Stat card'}
                onClick={() => triggerBurst(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerBurst(index); } }}
                whileTap={{ scale: 0.97, rotate: -0.5 }}
              >
                {/* Shine overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent" />
                {/* Top edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-white/20 dark:bg-white/10" />
                {/* Click burst effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {(bursts[index] || []).map((id) => (
                    <React.Fragment key={id}>
                      {/* Confetti pieces */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const dist = 60 + Math.random() * 40;
                        const x = Math.cos(angle) * dist;
                        const y = Math.sin(angle) * dist;
                        const rot = Math.random() * 360;
                        return (
                          <motion.span
                            key={`${id}-p-${i}`}
                            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-sm"
                            style={{
                              transform: 'translate(-50%, -50%)',
                              background: theme === 'dark'
                                ? 'linear-gradient(45deg, #60a5fa, #a78bfa)'
                                : 'linear-gradient(45deg, #3b82f6, #a855f7)'
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                            animate={{ x, y, opacity: 0, scale: 0.8, rotate: rot }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        );
                      })}
                      {/* Ripple */}
                      <motion.span
                        key={`${id}-ripple`}
                        className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-white/60 dark:bg-white/30"
                        style={{ transform: 'translate(-50%, -50%)' }}
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </React.Fragment>
                  ))}
                </div>
                <div className="relative z-10">
                  <div className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4"
            variants={itemVariants}
          >
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 rounded-lg transition-all duration-300 overflow-hidden
                  ${theme === 'dark'
                    ? 'bg-gray-800/30 text-gray-400 border border-gray-700/50 hover:border-blue-500/50'
                    : 'bg-white/70 hover:bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  } backdrop-blur-sm`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient overlay for dark theme */}
                {theme === 'dark' && (
                  <>
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                    
                    {/* Moving shine effect */}
                    <div className="absolute inset-0 translate-x-full group-hover:translate-x-[-175%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </>
                )}

                {/* Icon container */}
                <div className="relative z-10">
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'group-hover:text-blue-400 group-hover:scale-110'
                      : 'group-hover:text-gray-800'
                  }`} />
                </div>

                {/* Tooltip */}
                <div className={`absolute left-1/2 -translate-x-1/2 -bottom-10 px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:-bottom-12 pointer-events-none transition-all duration-300
                  ${theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 border border-gray-700'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}
                >
                  {name}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
