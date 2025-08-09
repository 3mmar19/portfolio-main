import { Domine } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import MainLayoutClient from '@/components/MainLayoutClient';

// Initialize fonts with Latin and Arabic subsets
const domine = Domine({ 
  subsets: ['latin'],
  variable: '--font-domine',
  weight: ['500', '600'], // Load weights used by headings and subheadings
});

/**
 * RootLayout Component
 * The main layout wrapper for the entire application.
 * Provides:
 * - Theme context
 * - Font configuration
 * - Meta tags
 * - Global styling
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* TODO: Migrate to Next.js Metadata API. Minimal head remains server-rendered. */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* Apply global styles and theme-specific classes */}
      <body className={`
        ${domine.variable} 
        overflow-x-hidden
      `} suppressHydrationWarning>
        <Providers>
          <MainLayoutClient>
            {children}
          </MainLayoutClient>
        </Providers>
      </body>
    </html>
  );
}