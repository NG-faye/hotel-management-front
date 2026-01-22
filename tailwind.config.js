/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-dark': '#45484B', // Couleur pour les boutons gris anthracite
        'red-gold': '#F3C449', // Couleur pour les liens et textes dorés
      }
    },
  },
  plugins: [],
}