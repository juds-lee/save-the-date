// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Welcome to Judy and Duncan's Wedding",
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

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
