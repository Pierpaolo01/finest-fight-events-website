<template>
  <nav :class="{ 'navbar--sticky': isSticky }" class="navbar">
    <Container class="navbar__content mx-auto px-4 rounded-md">
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
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isSticky = ref(false);

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
  @apply absolute top-16 mx-auto w-full z-10 transition-colors duration-200;
}

.navbar--sticky {
  @apply fixed top-0 w-full bg-white;
}

.navbar__content {
  @apply flex w-full bg-white/80 justify-between items-center h-[68px];
}

.navbar__item {
  padding: 1rem;
}
</style>
