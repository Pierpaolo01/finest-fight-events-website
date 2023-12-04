import axios from "axios";
import { EventDTO } from "./DTO/EventDTO";
import { version } from "vue";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  hooks: {
    async "nitro:config"(nitroConfig) {
      const { data } = await axios.get(
        "https://finest-fight-events-cms-9b085a52c151.herokuapp.com/api/events?populate[events]"
      );

      const now = new Date().toISOString();
      const formattedData = EventDTO(data.value?.data ?? []);

      nitroConfig.prerender?.routes?.push(
        "/",
        ...formattedData
          .filter(({ date }) => date > now)
          .map((event: any) => `/upcoming/events/${event.id}`),
        ...formattedData
          .filter(({ date }) => date < now)
          .map((event: any) => `/past/events/${event.id}`)
      );
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxtjs/strapi"],
  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700, 800],
      Lora: [400, 500, 600, 700, 800],
    },
  },
  strapi: {
    url: process.env.STRAPI_URL,
    prefix: "/api",
    version: "v4",
  },
});
