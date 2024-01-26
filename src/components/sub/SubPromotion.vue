<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubPromotion',
    props: {},
    setup() {}
});
</script>

<template>
    <div class="promotion-wrapper w-[--body-width] mt-[80px] mb-[160px]">
        <div class="text-area mb-[30px]">
            <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]">
                한눈에 보는 가격표를 쉽게 결정하세요.
            </div>
            <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                해당 장소 가격 노출
            </div>
        </div>
        <div class="main-image w-full h-[300px] mb-[50px]">
            <img class="w-full h-full" src="@/assets/images/home/test-img1@1x.jpg" />
        </div>
        <div class="sub-image w-full flex justify-between">
            <div class="promotion w-[430px] h-[180px] pt-[40px] pl-[40px]">
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]">
                    더티클리닉의 꺠끗함을 만나보세요.
                </div>
                <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]">
                    프로모션 50%
                </div>
            </div>
            <div class="promotion w-[430px] h-[180px] pt-[40px] pl-[40px]">
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]">
                    더티클리닉의 꺠끗함을 만나보세요.
                </div>
                <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]">
                    프로모션 50%
                </div>
            </div>
        </div>
    </div>
</template>
