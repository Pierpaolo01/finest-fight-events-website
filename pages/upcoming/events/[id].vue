<template>
  <div v-if="formattedData">
    <SectionHeroEvent :data="formattedData" />
    <SectionEventLineup :data="formattedData" />
    <SectionEventTickets :data="formattedData" />
    <Section class="bg-ffe-bg">
      <Container>
        <MansoryGrid :items="formattedData?.collage" />
      </Container>
    </Section>
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
      collage: "*",
    },
  })
);

const formattedData = SingleEventDTO(data.value?.data);

useHead({
  title: `${formattedData?.name.toUpperCase()} - Finest Fight Events`,
});
</script>
