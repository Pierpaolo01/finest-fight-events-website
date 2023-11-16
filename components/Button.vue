<template>
  <button
    class="py-2 px-3 rounded-md font-mont text-base text-white font-bold uppercase tracking-widest"
    :class="variant"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary", // 'primary' or 'secondary'
    },
    text: {
      type: String,
    },
  },
};
</script>

<style scoped>
.primary {
  @apply bg-ffe-red border border-ffe-red;
}

.secondary {
  @apply bg-white/10 border border-white;
}
</style>
