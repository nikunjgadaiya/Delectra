/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#131313',
          dim: '#131313',
          bright: '#393939',
          container: '#20201f',
        },
        primary: '#c6c6c6',
        secondary: '#ddb7ff', // Violet accent
        accent: '#8b5cf6', // More vibrant violet for some cases
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#cfc4c5',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        'xl': '3rem',
        'lg': '2rem',
      },
      spacing: {
        'gutter': '32px',
        'margin': '64px',
        'stack-lg': '80px',
        'stack-md': '32px',
        'stack-sm': '16px',
        'container-max': '1440px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
        'violet-gradient': 'linear-gradient(to right, #ffffff, #a78bfa)',
      }
    },
  },
  plugins: [],
}
