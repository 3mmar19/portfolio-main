'use client';

import { Cormorant_Garamond, Domine, Harmattan, Tajawal } from 'next/font/google';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import StarCursor from '@/components/StarCursor';
import './globals.css';

// Initialize fonts with Latin and Arabic subsets
const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['600'], // Only load weight actually used
});

const domine = Domine({ 
  subsets: ['latin'],
  variable: '--font-domine',
  weight: ['500'], // Only load weight actually used
});

const harmattan = Harmattan({ 
  subsets: ['arabic'],
  variable: '--font-harmattan',
  weight: ['500'], // Only load weight actually used
});

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['400'], // Only load weight actually used
});

// Type definition for animated background particles
type Particle = {
  x: number;      // X position in viewport width (vw)
  y: number;      // Y position in viewport height (vh)
  size: number;   // Size of the particle
  speed: number;  // Animation speed
};

/**
 * MainLayout Component
 * Wraps the main content and provides:
 * - Animated background particles
 * - Theme-aware styling
 * - Responsive layout structure
 */
function MainLayout({ children }: { children: React.ReactNode }) {
  // State for managing particles and component mounting
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false); 
  const { theme } = useTheme();
  const pathname = usePathname();
  const [rocketAnimation, setRocketAnimation] = useState({ y: [-10, -100] });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setRocketAnimation({
      y: [-10, -(window.innerHeight * 0.5)]
    });
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize particles on component mount for non-mobile devices and if reduced motion is off
  useEffect(() => {
    setIsMounted(true);
    if (!isMobile && !reducedMotion) {
      // Reduced particle count from 50 to 15 for performance
      const newParticles = Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 15 + 10,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]); // No particles if reduced motion
    }
  }, [isMobile, reducedMotion]);

  // Show a simple container before component mounts
  if (!isMounted) {
    return (
      <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {children}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Only render background elements on non-mobile devices and if reduced motion is off */}
      {!isMobile && !reducedMotion && (
        <>
          {/* Dark gradient background overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 -z-10" />
          
          {/* Decorative background elements container */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Gradient Orbs */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(79,70,229,0.1) 50%, transparent 70%)',
                top: '10%',
                left: '60%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)',
                top: '60%',
                left: '20%',
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating Shapes */}
            <motion.div
              className="absolute z-10"
              style={{ top: '70%', left: '15%' }}
              animate={{ 
                y: [-10, -(window.innerHeight * 0.7)],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} rounded-xl backdrop-blur-sm flex items-center justify-center text-2xl border relative overflow-hidden group`}>
                <span className="relative z-10 text-2xl ">🚀</span>
              
                {/* Particle effects */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: '12px',
                    height: '2px'
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: i % 2 === 0 ? '#FFA500' : '#FF4500',
                        left: `${(i - 2.5) * 4}px`,
                        bottom: '0'
                      }}
                      animate={{
                        y: [0, 20],
                        x: [(i - 2.5) * 2, (i - 2.5) * 4],
                        opacity: [1, 0],
                        scale: [1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute w-16 h-16 border-2 border-purple-500/20 rounded-lg"
              style={{ top: '50%', left: '15%' }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
            <motion.div
              className="absolute w-20 h-20 border-2 border-blue-500/20"
              style={{ 
                top: '70%', 
                left: '80%',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
              animate={{
                rotate: -360,
                x: [0, 20, 0],
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* New Shapes */}
            {/* Hexagon */}
            <motion.div
              className="absolute w-24 h-24 border-2 border-emerald-500/20"
              style={{ 
                top: '20%', 
                left: '40%',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
              }}
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Triangle */}
            <motion.div
              className="absolute w-16 h-16 border-2 border-pink-500/20"
              style={{ 
                top: '75%', 
                left: '45%',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
              }}
              animate={{
                rotate: [-45, 0, 45, 0, -45],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Circle with inner ring */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border-4 border-cyan-500/20"
              style={{ 
                top: "40%", 
                right: "15%",
              }}
              animate={{
                scale: [1, 1.2, 1],
                borderWidth: ["4px", "2px", "4px"]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-cyan-400/20"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Dotted square */}
            <motion.div
              className="absolute w-32 h-32"
              style={{ 
                top: '85%', 
                left: '10%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.2) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
              animate={{
                rotate: [0, 90],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Cross */}
            <motion.div
              className="absolute w-16 h-16"
              style={{ 
                top: '15%', 
                right: '25%',
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute w-full h-2 bg-orange-500/20 top-1/2 -translate-y-1/2" />
              <div className="absolute h-full w-2 bg-orange-500/20 left-1/2 -translate-x-1/2" />
            </motion.div>
          </div>
        </>
      )}

      {/* Stars Background */}
      <AnimatePresence mode="wait">
        <div key={pathname} className="fixed inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}`}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                filter: 'blur(0.5px)',
              }}
              initial={{ 
                x: `${particle.x}vw`, 
                y: `${particle.y}vh`,
                opacity: 0 
              }}
              animate={{
                x: [
                  `${particle.x}vw`,
                  `${(particle.x + 5)}vw`,
                  `${particle.x}vw`,
                  `${(particle.x - 5)}vw`,
                  `${particle.x}vw`
                ],
                y: [
                  `${particle.y}vh`,
                  `${(particle.y - 5)}vh`,
                  `${particle.y}vh`,
                  `${(particle.y + 5)}vh`,
                  `${particle.y}vh`
                ],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: particle.speed,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </AnimatePresence>

      {children}
    </div>
  );
}

/**
 * RootLayout Component
 * The main layout wrapper for the entire application.
 * Provides:
 * - Theme context
 * - Font configuration
 * - Meta tags
 * - Global styling
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ammar Bin Hussain | IT Support Technician & Computer Science Graduate Portfolio</title>

        {/* Text-based favicon */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>"
        />
        
        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#1a1a1a" />
        
        <meta name="description" content="Ammar Bin Hussain Portfolio - IT Support Technician & Computer Science Graduate. Specialized in technical support, custom PC building, data analysis, and digital marketing. Explore my projects and skills." />
        <meta name="keywords" content="Ammar Bin Hussain, IT Support Technician, Computer Science Graduate, Technical Support, Custom PC Building, Data Analysis, Digital Marketing, Saudi Arabia, Makkah" />
        <meta name="author" content="Ammar Bin Hussain" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Meta Tags for social media */}
        <meta property="og:title" content="Ammar Bin Hussain | Portfolio" />
        <meta property="og:description" content="IT Support Technician & Computer Science Graduate. Specialized in technical support, custom PC building, data analysis, and digital marketing. Explore my projects and professional journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://3mmar.info" />
        <meta property="og:image" content="/images/og-image.png" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ammar Bin Hussain | Portfolio" />
        <meta name="twitter:description" content="IT Support Technician & Computer Science Graduate. Specialized in technical support, custom PC building, data analysis, and digital marketing." />
        <meta name="twitter:image" content="/images/og-image.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://3mmar.info" />
      </head>
      {/* Apply global styles and theme-specific classes */}
      <body className={`
        ${cormorantGaramond.variable} 
        ${domine.variable} 
        ${harmattan.variable} 
        ${tajawal.variable} 
        font-cormorant
        bg-gray-900 text-white overflow-x-hidden
      `} suppressHydrationWarning>
        <ThemeProvider>
          <StarCursor />
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}