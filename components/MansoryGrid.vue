<template>
  <div class="masonry-grid">
    <div class="masonry-grid-item" v-for="(item, index) in items" :key="index">
      <template v-if="isImage(item)">
        <img :src="item?.url" :alt="`Image ${index}`" />
      </template>
      <template v-else-if="isVideo(item)">
        <video :src="item?.url" controls></video>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Media } from "~/DTO/MediaDTO";

const props = defineProps({
  items: {
    type: Array as PropType<Media[]>,
    required: true,
  },
});

const isImage = (item: Media) => {
  return item?.mime === "image";
};

const isVideo = (item: Media) => {
  return item?.mime === "video";
};
</script>

<style scoped>
.masonry-grid {
  @apply gap-4;
  column-count: 3;
}

.masonry-grid-item {
  @apply mb-4;
  break-inside: avoid;
}

.masonry-grid-item img,
.masonry-grid-item video {
  @apply block w-full h-auto;
}
</style>
