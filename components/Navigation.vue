<template>
  <nav :class="{ 'navbar--sticky': isSticky }" class="navbar">
    <Container class="navbar__content-tablet">
      <div class="space-x-4">
        <a href="https://www.onlinefightstore.nl/" target="_blank" rel="noopener noreferrer" class="link">
          online store
        </a>
        <NuxtLink to="#abouts" class="link"> about </NuxtLink>
      </div>
      <div class="self-center">
        <NuxtLink to="/">
          <img src="/FFE_Logo-dark.png" alt="fight & dine company logo" class="h-[60px] w-[108px]" />
        </NuxtLink>
      </div>

      <div class="space-x-4">
        <NuxtLink to="#lineup" class="link"> line ups </NuxtLink>
        <a :href="ticketLink" target="_blank">
          <Button type="primary" text="tickets" />
        </a>
      </div>
    </Container>
    <Container class="navbar__content-mobile">
      <NuxtLink to="/" class="self-center">
        <img src="/FFE_Logo-dark.png" alt="fight & dine company logo" class="h-[38px] tablet:h-[60px] tablet:w-[108px]" />
      </NuxtLink>

      <IconHamburger @click="mobileNavIsOpen = !mobileNavIsOpen" />
    </Container>
    <Container class="tablet:hidden space-y-4 flex flex-col bg-white pb-4" v-if="mobileNavIsOpen"
      @click="mobileNavIsOpen = false">
      <a href="https://www.onlinefightstore.nl/" target="_blank" rel="noopener noreferrer"
        class="link hover:bg-ffe-bg/10 p-4 -mx-4">
        online store
      </a>
      <NuxtLink to="/#abouts" class="link"> about </NuxtLink>
      <NuxtLink to="/#lineup" class="link hover:bg-ffe-bg/10 p-4 -mx-4">
        line up
      </NuxtLink>
      <a :href="ticketLink" target="_blank">
        <Button type="primary" text="tickets" class="w-full" />
      </a>
    </Container>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isSticky = ref(false);
const mobileNavIsOpen = ref(false);

function handleScroll() {
  isSticky.value = window.scrollY > 64;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const { findOne } = useStrapi();

const { data } = await useAsyncData("hero-section", () =>
  findOne<{ featured_event: any }>("hero-section", { populate: "*" })
);

const ticketLink = data?.value?.data?.attributes?.featured_event?.data?.attributes?.ticket_link;
</script>

<style scoped>
.navbar {
  @apply absolute top-0 w-full z-50 transition-colors duration-200;

  @screen laptop {
    @apply top-16 mx-auto px-8;
  }
}

.navbar--sticky {
  @apply fixed top-0 w-full bg-white;
}

.navbar__content-tablet {
  @apply hidden;

  @screen tablet {
    @apply flex w-full bg-white justify-between items-center h-[68px] mx-auto px-4;
  }

  @screen laptop {
    @apply rounded-md bg-white/80;
  }
}

.navbar__content-mobile {
  @apply flex w-full bg-white justify-between items-center h-[68px] mx-auto px-4;

  @screen tablet {
    @apply hidden;
  }
}

.navbar__item {
  padding: 1rem;
}
</style>
