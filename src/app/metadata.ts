import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ammar | Portfolio',
  description: 'Frontend Developer & IT Support Specialist',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%23808080'>A</text></svg>",
        type: 'image/svg+xml',
      }
    ],
    shortcut: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%23808080'>A</text></svg>",
        type: 'image/svg+xml',
      }
    ],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
  ],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Ammar Bin Hussain | Portfolio',
    description: 'IT Support Technician & Computer Science Graduate. Specialized in technical support, custom PC building, data analysis, and digital marketing.',
    url: 'https://3mmar.info',
    siteName: 'Ammar Bin Hussain Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ammar Bin Hussain | Portfolio',
    description: 'IT Support Technician & Computer Science Graduate. Specialized in technical support, custom PC building, data analysis, and digital marketing.',
  },
}
