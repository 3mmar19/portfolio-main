import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useTranslation } from '../utils/i18n';
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaHeart, 
  FaWhatsapp, 
  FaMapMarkerAlt,
  FaCode,
  FaCoffee
} from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import { trackSocialClick } from '@/utils/analytics';


// Custom hook for scroll animation
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly before the element comes into view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
};

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguageContext();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation();

  // Social media links configuration
  const socialLinks = [
    { 
      name: 'GitHub', 
      href: siteConfig.links.github, 
      icon: FaGithub,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    { 
      name: 'LinkedIn', 
      href: siteConfig.links.linkedin, 
      icon: FaLinkedinIn,
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      href: siteConfig.links.twitter, 
      icon: FaTwitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/+966535676369',
      icon: FaWhatsapp,
      color: 'hover:text-green-500'
    }
  ];

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform);
  };

  return (
    <footer 
      ref={footerRef}
      className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background gradient blobs for glass effect */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-32 -right-24 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-32 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={footerVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* About Section */}
          <motion.div 
            className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg shadow-lg border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
            whileHover={{ translateY: -5 }}
          >
            <motion.h3 
              className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              whileHover={{ x: 5 }}
            >
              {t('footer.aboutMe')}
            </motion.h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {t('footer.aboutDescription')}
            </p>
            <div className={`flex items-center justify-center md:justify-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
              <span>{t('footer.location')}</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg shadow-lg border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
            whileHover={{ translateY: -5 }}
          >
            <motion.h3 
              className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              whileHover={{ x: 5 }}
            >
              {t('footer.letsConnect')}
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700/80' : 'bg-gray-200/80'} backdrop-blur-sm shadow-lg border ${theme === 'dark' ? 'border-gray-600/30' : 'border-gray-300/30'} ${social.color}`}
                  onClick={() => handleSocialClick(social.name)}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg shadow-lg border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
            whileHover={{ translateY: -5 }}
          >
            <motion.h3 
              className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              whileHover={{ x: -5 }}
            >
              {t('footer.techStack')}
            </motion.h3>
            <div className={`flex flex-col gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-center justify-center gap-2">
                <FaCode className="w-4 h-4 text-blue-500" />
                <span>{t('footer.frontendTech')}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FaCoffee className="w-4 h-4 text-yellow-500" />
                <span>{t('footer.backendTech')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/40'} backdrop-blur-sm`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
            }
          }}
          initial="hidden"
          animate={footerVisible ? "visible" : "hidden"}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('footer.copyright')}
            </p>
            <motion.p 
              className={`text-sm mt-2 md:mt-0 flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
              whileHover={{ scale: 1.05 }}
            >
              {t('footer.madeWith')} 
              <motion.span
                className="mx-1 text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaHeart className="w-4 h-4 inline" />
              </motion.span>
              {t('footer.by')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
