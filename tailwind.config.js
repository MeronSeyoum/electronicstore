/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['pages/**/*.{js,jsx,ts,tsx}', 'components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
    colors: {
        primary: {
          DEFAULT: '#e3051b', // Primary color
          light: '#f15a61',   // Light shade of primary
          dark: '#a20414',    // Dark shade of primary
        },
        secondary: {
          DEFAULT: '#f0a500', // Secondary color (gold/yellow)
          light: '#f7c145',   // Light shade of secondary
          dark: '#a67300',    // Dark shade of secondary
        },
        accent: {
          DEFAULT: '#00b5e2', // Accent color (cyan)
          light: '#4fd0f0',   // Light shade of accent
          dark: '#007b9c',    // Dark shade of accent
        },
        neutral: {
          DEFAULT: '#333333', // Neutral dark
          light: '#eeeeee',   // Neutral light
          dark: '#1a1a1a',    // Neutral darkest
        },
      },
     
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
