import { onCLS, onFCP, onFID, onINP, onLCP, type Metric } from 'web-vitals';
import { siteConfig } from '@/config/site';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Safe gtag wrapper
const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  } else {
    console.debug('Google Analytics not initialized', ...args);
  }
};

// Analytics Events Categories
export const AnalyticsEventCategory = {
  NAVIGATION: 'navigation',
  INTERACTION: 'interaction',
  FORM: 'form',
  PROJECT: 'project',
  PERFORMANCE: 'performance',
  ERROR: 'error',
} as const;

// Analytics Events
export const AnalyticsEvent = {
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  CLICK: 'click',
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ERROR: 'form_error',
  PROJECT_VIEW: 'project_view',
  PROJECT_CLICK: 'project_click',
  DOWNLOAD: 'download',
  SOCIAL_CLICK: 'social_click',
  ERROR_OCCURRED: 'error_occurred',
} as const;

// Track Page Views
export const trackPageView = (url: string) => {
  gtag('event', AnalyticsEvent.PAGE_VIEW, {
    page_path: url,
    page_location: `${siteConfig.url}${url}`,
    page_title: document.title
  });
};

// Track Project Interactions
export const trackProjectInteraction = (projectTitle: string, action: 'view' | 'click') => {
  gtag('event', action === 'view' ? AnalyticsEvent.PROJECT_VIEW : AnalyticsEvent.PROJECT_CLICK, {
    event_category: AnalyticsEventCategory.PROJECT,
    event_label: projectTitle,
    page_location: window.location.href,
    host: siteConfig.url
  });
};

// Track Form Interactions
export const trackFormInteraction = (
  formName: string,
  action: 'start' | 'complete' | 'error',
  errorMessage?: string
) => {
  const event = {
    start: AnalyticsEvent.FORM_START,
    complete: AnalyticsEvent.FORM_COMPLETE,
    error: AnalyticsEvent.FORM_ERROR,
  }[action];

  gtag('event', event, {
    event_category: AnalyticsEventCategory.FORM,
    event_label: formName,
    error_message: errorMessage,
  });
};

// Track Social Media Clicks
export const trackSocialClick = (platform: string) => {
  gtag('event', AnalyticsEvent.SOCIAL_CLICK, {
    event_category: AnalyticsEventCategory.INTERACTION,
    event_label: platform,
  });
};

// Track Downloads
export const trackDownload = (fileName: string) => {
  gtag('event', AnalyticsEvent.DOWNLOAD, {
    event_category: AnalyticsEventCategory.INTERACTION,
    event_label: fileName,
  });
};

// Track Scroll Depth
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const scrollDepths = [25, 50, 75, 90];
  let trackedDepths: number[] = [];

  const calculateScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = (scrollTop / documentHeight) * 100;

    scrollDepths.forEach((depth) => {
      if (scrollPercentage >= depth && !trackedDepths.includes(depth)) {
        trackedDepths.push(depth);
        gtag('event', AnalyticsEvent.SCROLL_DEPTH, {
          event_category: AnalyticsEventCategory.INTERACTION,
          event_label: `Scrolled ${depth}%`,
          value: depth,
        });
      }
    });
  };

  window.addEventListener('scroll', calculateScrollDepth);
};

// Track Web Vitals
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  onCLS((metric) => trackVitals(metric));
  onLCP((metric) => trackVitals(metric));
  onFID((metric) => trackVitals(metric));
  onINP((metric) => trackVitals(metric));
  onFCP((metric) => trackVitals(metric));
};

const trackVitals = (metric: Metric) => {
  gtag('event', metric.name, {
    event_category: AnalyticsEventCategory.PERFORMANCE,
    value: Math.round(metric.value * 100) / 100,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
  });
};

// Track Errors
export const trackError = (error: Error, componentName: string) => {
  gtag('event', AnalyticsEvent.ERROR_OCCURRED, {
    event_category: AnalyticsEventCategory.ERROR,
    event_label: componentName,
    error_name: error.name,
    error_message: error.message,
    error_stack: error.stack,
  });
};
