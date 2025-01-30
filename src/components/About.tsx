import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaDownload } from 'react-icons/fa6';
import React from 'react';

export default function About() {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const downloadIconVariants = {
    animate: { 
      y: [0, -4, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className={`text-3xl md:text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          About Me
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
              <h3 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                Computer Science Graduate & Full Stack Developer
              </h3>
              
              <div className="space-y-4">
                <motion.p 
                  className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                    backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/50'} 
                    border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  Hello! I&apos;m <span className="font-semibold text-blue-500">Ammar Bin Hussain</span>, 
                  a Computer Science graduate with First Class Honors from Umm Al-Qura University (UQU). 
                  I&apos;m passionate about solving real-world problems through web development and creating 
                  beautiful, functional websites that make a difference.
                </motion.p>

                <motion.p 
                  className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
                    backdrop-blur-sm rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/50'} 
                    border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  As a <span className="font-semibold text-blue-500">self-taught developer</span>, 
                  I&apos;ve honed my skills in modern web technologies through hands-on experience 
                  and continuous learning. Beyond coding, I maintain a balanced lifestyle with a 
                  strong interest in fitness and nutrition, embodying the philosophy of a 
                  <span className="font-semibold text-blue-500"> healthy mind in a healthy body</span>.
                </motion.p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
              <motion.a
                href="/resume/Ammar-Resume.pdf"
                download
                className={`group relative inline-flex items-center gap-2 px-6 py-3 ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-500 text-white'
                } rounded-lg text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  theme === 'dark'
                    ? 'from-blue-500/20 to-blue-400/20'
                    : 'from-blue-500 to-blue-400'
                } opacity-0 group-hover:opacity-100 transition-opacity rounded-lg`} />
                <motion.div
                  animate="animate"
                  variants={downloadIconVariants}
                  className="relative z-10"
                >
                  <FaDownload className="w-4 h-4" />
                </motion.div>
                <span className="relative z-10">View Resume</span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} shadow-lg 
              hover:shadow-xl transition-shadow duration-300 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className="font-bold mb-4 text-lg text-blue-500">Frontend</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>React & Next.js</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Framer</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} shadow-lg 
              hover:shadow-xl transition-shadow duration-300 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className="font-bold mb-4 text-lg text-blue-500">Backend</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Node.js</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Express</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>MongoDB</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>RESTful APIs</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} shadow-lg 
              hover:shadow-xl transition-shadow duration-300 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className="font-bold mb-4 text-lg text-blue-500">Education</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>B.Sc. Computer Science</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>First Class Honors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Umm Al-Qura University</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Self-taught Web Dev</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} shadow-lg 
              hover:shadow-xl transition-shadow duration-300 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className="font-bold mb-4 text-lg text-blue-500 text-center sm:text-left">Interests</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Web Development</span>
                </li>
                <li className="flex items-center space-x-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>UI/UX Design</span>
                </li>
                <li className="flex items-center space-x-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Fitness & Nutrition</span>
                </li>
                <li className="flex items-center space-x-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Continuous Learning</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
