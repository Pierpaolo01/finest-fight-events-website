<template>
  <div class="overflow-hidden">
    <Container
      class="relative h-screen w-full bg-cover bg-center flex items-center justify-center tablet:justify-start"
    >
      <div
        class="-mt-[10%] h-fit w-fit text-center tablet:text-left bg-ffe-bg/60 laptop:bg-transparent p-4 rounded-md text-white font-bold space-y-5"
      >
        <p class="font-mont text-2xl">
          {{ format(data?.date) }}
        </p>
        <h1 class="text-4xl md:text-6xl font-lora uppercase">
          {{ data?.name }}
        </h1>
        <p class="font-mont text-2xl">
          {{ data?.location }}
        </p>
        <div
          class="tablet:space-x-6 space-y-6 tablet:space-y-0 flex flex-col tablet:flex-row justify-start"
        >
          <NuxtLink :to="`#lineup`">
            <Button variant="secondary" text="bekijk lineup" class="w-full" />
          </NuxtLink>
          <a :href="data?.ticket_link" target="_blank" v-if="!isPastEvent">
            <Button variant="primary" text="tickets" class="w-full" />
          </a>
        </div>
      </div>
    </Container>
    <div
      class="triangle object-cover"
      :style="`background-image: url(${data?.heroImage?.url})`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { SingleEventDTOType } from "~/DTO/EventDTO";
import useFormattedDate from "~/composables/useDateFormat";

const { format } = useFormattedDate();

defineProps({
  data: {
    type: Object as PropType<SingleEventDTOType>,
    required: true,
  },
  isPastEvent: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.triangle {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    opacity: 0.9;
    background-color: #1a1a1a;
    /* clip-path: polygon(100% 0%, 10% 100%, -100% -100%); */
    clip-path: polygon(100% 0%, 0% 100%, -100% -100%);

    z-index: -1;
  }

  @media screen and (min-width: 768px) {
    &::before {
      content: "";
      height: 100vh;
      width: 80%;
      clip-path: polygon(0 0%, 100% 0, 37% 100%, 0% 100%);
    }
  }
}
</style>
