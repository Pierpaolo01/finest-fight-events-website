<template>
    <Section class="bg-ffe-bg">
        <Container>
            <!-- <table class="text-white w-full">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-4">Tickets</th>
                        <th class="text-left py-4 min-w-[100px]">Price</th>
                        <th class="text-left py-4 float-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="space-x-4">
                        <td class="pr-4">Gouden Diner Tafel inclusief 4 gangen diner & dranken Arrangement</td>
                        <td class="min-w-[100px] py-4">
                            € 2,500.00
                        </td>
                        <td class="pl-4 float-right">
                            <span class="font-semibold uppercase">sold out</span>
                        </td>
                    </tr>
                    <tr class="space-x-4">
                        <td class="pr-4">Zilveren Diner Tafel inclusief 4 gangen diner & dranken Arrangement</td>
                        <td class="min-w-[100px] py-4">
                            € 2,000.00
                        </td>
                        <td class="pl-4">
                            <input type="number"
                                class="w-[100px] tablet:w-[170px] float-right px-4 py-2 rounded border border-ffe-border bg-transparent" />
                        </td>
                    </tr>
                    <tr>
                        <td class="pr-4">Early Bird Diner seats inclusief 2 gangen diner exclusief dranken Arrangement
                        </td>
                        <td class="min-w-[100px] py-4">
                            € 200.00
                        </td>
                        <td class="pl-4">
                            <input type="number"
                                class="w-[100px] tablet:w-[170px] float-right px-4 py-2 rounded border border-ffe-border bg-transparent" />
                        </td>
                    </tr>
                    <tr class="space-x-4">
                        <td class="pr-4">Balkon tickets</td>
                        <td class="min-w-[100px] py-4">
                            € 50.00
                        </td>
                        <td class="pl-4">
                            <input type="number"
                                class="w-[100px] tablet:w-[170px] float-right px-4 py-2 rounded border border-ffe-border bg-transparent" />
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <div class="container mx-auto text-white">
                <div class="grid grid-cols-4 gap-4 border-b pb-4 mb-4">
                    <div class="font-bold col-span-2">Tickets</div>
                    <div class="font-bold hidden tablet:block"><span class="">Price</span></div>
                    <div class="font-bold text-right col-span-2 tablet:col-span-1">
                        <span class="tablet:hidden">
                            Price / </span> Amount
                    </div>
                </div>
                <div class="space-y-4">
                    <div v-for="ticket in tickets" :key="ticket.id" class="grid grid-cols-4 gap-4 ">
                        <div class="py-2 col-span-2 flex items-center">{{ ticket.name }}</div>
                        <div class="py-2 hidden tablet:block "><span class="hidden tablet:block">{{ ticket.price
                        }}</span></div>
                        <div class="py-2 text-right col-span-2 tablet:col-span-1">
                            <p class="tablet:hidden pb-4">{{ ticket.price }}</p>
                            <input type="number" v-model="ticket.amount"
                                class="w-[100px] tablet:w-[170px] float-right px-4 py-2 rounded border border-ffe-border bg-transparent" />
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
    { id: 1, name: 'Gouden Diner Tafel inclusief 4 gangen diner & dranken Arrangement', price: '€ 2,500.00', amount: 0 },
    { id: 2, name: 'Zilveren Diner Tafel inclusief 4 gangen diner & dranken Arrangement', price: '€ 2,000.00', amount: 0 },
    { id: 3, name: 'Early Bird Diner seats inclusief 2 gangen diner exclusief dranken Arrangement', price: '€ 200.00', amount: 0 },
    { id: 4, name: 'Balkon tickets', price: '€ 50.00', amount: 0 },
];

</script>


<style lang="scss" scoped>
tr {
    @apply min-h-[100px];
}
</style>