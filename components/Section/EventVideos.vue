<template>
  <Section
    class="bg-ffe-bg"
    @mouseenter="isFocused = true"
    @mouseleave="isFocused = false"
    v-if="Object.keys($route.query).length !== 0"
  >
    <Container class="relative">
      <div class="flex overflow-x-auto no-scrollbar">
        <div
          v-for="video in props.data?.event_videos"
          :key="video.id"
          class="flex-shrink-0 w-full sm:w-1/3 scroll space-x-4 cursor-pointer"
          :class="{
            'pause-scrolling': isFocused || props.data?.event_videos.length < 4,
          }"
          @click="
            showModal = true;
            selectedVideo = video;
          "
        >
          <div class="px-2 relative">
            <img
              class="rounded-md"
              :src="getThumbnailUrl(video.link)"
              :alt="`Thumbnail for video ${video.id}`"
            />
            <span
              class="text-white font-semibold text-xl absolute top-0 mx-auto p-4"
            >
              {{ video.title }}
            </span>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <Modal :show="showModal" @update:show="showModal = $event">
          <div class="">
            <div v-if="isLoggedIn">
              <h5 class="font-semibold text-xl mb-4">
                {{ selectedVideo.title }}
              </h5>
              <iframe
                class="aspect-video w-full h-full"
                :src="`https://www.youtube.com/embed/${selectedVideo.link}`"
                allowfullscreen="true"
              ></iframe>
            </div>
            <div v-else class="w-fit mx-auto">
              <div class="flex flex-col items-start space-y-4 w-fit">
                <h5 class="font-semibold text-xl">
                  Login om de video te bekijken
                </h5>
                <input
                  v-model="email"
                  placeholder="Voer uw email address heir in"
                  class="border rounded-md px-4 py-2 w-full"
                  :class="{
                    'border-red-500': formError,
                  }"
                />
                <p class="px-0.5 text-red-500" v-if="formError">
                  Controleer uw email address
                </p>
                <Button
                  variant="tertiary"
                  text="login"
                  class="h-fit"
                  :class="{
                    'mt-8 tablet:mt-0': formError,
                  }"
                  @click="submitForm"
                />
              </div>
            </div>
          </div>
        </Modal>
      </Teleport>
      <button
        class="absolute -top-16 right-6 tablet:12 bg-blue-500 text-white p-2 m-2 rounded"
        @click="showGrid = !showGrid"
      >
        show more
      </button>
    </Container>
  </Section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { SingleEventDTOType } from "~/DTO/EventDTO";

const { create } = useStrapi();

const props = defineProps({
  data: {
    type: Object as PropType<SingleEventDTOType>,
    required: true,
  },
});

const getThumbnailUrl = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/0.jpg`;

const isFocused = ref(false);
const showGrid = ref(false);
const showModal = ref(false);
const selectedVideo = ref();

const isLoggedIn = ref(false);

const checkIsLoggedIn = () => {
  const storedValue = localStorage.getItem("isLoggedIn");
  isLoggedIn.value = storedValue === "true";
};

const email = ref("");

const formError = ref(false);

const submitForm = async () => {
  try {
    await create("newsletter-forms", { email: email.value });

    email.value = "";
    isLoggedIn.value = true;
    localStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    formError.value = true;

    setTimeout(() => {
      formError.value = false;
    }, 3000);

    console.error(error);
  }
};

onMounted(() => {
  checkIsLoggedIn();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.pause-scrolling {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused !important;
}

.scroll {
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (max-width: 640px) {
  .scroll {
    flex-direction: column;
  }
}
</style>
