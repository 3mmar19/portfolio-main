'use client';

import { Domine } from 'next/font/google';
import StarCursor from '@/components/StarCursor';
import './globals.css';
import Providers from './Providers';
import MainLayoutClient from '@/components/MainLayoutClient';

// Initialize fonts with Latin and Arabic subsets
const domine = Domine({ 
  subsets: ['latin'],
  variable: '--font-domine',
  weight: ['500', '600'], // Load weights used by headings and subheadings
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
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
        ${domine.variable}
        overflow-x-hidden
      `} suppressHydrationWarning>
        <Providers>
          <StarCursor />
          <MainLayoutClient>
            {children}
          </MainLayoutClient>
        </Providers>
      </body>
    </html>
  );
}