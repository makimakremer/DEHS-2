import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Blue (Primary) - Professionell, vertrauenswürdig
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d8ff',
          300: '#a5bcff',
          400: '#8199ff',
          500: '#5d73ff',
          600: '#3d4ff5',
          700: '#2d3dd8',
          800: '#2532ae',
          900: '#1f2a89', // Deep Blue Hauptfarbe
          950: '#141a5a',
        },
        // Electric Blue (Accent) - Energie, Innovation
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee', // Electric Blue Hauptfarbe
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Teal (Secondary) - Modern, technisch
        secondary: {
          50: '#f0fdfc',
          100: '#ccfbf6',
          200: '#99f6e9',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Teal Hauptfarbe
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Neutral - Text, Hintergründe
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1f2a89 0%, #2d3dd8 100%)',
        'gradient-accent': 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1f2a89 0%, #2d3dd8 50%, #0d9488 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #1f2a89 0px, transparent 50%), radial-gradient(at 80% 0%, #22d3ee 0px, transparent 50%), radial-gradient(at 0% 50%, #14b8a6 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
