'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

function MainLayout({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 15 + 10,
    }));
    setParticles(newParticles);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 -z-10" />
      
      {/* Decorative Elements */}
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
          className="absolute w-16 h-16 border-2 border-purple-500/20 rounded-lg"
          style={{ top: '30%', left: '15%' }}
          animate={{
            rotate: 360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
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
            top: '40%', 
            right: '15%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            borderWidth: ['4px', '2px', '4px'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window === 'undefined') {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Full Stack Developer Portfolio" />
        </head>
        <body className={inter.className}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Full Stack Developer Portfolio" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white overflow-x-hidden`}>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
