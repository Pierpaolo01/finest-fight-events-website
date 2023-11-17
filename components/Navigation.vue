<template>
  <nav :class="{ 'navbar--sticky': isSticky }" class="navbar">
    <Container class="navbar__content-tablet">
      <div class="space-x-4">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          online store
        </a>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          events
        </a>
      </div>
      <div class="self-center">
        <img
          src="/fdg-logo.png"
          alt="fight & dine company logo"
          class="h-[60px] w-[108px]"
        />
      </div>

      <div class="space-x-4">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          line up
        </a>
        <Button type="primary" text="tickets" />
      </div>
    </Container>
    <Container class="navbar__content-mobile">
      <div class="self-center">
        <img
          src="/fdg-logo.png"
          alt="fight & dine company logo"
          class="h-[38px] tablet:h-[60px] tablet:w-[108px]"
        />
      </div>

      <IconHamburger @click="mobileNavIsOpen = !mobileNavIsOpen" />
    </Container>
    <Container
      class="space-y-4 flex flex-col bg-white pb-4"
      v-if="mobileNavIsOpen"
    >
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        class="link hover:bg-ffe-bg/10 p-4 -mx-4"
      >
        online store
      </a>
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        class="link hover:bg-ffe-bg/10 p-4 -mx-4"
      >
        events
      </a>
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        class="link hover:bg-ffe-bg/10 p-4 -mx-4"
      >
        line up
      </a>
      <Button type="primary" text="tickets" />
    </Container>
  </nav>
</template>

<script setup>
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
