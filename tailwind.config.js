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
      'sm': '400px',
      'rsvp-sm': '500px',
      'md': '750px',
      'rsvp-lg': '1050px',
      'lg': '1024px',
      'xl': '1300px',
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