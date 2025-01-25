/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
     screens: {
      'sm': '450px',
      'rsvp-sm': '675px',
      // => @media (min-width: 640px) { ... }
      'md': '700px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      'xl': '1200px',
      // => @media (min-width: 1024px) { ... }
    },
     colors: {
      'bg':"#FDF6ED",
      'main': "#D69B43",
      'accent': "#411900"
     },
     fontFamily: {
      'greatvibes': ['greatvibes' ]
   }
  },
  plugins: [],
}