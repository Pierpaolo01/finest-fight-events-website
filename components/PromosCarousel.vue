<template>
    <div class="carousel-container">
        <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-item cursor-pointer" v-for="(item, index) in items" :key="index"
                @click="toggleMute(index)">
                <div class="carousel-item__video">
                    <video :id="'video' + index" :src="item?.url" class="carousel-item__video-file" loop playsinline
                        autoplay muted></video>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
            <button class="p-2 rounded-full" @click="prevItem">
                <IconChevron class="rotate-180 h-6" />
            </button>
            <div class="space-x-2">
                <button class="h-2 w-2 rounded-full" v-for="(_, index) in items" :key="index" :class="{
                    'bg-white': currentIndex === index,
                    'bg-gray-400': currentIndex !== index,
                }" @click="setCurrentIndex(index)" />
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

const toggleMute = (index: number) => {
    var video: any = document.getElementById('video' + index);
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
}

const currentIndex = ref(0);

const setCurrentIndex = (index: number) => {
    currentIndex.value = index;
};

watch(currentIndex, (_, previous) => {
    const prevVideo: any = document.getElementById('video' + previous);
    prevVideo.muted = true;
})


const nextItem = () => {
    currentIndex.value = (currentIndex.value + 1) % (props.items ?? []).length;
};

const prevItem = () => {
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
            width: 100%; // This will make the video take the full width of the container
            height: auto; // This will maintain the aspect ratio
            max-height: 500px; // Adjust this as needed
            object-fit: contain; // This ensures the video is scaled correctly to fit the container
            object-position: center; // This centers the video in the container
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
