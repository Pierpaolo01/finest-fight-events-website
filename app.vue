<template>
  <Navigation />
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
useSeoMeta({
  description:
    "Bij Finest Fight Events brengen we het beste van twee werelden samen: de opwindende wereld van vechtsport en de verfijnde kunst van het dineren.",
  ogTitle: "Finest Fight Events",
  ogDescription:
    "Bij Finest Fight Events brengen we het beste van twee werelden samen: de opwindende wereld van vechtsport en de verfijnde kunst van het dineren",
  ogImage: "/FFE_Logo-light.png",
  ogUrl: "https://finestfightevents.nl/",
  twitterTitle: "Finest Fight Events",
  twitterDescription:
    "Bij Finest Fight Events brengen we het beste van twee werelden samen: de opwindende wereld van vechtsport en de verfijnde kunst van het dineren.",
  twitterImage: "/SEO_logo.jpeg",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>

<style>
.link {
  @apply text-ffe-bg uppercase tracking-widest font-bold text-base;
}

html {
  scroll-behavior: smooth;
}
</style>
