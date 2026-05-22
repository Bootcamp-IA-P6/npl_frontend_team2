/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vibeDark: '#0a0a0c',     // El fondo negro profundo del layout
        vibeCard: '#16161a',     // El gris oscuro de la Sidebar y la tarjeta grande
        vibeInput: '#232329',    // El fondo del buscador/input
        vibePurple: '#7c3aed',   // El morado neón del botón principal
        vibeActive: '#2d1b4e',   // El fondo morado oscuro del botón seleccionado en la sidebar
      },
    },
  },
  plugins: [],
}