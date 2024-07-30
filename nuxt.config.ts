// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    head: {
      bodyAttrs: {
        class: "min-h-screen",
      },
      htmlAttrs: {
        lang: "es-ES",
        class:
          "min-h-screen bg-gray-900 bg-gradient-to-b from-gray-900 to-black font-sans text-base text-slate-200",
      },
    },
  },

  devtools: { enabled: true },

  extends: ["node_modules/nuxt-content-assets/cache"],

  modules: [
    "nuxt-content-assets",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
  ],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2024-07-14",

  content: {
    defaultLocale: "es",
    locales: ["es"],
  },

  runtimeConfig: {
    includeDrafts: false,
  },
});
