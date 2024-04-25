// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  nitro: { preset: 'firebase', firebase: { nodeVersion: "18", gen: 2 } },
  devtools: { enabled: true },
  modules: ['@formkit/nuxt'],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},

    },
  },
})
