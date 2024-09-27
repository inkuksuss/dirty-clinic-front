import { ref } from 'vue';
import { defineStore } from 'pinia';
import { HeaderType, type PopupType } from '@/utils/types';

export const useStore = defineStore('store', () => {
    const isMobile = ref<boolean>(document.documentElement.clientWidth < 769);
    const width = ref<number>(document.documentElement.clientWidth);
    const openPopup = ref<PopupType | null>(null);
    const headerType = ref<HeaderType | null>(null);

    const setIsMobile = (v: boolean) => {
        isMobile.value = v;
    };

    const setWidth = (v: number) => {
        width.value = v;
    };

    const setOpenPopup = (v: PopupType | null) => {
        openPopup.value = v;
    };

    const setHeaderType = (v: HeaderType | null) => {
        headerType.value = v;
    };

    return {
        isMobile,
        width,
        openPopup,
        headerType,
        setIsMobile,
        setWidth,
        setOpenPopup,
        setHeaderType
    };
});
