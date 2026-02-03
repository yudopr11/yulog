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
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',
        },
        accent: {
          orange: '#f97316',
          success: '#22c55e',
          warning: '#f59e0b',
        }
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'data-flow': {
          '0%': { opacity: 0, transform: 'translateX(-10px)' },
          '50%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(10px)' }
        },
        'metric-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'slide-in-stagger': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'data-flow': 'data-flow 3s infinite',
        'metric-pulse': 'metric-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'slide-in-stagger': 'slide-in-stagger 0.5s ease-out forwards'
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      }
    },
  },
  plugins: [],
}