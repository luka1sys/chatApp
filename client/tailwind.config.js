/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          DEFAULT: '#10b981',
          foreground: '#047857',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#141414',
          card: '#1a1a1a',
          border: '#262626',
          hover: '#1f1f1f',
          muted: '#404040',
        },
        message: {
          outgoing: {
            bg: '#065f46',
            text: '#d1fae5',
            border: '#047857',
          },
          incoming: {
            bg: '#1a1a1a',
            text: '#a7f3d0',
            border: '#262626',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(16, 185, 129, 0.15)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};