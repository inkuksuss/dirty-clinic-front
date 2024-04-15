<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import ClinicHeader from '@/components/common/ClinicHeader.vue';
import ClinicFooter from '@/components/common/ClinicFooter.vue';
import { useStore } from '@/stores/store';
import ClinicPopup from '@/components/common/ClinicPopup.vue';

export default defineComponent({
    name: 'App',
    components: { ClinicPopup, ClinicFooter, ClinicHeader },
    setup() {
        const store = useStore();
        const compOpenPopup = computed(() => store.openPopup);

        const handleResize = () => {
            const viewWidth = window.innerWidth ?? document.documentElement.clientWidth;

            store.setIsMobile(viewWidth <= 767);
            store.setWidth(viewWidth);
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            RouterLink,
            compOpenPopup,
            RouterView
        };
    }
});
</script>

<template>
    <clinic-header></clinic-header>
    <router-view />
    <clinic-footer></clinic-footer>
    <clinic-popup v-if="compOpenPopup !== null"></clinic-popup>
</template>

<style scoped></style>
