<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import ClinicHeader from '@/components/common/ClinicHeader.vue';
import ClinicFooter from '@/components/common/ClinicFooter.vue';
import { useStore } from '@/stores/store';

export default defineComponent({
    name: 'App',
    components: { ClinicFooter, ClinicHeader },
    setup() {
        const store = useStore();

        const handleResize = () => {
            const clientWidth = document.documentElement.clientWidth;
            store.setIsMobile(clientWidth < 768);
            store.setWidth(clientWidth);
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            RouterLink,
            RouterView
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
