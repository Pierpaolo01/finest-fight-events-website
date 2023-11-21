<template>
    <div class="carousel-container relative overflow-hidden pb-12 flex-1 h-fit">
        <div class="carousel-slide flex transition-transform duration-300"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-item flex justify-evenly items-center w-full flex-shrink-0 border-b border-white/20"
                v-for="(item, index) in items" :key="index">
                <div>
                    <span class="font-bold tracking-widest uppercase text-xs">{{
                        item?.fighterANickname
                    }}</span>
                    <h4 class="text-xl uppercase font-semibold">
                        {{ item?.fighterAName }}
                    </h4>
                </div>
                <div class="flex justify-center items-center relative -space-x-8">
                    <img :src="item?.fighterACover?.url" class="w-full h-44" draggable="false" alt="Carousel Item" />
                    <img src="/ffe-versus.png" class="w-full h-auto self-start" draggable="false" alt="Carousel Item" />
                    <img :src="item?.fighterBCover?.url" class="w-full h-44" draggable="false" alt="Carousel Item" />
                </div>
                <div>
                    <span class="font-bold tracking-widest uppercase text-xs">{{
                        item?.fighterBNickname
                    }}</span>
                    <h4 class="text-xl uppercase font-semibold">
                        {{ item?.fighterBName }}
                    </h4>
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

<style>
.carousel-slide {
    width: 100%;
}

.carousel-item {
    min-width: 100%;
}
</style>
