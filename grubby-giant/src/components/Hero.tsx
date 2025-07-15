'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, FolderIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../config/site';

function Hero() {
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

            {/* Animated ring */}
            <div className={`absolute -inset-[2px] rounded-full animate-ping opacity-30
              ${theme === 'dark' ? 'bg-green-400' : 'bg-green-500'}`} 
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
              
              <span className="font-medium tracking-wide">Available for Work</span>

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
            ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          >
            Hi, I&apos;m{' '}
            <span className={`relative inline-block ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              Ammar Bin Hussain
              <span className={`absolute -bottom-2 left-0 w-full h-1 rounded ${
                theme === 'dark' ? 'bg-blue-400/30' : 'bg-blue-200/70'
              }`} />
            </span>
          </h1>
          <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mb-6`}>
            IT Support Technician & Computer Science Graduate
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['Windows OS', 'Linux OS', 'BIOS/UEFI', 'TeamViewer', 'AnyDesk', 'VS Code', 'MySQL', 'Custom PC Building', 'JavaScript', 'Python', 'HTML & CSS', 'Power BI', 'Tableau', 'SEO', 'Google Analytics'].map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 text-sm rounded-full border-2 font-medium shadow-sm transition-all duration-300 hover:scale-105 ` +
                  (theme === 'dark'
                    ? 'bg-blue-800/60 text-blue-100 border-blue-500 hover:bg-blue-700/80'
                    : 'bg-blue-100 text-blue-700 border-blue-400 hover:bg-blue-200')
                }
              >
                {tech}
              </span>
            ))}
          </div>

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
              <FolderIcon className="w-5 h-5 relative z-10 mr-2 group-hover:rotate-6 transition-transform duration-300" />
              <span className="relative z-10 text-base group-hover:translate-x-1 transition-transform duration-300">
                View Projects
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
              <FaWhatsapp className="w-5 h-5 relative z-10 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 text-base group-hover:translate-x-1 transition-transform duration-300">
                Let's Talk
              </span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {[
              { value: '1+', label: 'Years Experience' },
              { value: '10+', label: 'Projects Done' },
              { value: '7+', label: 'Technologies' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`group relative backdrop-blur-sm rounded-lg p-4 text-center border transition-all duration-300
                  ${theme === 'dark'
                    ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/40'
                    : 'bg-white/60 border-gray-200 hover:bg-white/90 hover:border-gray-300 hover:shadow-sm'
                  }`}
              >
                <div className="relative z-10">
                  <div className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              </div>
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

export default Hero;
