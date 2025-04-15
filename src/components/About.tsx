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
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    Hi! I'm <span className="font-semibold text-blue-500">Ammar Hussain Ahmed</span>, an IT Support Technician and Computer Science graduate (First Class Honors, Umm Al-Qura University). I have hands-on experience building custom gaming PCs, installing and configuring Windows and Linux systems, and troubleshooting a wide range of hardware and software issues.
                  </motion.p>
                  <motion.p 
                    className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                      backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/85' : 'bg-white/85'} 
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    My technical support background includes working with Qatarat App and iDara.NET, where I provided solutions that kept systems running smoothly and users happy. looking for new challenges, or learning the latest tools in IT. embodying the philosophy of a <span className="font-semibold text-blue-500">healthy mind in a healthy body</span>.
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
                      border ${theme === 'dark' ? 'border-blue-500/80' : 'border-gray-200/80'}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    I'm eager to bring my troubleshooting skills, technical expertise, and positive attitude to a team where I can make a real impact and keep growing in the IT field. <span className="font-semibold text-blue-500">Let's connect and see how I can help your organization thrive!</span>
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Resume download button */}
            <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
              <motion.a
                href="/resume/AmmarBinHussainCvEm.pdf"
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
                title: 'Technical Tools',
                icon: <span className="text-blue-500"><i className="fas fa-tools"></i></span>,
                items: [
                  'Windows OS',
                  'Linux OS',
                  'BIOS/UEFI',
                  'TeamViewer',
                  'AnyDesk',
                  'VS Code',
                  'MySQL',
                ]
              },
              {
                title: 'Hardware',
                icon: <span className="text-purple-500"><i className="fas fa-microchip"></i></span>,
                items: [
                  'Custom PC Building',
                  'Hardware Diagnostics',
                  'Peripheral Setup',
                  'Remote Desktop Tools',
                ]
              },
              {
                title: 'Programming & Data',
                icon: <span className="text-green-500"><i className="fas fa-code"></i></span>,
                items: [
                  'JavaScript',
                  'Python',
                  'HTML & CSS',
                  'Power BI',
                  'Tableau',
                  'Data Visualization & Reporting',
                ]
              },
              {
                title: 'Digital Marketing',
                icon: <span className="text-yellow-500"><i className="fas fa-bullhorn"></i></span>,
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
                  {section.items.map((item) => (
                    <motion.li 
                      key={item}
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-all duration-200
                        ${theme === 'dark' ? 'bg-blue-800/60 text-blue-100 border-blue-500 group-hover:bg-blue-700/80' : 'bg-blue-100 text-blue-700 border-blue-400 group-hover:bg-blue-200'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 }}
                    >
                      {item}
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
