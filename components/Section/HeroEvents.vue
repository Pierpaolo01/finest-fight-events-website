<template>
  <Section class="overflow-hidden">
    <Container class="relative h-screen w-full bg-cover bg-center flex items-center justify-center">
      <div class="-mt-[30%] h-fit w-fit bg-ffe-bg/60 p-4 rounded-md text-center text-white font-bold space-y-5">
        <p class="font-mont text-2xl">
          {{ format(data?.data.attributes.featured_event.data.attributes.date) }}
        </p>
        <h1 class="text-4xl md:text-6xl font-lora uppercase">
          {{ data?.data.attributes.featured_event.data.attributes.name }}
        </h1>
        <p class="font-mont text-2xl">
          {{ data?.data.attributes.featured_event.data.attributes.location }}
        </p>
        <div class="space-x-6">
          <NuxtLink :to="`/events/${data?.data.attributes.featured_event.data.id}`">
            <Button variant="secondary" text="meer info" />
          </NuxtLink>
          <Button variant="primary" text="tickets" />
        </div>
      </div>
    </Container>
    <div class="triangle object-cover"
      :style="`background-image: url(${data?.data.attributes.featured_event.data.attributes.hero_image.data.attributes.url})`">
    </div>
  </Section>
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
</script>

<style scoped lang="scss">
.triangle {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80vh;
    opacity: 0.9;
    background-color: #1A1A1A;
    clip-path: polygon(100% 0, 0 100%, -100% -100%);
    z-index: -1;

    @media screen and (min-width: 768px) {
      height: 100vh;

    }
  }
}
</style>