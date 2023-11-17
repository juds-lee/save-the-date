// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro:{preset: 'firebase', firebase: { nodeVersion: "18", gen: 2 }},
  devtools: { enabled: true },
   modules: ['@formkit/nuxt'], 
  css: ['~/assets/css/main.css'], 
   postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},

    },
  },
  // formkit: {
  //   // Experimental support for auto loading (see note):
  //   autoImport: true
  // }

})