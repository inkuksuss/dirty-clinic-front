<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { useStore } from '@/stores/store';
import Flicking from '@egjs/vue3-flicking';

type PromotionInfo = {
    title: string;
    description: string;
};

export default defineComponent({
    name: 'HomePromotion',
    components: { Flicking: Flicking },
    setup() {
        const promList: PromotionInfo[] = [
            {
                title: '입주 프로모션',
                description: '가전/ 줄눈/ 코팅'
            },
            {
                title: '공기질 시설관리',
                description: '새집증후군/ 소독/<br class="break-m"/> 해충 방역'
            },
            {
                title: '사업장 정기관리',
                description: '왁스코팅/ 정기관리/<br class="break-m"/> 공기질 관리'
            }
        ];

        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const compWidth = computed(() => store.width);
        const contentList = ref<HTMLDivElement[]>();
        const contentWidth = ref<string>();
        const viewportWidth = ref<string>();
        const isReady = ref<boolean>(false);
        const wRatio = 0.4;

        const handleChangeViewWidth = () => {
            if (!compIsMobile.value) return;
            if (!contentList.value || contentList.value?.length < 1) return;

            const w = compWidth.value * wRatio;
            contentWidth.value = w + 'px';
        };

        const initContentWidth = () => {
            const w = compWidth.value * wRatio;
            contentWidth.value = w + 'px';
        };

        const initViewportWidth = () => {
            const gap = 15;
            const calcValue =
                (contentWidth.value ? Number(contentWidth.value?.replace('px', '')) : 0) * 3 +
                gap * 4;

            viewportWidth.value = calcValue + 'px';
        };

        onMounted(() => {
            if (compIsMobile.value) {
                initContentWidth();
                initViewportWidth();
                nextTick(() => {
                    isReady.value = true;
                });
            }
        });

        watch(compWidth, () => {
            handleChangeViewWidth();
            nextTick(() => {
                isReady.value = compIsMobile.value;
            });
        });

        return {
            promList,
            compWidth,
            compIsMobile,
            contentList,
            contentWidth,
            viewportWidth,
            isReady
        };
    }
});
</script>

<template>
    <div class="promotion-wrapper w-full bg-[#e8f4ff] flex justify-center items-center">
        <Flicking
            v-if="compIsMobile && isReady"
            id="promotion-contents"
            class="promotion-contents flex justify-between items-center py-[16%] overflow-hidden"
            :style="{ width: viewportWidth }"
            :options="{
                bound: true,
                panelsPerView: -1,
                noPanelStyleOverride: true,
                resizeOnContentsReady: true
            }"
        >
            <div
                v-for="(prom, idx) in promList"
                :key="idx"
                ref="contentList"
                :style="{ width: contentWidth, minWidth: contentWidth }"
                class="content relative"
            >
                <div
                    class="w-full h-[44%] left-0 bottom-0 absolute bg-white opacity-[60%] z-0"
                ></div>
                <div
                    class="z-10 py-[13%] px-[8%] absolute left-0 bottom-0 h-[44%] flex flex-col justify-center"
                >
                    <div
                        class="text-[20px] font-[700] color-[--color-text-black] leading-[24px] mb-[5px]"
                    >
                        {{ prom.title }}
                    </div>
                    <span
                        class="text-[14px] font-[500] color-[--color-text-black] leading-[17px] break-keep"
                        v-html="prom.description"
                    >
                    </span>
                </div>
            </div>
        </Flicking>
        <div
            v-else
            class="promotion-contents w-[--body-width] flex justify-between items-center pt-[68px] pb-[82px]"
        >
            <div v-for="(prom, idx) in promList" :key="idx" class="content w-[32%] relative">
                <div
                    class="w-full h-[44%] left-0 bottom-0 absolute bg-white opacity-[60%] z-0"
                ></div>
                <div
                    class="z-10 py-[13%] px-[8%] absolute left-0 bottom-0 h-[44%] flex flex-col justify-center"
                >
                    <div
                        class="text-[28px] font-[700] color-[--color-text-black] leading-[33px] mb-[10px]"
                    >
                        {{ prom.title }}
                    </div>
                    <span
                        class="text-[18px] font-[500] color-[--color-text-black] leading-[21px] break-keep"
                        v-html="prom.description"
                    >
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
