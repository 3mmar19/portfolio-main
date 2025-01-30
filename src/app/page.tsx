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

export default function Home() {
  const { theme } = useTheme();

  const bgGradient = theme === 'dark' 
    ? 'from-gray-900 via-gray-800 to-gray-900' 
    : 'from-gray-50 via-white to-gray-50';

  return (
    <>
      <Navbar />
      <main className={`min-h-screen bg-gradient-to-b ${bgGradient}`}>
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
