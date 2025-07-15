'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simpler star characters
const STAR_CHARACTERS = ['✦', '⋆'];

// Array of colors for both dark and light themes
const COLORS = [
  { light: 'text-blue-500', dark: 'text-blue-300', shadow: { light: '59,130,246', dark: '147,197,253' } },
  { light: 'text-purple-500', dark: 'text-purple-300', shadow: { light: '168,85,247', dark: '216,180,254' } },
  { light: 'text-pink-500', dark: 'text-pink-300', shadow: { light: '236,72,153', dark: '249,168,212' } },
  { light: 'text-emerald-500', dark: 'text-emerald-300', shadow: { light: '16,185,129', dark: '110,231,183' } },
  { light: 'text-yellow-500', dark: 'text-yellow-300', shadow: { light: '234,179,8', dark: '253,224,71' } }
];

const StarCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<{ id: number; x: number; y: number; char: string; size: number; colorIndex: number }[]>([]);
  const { theme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const createStars = () => {
        const newStars = Array.from({ length: 3 }, (_, i) => ({
          id: Date.now() + i,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          char: STAR_CHARACTERS[Math.floor(Math.random() * STAR_CHARACTERS.length)],
          size: Math.random() * 0.3 + 0.7,
          colorIndex: Math.floor(Math.random() * COLORS.length)
        }));

        setStars(prevStars => [...prevStars, ...newStars]);

        setTimeout(() => {
          setStars(prevStars => {
            if (prevStars.length > 12) {
              return prevStars.slice(-12);
            }
            return prevStars;
          });
        }, 1000);
      };

      createStars();
    };

    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttledMouseMove.lastCall || Date.now() - throttledMouseMove.lastCall > 50) {
        handleMouseMove(e);
        throttledMouseMove.lastCall = Date.now();
      }
    };
    throttledMouseMove.lastCall = 0;

    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {stars.map(star => {
          const colorSet = COLORS[star.colorIndex];
          const currentColor = theme === 'dark' ? colorSet.dark : colorSet.light;
          const currentShadow = theme === 'dark' ? colorSet.shadow.dark : colorSet.shadow.light;
          
          return (
            <motion.div
              key={star.id}
              initial={{ 
                opacity: 0.8, 
                scale: star.size,
                x: star.x,
                y: star.y,
                rotate: 0
              }}
              animate={{ 
                opacity: 0,
                scale: 0,
                x: star.x + (Math.random() - 0.5) * 80,
                y: star.y + (Math.random() - 0.5) * 80,
                rotate: Math.random() * 360
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1,
                ease: "easeOut",
                rotate: {
                  duration: 1,
                  ease: "linear"
                }
              }}
              className="absolute"
              style={{ 
                transform: `translate(-50%, -50%)`,
                willChange: 'transform'
              }}
            >
              <span 
                className={`text-xl ${currentColor}/70`}
                style={{
                  filter: `blur(${Math.random() * 0.2}px)`,
                  textShadow: `0 0 5px rgba(${currentShadow},0.5)`
                }}
              >
                {star.char}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default StarCursor;
