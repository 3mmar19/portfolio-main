'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon,
  AcademicCapIcon,
  RectangleStackIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import React from 'react';

const navigation = [
  { name: 'Home', href: '#home', icon: HomeIcon },
  { name: 'About', href: '#about', icon: UserIcon },
  { name: 'Education', href: '#education', icon: AcademicCapIcon },
  { name: 'Projects', href: '#projects', icon: RectangleStackIcon },
  { name: 'Contact', href: '#contact', icon: EnvelopeIcon },
];

const ThemeToggle = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { theme, toggleTheme } = useTheme();
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-500 ${
        theme === 'dark'
          ? 'hover:bg-gray-800/50 hover:text-blue-400'
          : 'hover:bg-blue-100/50 hover:text-amber-500'
      } ${isMobile ? 'backdrop-blur-md' : ''}`}
      aria-label="Toggle theme"
    >
      <motion.div 
        className={`relative ${isMobile ? 'w-6 h-6' : 'w-5 h-5'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                ...spring,
                duration: 0.5
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Sun rays animation */}
              <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear"
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-0.5 h-1.5 bg-amber-300"
                    style={{
                      transformOrigin: "50% 100%",
                      left: "50%",
                      top: "0",
                      transform: `rotate(${i * 30}deg) translateY(-4px)`
                    }}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full"
                style={{ filter: "blur(1px)" }}
              />
              <SunIcon className={`relative ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-amber-50`} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{
                ...spring,
                duration: 0.5
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Stars animation */}
              <motion.div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1 h-1 bg-blue-200 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-80"
                style={{ filter: "blur(1px)" }}
              />
              <motion.div
                className="absolute right-0.5 top-0.5 w-3/4 h-3/4 bg-blue-200 rounded-full opacity-40"
                style={{ filter: "blur(1px)" }}
              />
              <MoonIcon className={`relative ${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-blue-50`} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      // Find the current section
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItemClass = theme === 'dark'
    ? 'text-white bg-blue-500/10 border border-blue-400/30'
    : 'text-gray-900 bg-blue-400/10 border border-blue-300/30';

  const inactiveItemClass = theme === 'dark'
    ? 'text-gray-300 hover:text-white hover:bg-gray-800/20 border border-transparent hover:border-gray-700/30'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/20 border border-transparent hover:border-gray-200/30';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 md:max-w-fit w-full">
        <div className={`relative backdrop-blur-[10px] border ${
          theme === 'dark' 
            ? 'bg-gray-900/80 border-gray-700 shadow-lg shadow-gray-900/30' 
            : 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/30'
        } rounded-xl transition-all duration-300`}>
          <div className="flex items-center justify-between h-12 md:h-12 px-3">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive ? activeItemClass : inactiveItemClass
                    }`}
                  >
                    <item.icon className={`mr-1 h-4 w-4 transition-colors duration-300 ${
                      isActive ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-500') : ''
                    }`} />
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Theme Toggle Desktop */}
            <div className="hidden md:flex md:items-center pl-2">
              <ThemeToggle />
            </div>

            {/* Mobile header */}
            <div className="flex items-center justify-between w-full md:hidden">
              {/* Theme Toggle Mobile */}
              <div className="flex items-center">
                <ThemeToggle isMobile />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-8 h-8 focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <motion.div
                    className="w-6 h-0.5 rounded-lg bg-gray-600"
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'rgb(153, 153, 153)' : 'rgb(75, 85, 99)',
                      borderRadius: '10px',
                      marginBottom: '6px',
                    }}
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="w-6 h-0.5 rounded-lg bg-gray-600"
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'rgb(153, 153, 153)' : 'rgb(75, 85, 99)',
                      borderRadius: '10px',
                    }}
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden mt-2 rounded-xl backdrop-blur-[10px] border ${
                theme === 'dark' 
                  ? 'bg-gray-900/80 border-gray-700 shadow-lg shadow-gray-900/30' 
                  : 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/30'
              }`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 ${
                        isActive ? activeItemClass : inactiveItemClass
                      }`}
                    >
                      <item.icon className={`mr-3 h-6 w-6 transition-colors duration-300 ${
                        isActive ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-500') : ''
                      }`} />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
