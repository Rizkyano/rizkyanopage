/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: '#C0FE04',
        l1: '#ffffff',
        l2: '#888888',
        l3: '#333333',
        dark: {
          bg: '#000000',
          surface: '#0d0d0d',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        light: {
          bg: '#f7f7f7',
          surface: '#ffffff',
          border: 'rgba(0, 0, 0, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        'mono-2': ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.06em',
        tight: '-0.03em',
        widest: '0.15em',
      }
    },
  },
  plugins: [],
}
