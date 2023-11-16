<template>
  <div class="container responsive-padding">
    <slot></slot>
  </div>
</template>

<style>
.container {
  @apply w-full max-w-7xl mx-auto;
}

.responsive-padding {
  @apply px-6;

  @screen tablet {
    @apply px-12;
  }
}
</style>
