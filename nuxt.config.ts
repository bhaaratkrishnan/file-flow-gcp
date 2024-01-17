// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
  },
  devtools: { enabled: true },
  runtimeConfig: {
    googleFunctionPdfUrl: "",
    googleFunctionDocxUrl: "",
    projectId: "",
    projectLocation: "",
    storageBucketName: "",
    public: {
      stunUrl: "",
      turnUrl: "",
      turnUsername: "",
      turnPassword: "",
      peerServerUrl: "",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@morev/vue-transitions/nuxt",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  pwa: {
    manifest: {
      name: "FileFlow",
      short_name: "FileFlow",
      description:
        "FileFlow is a file transfer app that allows you to send files to your friends and family using Google Cloud",
      icons: [
        {
          sizes: "64x64",
          src: "icons/icon-64x64.png",
          type: "image/png",
        },
        {
          sizes: "144x144",
          src: "icons/icon-144x144.png",
          type: "image/png",
        },
        {
          sizes: "192x192",
          src: "icons/icon-192x192.png",
          type: "image/png",
        },
        {
          sizes: "512x512",
          src: "icons/icon-512x512.png",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
