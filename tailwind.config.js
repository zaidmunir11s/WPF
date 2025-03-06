/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#F3F2F7',
        gray100: '#010101',
        primary100: '#FFE74C',
        error100: '#990D35',
        gray60: '#E8E8E8'
      }
    },
  },
  plugins: [],
};
