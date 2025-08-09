'use client';

import { useTheme } from '../context/ThemeContext';
import React from "react";
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import PageSEO from '@/components/PageSEO';

export default function Home() {

  const { theme } = useTheme();

  const bgGradient = theme === 'dark' 
    ? 'from-gray-900 via-gray-800 to-gray-900' 
    : 'from-gray-50 via-white to-gray-50';

  return (
    <>
      <PageSEO 
        pageName="Home"
        pageDescription={{
          en: "Ammar Bin Hussain - Frontend Developer & IT Support Specialist. Explore my portfolio featuring web development, technical support, custom PC building, data analysis, and digital marketing projects.",
          ar: "عمار بن حسين - مطور واجهات أمامية وأخصائي دعم تقني. استكشف معرض أعمالي الذي يضم مشاريع في تطوير الويب، الدعم التقني، تجميع وبناء PC، تحليل البيانات، والتسويق الرقمي."
        }}
      />
      <main className={`min-h-screen bg-gradient-to-b ${bgGradient}`}>
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
