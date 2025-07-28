import { PERFORMANCE_THRESHOLDS } from './constants';

// Web Vitals tracking
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Performance observer for Core Web Vitals
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Track LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        
        if (lastEntry) {
          const value = lastEntry.renderTime || lastEntry.loadTime || 0;
          reportWebVital('LCP', value);
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {
      console.warn('LCP observer failed:', error);
    }

    // Track FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & { processingStart?: number };
          if (fidEntry.processingStart) {
            const value = fidEntry.processingStart - entry.startTime;
            reportWebVital('FID', value);
          }
        });
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (error) {
      console.warn('FID observer failed:', error);
    }

    // Track CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            clsValue += clsEntry.value;
          }
        });
        reportWebVital('CLS', clsValue);
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.warn('CLS observer failed:', error);
    }
  }
}

// Declare gtag for TypeScript
declare function gtag(...args: any[]): void;

// Report web vital metrics
function reportWebVital(name: string, value: number) {
  const rating = getRating(name, value);
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${value.toFixed(2)}ms (${rating})`);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && 'gtag' in window) {
    gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(value),
      custom_parameter_1: rating,
    });
  }
}

// Get performance rating
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'LCP':
      return value <= PERFORMANCE_THRESHOLDS.LCP_GOOD ? 'good' : 
             value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= PERFORMANCE_THRESHOLDS.FID_GOOD ? 'good' : 
             value <= 300 ? 'needs-improvement' : 'poor';
    case 'CLS':
      return value <= PERFORMANCE_THRESHOLDS.CLS_GOOD ? 'good' : 
             value <= 0.25 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/cormorant-garamond.woff2',
    '/fonts/domine.woff2',
  ];

  fontPreloads.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const imagePreloads = [
    '/images/hero-bg.webp',
    '/images/profile.webp',
  ];

  imagePreloads.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

// Lazy load non-critical resources
export function lazyLoadResources() {
  if (typeof window === 'undefined') return;

  // Lazy load images with Intersection Observer
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;
  
  if (memory) {
    const memoryInfo = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };

    // Log memory usage in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Memory Usage:', {
        used: `${(memoryInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memoryInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memoryInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }

    return memoryInfo;
  }
}

// Bundle size analyzer (development only)
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== 'development') return;

  // This would integrate with webpack-bundle-analyzer
  console.log('Bundle analysis available in development mode');
}