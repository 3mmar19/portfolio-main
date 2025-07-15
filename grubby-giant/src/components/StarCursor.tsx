import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface StarCursorProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function StarCursor({ size = 20, color = '#fff', style, ...props }: StarCursorProps) {
  const [cursorVisible, setCursorVisible] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  if (!cursorVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      style={{
        x,
        y,
        width: size,
        height: size,
        background: color,
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        ...style,
      }}
      {...props}
    />
  );
}

export default StarCursor;
