// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    GOOGLE_APPLICATION_CREDENTIALS: "~/server/service_account.json",
    baseUrl: "localhost:3000",
  },
  appConfig: {
    baseUrl: "localhost:3000",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@morev/vue-transitions/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
