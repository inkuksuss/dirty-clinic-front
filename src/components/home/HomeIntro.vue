<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeIntro',
    setup() {}
});
</script>

<template>
    <div
        class="intro-wrapper max-w-[--body-width] w-[73%] flex flex-col justify-start mt-[100px] mb-[100px]"
    >
        <div class="text-area mb-[30px]">
            <div class="text-[38px] font-[700] leading-[45px] mb-[10px]">
                더티클리닉은 불가피한 선택입니다.
            </div>
            <div class="text-[18px] font-[500] leading-[21px]">
                최고의 만족도를 선사하기 위한 더티클리닉의 핵심부서를 소개합니다.
            </div>
        </div>
        <div class="image-area w-full flex justify-between items-start">
            <div class="first-intro relative w-[32%] max-w-[280px] max-h-[250px]">
                <img class="w-full" src="@/assets/images/home/intro_1@1x.png" alt="hello" />
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <img
                        class="w-[280px] max-h-[250px]"
                        src="@/assets/images/home/intro_1_filter@1x.jpg"
                        alt="hello"
                    />
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[75px] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">현장사업수행팀</span>
                </div>
            </div>
            <div class="second-intro relative w-[32%] max-w-[280px] max-h-[250px]">
                <img class="w-full" src="@/assets/images/home/intro_2@1x.png" alt="hello" />
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <img
                        class="w-[280px] max-h-[250px]"
                        src="@/assets/images/home/intro_2_filter@1x.jpg"
                        alt="hello"
                    />
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[75px] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">고객지원팀</span>
                </div>
            </div>
            <div class="third-intro relative w-[32%] max-w-[280px] max-h-[250px]">
                <img class="w-full" src="@/assets/images/home/intro_3@1x.png" alt="hello" />
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <img
                        class="w-[280px] max-h-[250px]"
                        src="@/assets/images/home/intro_3_filter@1x.jpg"
                        alt="hello"
                    />
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[75px] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">연구개발팀</span>
                </div>
            </div>
        </div>
    </div>
</template>
