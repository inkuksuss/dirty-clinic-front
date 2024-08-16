<script lang="ts">
import { defineComponent } from 'vue';
import homeSlider from '@/components/home/HomeSlider.vue';
import HomeScroll from '@/components/home/HomeScroll.vue';
import HomeIntro from '@/components/home/HomeIntro.vue';
import HomePromotion from '@/components/home/HomePromotion.vue';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';
import PaymentButton from '@/components/PaymentButton.vue';
import HomeService from '@/components/home/HomeService.vue';
import { useMeta } from 'vue-meta';

export default defineComponent({
    components: { HomeService, PaymentButton, HomePromotion, HomeIntro, HomeScroll, homeSlider },
    setup() {
        useMeta({
            title: '더티클리닉',
            description: '더티클리닉 메인 페이지입니다.'
        });
        const store = useStore();
        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            handleClickBtn
        };
    }
});
</script>

<template>
    <main class="main-wrapper">
        <div class="main-image-wrapper w-full flex justify-center items-center bg-black">
            <div class="main-image w-full h-full flex justify-center items-center relative">
                <div class="absolute w-full h-full bg-[--color-black] opacity-[40%] z-0"></div>
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
