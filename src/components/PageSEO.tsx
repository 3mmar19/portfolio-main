'use client';

import { useTranslation } from '../utils/i18n';
import SEO from './SEO';

interface PageSEOProps {
  pageName: string;
  pageDescription?: {
    en: string;
    ar: string;
  };
  pageImage?: string;
}

/**
 * PageSEO Component
 * Extends the base SEO component with page-specific metadata
 * Use this component in individual page files to customize SEO for each page
 */
export default function PageSEO({ 
  pageName,
  pageDescription,
  pageImage = "/images/og-image.png"
}: PageSEOProps) {
  const { language } = useTranslation();
  
  // Generate page title with consistent format
  const title = `${pageName} | Ammar Bin Hussain Portfolio`;
  
  // Use page-specific description if provided, otherwise use default from SEO component
  const description = pageDescription ? 
    (language === 'ar' ? pageDescription.ar : pageDescription.en) : 
    undefined;
  
  return (
    <SEO 
      title={title}
      description={description}
      ogImage={pageImage}
      twitterImage={pageImage}
    />
  );
}
