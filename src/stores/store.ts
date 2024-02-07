import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type PopupType } from '@/utils/types';

export const useStore = defineStore('store', () => {
    const isMobile = ref<boolean>(document.documentElement.clientWidth < 769);
    const width = ref<number>(document.documentElement.clientWidth);
    const openPopup = ref<PopupType | null>(null);

    const setIsMobile = (v: boolean) => {
        isMobile.value = v;
    };

    const setWidth = (v: number) => {
        width.value = v;
    };

    const setOpenPopup = (v: PopupType | null) => {
        openPopup.value = v;
    };

    return { isMobile, width, openPopup, setIsMobile, setWidth, setOpenPopup };
});
