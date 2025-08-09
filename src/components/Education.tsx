
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useTranslation } from '../utils/i18n';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import React from 'react';
import SectionTitle from './SectionTitle';

// Animation variants for container elements
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animation variants for individual timeline items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Education timeline data will be generated dynamically using translations

// Define education course type
interface Course {
  id: string;
  name: string;
}

// Define education data type
interface EducationData {
  degree: string;
  school: string;
  year: string;
  honors: string;
  description: string;
  courses: Course[];
}

export default function Education() {
  const { theme } = useTheme();
  const { language } = useLanguageContext();
  const { t } = useTranslation();
  
  // Force component to re-render when language changes
  const [key, setKey] = React.useState(language);
  
  // Create education data dynamically from translations
  const educationData: EducationData[] = [
    {
      degree: t('education.degree'),
      school: t('education.school'),
      year: t('education.year'),
      honors: t('education.honors'),
      description: t('education.description'),
      courses: [
        { id: 'dataStructures', name: t('education.courses.dataStructures') },
        { id: 'softwareEngineering', name: t('education.courses.softwareEngineering') },
        { id: 'webDevelopment', name: t('education.courses.webDevelopment') },
        { id: 'databaseSystems', name: t('education.courses.databaseSystems') },
        { id: 'computerNetworks', name: t('education.courses.computerNetworks') },
        { id: 'operatingSystems', name: t('education.courses.operatingSystems') }
      ]
    }
  ];

  // Theme-aware styling variables
  const cardBg = theme === 'dark' ? 'bg-gray-900/30 border-gray-700/50' : 'bg-white/80 border-gray-200/50';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textColorSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const iconBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100';
  const iconColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const honorsBg = theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-800 border-blue-200';
  const tagBg = theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700';

  // Re-create education data whenever language changes
  React.useEffect(() => {
    // This effect forces a re-render when language changes
    setKey(language);
  }, [language]);
  
  return (
    <section id="education" className={`py-20 relative`} key={`education-section-${key}`}>
      
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 -left-20 w-72 h-72 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100/50'} rounded-full blur-3xl`} />
        <div className={`absolute bottom-1/4 -right-20 w-72 h-72 ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100/50'} rounded-full blur-3xl`} />
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto px-4">
          {/* Section title */}
          <SectionTitle 
            title={t('education.title')} 
            fromColor="from-rose-400"
            toColor="to-amber-400"
          />

          {/* Timeline container */}
          <motion.div
            key={`education-content-${key}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            {/* Education timeline */}
            {educationData.map((edu) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className="group"
              >
                {/* Content card */}
                <div className={`backdrop-blur-sm ${cardBg} rounded-2xl border
                  transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2 p-8`}>
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mb-6
                      transition-colors duration-300`}>
                      <AcademicCapIcon className={`w-8 h-8 ${iconColor}`} />
                    </div>
                    
                    {/* Degree title */}
                    <h3 className={`text-2xl font-bold ${textColor} group-hover:text-blue-500 transition-colors duration-300 mb-2`}>
                      {edu.degree}
                    </h3>
                    
                    {/* School name */}
                    <p className={`text-lg ${textColorSecondary} mb-2`}>
                      {edu.school}
                    </p>
                    
                    {/* Year */}
                    <p className={`text-sm ${textColorSecondary} mb-4`}>
                      {edu.year}
                    </p>

                    {/* Honors */}
                    <div className={`px-4 py-2 rounded-full ${honorsBg} border mb-6`}>
                      <p className="font-medium">
                        {edu.honors}
                      </p>
                    </div>
                    
                    {/* Description */}
                    <p className={`${textColorSecondary} mb-8 max-w-lg`}>
                      {edu.description}
                    </p>

                    {/* Key courses */}
                    <div className="w-full">
                      <h4 className={`text-sm font-semibold ${textColor} mb-4`}>{t('education.keyCourses')}</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {edu.courses.map((course) => (
                          <span
                            key={course.id}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors duration-300 ${tagBg}`}
                          >
                            {course.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
