export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss",  "@nuxtjs/google-fonts", "@nuxtjs/strapi"],
  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700, 800],
      Lora: [400, 500, 600, 700, 800],
    }
  },
  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '/api',
    version: 'v4',
  },
})
