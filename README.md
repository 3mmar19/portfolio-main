# Personal Portfolio

This is a modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. The portfolio showcases personal projects, skills, education, and provides a contact form.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [License](#license)

## Features
- Responsive design that works on all devices
- Dark/Light theme toggle
- Interactive UI with animations using Framer Motion
- Contact form with EmailJS integration
- Project showcase section
- About and Education sections
- SEO optimized

## Project Structure
```
portfolio-main/
├── .next/                  # Next.js build output
├── node_modules/           # Project dependencies
├── public/                 # Static assets
│   ├── images/             # Image assets
│   ├── projects/           # Project-related assets
│   ├── resume/             # Resume files
│   └── *.svg               # SVG assets
├── src/                    # Source code
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global CSS
│   │   ├── layout.tsx      # Root layout component
│   │   ├── metadata.ts     # SEO metadata
│   │   └── page.tsx        # Home page component
│   ├── components/         # React components
│   │   ├── About.tsx       # About section
│   │   ├── Contact.tsx     # Contact form section
│   │   ├── Education.tsx   # Education section
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Hero.tsx        # Hero/landing section
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Projects.tsx    # Projects showcase
│   │   ├── SectionTitle.tsx # Section title component
│   │   └── StarCursor.tsx  # Custom cursor effect
│   ├── config/             # Configuration files
│   │   └── site.ts         # Site configuration
│   ├── context/            # React context
│   │   └── ThemeContext.tsx # Theme context for dark/light mode
│   ├── hooks/              # Custom React hooks
│   │   ├── useMediaQuery.ts # Media query hook
│   │   └── useScrollAnimation.ts # Scroll animation hook
│   ├── pages/              # Next.js Pages Router (legacy)
│   │   ├── _app.tsx        # Custom App component
│   │   └── _document.tsx   # Custom Document component
│   ├── styles/             # Additional styles
│   │   └── animations.css  # CSS animations
│   └── utils/              # Utility functions
│       └── analytics.ts    # Analytics utilities
├── .env.local              # Environment variables
├── .gitignore              # Git ignore file
├── eslint.config.mjs       # ESLint configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

## Technologies Used
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling**: EmailJS
- **Icons**: React Icons, Heroicons
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-main.git
   cd portfolio-main
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with necessary environment variables (if needed for EmailJS, etc.)

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

This project can be deployed to Vercel or Netlify:

### Vercel
```bash
npm run build
# or
vercel
```

### Netlify
```bash
npm run build
# or
netlify deploy
```

## Performance Optimization

The following performance issues have been identified through Lighthouse Chrome testing and should be addressed to improve site speed and user experience:

### Lighthouse Performance Metrics
- **Largest Contentful Paint (LCP)**: Currently at 5,050 ms (should be under 2,500 ms for good user experience)
- **Enormous Network Payload**: Total size is 5,400 KiB (aim to keep under 1,600 KiB)
- **Unused JavaScript**: Potential savings of 884 KiB

### Image Optimizations (Lighthouse Recommendations)
- **Next-gen Formats**: Convert images to WebP or AVIF formats (potential savings of 437 KiB)
- **Defer Offscreen Images**: Implement lazy loading (potential savings of 631 KiB)
- **Efficient Encoding**: Optimize image compression (potential savings of 185 KiB)

### Code Optimizations (Lighthouse Recommendations)
- **Minify JavaScript**: Potential savings of 57 KiB
- **Minify CSS**: Potential savings of 2 KiB
- **Modern JavaScript**: Avoid serving legacy JavaScript to modern browsers
- **Back/Forward Cache**: Fix issues preventing back/forward cache restoration (4 failure reasons identified)

### Recommended Actions
1. Use Next.js Image component (`next/image`) for automatic image optimization
2. Implement lazy loading for below-the-fold images
3. Configure proper caching headers
4. Use code splitting and dynamic imports for JavaScript
5. Enable compression in your hosting environment
6. Run regular Lighthouse tests during development to track improvements

## License
ISC