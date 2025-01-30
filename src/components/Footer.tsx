import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaLinkedinIn, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/3mmar19', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/3mmar', icon: FaLinkedinIn },
    { name: 'Twitter', href: 'https://twitter.com/3mmar_dev', icon: FaTwitter },
  ];

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ammar Bin Hussain
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer
            </p>
          </div>
          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connect
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${
                    theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
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
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mx-1 text-red-500"
              >
                <FaHeart className="w-4 h-4" />
              </motion.span>
              Using Ai
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
