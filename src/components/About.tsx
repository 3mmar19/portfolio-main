'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaDownload } from 'react-icons/fa6';
import React from 'react';
import SectionTitle from './SectionTitle';
import { useTranslation } from '@/utils/i18n';

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
      {/* Background gradient blobs for glassmorphism effect
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
       */}
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
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'}
                      ${language === 'ar' ? 'text-right rtl' : 'text-left ltr'}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t('about.bio.intro').replace('<span>', '<span class="font-semibold text-blue-500">') }} />
                  </motion.p>
                  {/* experience */}
                  <motion.p 
                    className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                      backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-white/85'} 
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'}
                      ${language === 'ar' ? 'text-right rtl' : 'text-left ltr'}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t('about.bio.experience').replace('<span>', '<span class="font-semibold text-blue-500">') }} />
                  </motion.p>
                </motion.div>

                {/* conclusion */}
                <motion.div
                  className="space-y-4"
                  variants={itemVariants}
                >
                  <motion.p 
                    className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                      backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-white/85'} 
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'}
                      ${language === 'ar' ? 'text-right rtl' : 'text-left ltr'}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t('about.bio.conclusion').replace('<span>', '<span class="font-semibold text-blue-500">') }} />
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right column: Skills grid with gravity-interactive tags and resume download */}
          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >

            
            {/* Skills grid */}
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
                  'SEO',
                  'Social Media Marketing',
                  'Google Analytics',
                  'Google Ads',
                  'AI Tools',
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                variants={cardVariants}
                whileHover="hover"
                className={`relative backdrop-blur-md rounded-2xl p-6 shadow-lg border-2 transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-gray-800/60 border-blue-500'
                    : 'bg-white/70 border-blue-400'}
                  overflow-hidden group`}
                style={{ borderImage: 'none' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h4 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                    {section.title}
                  </h4>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {section.items.map((item, idx) => {
                    // Generate a consistent but random color based on the item name
                    const itemHash = item.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const colorIndex = itemHash % 5; // 5 different color options
                    
                    // Color schemes based on the theme
                    const colors = theme === 'dark' 
                      ? [
                          'from-blue-500/30 to-blue-600/20 text-blue-100 border-blue-500/30',
                          'from-purple-500/30 to-purple-600/20 text-purple-100 border-purple-500/30',
                          'from-green-500/30 to-green-600/20 text-green-100 border-green-500/30',
                          'from-cyan-500/30 to-cyan-600/20 text-cyan-100 border-cyan-500/30',
                          'from-amber-500/30 to-amber-600/20 text-amber-100 border-amber-500/30',
                        ] 
                      : [
                          'from-blue-100/80 to-blue-200/60 text-blue-700 border-blue-200/60',
                          'from-purple-100/80 to-purple-200/60 text-purple-700 border-purple-200/60',
                          'from-green-100/80 to-green-200/60 text-green-700 border-green-200/60',
                          'from-cyan-100/80 to-cyan-200/60 text-cyan-700 border-cyan-200/60',
                          'from-amber-100/80 to-amber-200/60 text-amber-700 border-amber-200/60',
                        ];
                    
                    return (
                      <motion.li 
                        key={item}
                        className={`group/tag relative flex items-center px-3 py-1.5 rounded-xl text-sm font-medium 
                          bg-gradient-to-r ${colors[colorIndex]}
                          backdrop-blur-md shadow-sm border
                          transition-all duration-300 overflow-hidden
                          hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                          cursor-default`}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        title={item} // Add tooltip
                      >
                        {/* Subtle shine effect */}
                        <span className="absolute inset-0 overflow-hidden">
                          <span className="absolute -inset-[250%] top-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-[shine_6s_ease-in-out_infinite] group-hover/tag:animate-[shine_2s_ease-in-out_infinite]"></span>
                        </span>
                        
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
            </motion.div>
            {/* Resume download button with iOS 26 liquid glass effect */}
            <motion.div 
              variants={itemVariants} 
              className="flex justify-center mb-6"
            >
              <motion.a
                href="/resume/AmmarBinHussainCV8.pdf"
                download
                className={`group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden
                  ${theme === 'dark' 
                    ? 'bg-blue-500/15 text-white border-white/10' 
                    : 'bg-white/40 text-blue-900 border-white/40'
                  } 
                  backdrop-blur-xl
                  rounded-2xl text-lg font-medium
                  shadow-sm transition-all duration-300 border`}
                initial={{ y: 0 }}
                whileHover={{
                  y: -3,
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(16px)',
                  background: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 ${theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/10' 
                  : 'bg-gradient-to-br from-white/50 to-blue-200/30'} 
                  opacity-80 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                
                <motion.div
                  animate="animate"
                  variants={downloadIconVariants}
                  className="relative z-10"
                >
                  <FaDownload className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
                </motion.div>
                <span className={`relative z-10 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                  {t('about.resume')}
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
