import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://3mmar.info'),
  title: {
    template: '%s | Ammar Bin Hussain',
    default: 'Ammar Bin Hussain - Frontend Developer & Digital Marketing Specialist',
  },
  description: 'Computer Science Graduate specializing in Frontend Development, Data Analysis, and Digital Marketing. Explore my projects and skills.',
  keywords: [
    'Ammar Bin Hussain',
    'Frontend Developer',
    'Computer Science Graduate',
    'Web Development',
    'Data Analysis',
    'Digital Marketing',
    'Saudi Arabia',
    'Makkah',
  ],
  authors: [{ name: 'Ammar Bin Hussain' }],
  creator: 'Ammar Bin Hussain',
  publisher: 'Ammar Bin Hussain',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'G-017S6V3LRM',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
