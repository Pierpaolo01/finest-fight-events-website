<template>
  <Section
    class="bg-ffe-bg"
    @mouseenter="isFocused = true"
    @mouseleave="isFocused = false"
  >
    <Container class="relative">
      <div class="flex overflow-x-auto no-scrollbar">
        <div
          v-for="video in props.data?.event_videos"
          :key="video.id"
          class="flex-shrink-0 w-full sm:w-1/3 scroll space-x-4"
          :class="{ 'pause-scrolling': isFocused }"
        >
          <div class="px-2">
            <img
              class="rounded-md"
              src="https://img.youtube.com/vi/6t4vahzzBoc/0.jpg"
              :alt="`Thumbnail for video ${video.id}`"
            />
            <span class="text-white">
              {{ video.title }}
            </span>
          </div>
        </div>
      </div>
      <button
        class="absolute top-0 right-6 tablet:12 bg-blue-500 text-white p-2 m-2 rounded"
        @click="showGrid = !showGrid"
      >
        sdfds
      </button>
    </Container>
  </Section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { SingleEventDTOType } from "~/DTO/EventDTO";

const props = defineProps({
  data: {
    type: Object as PropType<SingleEventDTOType>,
    required: true,
  },
});

console.log(props.data);

const getThumbnailUrl = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/0.jpg`;

const isFocused = ref(false);
const showGrid = ref(false);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.pause-scrolling {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused !important;
}

.scroll {
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (max-width: 640px) {
  .scroll {
    flex-direction: column;
  }
}
</style>
