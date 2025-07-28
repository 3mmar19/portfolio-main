'use client';

import { useCallback } from 'react';
import { useLanguageContext } from '../context/LanguageContext';

// Import translation files
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

// Define available languages
export type Language = 'en' | 'ar';

// Define translation keys structure based on JSON structure
export type TranslationKeys = typeof enTranslations;

// Create a translations object with all available languages
const translations: Record<Language, TranslationKeys> = {
  en: enTranslations,
  ar: arTranslations
};

// Custom hook for translations
export function useTranslation() {
  // Use the global language context
  const { language, setLanguage } = useLanguageContext();

  // Translation function
  const t = useCallback(
    (key: string) => {
      const keys = key.split('.');
      let result: Record<string, any> = translations[language];
      
      for (const k of keys) {
        if (result && result[k] !== undefined) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      return String(result);
    },
    [language]
  );

  return { language, setLanguage, t };
}
