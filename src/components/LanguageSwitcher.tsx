'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useTranslation } from '../utils/i18n';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({ className = '', isMobile = false }: LanguageSwitcherProps) {
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguageContext();
  // Use translation hook for any text translations if needed
  const { t } = useTranslation();
  
  // Toggle between 'en' and 'ar'
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  // Render flag based on current language
  const renderFlag = () => {
    if (language === 'en') {
      // US Flag
      return (
        <img 
          src="/united-kingdom-uk-svgrepo-com.svg" 
          alt="United Kingdom Flag" 
          className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`} 
        />
      );
    } else {
      // Saudi Arabia Flag
      return (
        <img 
          src="/flag-for-saudi-arabia-svgrepo-com.svg" 
          alt="Saudi Arabia Flag" 
          className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`} 
        />
      );
    }
  };
  
  return (
    <motion.button
      onClick={toggleLanguage}
      className={`flex items-center justify-center transition-colors ${
        theme === 'dark'
          ? 'hover:bg-gray-700 rounded-full'
          : 'hover:bg-gray-100 rounded-full'
      } ${isMobile ? 'p-1.5 w-8 h-8' : 'p-2'} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'} language`}
    >
      {renderFlag()}
    </motion.button>
  );
}