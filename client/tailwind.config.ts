import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0D1117',
          secondary: '#161B22',
        },
        text: {
          DEFAULT: '#F8FAFC',
          secondary: '#8B949E',
        },
        primary: '#10A37F',
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#22C55E',
        border: '#30363D',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
