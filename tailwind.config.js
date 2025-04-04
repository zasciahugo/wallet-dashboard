/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        barlow: ['"Barlow Condensed"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

