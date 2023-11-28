<template>
  <Section class="bg-ffe-bg" id="tickets">
    <Container>
      <!-- TODO Set this data in Strapi  -->
      <div class="mx-auto text-white ml-auto">
        <div class="grid grid-cols-3 gap-4 border-b pb-4 mb-4">
          <div class="font-bold col-span-2">Tickets</div>
          <div class="font-bold">
            <span class="float-right">Price</span>
          </div>
        </div>
        <div class="space-y-4">
          <div v-for="ticket in tickets" :key="ticket.id" class="grid grid-cols-3 gap-4">
            <div class="py-2 col-span-2 flex items-center">
              {{ ticket.name }}
            </div>
            <div class="py-2">
              <span class="float-right">
                {{ ticket.price }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex tablet:justify-end mt-4">
        <Button variant="primary" text="koop tickets" class="w-full tablet:w-fit" />
      </div>
    </Container>
  </Section>
</template>

<script setup lang="ts">
import type { SingleEventDTOType } from "~/DTO/EventDTO";

defineProps({
  data: {
    type: Object as PropType<SingleEventDTOType>,
    required: true,
  },
});

const tickets = [
  {
    id: 1,
    name: "Gouden Diner Tafel inclusief 4 gangen diner & dranken Arrangement",
    price: "€ 2,500.00",
    amount: "",
  },
  {
    id: 2,
    name: "Zilveren Diner Tafel inclusief 4 gangen diner & dranken Arrangement",
    price: "€ 2,000.00",
    amount: "",
  },
  {
    id: 3,
    name: "Early Bird Diner seats inclusief 2 gangen diner exclusief dranken Arrangement",
    price: "€ 200.00",
    amount: "",
  },
  { id: 4, name: "Balkon tickets", price: "€ 50.00", amount: "" },
];
</script>

<style lang="scss" scoped>
tr {
  @apply min-h-[100px];
}
</style>
