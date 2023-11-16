export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss",  "@nuxtjs/google-fonts", "@nuxtjs/strapi"],
  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700, 800],
      Lora: [400, 500, 600, 700, 800],
    }
  },
})
