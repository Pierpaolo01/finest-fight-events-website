<template>
    <div v-if="formattedData">
        <SectionHeroEvent :data="formattedData" />
        <SectionEventLineup />
    </div>
</template>

<script lang="ts" setup>
import { SingleEventDTO } from '~/DTO/EventDTO';

const { findOne } = useStrapi();
const route = useRoute();

const { data } = await useAsyncData(`events-${route.params.id}`, () =>
    findOne("events", route.params.id as string, {
        populate: {
            lineups: {
                populate: "*",
            },
            hero_image: true,
        },
    })
)

const formattedData = SingleEventDTO(data.value?.data);
</script>