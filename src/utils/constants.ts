// Animation constants
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

export const ANIMATION_EASE = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'ammarhus.ahmed@gmail.com',
  phone: '+966535676369',
  whatsapp: '+966535676369',
  location: 'Makkah, Saudi Arabia',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/3mmar19',
  linkedin: 'https://linkedin.com/in/3mmar',
  twitter: 'https://twitter.com/3mmarHus',
} as const;

// Skills and technologies
export const TECHNOLOGIES = {
  languages: ['JavaScript', 'Python', 'HTML', 'CSS', 'SQL'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
  tools: ['VS Code', 'Git', 'MySQL', 'Power BI', 'Tableau'],
  systems: ['Windows OS', 'Linux OS', 'BIOS/UEFI'],
  support: ['TeamViewer', 'AnyDesk', 'Remote Desktop'],
  other: ['SEO', 'Google Analytics', 'Custom PC Building'],
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  LCP_GOOD: 2500, // Largest Contentful Paint
  FID_GOOD: 100,  // First Input Delay
  CLS_GOOD: 0.1,  // Cumulative Layout Shift
} as const;

// Form validation
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  message: {
    minLength: 10,
    maxLength: 1000,
  },
} as const;

// SEO constants
export const SEO_DEFAULTS = {
  title: 'Ammar Bin Hussain | Frontend Developer & IT Support Specialist',
  description: 'Professional portfolio showcasing IT support expertise, custom PC building, data analysis, and digital marketing skills.',
  keywords: [
    'IT Support Technician',
    'Computer Science Graduate',
    'Technical Support',
    'Custom PC Building',
    'Data Analysis',
    'Digital Marketing',
    'Saudi Arabia',
    'Makkah',
  ],
} as const;