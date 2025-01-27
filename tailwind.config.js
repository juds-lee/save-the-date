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
      'md': '700px',
      'lg': '1024px',
      'xl': '1200px',
    },
     colors: {
      'rsvp-cream':"#F6F0E7",
      'rsvp-green': "#768777",
      'main': "#2B2B2B",
     },
     fontFamily: {
      'plantagenet-cherokee': ['plantagenet-cherokee' ],
      'dm-sans': ['DMSans-Regular'],
   }
  },
  plugins: [],
}