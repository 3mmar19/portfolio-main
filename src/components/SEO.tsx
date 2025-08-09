'use client';

import { useTranslation } from '../utils/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  twitterHandle?: string;
}

export default function SEO({
  title = "Ammar Bin Hussain | Frontend Developer & IT Support Specialist Portfolio",
  description,
  ogImage = "/images/og-image.png",
  twitterImage = "/images/og-image.png",
  canonicalUrl = "https://3mmar.info",
  twitterHandle = "@ammar_hussain"
}: SEOProps) {
  const { language } = useTranslation();
  
  // Default descriptions
  const defaultDescriptionEn = "Ammar Bin Hussain Portfolio - Frontend Developer & IT Support Specialist. Specialized in web development, technical support, custom PC building, data analysis, and digital marketing. Explore my projects and skills.";
  const defaultDescriptionAr = "معرض أعمال عمار بن حسين - مطور واجهات أمامية وأخصائي دعم تقني. متخصص في تطوير الويب، الدعم التقني، بناء أجهزة الكمبيوتر المخصصة، تحليل البيانات، والتسويق الرقمي. استكشف مشاريعي ومهاراتي.";
  
  // Set description based on language if not provided
  const finalDescription = description || (language === 'ar' ? defaultDescriptionAr : defaultDescriptionEn);
  
  // Keywords
  const keywordsEn = "Ammar Bin Hussain, Frontend Developer, IT Support Specialist, Technical Support, Web Development, Custom PC Building, Data Analysis, Digital Marketing, Saudi Arabia, Makkah, Portfolio, IT Services";
  const keywordsAr = "عمار بن حسين، مطور واجهات أمامية، أخصائي دعم تقني، الدعم الفني، تطوير الويب، بناء الكمبيوتر المخصص، تحليل البيانات، التسويق الرقمي، المملكة العربية السعودية، مكة المكرمة، معرض أعمال، خدمات تقنية المعلومات";
  
  return (
    <>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="en" href="https://3mmar.info" />
      <link rel="alternate" hrefLang="ar" href="https://3mmar.info/?lang=ar" />
      <link rel="alternate" hrefLang="x-default" href="https://3mmar.info" />

      {/* Text-based favicon */}
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>"
      />
      
      {/* Theme color for browser UI */}
      <meta name="theme-color" content="#1a1a1a" />
      
      {/* English Meta Tags */}
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={language === 'ar' ? keywordsAr : keywordsEn} />
      <meta name="author" content="Ammar Bin Hussain" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="language" content="English, Arabic" />
      
      {/* Arabic Meta Tags */}
      {language === 'ar' && (
        <>
          <meta name="description" lang="ar" content={defaultDescriptionAr} />
          <meta name="keywords" lang="ar" content={keywordsAr} />
        </>
      )}
      
      {/* Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ammar Bin Hussain",
            "url": "https://3mmar.info",
            "jobTitle": "IT Support Technician",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "knowsAbout": ["Technical Support", "Custom PC Building", "Data Analysis", "Digital Marketing"],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Makkah",
              "addressCountry": "Saudi Arabia"
            }
          }, null, 2)
        }}
      />
      
      {/* Open Graph Meta Tags for social media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Ammar Bin Hussain Portfolio" />
      <meta property="og:site_name" content="Ammar Bin Hussain Portfolio" />
      <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'ar' ? 'en_US' : 'ar_SA'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Ammar Bin Hussain Portfolio" />
      <meta name="twitter:creator" content={twitterHandle} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Mobile optimization */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      
      {/* Performance optimization - preconnect to domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
}
