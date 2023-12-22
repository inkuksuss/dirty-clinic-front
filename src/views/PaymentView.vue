<script lang="ts">
import { defineComponent, ref } from 'vue';
import PaymentModule from '@/components/PaymentModule.vue';

export default defineComponent({
    name: 'LoginView',
    components: { PaymentModule },
    setup() {
        return {};
    }
});
</script>

<template>
    <payment-module></payment-module>
</template>

<style scoped></style>
