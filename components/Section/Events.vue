<template>
  <Section class="events-section" id="lineup">
    <Container class="space-y-12">
      <div class="space-x-12 text-center">
        <span
          class="events-section__view-selector"
          :class="{
            'events-section__view-selector--active':
              selectedView === 'upcoming',
          }"
          @click="selectedView = 'upcoming'"
        >
          upcoming
        </span>
        <span
          class="events-section__view-selector"
          :class="{
            'events-section__view-selector--active': selectedView === 'past',
          }"
          @click="selectedView = 'past'"
        >
          past
        </span>
      </div>
      <div
        class="space-y-6 divide-y divide-ffe-border"
        v-if="displayEvents.length"
      >
        <div
          class="events-section__event pt-6 first:pt-0"
          v-for="event in displayEvents"
          :key="event.id"
        >
          <PromosCarousel
            v-if="event.promo_assets.length"
            :items="event.promo_assets"
          />
          <div class="events-section__event-description flex-1">
            <span
              class="text-white/80 uppercase text-sm font-bold tracking-widest"
            >
              {{ format(event.date) }}
            </span>
            <p class="font-semibold text-xl">{{ event.name }}</p>
            <p>{{ event.teaser }}</p>
            <div class="flex flex-col tablet:flex-row gap-4">
              <a
                :href="event.ticket_link"
                target="_blank"
                v-if="selectedView === 'upcoming'"
              >
                <Button variant="primary" text="tickets" class="w-full" />
              </a>
              <NuxtLink
                :to="
                  selectedView === 'upcoming'
                    ? `/upcoming/events/${event.id}`
                    : `/past/events/${event.id}`
                "
              >
                <Button variant="secondary" text="meer info" class="w-full" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center p-4 text-white/60 text-xl">
        <span v-if="selectedView === 'past' && !displayEvents.length">
          Er zijn geen evenementen uit het verleden
        </span>
        <span v-if="selectedView === 'upcoming' && !displayEvents.length">
          Er zijn geen geplande evenementen
        </span>
      </p>
    </Container>
  </Section>
</template>

<script setup lang="ts">
import { EventDTO } from "~/DTO/EventDTO";

import type { Event } from "~/DTO/EventDTO";

const { find } = useStrapi();
const { format } = useDateFormat();

const { data } = await useAsyncData("events", () =>
  find("events", {
    populate: {
      lineups: {
        populate: "*",
      },
      promo_assets: "*",
    },
  })
);

const formattedData: Event = EventDTO(data.value?.data ?? []);
const now = new Date().toISOString();

const hasUpcomingEvents = formattedData.some(({ date }) => date > now);

const selectedView = ref(hasUpcomingEvents ? "upcoming" : "past");

const displayEvents = computed(() => {
  if (selectedView.value === "upcoming") {
    return formattedData
      .filter(({ date }) => date > now)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  } else {
    return formattedData
      .filter(({ date }) => date < now)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }
});
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
