# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure

```
portfolio-main/
├── public/                    # Static files
│   ├── projects/             # Project images
│   │   ├── alberwaz.jpg
│   │   ├── alkian.jpg
│   │   ├── coupons.jpg
│   │   ├── fittracker.jpg
│   │   ├── pi-menu.jpg
│   │   └── t-menu.jpg
│   ├── resume/               # Resume files
│   ├── file.svg             # Various SVG icons
│   ├── globe.svg
│   ├── grid.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/                      # Source code
│   ├── app/                  # Next.js app directory
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page component
│   │
│   ├── components/          # React components
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Education.tsx    # Education section
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Projects.tsx     # Projects section
│   │   └── SectionTitle.tsx # Reusable section title
│   │
│   ├── context/            # React context providers
│   └── hooks/              # Custom React hooks
│
└── README.md               # Project documentation
```

## Features

- Dark/Light mode support
- Fully responsive design
- Modern UI with Tailwind CSS
- Fast page loads with Next.js
- Smooth animations with Framer Motion
- Contact form with EmailJS
- Project showcase section
- Education and skills section
- About me section

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
