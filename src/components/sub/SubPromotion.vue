<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import { useStore } from '@/stores/store';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';

export type SubPromotion = {
    img: string;
    link?: string;
};

export default defineComponent({
    name: 'SubPromotion',
    components: { Flicking: Flicking },
    props: {
        mainImg: {
            type: String as PropType<string>,
            required: true
        },
        subList: {
            type: Array as PropType<SubPromotion[]>,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const compSubList = computed(() => props.subList);
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });

        return { compIsMobile, compSubList, plugins: [autoPlay] };
    }
});
</script>

<template>
    <div class="promotion-wrapper w-full mt-[80px] mb-[160px] flex justify-center">
        <div v-if="!compIsMobile" class="promotion-content max-w-[--body-width] w-[73%]">
            <div class="text-area mb-[30px]">
                <div
                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    한눈에 보는 가격표를 쉽게 결정하세요.
                </div>
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                    해당 장소 가격 노출
                </div>
            </div>
            <div class="main-image w-full max-h-[300px] h-max mb-[50px]">
                <img :src="mainImg" class="w-full max-h-[300px]" />
            </div>
            <div class="sub-promotion-list w-full h-max flex justify-between">
                <div
                    v-if="compSubList.length === 1"
                    class="sub-promotion single w-full max-h-[180px] h-max inline-flex"
                >
                    <div class="promotion-box w-full max-h-[180px] relative">
                        <img :src="compSubList[0].img" class="w-full max-h-[180px]" />
                        <div class="text-box w-[82%] h-[65%] absolute top-[17.5%] left-[6%]">
                            <div
                                class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                            >
                                더티클리닉의 꺠끗함을 만나보세요.
                            </div>
                            <div
                                class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                            >
                                프로모션 50%
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-else-if="compSubList.length === 2"
                    class="sub-promotion double inline-flex justify-between w-full h-max"
                >
                    <div
                        v-for="(prom, index) in subList"
                        :key="index"
                        class="promotion-box max-w-[430px] w-[49%] max-h-[180px] flex-center relative"
                    >
                        <img :src="prom.img" class="w-full max-h-[180px]" />
                        <div class="text-box w-[82%] h-[65%] absolute top-[22%] left-[9%]">
                            <div
                                class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                            >
                                더티클리닉의 꺠끗함을 만나보세요.
                            </div>
                            <div
                                class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                            >
                                프로모션 50%
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="sub-promotion multi w-full flex">
                    <Flicking
                        class="flicking-area flex overflow-hidden"
                        :plugins="plugins"
                        :options="{ circular: true, panelsPerView: 2, renderOnlyVisible: true }"
                    >
                        <div
                            v-for="(prom, index) in subList"
                            :key="index"
                            class="promotion-box max-w-[430px] w-[49%] max-h-[180px] flex-center relative mx-[10px]"
                        >
                            <img :src="prom.img" class="w-full max-h-[180px]" />
                            <div class="text-box w-[82%] h-[65%] absolute top-[22%] left-[9%]">
                                <div
                                    class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                                >
                                    더티클리닉의 꺠끗함을 만나보세요. {{ index }}
                                </div>
                                <div
                                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                                >
                                    프로모션 50%
                                </div>
                            </div>
                        </div>
                    </Flicking>
                </div>
            </div>
        </div>

        <div v-else class="promotion-content mobile max-w-[608px] w-full mx-[25px]">
            <div class="text-area mb-[30px]">
                <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]">
                    한눈에 보는 가격표를 쉽게 결정하세요.
                </div>
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                    해당 장소 가격 노출
                </div>
            </div>
            <div class="main-image w-full max-h-[430px] h-max mb-[20px]">
                <img :src="mainImg" class="w-full max-h-[430px]" />
            </div>

            <div class="sub-promotion-list">
                <div
                    v-if="compSubList.length === 1"
                    class="sub-promotion single w-full max-h-[180px] h-max inline-flex"
                >
                    <div class="promotion-box w-full max-h-[180px] relative">
                        <img :src="compSubList[0].img" class="w-full max-h-[180px]" />
                        <div class="text-box w-[82%] h-[65%] absolute top-[17.5%] left-[6%]">
                            <div
                                class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                            >
                                더티클리닉의 꺠끗함을 만나보세요.
                            </div>
                            <div
                                class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                            >
                                프로모션 50%
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="sub-promotion w-full">
                    <Flicking
                        class="flicking-area flex overflow-hidden"
                        :plugins="plugins"
                        :options="{ circular: true, panelsPerView: 1, renderOnlyVisible: false }"
                    >
                        <div
                            v-for="(prom, index) in subList"
                            :key="index"
                            class="promotion-box max-w-[608px] w-full max-h-[180px] flex-center relative"
                        >
                            <img :src="prom.img" class="w-full max-h-[180px]" />
                            <div class="text-box w-[82%] h-[65%] absolute top-[22%] left-[9%]">
                                <div
                                    class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                                >
                                    더티클리닉의 꺠끗함을 만나보세요. {{ index }}
                                </div>
                                <div
                                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                                >
                                    프로모션 50%
                                </div>
                            </div>
                        </div>
                    </Flicking>
                </div>
            </div>
        </div>
    </div>
</template>
