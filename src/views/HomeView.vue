<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import homeSlider from '@/components/home/HomeSlider.vue';
import HomeScroll from '@/components/home/HomeScroll.vue';
import HomeIntro from '@/components/home/HomeIntro.vue';
import HomePromotion from '@/components/home/HomePromotion.vue';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';
import PaymentButton from '@/components/PaymentButton.vue';
import HomeService from '@/components/home/HomeService.vue';
import { useMeta } from 'vue-meta';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {
        HomeService,
        PaymentButton,
        HomePromotion,
        HomeIntro,
        HomeScroll,
        homeSlider,
        Flicking: Flicking
    },
    setup() {
        useMeta({
            title: '더티클리닉 | 입주청소, 사업장청소, 준공청소, 화재청소 전문기업',
            description: '우리는 청결의 미학을 실현하는 전문기업 더티클리닉입니다.'
        });
        const store = useStore();
        const route = useRoute();
        const plugin = [new AutoPlay({ duration: 5000, direction: 'NEXT' })];

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        onMounted(() => {
            if (route.query && route.query.popup) {
                if (route.query.popup === 'terms-of-use') {
                    store.setOpenPopup(PopupType.TERMS_OF_USE);
                } else if (route.query.popup === 'private-policy') {
                    store.setOpenPopup(PopupType.PRIVACY_POLICY);
                }
            }
        });

        return {
            plugin,
            handleClickBtn
        };
    }
});
</script>

<template>
    <main class="main-wrapper">
        <div class="main-image-wrapper relative flex">
            <Flicking
                class="z-0"
                :plugins="plugin"
                :options="{
                    circular: true,
                    moveType: ['strict', { count: 1 }],
                    inputType: []
                }"
            >
                <div class="image-item first w-screen h-full relative">
                    <div
                        class="bg-black w-screen h-full opacity-40 absolute left-0 top-0 z-10"
                    ></div>
                </div>
                <div class="image-item second w-screen h-full relative">
                    <div
                        class="bg-black w-screen h-full opacity-40 absolute left-0 top-0 z-10"
                    ></div>
                </div>
            </Flicking>
            <div
                class="contents-wrapper w-screen h-full absolute top-0 left-0 h-full z-20 flex-center"
            >
                <div
                    class="image-content max-w-[--body-width] w-[--body-ratio] flex flex-col justify-between z-10"
                >
                    <div class="text-area flex flex-col items-start">
                        <span
                            class="main-text text-[48px] font-[700] text-[--color-white] leading-[62px] mb-[10px]"
                            >깨끗함을 재정의하다.</span
                        >
                        <span
                            class="sub-text text-[38px] font-[600] text-[--color-white] leading-[49px]"
                            >우리는 청결의 미학을 실현하는 <br class="break-m" />
                            전문기업<br class="break-d" />
                            더티클리닉입니다.</span
                        >
                    </div>
                    <div
                        class="payment-btn w-[255px] h-[65px] rounded-[80px] bg-[--color-main-blue] text-[--color-white] flex justify-center items-center text-[24px] font-[600] cursor-pointer mt-[70px]"
                        @click="handleClickBtn"
                    >
                        온라인 예약하기
                    </div>
                </div>
            </div>
        </div>
        <div class="main-contents-wrapper w-full h-full flex flex-col justify-center items-center">
            <home-intro></home-intro>
            <home-promotion></home-promotion>
            <home-service></home-service>
            <home-slider></home-slider>
            <home-scroll></home-scroll>
        </div>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </main>
</template>

<style scoped></style>
