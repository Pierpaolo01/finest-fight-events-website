<template>
  <Section class="footer border-t border-ffe-border">
    <Container class="footer__container">
      <div class="footer__row">
        <img
          src="/FFE_Logo-light.png"
          alt="company_logo"
          class="max-h-[60px] max-w-[108px]"
          draggable="false"
        />

        <div class="footer_links">
          <div class="relative">
            <input
              type="email"
              placeholder="Schrijf je in voor onze newsletter"
              class="footer_links-signup"
              v-model="email"
              :class="{ '!border-red-500': formError }"
            />
            <p
              class="py-2 px-0.5 text-red-500 absolute -bottom-10 left-0"
              v-if="formError"
            >
              Er is iets fouts gegaan
            </p>
            <p
              class="py-2 px-0.5 text-green-500 absolute -bottom-10 left-0"
              v-if="formSuccess"
            >
              Success, welkom!
            </p>
          </div>
          <Button
            variant="secondary"
            text="signup"
            class="h-fit"
            :class="{
              'success mt-8 tablet:mt-0': formSuccess,
              'mt-8 tablet:mt-0': formError,
            }"
            @click="submitForm"
          />
        </div>
      </div>
      <div class="footer__row">
        <div>
          <a href="mailto:info@onlinefightstore.nl">
            info@onlinefightstore.nl
          </a>
          <br />
          <a href="tel:+31(0)6-41763393"> +31 (0)6-41 76 33 93 </a>
        </div>
        <span> Copyright © 2023 Finest Fight Events </span>
      </div>
    </Container>
  </Section>
</template>

<script setup lang="ts">
const { create } = useStrapi();

const email = ref("");

const formSuccess = ref(false);
const formError = ref(false);

const submitForm = async () => {
  try {
    await create("newsletter-forms", { email: email.value });
    formSuccess.value = true;

    email.value = "";

    setTimeout(() => {
      formSuccess.value = false;
    }, 3000);
  } catch (error) {
    formError.value = true;

    setTimeout(() => {
      formError.value = false;
    }, 3000);

    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.footer {
  @apply bg-ffe-bg text-white;

  &__container {
    @apply flex flex-col space-y-14;
  }

  img {
    @apply w-96;
  }

  &__row {
    @apply flex flex-col items-center space-y-8;
  }

  @screen tablet {
    &__row {
      @apply flex-row justify-between items-center space-y-0;
    }
  }
}

.footer_links {
  @apply flex flex-col gap-4 w-full;

  @screen tablet {
    @apply w-fit flex-row;
  }
}

.footer_links-signup {
  @apply px-4 py-2 rounded border border-ffe-border bg-transparent w-full;

  @screen tablet {
    @apply w-72;
  }
}

.success {
  @apply bg-green-500 text-white;
}
</style>
