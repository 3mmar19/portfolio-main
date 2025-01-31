'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaDownload } from 'react-icons/fa6';
import React from 'react';
import SectionTitle from './SectionTitle';

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
    <section id="about" className="py-20 relative bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section title with custom gradient colors */}
        <SectionTitle 
          title="About Me" 
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
              {/* Professional title */}
              <h3 className={`text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r
                ${theme === 'dark' 
                  ? 'from-gray-100 to-gray-300' 
                  : 'from-gray-700 to-gray-900'}`}>
                Computer Science Graduate & Full Stack Developer
              </h3>
              
              {/* Bio cards */}
              <div className="space-y-4">
                {/* Introduction card */}
                <motion.div 
                  className={`relative backdrop-blur-md rounded-xl p-6 
                    ${theme === 'dark' 
                      ? 'bg-gray-800/30 border-gray-700/50' 
                      : 'bg-white/30 border-gray-200/50'} 
                    border overflow-hidden`}
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
                  <p className={`relative text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Hello! I&apos;m <span className="font-semibold text-blue-500">Ammar Bin Hussain</span>, 
                    a Computer Science graduate with First Class Honors from Umm Al-Qura University (UQU). 
                    I&apos;m passionate about solving real-world problems through web development and creating 
                    beautiful, functional websites that make a difference.
                  </p>
                </motion.div>

                {/* Additional info card */}
                <motion.div 
                  className={`relative backdrop-blur-md rounded-xl p-6
                    ${theme === 'dark' 
                      ? 'bg-gray-800/30 border-gray-700/50' 
                      : 'bg-white/30 border-gray-200/50'} 
                    border overflow-hidden`}
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50" />
                  <p className={`relative text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    As a <span className="font-semibold text-blue-500">self-taught developer</span>, 
                    I&apos;ve honed my skills in modern web technologies through hands-on experience 
                    and continuous learning. Beyond coding, I maintain a balanced lifestyle with a 
                    strong interest in fitness and nutrition, embodying the philosophy of a 
                    <span className="font-semibold text-blue-500"> healthy mind in a healthy body</span>.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Resume download button */}
            <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
              <motion.a
                href="/resume/Ammar-Resume.pdf"
                download
                className={`group relative inline-flex items-center gap-2 px-8 py-3 overflow-hidden
                  ${theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-500 text-white'
                  } rounded-xl text-sm font-medium backdrop-blur-sm
                  shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 border border-blue-400/30 rounded-xl group-hover:border-blue-400/50 transition-colors" />
                <motion.div
                  animate="animate"
                  variants={downloadIconVariants}
                  className="relative z-10"
                >
                  <FaDownload className="w-4 h-4" />
                </motion.div>
                <span className="relative z-10">View Resume</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right column: Skills grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {/* Skills categories */}
            {[
              {
                title: 'Frontend',
                items: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer']
              },
              {
                title: 'Backend',
                items: ['Node.js', 'Express', 'MongoDB', 'RESTful APIs']
              },
              {
                title: 'Tools & DevOps',
                items: ['Git & GitHub', 'VS Code', 'Figma', 'Vercel & Netlify']
              },
              {
                title: 'Interests',
                items: ['Web Development', 'UI/UX Design', 'Fitness & Nutrition', 'Continuous Learning']
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                variants={cardVariants}
                whileHover="hover"
                className={`relative backdrop-blur-md rounded-xl p-6 
                  ${theme === 'dark' 
                    ? 'bg-gray-800/30 border-gray-700/50' 
                    : 'bg-white/30 border-gray-200/50'} 
                  border overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br opacity-20
                  ${index % 2 === 0 
                    ? 'from-blue-500/20 to-purple-500/20' 
                    : 'from-purple-500/20 to-blue-500/20'}`} 
                />
                <h4 className="font-bold mb-4 text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <motion.li 
                      key={item}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
