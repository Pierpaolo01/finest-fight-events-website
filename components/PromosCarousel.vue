<template>
  <div class="carousel-container">
    <div
      class="carousel-slide"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        class="carousel-item cursor-pointer relative"
        v-for="(item, index) in items"
        :key="index"
        @click="toggleMute(index)"
      >
        <div class="carousel-item__video">
          <video
            v-if="item?.mime === 'video'"
            :id="'video' + index"
            :ref="'video' + index"
            :src="item?.url"
            class="carousel-item__video-file"
            loop
            playsinline
            autoplay
            muted
          ></video>
          <img
            v-if="item?.mime === 'image'"
            :id="'video' + index"
            :src="item?.url"
            class="carousel-item__video-file"
          />
          <div
            class="rounded-full p-2 absolute bottom-4 right-4"
            v-if="item?.mime === 'video'"
          >
            <IconMute v-if="mutedStates[index]" />
            <IconUnMute v-if="!mutedStates[index]" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex justify-between items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full"
    >
      <button class="p-2 rounded-full" @click="prevItem">
        <IconChevron class="rotate-180 h-6" />
      </button>
      <div class="space-x-2">
        <button
          class="h-2 w-2 rounded-full"
          v-for="(_, index) in items"
          :key="index"
          :class="{
            'bg-white': currentIndex === index,
            'bg-gray-400': currentIndex !== index,
          }"
          @click="setCurrentIndex(index)"
        />
      </div>
      <button class="p-2 rounded-full" @click="nextItem">
        <IconChevron class="h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Media } from "~/DTO/MediaDTO";

const props = defineProps({
  items: {
    type: Array as PropType<Media[]>,
    default: () => [],
  },
});

const mutedStates = ref(props.items.map(() => true));

const toggleMute = (index: number) => {
  mutedStates.value[index] = !mutedStates.value[index];

  var video: any = document.getElementById("video" + index);
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
};

const currentIndex = ref(0);

const setCurrentIndex = (index: number) => {
  currentIndex.value = index;
};

watch(currentIndex, (_, previous) => {
  const prevVideo: any = document.getElementById("video" + previous);
  prevVideo.muted = true;
});

const nextItem = () => {
  mutedStates.value[currentIndex.value] = true;
  currentIndex.value = (currentIndex.value + 1) % (props.items ?? []).length;
};

const prevItem = () => {
  mutedStates.value[currentIndex.value] = true;

  currentIndex.value =
    (currentIndex.value - 1 + (props.items ?? []).length) %
    (props.items ?? []).length;
};
</script>

<style scoped lang="scss">
.carousel-container {
  @apply relative overflow-hidden pb-12 flex-1 h-fit;
}

.carousel-slide {
  @apply flex transition-transform duration-300 w-full;
}

.carousel-item {
  @apply min-w-full flex justify-evenly items-center w-full flex-shrink-0 border-b border-white/20;

  &__nickname {
    @apply font-bold tracking-widest uppercase text-xs;
  }

  &__name {
    @apply text-xl uppercase font-semibold;
  }

  &__video {
    @apply flex justify-center items-center w-full max-h-[500px];

    &-file {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: contain;
      object-position: center;
    }
  }

  .fighter {
    @apply w-fit max-h-48;

    @screen laptop {
      @apply hidden;
    }
  }
}
</style>
