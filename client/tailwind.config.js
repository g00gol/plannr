/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'color-primary': '#4182dc',
        'color-secondary': '#677DA2',
        'color-tertiary': '#37465F',
        'pink-primary': '#FF3366',
        'pink-secondary': '#A68BB3',
      }
    },
  },

  fontFamily: {
    sans: ["Inter", "sans-serif"],
  },
  plugins: [],
};
