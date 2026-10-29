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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // primary blue
          700: '#1d4ed8', // dark primary blue
          800: '#1e40af', // rich navy
          900: '#1e3a8a',
          950: '#0f172a',
        },
        fresh: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 12px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 28px -4px rgba(37, 99, 235, 0.15)',
      }
    },
  },
  plugins: [],
}
