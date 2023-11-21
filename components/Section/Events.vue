<template>
    <Section class="bg-ffe-bg text-white/80">
        <Container class="space-y-12">
            <div class="space-x-12 text-center">
                <span class="uppercase text-3xl pb-2 tracking-widest font-semibold cursor-pointer hover:text-white"
                    :class="{ 'text-white/20 border-b-2 border-white/20': selectedView === 'upcoming' }"
                    @click="selectedView = 'upcoming'">
                    upcoming
                </span>
                <span class="uppercase text-3xl pb-2 tracking-widest font-semibold cursor-pointer hover:text-white"
                    :class="{ 'text-white/40 border-b-2 border-white/20': selectedView === 'past' }"
                    @click="selectedView = 'past'">
                    past
                </span>
            </div>
            <div>
                <div class="flex justify-between gap-10" v-for="event in formattedData" :key="event.id">
                    <LineupCarousel :items="event.lineups" />
                    <div class="flex flex-col max-w-[510px] space-y-4">
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
