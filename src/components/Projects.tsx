'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'AlKian Agency',
    titleAr: 'وكالة الكيان للدعاية والإعلان',
    description: 'Professional marketing agency website built with Framer platform, featuring modern animations, service showcase, and integrated contact forms.',
    descriptionAr: 'موقع وكالة تسويق احترافي تم بناؤه باستخدام منصة Framer، يتميز بالرسوم المتحركة الحديثة وعرض الخدمات ونماذج التواصل.',
    image: '/projects/alkian.jpg',
    tags: ['Framer', 'Animations', 'SEO', 'Responsive'],
    link: 'https://alkian.sa/',
    category: 'Landing Page',
  },
  {
    title: 'Al-Berwaz IPTV',
    titleAr: 'متجر البرواز لإشتراكات IPTV',
    description: 'IPTV subscription store with Stripe payment integration, secure checkout, package management, and WhatsApp support.',
    descriptionAr: 'متجر اشتراكات IPTV مع دمج مدفوعات Stripe، وعملية دفع آمنة، وإدارة الباقات، ودعم عبر الواتساب.',
    image: '/projects/alberwaz.jpg',
    tags: ['React', 'Stripe', 'WhatsApp API'],
    link: 'https://al-berwaz.com/',
    category: 'E-commerce',
  },
  {
    title: 'Interactive Cafe Menu',
    titleAr: 'قائمة طعام تفاعلية',
    description: 'Digital menu system for restaurants with real-time updates, allergen info, and mobile optimization.',
    descriptionAr: 'نظام قائمة رقمية للمطاعم مع تحديثات فورية ومعلومات الحساسية وتحسين للجوال.',
    image: '/projects/t-menu.jpg',
    tags: ['Next.js', 'PWA', 'Dark Mode'],
    link: 'https://t-menu.netlify.app/',
    category: 'Web App',
  },{
    title: 'Interactive Restaurant Menu',
    titleAr: 'قائمة طعام تفاعلية',
    description: 'Digital menu system for restaurants with real-time updates, allergen info, and mobile optimization.',
    descriptionAr: 'نظام قائمة رقمية للمطاعم مع تحديثات فورية ومعلومات الحساسية وتحسين للجوال.',
    image: '/projects/pi-menu.jpg',
    tags: ['Next.js', 'QR Code', 'Dark Mode'],
    link: 'https://pi-menu.netlify.app/',
    category: 'Web App',
  },
  {
    title: 'Coupon Palace',
    titleAr: 'قصر الكوبونات',
    description: 'Coupon aggregator platform featuring exclusive deals and direct store links.',
    descriptionAr: 'منصة تجميع كوبونات تعرض صفقات حصرية وروابط مباشرة للمتاجر.',
    image: '/projects/coupons.jpg',
    tags: ['React','API Integration', 'RTL'],
    link: 'https://coupon-palace.netlify.app/',
    category: 'Web App',
  },
  {
    title: 'FitTrackerPro',
    titleAr: 'تطبيق تتبع اللياقة',
    description: 'Comprehensive fitness tracking platform with analytics, goal setting, and cloud sync.',
    descriptionAr: 'منصة شاملة لتتبع اللياقة البدنية مع تحليلات وتحديد أهداف ومزامنة سحابية.',
    image: '/projects/fittracker.jpg',
    tags: ['React', 'Firebase', 'Auth', 'Analytics'],
    link: 'https://fit-trackerpro.netlify.app/',
    category: 'Web App',
  },
];

const getBorderColor = (index: number) => {
  const colors = [
    'border-blue-500/50 hover:border-blue-500',
    'border-purple-500/50 hover:border-purple-500',
    'border-emerald-500/50 hover:border-emerald-500',
    'border-pink-500/50 hover:border-pink-500',
    'border-amber-500/50 hover:border-amber-500',
    'border-teal-500/50 hover:border-teal-500'
  ];
  return colors[index % colors.length];
};

export default function Projects() {
  const { theme } = useTheme();

  // Desktop card component
  const DesktopCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-xl border-2 
        ${getBorderColor(index)}
        ${theme === 'dark' 
          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
          : 'bg-white hover:bg-gray-50'
        } shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
    >
      <Link href={project.link} target="_blank" rel="noopener noreferrer">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            theme === 'dark'
              ? 'from-gray-900 via-gray-900/40'
              : 'from-black/60 via-black/20'
          } to-transparent`}>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-white/90 text-gray-900'
                }`}>
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-200 line-clamp-2 mb-2">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 group-hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={`absolute top-3 right-3 p-2 rounded-full 
          ${theme === 'dark' 
            ? 'bg-gray-800/80 text-white' 
            : 'bg-white/80 text-gray-900'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  );

  // Mobile card component
  const MobileCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <div
      className={`h-full rounded-2xl shadow-xl p-6 md:p-8 flex flex-col border-2
                 transition-all duration-500 transform hover:scale-[1.02] 
                 overflow-hidden backdrop-blur-sm
                 ${getBorderColor(index)}
                 ${theme === 'dark' 
                   ? 'bg-gray-800/90' 
                   : 'bg-white/90'
                 }`}
    >
      <div className="flex flex-col gap-6 h-full">
        <div className="w-full relative rounded-xl overflow-hidden aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {project.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs ${
              theme === 'dark' 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-200 text-gray-700'
            }`}>
              {project.category}
            </span>
          </div>
          
          <p className={`text-base mb-6 line-clamp-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              href={project.link}
              target="_blank"
              className={`w-full px-4 py-2 rounded-full text-sm font-medium text-center 
                       transition-all duration-300 ${
                         theme === 'dark'
                           ? 'bg-blue-500 text-white hover:bg-blue-600'
                           : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                       }`}
            >
              Visit Project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Projects" 
          fromColor="from-purple-400"
          toColor="to-pink-400"
        />

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <DesktopCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden mt-12">
          <ul className="list-none p-0">
            {[...projects].reverse().map((project, index) => (
              <li
                key={project.title}
                className="mb-8"
                style={{
                  position: 'sticky',
                  top: `${index * 4}vh`,
                  height: 'auto',
                  minHeight: '60vh',
                  paddingTop: `${index * 4}vh`,
                }}
              >
                <MobileCard project={project} index={index} />
              </li>
            ))}
            <li style={{ height: '30vh' }} aria-hidden="true" />
          </ul>
        </div>
      </div>
    </section>
  );
}