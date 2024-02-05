import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    const isMobile = ref<boolean>(document.documentElement.clientWidth < 769);
    const width = ref<number>(document.documentElement.clientWidth);

    const setIsMobile = (v: boolean) => {
        isMobile.value = v;
    };

    const setWidth = (v: number) => {
        width.value = v;
    };

    return { count, doubleCount, isMobile, width, setIsMobile, setWidth };
});
