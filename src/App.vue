<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import ClinicHeader from '@/components/common/ClinicHeader.vue';
import ClinicFooter from '@/components/common/ClinicFooter.vue';

export default defineComponent({
    name: 'App',
    components: { ClinicFooter, ClinicHeader },
    setup() {
        return {
            RouterLink,
            RouterView
        };
    }
});
</script>

<template>
    <clinic-header></clinic-header>
    <RouterView />
    <clinic-footer></clinic-footer>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
