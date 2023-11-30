<template>
  <Section class="bg-ffe-bg" id="lineup">
    <Container class="lineup-section">
      <div class="max-w-2xl laptop:max-w-[575px]">
        <div
          class="p-4 text-white flex flex-col justify-start items-start space-y-4"
        >
          <h2 class="uppercase text-3xl font-bold cursor-pointer">
            {{ data?.name }}
          </h2>
          <p>
            {{ data?.teaser }}
          </p>
        </div>
      </div>
      <div class="lineup-container">
        <div class="lineup-container__heading">
          <h2 class="uppercase text-3xl font-bold cursor-pointer">
            Vechters
            <!-- TODO table grid layout, default 15 rows w/ show more button -->
            <span class="font-semibool italic">
              {{ format(data?.date) }}
            </span>
          </h2>
        </div>
        <div
          v-if="data?.event_fighters"
          class="grid grid-cols-2 text-left text-white gap-4"
        >
          <div class="col-span-1 divide-y flex flex-col">
            <span
              v-for="fighter in fightersLeft"
              :key="fighter.id"
              class="py-2"
            >
              {{ fighter.name }}
            </span>
          </div>
          <div class="col-span-1 divide-y flex flex-col">
            <span
              v-for="fighter in fightersRight"
              :key="fighter.id"
              class="py-2"
            >
              {{ fighter.name }}
            </span>
          </div>
          <div
            class="col-span-2 flex justify-center items-center"
            v-if="data?.event_fighters?.length > 20"
          >
            <div class="border-b h-1 w-full" />
            <Button
              variant="secondary"
              text="toon meer"
              class="flex-shrink-0"
            />
            <div class="border-b h-1 w-full" />
          </div>
        </div>
        <p
          v-else
          class="lineup-container__lineup text-left p-4 text-white/60 text-xl"
        >
          Er zijn nog geen vechters bekend.
        </p>
      </div>
    </Container>
  </Section>
</template>

<script setup lang="ts">
import type { SingleEventDTOType } from "~/DTO/EventDTO";
import useFormattedDate from "~/composables/useDateFormat";

const { format } = useFormattedDate();

const props = defineProps({
  data: {
    type: Object as PropType<SingleEventDTOType>,
    required: true,
  },
});

const fightersLeft = computed(() => {
  return props.data?.event_fighters?.slice(0, 10);
});

const fightersRight = computed(() => {
  return props.data?.event_fighters?.slice(10, 20);
});
</script>

<style lang="scss" setup>
.lineup-section {
  @apply flex flex-col gap-8 items-center;

  @screen laptop {
    @apply flex-row gap-16 items-start;
  }
}

.lineup-container {
  @apply flex flex-col max-w-2xl w-full tablet:w-auto text-center flex-shrink-0;
  /* bg-ffe-off-white shadow-inset rounded  */

  &__heading {
    @apply p-4 text-white space-x-4 tablet:space-x-6 flex items-center text-left;
    /*  border-b border-ffe-border/30 */
  }

  &__lineup {
    @apply py-4 pb-0 space-y-4;
  }

  &__lineup--item {
    @apply flex items-center justify-between bg-ffe-off-white last:border-none p-4 pb-0 relative;
  }
}

.fighter {
  @apply w-auto max-h-32 aspect-auto flex-shrink;
}

.fighter-column {
  @apply flex flex-col justify-between items-center min-h-full flex-1 self-stretch;

  @screen tablet {
    @apply flex-row;
  }
}

.reverse {
  @screen tablet {
    @apply flex-row-reverse;
  }
}

.triangle-top-left {
  width: 30px;
  height: 30px;
  background-color: #1a1a1a;
  top: 0;
  left: 0;
  position: absolute;
  clip-path: polygon(100% 0%, 0% 100%, -100% -100%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  @media screen and (min-width: 768px) {
    width: 80px;
    height: 65px;
  }
}

.triangle-bottom-right {
  width: 65px;
  height: 65px;
  background-color: #1a1a1a;
  bottom: 0;
  right: 0;
  rotate: 180deg;
  position: absolute;
  clip-path: polygon(100% 0%, 0% 100%, -100% -100%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>

<!-- <div class="lineup-container__lineup" v-if="data?.lineups.length">
          <div
            v-for="lineup in data?.lineups"
            :key="lineup.id"
            class="lineup-container__lineup--item"
          >
            <div class="triangle-top-left"></div>
            <div class="fighter-column">
              <div>
                <h3 class="text-xl font-semibold">{{ lineup.fighterAName }}</h3>
                <p class="text-sm">
                  {{ lineup.fighterANickname }} <span class="opacity-0">.</span>
                </p>
              </div>
              <img
                :src="lineup.fighterACover.url"
                alt="fighter_a"
                class="fighter"
                draggable="false"
              />
            </div>
            <div>
              <img
                src="/ffe-versus.png"
                class="w-full h-auto self-start max-w-[60px] tablet:max-w-[80px] mx-auto"
                alt="versus"
                draggable="false"
              />
            </div>
            <div class="fighter-column reverse">
              <div class="text-center">
                <h3 class="text-xl font-semibold">{{ lineup.fighterBName }}</h3>
                <p class="text-sm">
                  {{ lineup.fighterBNickname }} <span class="opacity-0">.</span>
                </p>
              </div>
              <img
                :src="lineup.fighterBCover.url"
                alt="fighter_b"
                class="fighter"
                draggable="false"
              />
            </div>
            <div class="triangle-bottom-right"></div>
          </div>
        </div> -->
