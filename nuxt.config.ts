// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      stunUrl: "",
      turnUrl: "",
      turnUsername: "",
      turnPassword: "",
      projectId: "",
      projectLocation:"",
      storageBucketName: "",
    },
  },

  appConfig: {},

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@morev/vue-transitions/nuxt",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
