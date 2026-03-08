/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1f3d',
          light: '#1a3260',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0bc5e',
        },
        cream: {
          DEFAULT: '#faf7f2',
          dark: '#f5f0e8',
        },
        brown: {
          DEFAULT: '#2C1810',
          mid: '#614E3A',
          light: '#8B7355',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
