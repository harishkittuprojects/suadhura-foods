/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Deep Maroon palette (matches Sumadhura Caterers brand reference)
        blue: {
          50: '#FDF7F2',
          100: '#FBECE2',
          200: '#F5D5C4',
          300: '#EAB69C',
          400: '#D9896A',
          500: '#B83A2E',
          600: '#7D0A14', // Primary Royal Maroon
          700: '#680811', // Deep Maroon
          800: '#52060E', // Dark Burgundy Maroon
          900: '#3D040A', // Ultra Deep Wine Maroon
          950: '#260206',
        },
        brand: {
          50: '#FDF7F2',
          100: '#FBECE2',
          200: '#F5D5C4',
          300: '#EAB69C',
          400: '#D9896A',
          500: '#B83A2E',
          600: '#7D0A14',
          700: '#680811',
          800: '#52060E',
          900: '#3D040A',
          950: '#260206',
        },
        maroon: {
          50: '#FDF7F2',
          100: '#FBECE2',
          200: '#F5D5C4',
          300: '#EAB69C',
          400: '#D9896A',
          500: '#B83A2E',
          600: '#7D0A14',
          700: '#680811',
          800: '#52060E',
          900: '#3D040A',
          950: '#260206',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FEF9E7',
          200: '#FDF0C5',
          300: '#FCE49E',
          400: '#F8D166',
          500: '#F5A623', // Saffron Gold from reference
          600: '#D98207',
          700: '#B46205',
          800: '#8E4809',
          900: '#6B330B',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF5EC', // Primary Warm Ivory App Background from reference
          200: '#F5EFE3',
          300: '#ECE3D3',
          400: '#E2D5C0',
          500: '#CFC0A8',
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
        'soft': '0 4px 20px -2px rgba(125, 10, 20, 0.04)',
        'card': '0 2px 12px rgba(90, 8, 16, 0.06)',
        'card-hover': '0 12px 28px -4px rgba(125, 10, 20, 0.16)',
      }
    },
  },
  plugins: [],
}
