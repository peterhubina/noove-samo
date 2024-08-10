/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Add your files for Tailwind to scan
  ],
  theme: {
    extend: {
      colors: {
        primary: '#25A3E0',
        footer: '#383B3E',
        'section-div': '#fafafa',
        'dashboard-active': '#E9F6FC',
      }
    },
  },
  plugins: [],
}

