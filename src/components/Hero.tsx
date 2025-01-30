'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, FolderIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();

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

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/3mmar19', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/3mmar', icon: FaLinkedinIn },
    { name: 'Twitter', href: 'https://twitter.com/3mmarHus', icon: FaTwitter },
  ];

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className={`h-screen flex flex-col relative overflow-hidden`} id="home">    
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-6">
          <motion.div
            className="max-w-lg mx-auto w-full relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tech stack icons floating in background */}
            <div className={`absolute left-1/2 -translate-x-1/2 -top-16 w-12 h-12 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} rounded-xl rotate-12 backdrop-blur-sm flex items-center justify-center text-xl border`}>
              <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`}>⚛️</span>
            </div>
            <div className={`absolute -top-12 right-4 w-11 h-11 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} rounded-xl rotate-45 backdrop-blur-sm flex items-center justify-center text-xl border`}>
              <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>🚀</span>
            </div>

            {/* Decorative circles */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} rounded-full`} />
            <div className={`absolute -top-16 -right-16 w-32 h-32 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} rounded-full`} />

            {/* Main text content with glass panel */}
            <motion.div 
              className={`relative backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-900/30 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} rounded-2xl p-6 border`}
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative mb-6"
                >
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping 
                    ${theme === 'dark' ? 'bg-green-400/40' : 'bg-green-500/40'}`} 
                  />
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full
                    ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`} 
                  />
                  <span className={`px-4 py-2 rounded-full text-sm font-medium
                    ${theme === 'dark' 
                      ? 'bg-gray-800 text-green-400 border border-green-400/30' 
                      : 'bg-green-50 text-green-600 border border-green-100'
                    } inline-flex items-center`}
                  >
                    <span className="mr-2">Available for Work</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-4xl md:text-5xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Hi, I&apos;m{' '}
                  <motion.span 
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${
                      theme === 'dark' ? 'from-purple-400 to-blue-400' : 'from-purple-500 to-blue-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ammar Bin Hussain
                  </motion.span>
                </motion.h1>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-row items-center justify-center gap-3">
                <motion.a
                  href="#projects"
                  className={`group relative flex items-center justify-center w-32 sm:w-40 h-10 sm:h-12 px-3 sm:px-5 py-2 sm:py-2.5 ${
                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500'
                  } text-${theme === 'dark' ? 'blue-400' : 'white'} rounded-lg text-sm font-medium
                    shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-blue-500/20 to-blue-400/20' : 'from-blue-500 to-blue-400'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <FolderIcon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 mr-2" />
                  <span className="relative z-10 text-center text-sm sm:text-base">Browse Projects</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/+966535676369"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center w-32 sm:w-40 h-10 sm:h-12 px-3 sm:px-5 py-2 sm:py-2.5 ${
                    theme === 'dark' ? 'bg-green-500/20' : 'bg-green-500'
                  } text-${theme === 'dark' ? 'green-400' : 'white'} rounded-lg text-sm font-medium
                    shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-green-500/20 to-green-400/20' : 'from-green-500 to-green-400'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 mr-2" />
                  <span className="relative z-10 text-center text-sm sm:text-base">Contact Me</span>
                </motion.a>
              </div>

              <motion.p 
                className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2 mb-6 leading-relaxed`}
                variants={itemVariants}
              >
              </motion.p>

              <motion.div 
                className="flex flex-col items-center gap-4"
                variants={itemVariants}
              >
                <div className="flex flex-wrap justify-center gap-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    theme === 'dark' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : 'bg-blue-100 text-blue-600 border-blue-200'
                  } border`}>
                    React
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    theme === 'dark' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : 'bg-blue-100 text-blue-600 border-blue-200'
                  } border`}>
                    Next.js
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    theme === 'dark' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : 'bg-blue-100 text-blue-600 border-blue-200'
                  } border`}>
                    TypeScript
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    theme === 'dark' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : 'bg-blue-100 text-blue-600 border-blue-200'
                  } border`}>
                    Node.js
                  </span>
                </div>

                <div className="flex flex-row items-center justify-center gap-3">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative w-10 h-10 flex items-center justify-center ${
                          theme === 'dark'
                            ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-200/50'
                        } rounded-lg text-sm backdrop-blur-sm transition-all duration-300 border
                          before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r ${
                            theme === 'dark'
                              ? 'before:from-gray-600/20 before:to-gray-600/0'
                              : 'before:from-gray-200/20 before:to-gray-200/0'
                          } before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className={`w-5 h-5 relative z-10 ${
                          theme === 'dark' 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Stats with glass effect */}
            <motion.div 
              className="mt-4 grid grid-cols-3 gap-3"
              variants={itemVariants}
            >
              {[
                { value: '1+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Done' },
                { value: '15+', label: 'Technologies' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`group relative ${
                    theme === 'dark'
                      ? 'bg-gray-800/30 border-gray-700/50'
                      : 'bg-white/80 border-gray-200/50'
                  } backdrop-blur-sm rounded-lg p-3 text-center border
                    before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r ${
                      theme === 'dark'
                        ? 'before:from-gray-600/20 before:to-gray-600/0'
                        : 'before:from-gray-200/20 before:to-gray-200/0'
                    } before:opacity-0 group-hover:before:opacity-100 before:transition-opacity`}
                >
                  <div className="relative z-10">
                    <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator with enhanced styling */}
        <div className="flex justify-center pb-8">
          <div className="relative w-16 h-16 group">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-blue-500/5 group-hover:bg-blue-500/10' : 'bg-blue-100 group-hover:bg-blue-200'} rounded-full transition-colors`} />
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path
                  id="circle"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="12" className="select-none">
                <textPath href="#circle" className={`${theme === 'dark' ? 'text-white fill-white' : 'text-gray-600 fill-gray-600'}`}>
                  scroll down • scroll down • scroll down •
                </textPath>
              </text>
            </svg>
            
            <motion.button
              onClick={scrollToAbout}
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                y: [0, 4, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <ArrowDownIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-white group-hover:text-blue-300' : 'text-gray-600 group-hover:text-blue-500'} transition-colors`} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
