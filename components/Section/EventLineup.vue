<template>
    <Section class="bg-ffe-bg">
        <Container>
            <div class="lineup-container">
                <div class="lineup-container__heading">
                    <h2 class="uppercase text-3xl font-semibold cursor-pointer">Lineup</h2>
                    <h2 class="uppercase text-2xl font-semibold cursor-pointer">{{ format(data?.date) }}</h2>

                </div>
                <div class="lineup-container__lineup">
                    <div v-for="lineup in data?.lineups" :key="lineup.id" class="lineup-container__lineup--item">
                        <div class="fighter-column">
                            <div>
                                <h3 class="text-xl font-semibold"> {{ lineup.fighterAName }} </h3>
                                <p class="text-sm"> {{ lineup.fighterANickname }} <span class="opacity-0">.</span> </p>
                            </div>
                            <img :src="lineup.fighterACover.url" alt="fighter_a" class="fighter" draggable="false">
                        </div>
                        <div>
                            <img src="/ffe-versus.png"
                                class="w-full h-auto self-start max-w-[60px] tablet:max-w-[80px] mx-auto" alt="versus"
                                draggable="false">
                        </div>
                        <div class="fighter-column reverse">
                            <div>
                                <h3 class="text-xl font-semibold">{{ lineup.fighterBName }}</h3>
                                <p class="text-sm"> {{ lineup.fighterBNickname }} <span class="opacity-0">.</span> </p>
                            </div>
                            <img :src="lineup.fighterBCover.url" alt="fighter_b" class="fighter" draggable="false">
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </Section>
</template>

<script setup lang="ts">
import type { SingleEventDTOType } from '~/DTO/EventDTO';
import useFormattedDate from '~/composables/useDateFormat';

// TODO Format date with month alphabetical
const { format } = useFormattedDate();

defineProps({
    data: {
        type: Object as PropType<SingleEventDTOType>,
        required: true,
    },
});

</script>

<style lang="scss" setup>
.lineup-container {
    @apply flex flex-col mx-auto max-w-2xl bg-ffe-off-white rounded-sm text-center;

    &__heading {
        @apply p-4 border-b border-ffe-border/30;
    }

    &__lineup {
        @apply p-4 pb-0;
    }

    &__lineup--item {
        @apply flex items-center justify-between border-b border-ffe-border/30 last:border-none pt-4 first:pt-0;
    }
}

.fighter {
    @apply w-auto max-h-32 aspect-auto flex-shrink;
}

.fighter-column {
    @apply flex flex-col justify-between items-center min-h-full flex-1 self-stretch;

    @screen tablet {
        @apply flex-row;
    }
}

.reverse {
    @screen tablet {
        @apply flex-row-reverse;
    }
}
</style>