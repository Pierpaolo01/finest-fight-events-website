<template>
  <div class="masonry-grid">
    <div
      class="masonry-grid-item"
      v-for="(item, index) in gridDisplayItems"
      :key="item?.id"
      ref="gridItems"
    >
      <template v-if="isImage(item)">
        <img :src="item?.url" :alt="`Image ${index}`" />
      </template>
      <template v-else-if="isVideo(item)">
        <video :src="item?.url" controls></video>
      </template>
    </div>
  </div>
  <div class="w-full flex justify-center items-center" v-if="items?.length > 6">
    <div class="border-b h-1 w-full" />
    <Button
      variant="secondary"
      :text="showMore ? 'toon minder' : 'toon meer'"
      class="flex-shrink-0"
      @click="showMore = !showMore"
    />
    <div class="border-b h-1 w-full" />
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

const showMore = ref(false);

const gridDisplayItems = computed(() => {
  return showMore.value ? props.items : props.items?.slice(0, 6);
});

const isImage = (item: Media) => {
  return item?.mime === "image";
};

const isVideo = (item: Media) => {
  return item?.mime === "video";
};

const gridItems = ref([]);

const initObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("masonry-grid-item--visible");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.8,
    }
  );

  gridItems.value.forEach((item) => {
    observer.observe(item);
  });
};

onMounted(initObserver);

watch(gridDisplayItems, () => {
  nextTick(() => {
    initObserver();
  });
});
</script>

<style scoped>
.masonry-grid {
  @apply gap-4;
  column-count: 1;

  @screen mobile {
    column-count: 2;
  }

  @screen laptop {
    column-count: 3;
  }
}

.masonry-grid-item {
  @apply mb-4;
  break-inside: avoid;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.masonry-grid-item--visible {
  opacity: 1;
  transform: translateY(0);
}

.masonry-grid-item img,
.masonry-grid-item video {
  @apply block w-full h-auto;
}
</style>
