/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'] // Add the custom font with a fallback
      }
    },
  },
  plugins: [
    require('daisyui'),
    
  ],
}