<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { computed, defineComponent, onMounted, onUnmounted, watch } from 'vue';
import ClinicHeader from '@/components/common/ClinicHeader.vue';
import ClinicFooter from '@/components/common/ClinicFooter.vue';
import { useStore } from '@/stores/store';
import ClinicPopup from '@/components/common/ClinicPopup.vue';
import { ViewSize } from '@/utils/types';

export default defineComponent({
    name: 'App',
    components: { ClinicPopup, ClinicFooter, ClinicHeader },
    setup() {
        const store = useStore();
        const compOpenPopup = computed(() => store.openPopup);
        const compIsMobile = computed(() => store.isMobile);

        const handleResize = () => {
            const viewWidth = window.innerWidth ?? document.documentElement.clientWidth;

            store.setIsMobile(viewWidth <= ViewSize.MOBILE);
            store.setWidth(viewWidth);
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        watch(compOpenPopup, (next, prev) => {
            if (compIsMobile.value) return;

            if (next && !prev) {
                document.body.style.height = '100%';
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.height = 'max-content';
                document.body.style.overflowY = 'scroll';
            }
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
    <metainfo></metainfo>
    <clinic-header></clinic-header>
    <router-view />
    <clinic-footer></clinic-footer>
    <clinic-popup v-if="compOpenPopup !== null"></clinic-popup>
</template>

<style scoped></style>
