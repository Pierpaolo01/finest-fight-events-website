<template>
  <section
    class="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
    :style="`background-image: url(${data?.data.attributes.featured_event.data.attributes.hero_image.data.attributes.url})`"
  >
    <div
      class="h-fit w-fit bg-ffe-bg/60 p-4 rounded-md text-center text-white font-bold space-y-5"
    >
      <p class="font-mont text-2xl uppercase">
        {{ format(data?.data.attributes.featured_event.data.attributes.date) }}
      </p>
      <h1 class="text-4xl md:text-6xl font-lora uppercase">
        {{ data?.data.attributes.featured_event.data.attributes.name }}
      </h1>
      <p class="font-mont text-2xl">
        {{ data?.data.attributes.featured_event.data.attributes.location }}
      </p>
      <div class="space-x-6">
        <NuxtLink
          v-if="
            data?.data.attributes.featured_event.data.attributes.date > date
          "
          :to="`/upcoming/events/${data?.data.attributes.featured_event.data.id}`"
        >
          <Button variant="secondary" text="meer info" />
        </NuxtLink>
        <NuxtLink
          v-else
          :to="`/past/events/${data?.data.attributes.featured_event.data.id}`"
        >
          <Button variant="secondary" text="meer info" />
        </NuxtLink>
        <NuxtLink
          :to="`/upcoming/events/${data?.data.attributes.featured_event.data.id}#tickets`"
          v-if="
            data?.data.attributes.featured_event.data.attributes.date > date
          "
        >
          <Button variant="primary" text="tickets" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useFormattedDate from "~/composables/useDateFormat";

const { findOne } = useStrapi();
const { format } = useFormattedDate();

const { data } = await useAsyncData("hero-section", () =>
  findOne<{ featured_event: any }>("hero-section", {
    populate: {
      featured_event: {
        populate: "*",
      },
    },
  })
);

const date = new Date().toISOString;
</script>
