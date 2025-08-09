'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language } from '../utils/i18n';

// Local storage key for language preference
const LANGUAGE_STORAGE_KEY = 'portfolio-language-preference';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

// Custom hook to use the language context
export const useLanguageContext = () => useContext(LanguageContext);

// Props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize with English or saved preference
  const [language, setLanguageState] = useState<Language>('en');

  // Load language preference on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Set language and save preference
  const setLanguage = (newLanguage: Language) => {
    console.log('Language changed to:', newLanguage);
    
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      document.documentElement.lang = newLanguage;
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
