'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaDownload } from 'react-icons/fa6';
import React from 'react';
import SectionTitle from './SectionTitle';
import { useTranslation } from '../utils/i18n';

// Local components for gravity-like interactive tags
type SkillsSection = { title: string; icon: React.ReactNode; items: string[] };

function GraviTag({
  label,
  theme,
  cardRef,
  mx,
  my,
  hovering,
}: {
  label: string;
  theme: 'dark' | string;
  cardRef: React.RefObject<HTMLDivElement>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  hovering: boolean;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });

  React.useEffect(() => {
    const handle = () => {
      if (!ref.current || !cardRef.current) return;
      const cardRect = cardRef.current.getBoundingClientRect();
      const tagRect = ref.current.getBoundingClientRect();

      const mouseX = mx.get();
      const mouseY = my.get();

      // If mouse is not hovering, reset
      if (!hovering || mouseX === -9999) {
        x.set(0); y.set(0); return;
      }

      // Centers relative to card
      const cx = tagRect.left - cardRect.left + tagRect.width / 2;
      const cy = tagRect.top - cardRect.top + tagRect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.hypot(dx, dy);

      const radius = 160; // px influence radius
      const maxShift = 14; // px max translation

      if (dist > radius) {
        x.set(0); y.set(0); return;
      }

      // Smooth falloff: quadratic
      const f = 1 - dist / radius; // 0..1
      const k = maxShift * f * f;
      const mag = Math.hypot(dx, dy) || 1;
      const tx = (dx / mag) * k;
      const ty = (dy / mag) * k;
      x.set(tx);
      y.set(ty);
    };

    const unsubX = mx.on('change', handle);
    const unsubY = my.on('change', handle);
    return () => { unsubX && unsubX(); unsubY && unsubY(); };
  }, [mx, my, hovering]);

  return (
    <motion.li
      ref={ref}
      tabIndex={0}
      style={{ x: sx, y: sy }}
      className={`relative px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
        border backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
        ${theme === 'dark'
          ? 'bg-white/5 text-blue-100 border-white/15 hover:bg-white/10 hover:border-white/25'
          : 'bg-white/60 text-blue-700 border-black/10 hover:bg-white/70 hover:border-black/20'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-400/60`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ delay: 0.08 }}
    >
      {label}
    </motion.li>
  );
}

function SkillsCard({ section, theme, language, variants }: { section: SkillsSection; theme: 'dark' | string; language: string; variants: any; }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const [hovering, setHovering] = React.useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const onLeave = () => {
    setHovering(false);
    mx.set(-9999);
    my.set(-9999);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      whileHover="hover"
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onLeave}
      className={`relative backdrop-blur-md rounded-2xl p-6 shadow-lg transition-all duration-300
        ${theme === 'dark' 
          ? 'bg-gray-800/40 border border-gray-700/50'
          : 'bg-white/40 border border-gray-200/50'}
        overflow-hidden group hover:shadow-xl`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        {section.icon}
        <h4 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          {section.title}
        </h4>
      </div>
      <ul className="flex flex-wrap gap-2">
        {section.items.map((item) => (
          <GraviTag key={item} label={item} theme={theme} cardRef={cardRef} mx={mx} my={my} hovering={hovering} />
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * About Component
 * 
 * A comprehensive section showcasing professional background and skills.
 * Features:
 * - Animated content cards with hover effects
 * - Responsive grid layout
 * - Interactive resume download button
 * - Skills categorization with visual indicators
 */
export default function About() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Animation for the download icon
  const downloadIconVariants = {
    animate: { 
      y: [0, -4, 0], // Floating animation
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Animation variants for content cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient blobs for glassmorphism effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section title with custom gradient colors */}
        <SectionTitle 
          title={t('about.title')} 
          fromColor="from-blue-400"
          toColor="to-blue-600"
        />
        
        {/* Main content grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          {/* Left column: Personal introduction */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">

              {/* Bio cards */}
              <div className="space-y-4">
                {/* Introduction card */}
                <motion.div
                  className="space-y-4"
                  variants={itemVariants}
                >
                  <motion.p 
                    className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                      backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-white/85'} 
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'} ${language === 'ar' ? 'font-domine text-right' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t('about.bio.intro').replace('<span>', '<span class="font-semibold text-blue-500">') }} />
                  </motion.p>
                  <motion.p 
                    className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                      backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-white/85'} 
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'} ${language === 'ar' ? 'font-domine text-right' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t('about.bio.experience').replace('<span>', '<span class="font-semibold text-blue-500">') }} />
                  </motion.p>
                </motion.div>

                {/* Skills and soft skills card */}
                <motion.div
                  className="space-y-4"
                  variants={itemVariants}
                >
                  <motion.p 
                    className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                      backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-white/85'} 
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'} ${language === 'ar' ? 'font-domine text-right' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t('about.bio.conclusion').replace('<span>', '<span class="font-semibold text-blue-500">') }} />
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Resume download button */}
            <motion.div variants={itemVariants} className="flex justify-center mt-12 mb-8">
              <motion.a
                href="/resume/AmmarBinHussainCV8.pdf"
                download
                className={`group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden
                  bg-gradient-to-r from-blue-400 to-blue-600 text-white
                  rounded-xl text-lg font-semibold
                  shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-2 border-white/20`}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                <motion.div
                  animate="animate"
                  variants={downloadIconVariants}
                  className="relative z-10"
                >
                  <FaDownload className="w-5 h-5" />
                </motion.div>
                <span className="relative z-10">
                  {t('about.resume')}
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right column: Skills grid with gravity-interactive tags */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {[
              {
                title: t('about.skills.frontend'),
                icon: <span className="text-blue-500"><i className="fas fa-laptop-code"></i></span>,
                items: [
                  t('about.skillItems.javascript'),
                  t('about.skillItems.html5'),
                  t('about.skillItems.css3'),
                  t('about.skillItems.react'),
                  t('about.skillItems.nextjs'),
                  t('about.skillItems.tailwind'),
                ]
              },
              {
                title: t('about.skills.backend'),
                icon: <span className="text-purple-500"><i className="fas fa-server"></i></span>,
                items: [
                  t('about.skillItems.php'),
                  t('about.skillItems.nodejs'),
                  t('about.skillItems.mysql'),
                  t('about.skillItems.postgresql'),
                  t('about.skillItems.python')
                ]
              },
              {
                title: t('about.skills.tools'),
                icon: <span className="text-green-500"><i className="fas fa-tools"></i></span>,
                items: [
                  t('about.skillItems.git'),
                  t('about.skillItems.vsCode'),
                  t('about.skillItems.windowsOS'),
                  t('about.skillItems.linuxOS'),
                  t('about.skillItems.powerBi')
                ]
              },
              {
                title: t('about.skills.softSkills'),
                icon: <span className="text-yellow-500"><i className="fas fa-user-friends"></i></span>,
                items: [
                  t('about.skillItems.communication'),
                  t('about.skillItems.problemSolving'),
                  t('about.skillItems.teamwork'),
                  t('about.skillItems.adaptability'),
                  t('about.skillItems.organization')
                ]
              }
            ].map((section) => (
              <SkillsCard key={section.title} section={section as SkillsSection} theme={theme} language={language} variants={cardVariants} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
