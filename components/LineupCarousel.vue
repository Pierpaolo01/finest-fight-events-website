<template>
    <div class="carousel-container">
        <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-item" v-for="(item, index) in items" :key="index">
                <div class="flex flex-col justify-between h-full flex-1">
                    <div>
                        <h4 class="carousel-item__name">
                            {{ item?.fighterAName }}
                        </h4>
                        <span class="carousel-item__nickname h-[24px]">
                            {{ item?.fighterANickname }}
                        </span>
                    </div>
                    <img :src="item?.fighterACover?.url" class="fighter float-left" draggable="false" alt="Carousel Item" />
                </div>
                <div class="carousel-item__images">
                    <img :src="item?.fighterACover?.url" class="carousel-item__images-fighter" draggable="false"
                        alt="Carousel Item" />
                    <img src="/ffe-versus.png" class="w-full h-auto self-start max-w-[80px] mx-auto" draggable="false"
                        alt="Carousel Item" />
                    <img :src="item?.fighterBCover?.url" class="carousel-item__images-fighter" draggable="false"
                        alt="Carousel Item" />
                </div>
                <div class="text-right flex-1 flex flex-col justify-between h-full">
                    <div>
                        <h4 class="text-xl uppercase font-semibold">
                            {{ item?.fighterBName }}
                        </h4>
                        <span class="font-bold tracking-widest uppercase text-xs text-right h-[24px]">
                            {{ item?.fighterBNickname }}
                        </span>
                    </div>
                    <img :src="item?.fighterBCover?.url" class="fighter self-end" draggable="false" alt="Carousel Item" />
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
            <button class="p-2 rounded-full" @click="prevItem">
                <IconChevron class="rotate-180 h-6" />
            </button>
            <div class="space-x-2">
                <button class="h-2 w-2 rounded-full" v-for="(item, index) in items" :key="index" :class="{
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
import type { Lineup } from "~/DTO/LineupDTO";

const props = defineProps({
    items: {
        type: Array as PropType<Lineup[]>,
        default: () => [],
    },
});

const setCurrentIndex = (index: number) => {
    currentIndex.value = index;
};

const currentIndex = ref(0);

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

    &__images {
        @apply flex justify-center items-center relative;

        @screen laptop {
            @apply -space-x-8;
        }

        &-fighter {
            @apply hidden;

            @screen laptop {
                @apply inline-block w-full h-44;
            }
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
