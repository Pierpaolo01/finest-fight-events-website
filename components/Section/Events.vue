<template>
    <Section class="events-section">
        <Container class="space-y-12">
            <div class="space-x-12 text-center">
                <span class="events-section__view-selector"
                    :class="{ 'events-section__view-selector--active': selectedView === 'upcoming' }"
                    @click="selectedView = 'upcoming'">
                    upcoming
                </span>
                <span class="events-section__view-selector"
                    :class="{ 'events-section__view-selector--active': selectedView === 'past' }"
                    @click="selectedView = 'past'">
                    past
                </span>
            </div>
            <div>
                <div class="events-section__event" v-for="event in formattedData" :key="event.id">
                    <LineupCarousel :items="event.lineups" />
                    <div class="events-section__event-description flex-1">
                        <span class="text-white/80 uppercase text-sm font-bold tracking-widest">
                            {{ format(event.date) }}
                        </span>
                        <p class="font-semibold text-xl"> {{ event.name }} </p>
                        <p> {{ event.teaser }} </p>
                    </div>
                </div>
            </div>
        </Container>
    </Section>
</template>

<script setup lang="ts">
import { EventDTO } from "~/DTO/EventDTO";

import type { Event } from "~/DTO/EventDTO";

const selectedView = ref("upcoming");

const { find } = useStrapi();
const { format } = useDateFormat();

const { data } = await useAsyncData("events", () =>
    find("events", {
        populate: {
            lineups: {
                populate: "*",
            },
        },
    })
)

const formattedData: Event = EventDTO(data.value?.data ?? []);
</script>

<style scoped lang="scss">
.events-section {
    @apply bg-ffe-bg text-white/80;

    &__view-selector {
        @apply uppercase pb-2 text-xl tracking-widest font-semibold cursor-pointer hover:text-white;

        @screen laptop {
            @apply text-3xl;
        }
    }

    &__view-selector--active {
        @apply text-white/20 border-b-2 border-white/20;
    }

    &__event {
        @apply flex flex-col-reverse gap-10;

        @screen laptop {
            @apply flex-row justify-between gap-10;
        }
    }

    &__event-description {
        @apply flex flex-col w-full space-y-4;

        @screen laptop {
            @apply max-w-[510px];
        }
    }

}
</style>