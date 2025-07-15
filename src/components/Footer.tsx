import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
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

/**
 * Footer Component
 * 
 * A responsive footer section with social links and contact information.
 * Features:
 * - Animated social media links with hover effects
 * - Theme-aware styling
 * - Contact information with icons
 * - Analytics tracking for social clicks
 * - Dynamic copyright year
 */
const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

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
    <footer className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <motion.h3 
              className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              whileHover={{ x: 5 }}
            >
              About Me
            </motion.h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Frontend Developer with a passion for creating engaging web experiences
            </p>
            <div className={`flex items-center justify-center md:justify-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
              <span>Makkah, Saudi Arabia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <motion.h3 
              className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              whileHover={{ x: 5 }}
            >
              Let's Connect
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(social.name)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  } ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="text-center md:text-right">
            <motion.h3 
              className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              whileHover={{ x: -5 }}
            >
              Tech Stack
            </motion.h3>
            <div className={`flex flex-col gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <FaCode className="w-4 h-4 text-blue-500" />
                <span>React, Next.js, TypeScript</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <FaCoffee className="w-4 h-4 text-yellow-500" />
                <span>Node.js, Express, MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentYear} Ammar Bin Hussain. All rights reserved.
            </p>
            <motion.p 
              className={`text-sm mt-2 md:mt-0 flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
              whileHover={{ scale: 1.05 }}
            >
              Made with 
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
              Using 🤖
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
