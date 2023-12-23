<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import {defineComponent, onMounted, ref} from 'vue';
import ClinicHeader from '@/components/common/ClinicHeader.vue';
import ClinicFooter from '@/components/common/ClinicFooter.vue';

export default defineComponent({
    name: 'App',
    components: {ClinicFooter, ClinicHeader },
    setup() {
        const isMount = ref(false);

        onMounted(() => {
            isMount.value = true;
        });

        return {
            RouterLink,
            RouterView,
            isMount
        };
    }
});
</script>

<template>
    <clinic-header></clinic-header>
    <router-view />
    <clinic-footer></clinic-footer>
</template>

<style scoped></style>
