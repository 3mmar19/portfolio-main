'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon,
  AcademicCapIcon,
  RectangleStackIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

/**
 * Interface for navigation items
 * Defines the structure for each navigation link
 * including name, href, and associated icon
 */
interface NavItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

/**
 * Navigation items configuration
 * Defines the main navigation links and their properties
 * Each item includes a name, anchor link, and Heroicon component
 */
const navigation: NavItem[] = [
  { name: 'Home', href: '#home', icon: HomeIcon },
  { name: 'About', href: '#about', icon: UserIcon },
  { name: 'Education', href: '#education', icon: AcademicCapIcon },
  { name: 'Projects', href: '#projects', icon: RectangleStackIcon },
  { name: 'Contact', href: '#contact', icon: EnvelopeIcon },
];

/**
 * Reusable animation variants for theme toggle
 */
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

/**
 * Reusable style classes for navigation links
 */
const getThemeClasses = (theme: string) => ({
  active: theme === 'dark'
    ? 'text-white bg-blue-500/10 border border-blue-400/30'
    : 'text-gray-900 bg-blue-400/10 border border-blue-300/30',
  inactive: theme === 'dark'
    ? 'text-gray-300 hover:text-white hover:bg-gray-800/20 border border-transparent hover:border-gray-700/30'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/20 border border-transparent hover:border-gray-200/30',
  container: theme === 'dark'
    ? 'bg-gray-900/80 border-gray-700 shadow-lg shadow-gray-900/30'
    : 'bg-white/80 border-gray-200 shadow-lg shadow-gray-200/30'
});

/**
 * Interface for navigation link props
 */
interface NavLinkProps {
  item: NavItem;
  isMobile?: boolean;
  activeSection: string;
  onMobileClick?: () => void;
}

/**
 * Navigation link component
 */
const NavLink: React.FC<NavLinkProps> = ({ item, isMobile = false, activeSection, onMobileClick }) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const isActive = activeSection === item.href.substring(1);
  
  return (
    <a
      key={item.name}
      href={item.href}
      onClick={() => isMobile && onMobileClick?.()}
      className={`flex items-center ${isMobile ? 'px-3 py-2 text-base' : 'px-2.5 py-1.5 text-sm'} 
        font-medium rounded-lg transition-all duration-300 
        ${isActive ? themeClasses.active : themeClasses.inactive}`}
    >
      <item.icon className={`${isMobile ? 'mr-3 h-6 w-6' : 'mr-1 h-4 w-4'} 
        transition-colors duration-300 
        ${isActive ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-500') : ''}`} 
      />
      {item.name}
    </a>
  );
};

/**
 * Navbar component
 */
export default function Navbar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);

      const scrollPosition = window.scrollY + 100;
      const currentSection = navigation.find(({ href }) => {
        const element = document.getElementById(href.substring(1));
        return element && scrollPosition >= element.offsetTop && 
               scrollPosition < element.offsetTop + element.offsetHeight;
      });

      if (currentSection) {
        setActiveSection(currentSection.href.substring(1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeClasses = getThemeClasses(theme);
  const CIRCLE_RADIUS = 16;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 md:max-w-fit w-full">
        <div className={`relative backdrop-blur-[10px] border ${themeClasses.container} rounded-xl transition-all duration-300`}>
          <div className="flex items-center justify-between h-12 md:h-12 px-3">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navigation.map(item => (
                <NavLink 
                  key={item.name} 
                  item={item} 
                  activeSection={activeSection}
                />
              ))}
            </div>

            {/* Theme Toggle Desktop */}
            <div className="hidden md:flex md:items-center pl-2">
              <ThemeToggle />
            </div>

            {/* Mobile header */}
            <div className="flex items-center justify-between w-full md:hidden">
              <ThemeToggle isMobile />

              {/* Progress Ring with Logo */}
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle
                    className={`${theme === 'dark' ? 'text-gray-700' : 'text-gray-200'} 
                      transition-colors duration-200 group-hover:${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="transparent"
                    r={CIRCLE_RADIUS}
                    cx="20"
                    cy="20"
                  />
                  <circle
                    className="text-blue-500 transition-colors duration-200 group-hover:text-blue-400"
                    strokeWidth="2.5"
                    strokeDasharray={CIRCLE_CIRCUMFERENCE}
                    strokeDashoffset={CIRCLE_CIRCUMFERENCE - (CIRCLE_CIRCUMFERENCE * scrollProgress) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={CIRCLE_RADIUS}
                    cx="20"
                    cy="20"
                  />
                </svg>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <CodeBracketIcon className={`w-5 h-5 transition-colors duration-200 
                    ${theme === 'dark' ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-500'}`} 
                  />
                </motion.div>
              </motion.a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-8 h-8 focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  {[0, 1].map(index => (
                    <motion.div
                      key={index}
                      className="w-6 h-0.5 rounded-lg"
                      style={{ 
                        backgroundColor: theme === 'dark' ? 'rgb(153, 153, 153)' : 'rgb(75, 85, 99)',
                        marginBottom: index === 0 ? '6px' : '0'
                      }}
                      animate={{
                        rotate: isOpen ? (index === 0 ? 45 : -45) : 0,
                        y: isOpen ? (index === 0 ? 6 : -6) : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
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
              className={`md:hidden mt-2 rounded-xl backdrop-blur-[10px] border ${themeClasses.container} rounded-xl`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map(item => (
                  <NavLink 
                    key={item.name} 
                    item={item} 
                    isMobile 
                    activeSection={activeSection}
                    onMobileClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
