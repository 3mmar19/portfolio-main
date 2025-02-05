'use client';

import { useState, useEffect } from 'react';

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      mediaQuery.addEventListener('change', handler);

      return () => {
        mediaQuery.removeEventListener('change', handler);
      };
    }
    return undefined;
  }, [query]);

  return matches;
}

// Utility functions for common breakpoint queries
export function useBreakpoint(breakpoint: Breakpoint, type: 'min' | 'max' = 'min'): boolean {
  const query = type === 'min' 
    ? `(min-width: ${breakpoints[breakpoint]})` 
    : `(max-width: ${breakpoints[breakpoint]})`;
  return useMediaQuery(query);
}

export function useMobile(): boolean {
  return useMediaQuery('(max-width: 639px)');
}

export function useTablet(): boolean {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

export function useDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

// Combine multiple queries
export function useMediaQueries(queries: string[]): boolean[] {
  const [matches, setMatches] = useState<boolean[]>(Array(queries.length).fill(false));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueries = queries.map(query => window.matchMedia(query));
    
    // Set initial values
    setMatches(mediaQueries.map(mq => mq.matches));

    const handlers = mediaQueries.map((mq, index) => {
      const handler = (e: MediaQueryListEvent) => {
        setMatches(prev => {
          const next = [...prev];
          next[index] = e.matches;
          return next;
        });
      };
      
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    });

    return () => {
      handlers.forEach(cleanup => cleanup());
    };
  }, [queries]);

  return matches;
}
