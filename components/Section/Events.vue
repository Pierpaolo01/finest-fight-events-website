<template>
    <Section class="events-section" id="lineup">
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
            <!-- TODO make past & future events filter -->
            <div class="space-y-6 divide-y divide-ffe-border" v-if="selectedView === 'upcoming'">
                <div class="events-section__event pt-6 first:pt-0" v-for="event in formattedData" :key="event.id">
                    <LineupCarousel v-if="event.lineups.length" :items="event.lineups" />
                    <div class="events-section__event-description flex-1">
                        <span class="text-white/80 uppercase text-sm font-bold tracking-widest">
                            {{ format(event.date) }}
                        </span>
                        <p class="font-semibold text-xl"> {{ event.name }} </p>
                        <p> {{ event.teaser }} </p>
                        <div class="flex flex-col tablet:flex-row gap-4">
                            <NuxtLink :to="`/events/${event.id}#tickets`">
                                <Button variant="primary" text="tickets" class="w-full" />
                            </NuxtLink>
                            <NuxtLink :to="`/events/${event.id}`">
                                <Button variant="secondary" text="meer info" class="w-full" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <p v-else class="text-center p-4 text-white/60 text-xl">
                Er zijn geen gebeurtenissen uit het verleden
            </p>
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