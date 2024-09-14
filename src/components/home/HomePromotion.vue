<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { useStore } from '@/stores/store';
import Flicking from '@egjs/vue3-flicking';
import ClinicImage from '@/components/common/ClinicImage.vue';

type PromotionInfo = {
    title: string;
    description: string;
    src: string;
    mobileSrc: string;
};

export default defineComponent({
    name: 'HomePromotion',
    components: { ClinicImage, Flicking: Flicking },
    setup() {
        const promList: PromotionInfo[] = [
            {
                title: '입주 프로모션',
                description: '가전/ 줄눈/ 코팅',
                src: new URL('@/assets/images/home/promotion_1@2x.webp', import.meta.url).href,
                mobileSrc: new URL(
                    '@/assets/images/home/promotion_1_mobile@2x.webp',
                    import.meta.url
                ).href
            },
            {
                title: '공기질 시설관리',
                description: '새집증후군/ 소독/<br class="break-m"/> 해충 방역',
                src: new URL('@/assets/images/home/promotion_2@2x.webp', import.meta.url).href,
                mobileSrc: new URL(
                    '@/assets/images/home/promotion_2_mobile@2x.webp',
                    import.meta.url
                ).href
            },
            {
                title: '사업장 정기관리',
                description: '왁스코팅/ 정기관리/<br class="break-m"/> 공기질 관리',
                src: new URL('@/assets/images/home/promotion_3@2x.webp', import.meta.url).href,
                mobileSrc: new URL(
                    '@/assets/images/home/promotion_3_mobile@2x.webp',
                    import.meta.url
                ).href
            }
        ];

        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const compWidth = computed(() => store.width);
        const contentList = ref<HTMLDivElement[]>();

        return {
            promList,
            compWidth,
            compIsMobile,
            contentList
        };
    }
});
</script>

<template>
    <div class="promotion-wrapper w-full bg-[#e8f4ff] flex justify-center items-center">
        <Flicking
            v-if="compIsMobile"
            class="promotion-contents flex justify-between items-center py-[16%] overflow-hidden"
            :options="{
                bound: true,
                panelsPerView: -1,
                noPanelStyleOverride: true,
                resizeOnContentsReady: true
            }"
        >
            <div v-for="(prom, idx) in promList" :key="idx" class="content">
                <img :src="prom.mobileSrc" :alt="`프로모션-${idx}`" />
            </div>
        </Flicking>
        <div
            v-else
            class="promotion-contents max-w-[--body-width] w-[--body-ratio] flex justify-between items-center pt-[68px] pb-[82px]"
        >
            <div v-for="(prom, idx) in promList" :key="idx" class="content w-[32%]">
                <img :src="prom.src" :alt="`프로모션-${idx}`" />
            </div>
        </div>
    </div>
</template>
