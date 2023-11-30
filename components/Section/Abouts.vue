<template>
  <Section class="bg-ffe-bg text-white" id="abouts">
    <Container>
      <div
        class="abouts-section__about"
        v-for="(about, index) in formattedData"
        :key="about.id"
        ref="aboutItems"
        :class="{ inverted: index % 2 === 0 }"
      >
        <div class="abouts-section__about-image">
          <img
            draggable="false"
            v-if="about.image"
            :src="about.image.url"
            alt="about_image"
          />
        </div>
        <div class="abouts-section__about-item">
          <h4>{{ about.title }}</h4>
          <p>
            {{ about.description }}
          </p>
        </div>
      </div>
    </Container>
  </Section>
</template>

<script setup lang="ts">
import { type About, AboutDTO } from "~/DTO/AboutsDTO";

const { find } = useStrapi();

const { data } = await useAsyncData("abouts", () =>
  find("abouts", {
    populate: "*",
  })
);
const formattedData: About = AboutDTO(data.value?.data ?? []);

const aboutItems = ref([]);

const initObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("abouts-section__about--visible");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0,
    }
  );

  aboutItems.value.forEach((item) => {
    observer.observe(item);
  });
};

onMounted(initObserver);
</script>

<style scoped lang="scss">
.abouts-section {
  @apply bg-ffe-bg text-white;

  &__about {
    @apply border-x border-t border-ffe-border flex flex-col last:border-b;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;

    @screen tablet {
      @apply flex-row items-stretch;
    }

    &.inverted {
      @apply flex-col;

      @screen tablet {
        @apply flex-row-reverse;
      }

      .abouts-section__about-image {
        @screen tablet {
          @apply border-l border-ffe-border;
        }
      }

      .abouts-section__about-image {
        @apply border-r-0 border-ffe-border;
      }
    }
  }

  &__about-item {
    @apply p-6;

    @screen tablet {
      @apply p-8 border-t-0 flex-1 max-w-[50%];
    }
  }

  &__about-image {
    @apply flex-1 border-b border-ffe-border;

    & img {
      @apply object-cover w-full min-h-full;
    }

    @screen tablet {
      @apply border-b-0 border-r w-full min-h-full self-stretch;
    }
  }
}

.abouts-section__about--visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
