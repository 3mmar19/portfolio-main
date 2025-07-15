'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { trackProjectInteraction } from '@/utils/analytics';
import {
  MegaphoneIcon,
  ShoppingCartIcon,
  QrCodeIcon,
  TicketIcon,
  ChartBarIcon,
  RectangleStackIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from './SectionTitle';
import { FaExternalLinkAlt } from 'react-icons/fa';

/**
 * Projects Component
 * 
 * Showcases portfolio projects in an interactive grid layout.
 * Features:
 * - Animated project cards with hover effects
 * - Responsive grid layout
 * - Project filtering by category (if implemented)
 * - External links to GitHub and live demos
 * - Theme-aware styling and animations
 */
export default function Projects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side and first client render
  }

  /**
   * Get the appropriate icon component based on the icon type
   */
  const getProjectIcon = (iconType: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      'megaphone': MegaphoneIcon,
      'shopping-cart': ShoppingCartIcon,
      'menu': RectangleStackIcon,
      'qr-code': QrCodeIcon,
      'ticket': TicketIcon,
      'chart-bar': ChartBarIcon,
      'default': CommandLineIcon
    };

    return iconMap[iconType] || iconMap['default'];
  };

  // Project type definition
  type Project = {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    image: string;
    tags: string[];
    link: string;
    demo?: string;  // Optional demo link
    category: string;
    icon: string;
    isNew?: boolean;  // Flag to indicate if this is the latest project
  };

  // Project data configuration
  const projects: Project[] = [
    {
      title: 'Yalsaadi Accountants',
      titleAr: 'الصاعدي محاسبون ومستشارون',
      description: 'Professional accounting and consulting firm website offering integrated accounting, tax, and zakat services with a modern, responsive design and bilingual support.',
      descriptionAr: 'موقع شركة محاسبة واستشارات مهنية يقدم خدمات محاسبية وضريبية وزكوية متكاملة بتصميم عصري متجاوب وبدعم ثنائي اللغة.',
      image: '/projects/yalsaadi.png',
      tags: ['Astro js', 'Responsive', 'Bilingual', 'Modern UI'],
      link: 'https://yalsaadi.com/',
      category: 'Business Website',
      icon: 'building',
      isNew: true
    },
    {
      title: 'Alkian Transport',
      titleAr: 'وكالة الكيان للنقل',
      description: 'Transportation agency providing premium transfer services for Umrah and Hajj pilgrims at competitive prices. AlKian partners with top transport companies to ensure a smooth, safe, and economical journey to the holy sites, maintaining the highest standards of quality and safety.',
      descriptionAr: 'وكالة الكيان توفر خدمات نقل متميزة للمعتمرين والحجاج بأسعار تنافسية من خلال التعاقد مع أفضل شركات النقل. نجعل رحلتك إلى المشاعر المقدسة أكثر سلاسة واقتصادية مع ضمان أعلى معايير الجودة والسلامة.',
      image: '/projects/alkian.png',
      tags: ['Myfatoorah', 'PostgreSQL', 'Dashboard', 'Umrah', 'Hajj'],
      link: 'https://alkian.sa/',
      category: 'Transport Services',
      icon: 'megaphone'
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
      icon: 'shopping-cart'
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
      icon: 'menu'
    },{
      title: 'Interactive Restaurant Menu',
      titleAr: 'قائمة طعام تفاعلية',
      description: 'Digital menu system for restaurants with real-time updates, allergen info, and mobile optimization.',
      descriptionAr: 'نظام قائمة رقمية للمطاعم مع تحديثات فورية ومعلومات الحساسية وتحسين للجوال.',
      image: '/projects/pi-menu.jpg',
      tags: ['Next.js', 'QR Code', 'Dark Mode'],
      link: 'https://pi-menu.netlify.app/',
      category: 'Web App',
      icon: 'qr-code'
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
      icon: 'ticket'
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
      icon: 'chart-bar'
    },
  ];

  const borderColors = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-pink-500',
    'from-purple-500 to-blue-500',
    'from-teal-500 to-green-500',
    'from-pink-500 to-orange-500',
  ];

  const getBorderColor = (index: number) => borderColors[index % borderColors.length];

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    whileInView: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
  };

  // Desktop card component with conditional animations
  const DesktopCard = ({ project, index }: { project: Project, index: number }) => (
    <div className="only-desktop-animations">
      <motion.div
        className={`group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer
          p-[2px] md:hover:-translate-y-1 md:hover:shadow-xl`}
        variants={cardVariants}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
      >
        {/* Gradient Border */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getBorderColor(index)} opacity-75`} />

        {/* Card Content */}
        <div className={`relative h-full rounded-[10px] overflow-hidden
          ${theme === 'dark' 
            ? 'bg-gray-900/95 hover:bg-gray-800/95' 
            : 'bg-gray-100/95 hover:bg-gray-200/95'
          }`}
        >
          {/* View Project Icon */}
          <div className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 transform
            ${theme === 'dark'
              ? 'bg-gray-800/90 text-gray-400'
              : 'bg-gray-200/90 text-gray-600'
            } md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-110
            opacity-100`}>
            <FaExternalLinkAlt className="w-3 h-3" />
          </div>

          {/* Project Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              className="object-cover md:transition-transform md:duration-500 md:group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              priority={index < 4}
              loading={index >= 4 ? 'lazy' : undefined}
            />
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/90'
                : 'bg-gradient-to-b from-transparent via-gray-100/20 to-gray-100/90'
            }`} />
          </div>

          {/* Project Info */}
          <div className="relative p-4 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-2 py-0.5 text-xs rounded-full transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800/80 text-gray-300 border border-gray-700/80 group-hover:bg-gray-700/80'
                      : 'bg-gray-200/80 text-gray-700 border border-gray-300/80 group-hover:bg-gray-300/80'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className={`text-lg font-bold transition-all duration-300 line-clamp-1 ${
                theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'
              }`}>
                {project.title}
              </h3>

              <p className={`text-sm line-clamp-2 transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Mobile card component
  const MobileCard = ({ project, index }: { project: Project, index: number }) => {
    // Get project icon
    const ProjectIcon = getProjectIcon(project.icon);
    
    return (
      <div
        className={`relative overflow-hidden rounded-xl transition-all duration-500
          p-[2px] shadow-xl`}
      >
        {/* Gradient Border */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getBorderColor(index)} opacity-75`} />

        {/* Card Content */}
        <div className={`relative h-full rounded-[10px] overflow-hidden
          ${theme === 'dark' 
            ? 'bg-gray-900/95' 
            : 'bg-gray-100/95'
          }`}
        >
          <div className="flex flex-col gap-1 h-full p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {/* Latest Badge */}
                {project.isNew && (
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    theme === 'dark' 
                      ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' 
                      : 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                  }`}>
                    Latest
                  </div>
                )}
                
                {/* Project icon */}
                <div className={`p-2 rounded-xl
                  ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <ProjectIcon className={`w-5 h-5
                    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-[11px] tracking-wide font-medium ${
                    theme === 'dark' ? 'text-blue-400/80' : 'text-blue-500/80'
                  }`}>
                    ↗ Tap image to visit project
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video mt-4 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                className="object-cover"
                fill
                sizes="100vw"
                priority={index === 0}
                loading={index > 0 ? 'lazy' : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <Link 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0"
                onClick={() => trackProjectInteraction(project.title, 'click')}
              >
                <div className={`absolute top-3 right-3 p-2 rounded-full 
                  ${theme === 'dark' 
                    ? 'bg-gray-800/80 text-white' 
                    : 'bg-white/80 text-gray-900'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </div>
              </Link>
            </div>

            <div className="flex flex-col flex-1 mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
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
              
              <p className={`text-sm line-clamp-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 relative bg-transparent">
      <div className="container mx-auto px-4">
        {/* Desktop View */}
        <div className="hidden md:block">
          <SectionTitle 
            title="Projects"
            fromColor="from-purple-400"
            toColor="to-pink-400"
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
            {projects.map((project, index) => (
              <DesktopCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          <div className="mt-12">
            <ul className="list-none p-0">
              <li className="sticky top-0 pt-8">
                <div className={`pt-8`}>
            <SectionTitle 
              title="Projects"
              fromColor="from-purple-400"
              toColor="to-pink-400"
            />
                </div>
              </li>
              {[...projects].reverse().map((project, index) => (
                <li
                  key={project.title}
                  className="mb-2"
                  style={{
                    position: 'sticky',
                    top: `${index * 4 + 7}vh`,
                    height: 'auto',
                    minHeight: '60vh',
                    paddingTop: `${8 + index * 4}vh`,
                  }}
                >
                  <MobileCard project={project} index={index} />
                </li>
              ))}
              <li style={{ height: '30vh' }} aria-hidden="true" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}