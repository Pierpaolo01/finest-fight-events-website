<template>
  <div v-if="formattedData">
    <SectionHeroEvent :data="formattedData" />
    <SectionEventLineup :data="formattedData" />
    <SectionEventTickets :data="formattedData" />
  </div>
</template>

<script lang="ts" setup>
import { SingleEventDTO } from "~/DTO/EventDTO";

const { findOne } = useStrapi();
const route = useRoute();

const { data } = await useAsyncData(`events-${route.params.id}`, () =>
  findOne("events", route.params.id as string, {
    populate: {
      lineups: {
        populate: "*",
      },
      hero_image: "*",
      event_tickets: "*",
    },
  })
);

const formattedData = SingleEventDTO(data.value?.data);
console.log(formattedData);
useHead({
  title: `${formattedData?.name.toUpperCase()} - Finest Fight Events`,
});
</script>
