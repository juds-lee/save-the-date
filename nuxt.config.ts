// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  nitro: { preset: "firebase", firebase: { nodeVersion: "18", gen: 2 } },
  modules: [
    "@formkit/nuxt",
    "@nuxtjs/cloudinary",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    [
      "@pinia/nuxt",
      {
        storesDirs: ["./stores/**", "./custom-folder/stores/**"],
      },
    ],
  ],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            handwritten: ["Homemade Apple", "cursive"],
          },
        },
      },
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
