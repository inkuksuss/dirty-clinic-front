<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import homeSlider from '@/components/home/HomeSlider.vue';
import HomeScroll from '@/components/home/HomeScroll.vue';
import HomeIntro from '@/components/home/HomeIntro.vue';
import HomePromotion from '@/components/home/HomePromotion.vue';
import router from '@/router';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';

export default defineComponent({
    components: { HomePromotion, HomeIntro, HomeScroll, homeSlider },
    setup() {
        const store = useStore();
        const isButtonActive = ref<boolean>(false);

        const handleScroll = () => {
            isButtonActive.value = window.scrollY > 0;
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        const handleClickSubPage = () => {
            router.push('/sub');
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            isButtonActive,
            handleClickBtn,
            handleClickSubPage
        };
    }
});
</script>

<template>
    <main class="main-wrapper">
        <div class="main-image-wrapper w-full flex justify-center items-center bg-black">
            <div class="main-image w-full h-full flex justify-center items-center">
                <div class="image-content w-[--body-width] h-[305px] flex flex-col justify-between">
                    <div class="text-area flex flex-col items-start">
                        <span
                            class="main-text text-[48px] font-[700] text-[--color-white] leading-[62px] mb-[10px]"
                            >깨끗함을 재정의하다.</span
                        >
                        <span
                            class="sub-text text-[38px] font-[600] text-[--color-white] leading-[49px]"
                            >우리는 청결의 미학을 실현하는 전문기업 <br />
                            더티클리닉입니다.</span
                        >
                    </div>
                    <div
                        class="payment-btn w-[255px] h-[65px] rounded-[80px] bg-[--color-main-blue] text-[--color-white] flex justify-center items-center text-[24px] font-[600]"
                    >
                        온라인 예약하기
                    </div>
                </div>
            </div>
        </div>
        <div class="main-contents-wrapper w-full h-full flex flex-col justify-center items-center">
            <home-intro></home-intro>
            <home-promotion></home-promotion>
            <home-slider></home-slider>
            <home-scroll></home-scroll>
        </div>
        <div
            v-if="isButtonActive"
            class="fixed bottom-[150px] right-[30px] w-[175px] h-[75px] bg-[--color-main-blue] rounded-[100px] flex-center"
            @click="handleClickBtn"
        >
            <div class="w-[33px] h-[30px] mr-[10px]">
                <img class="w-full h-full" src="@/assets/images/icons/calendar.png" />
            </div>
            <div class="font-[600] text-[20px] leading-[26px] text-[--color-white]">
                온라인 <br />
                예약하기
            </div>
        </div>
        <div
            v-if="isButtonActive"
            class="fixed bottom-[250px] right-[30px] w-[175px] h-[75px] bg-[--color-main-blue] rounded-[100px] flex-center"
            @click="handleClickSubPage"
        >
            <div class="w-[33px] h-[30px] mr-[10px]">
                <img class="w-full h-full" src="@/assets/images/icons/calendar.png" />
            </div>
            <div class="font-[600] text-[20px] leading-[26px] text-[--color-white]">
                서브페이지 <br />
            </div>
        </div>
    </main>
</template>

<style scoped></style>
