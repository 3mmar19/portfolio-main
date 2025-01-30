import { motion } from 'framer-motion';
import React from 'react';

interface SectionTitleProps {
  title: string;
  fromColor?: string;
  toColor?: string;
}

export default function SectionTitle({ 
  title, 
  fromColor = 'from-blue-400', 
  toColor = 'to-purple-400' 
}: SectionTitleProps) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center gap-4">
        {/* Left Line with Star */}
        <div className="flex items-center relative w-[240px]">
          <motion.div 
            className={`h-[1px] w-full bg-gradient-to-r ${fromColor} ${toColor} absolute right-0`}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -right-2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <div className="relative w-4 h-4 flex items-center justify-center" style={{ 
              filter: 'drop-shadow(0 0 2px rgb(96 165 250)) drop-shadow(0 0 6px rgba(147, 197, 253, 0.25))' 
            }}>
              <svg
                viewBox="0 0 24 24"
                className={`w-4 h-4 ${fromColor.replace('from-', 'text-')}`}
                fill="currentColor"
              >
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.h2 
          className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${fromColor} ${toColor} px-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h2>

        {/* Right Line with Star */}
        <div className="flex items-center relative w-[240px]">
          <motion.div 
            className={`h-[1px] w-full bg-gradient-to-l ${fromColor} ${toColor} absolute left-0`}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -left-2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <div className="relative w-4 h-4 flex items-center justify-center" style={{ 
              filter: 'drop-shadow(0 0 2px rgb(192 132 252)) drop-shadow(0 0 6px rgba(216, 180, 254, 0.25))' 
            }}>
              <svg
                viewBox="0 0 24 24"
                className={`w-4 h-4 ${toColor.replace('to-', 'text-')}`}
                fill="currentColor"
              >
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
