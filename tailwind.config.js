/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
        '4xl': '56rem',
      },
      maxHeight: {
        '[90vh]': '90vh',
      },
      zIndex: {
        '50': '50',
      },
      colors: {
        'white/10': 'rgba(255, 255, 255, 0.1)',
        'white/20': 'rgba(255, 255, 255, 0.2)',
        'black/50': 'rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'lg': '16px',
        'sm': '4px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(50px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-50px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}