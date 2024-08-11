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
        class: "min-h-screen bg-base-300",
      },
    },
  },

  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },

  devtools: { enabled: true },

  extends: ["node_modules/nuxt-content-assets/cache"],

  gtag: {
    id: "",
  },

  linkChecker: {
    report: {
      html: true,
      markdown: true,
    },
  },

  modules: [
    "nuxt-content-assets",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-gtag",
    "@nuxtjs/seo",
  ],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2024-07-14",

  content: {
    defaultLocale: "es",
    highlight: {
      langs: [
        "bash",
        "css",
        "diff",
        "html",
        "ini",
        "javascript",
        "json",
        "jsonc",
        "markdown",
        "php",
        "typescript",
        "vue",
        "yaml",
      ],
      theme: "dark-plus",
    },
    locales: ["es"],
  },

  css: ["@fortawesome/fontawesome-svg-core/styles.css"],

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ["/2015/07/</span"],
    },
  },

  runtimeConfig: {
    public: {
      includeDrafts: false,
      pageSize: 20,
    },
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  site: {
    url: "https://onlythepixel.com",
    name: "Only The Pixel",
    description: "Only The Pixel es el blog de Alberto Fernández",
    defaultLocale: "es",
  },

  typescript: {
    typeCheck: false,
  },
});
