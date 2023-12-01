<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import PaymentModule from '@/components/PaymentModule.vue';

export default defineComponent({
    name: 'App',
    components: { PaymentModule },
    setup() {
        return {
            RouterLink,
            RouterView
        };
    }
});
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <PaymentModule></PaymentModule>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
