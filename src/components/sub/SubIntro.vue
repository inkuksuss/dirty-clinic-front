<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/stores/store';

export default defineComponent({
    name: 'SubIntro',
    setup() {
        const store = useStore();
        const compWidth = computed(() => store.width);

        return { compWidth };
    }
});
</script>

<template>
    <!-- 430 -->
    <div class="intro-wrapper w-full flex-center">
        <div
            v-if="compWidth > 430"
            class="intro-contents mt-[100px] mb-[80px] flex flex-col max-w-[--body-width] w-[73%]"
        >
            <div class="text-area mb-[30px]">
                <div
                    class="text-main text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    우리는 이렇게 청소합니다.
                </div>
                <div
                    class="text-sub text-[--color-text-black] text-[18px] font-[500] leading-[26px]"
                >
                    5단계로 나눠진 특별한 기술을 체험해보세요.
                </div>
            </div>

            <div class="image-area relative w-full flex justify-between">
                <div class="image-wrapper w-[17%] max-h-[150px] flex flex-col items-start">
                    <div class="w-full max-w-[150px] max-h-[150px] z-30 relative">
                        <img class="w-full h-full" src="@/assets/images/sub/intro_image1@1x.jpg" />
                    </div>
                </div>
                <div class="image-wrapper w-[17%] flex flex-col items-start">
                    <div class="w-full max-w-[150px] z-30">
                        <img class="w-full h-full" src="@/assets/images/sub/intro_image2@1x.jpg" />
                    </div>
                </div>
                <div class="image-wrapper w-[17%] flex flex-col items-start">
                    <div class="w-full max-w-[150px] max-h-[150px] z-30">
                        <img class="w-full h-full" src="@/assets/images/sub/intro_image3@1x.jpg" />
                    </div>
                </div>
                <div class="image-wrapper w-[17%] flex flex-col items-start">
                    <div class="w-full max-w-[150px] max-h-[150px] z-30">
                        <img class="w-full h-full" src="@/assets/images/sub/intro_image4@1x.jpg" />
                    </div>
                </div>
                <div class="image-wrapper w-[17%] flex flex-col items-start">
                    <div class="w-full max-w-[150px] max-h-[150px] z-30">
                        <img class="w-full h-full" src="@/assets/images/sub/intro_image5@1x.jpg" />
                    </div>
                </div>
                <div
                    class="border-t-[1px] border-t-[--color-main-blue] absolute top-[50%] left-0 max-w-[--body-width] w-[100%] z-[-1]"
                ></div>
            </div>

            <div class="flex justify-between mt-[30px]">
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center"
                >
                    전문 상담과 <br />
                    예약 확정
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center"
                >
                    직영팀장님의 <br />
                    사전 해피콜
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center"
                >
                    현장 투입 및<br />
                    특이사항 체크
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center"
                >
                    구역별 <br />
                    알맞은 약품청소
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center"
                >
                    고객님과 함께<br />
                    현장 검수 및 완료
                </div>
            </div>
        </div>

        <div v-else class="intro-contents mobile mt-[60px] pb-[60px]">
            <div class="text-area mb-[30px]">
                <div
                    class="text-main text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    우리는 이렇게 청소합니다.
                </div>
                <div
                    class="text-sub text-[--color-text-black] text-[18px] font-[500] leading-[26px]"
                >
                    5단계로 나눠진 특별한 기술을 체험해보세요.
                </div>
            </div>

            <div class="first-row flex justify-between mx-[13px] relative gap-x-[30px]">
                <div class="image-wrapper w-full w-[25%] max-w-[80px] z-30">
                    <img class="w-full h-full" src="@/assets/images/sub/intro_image1@1x.jpg" />
                </div>
                <div class="image-wrapper w-full w-[25%] max-w-[80px] z-30">
                    <img class="w-full h-full" src="@/assets/images/sub/intro_image2@1x.jpg" />
                </div>
                <div class="image-wrapper w-full w-[25%] max-w-[80px] z-30">
                    <img class="w-full h-full" src="@/assets/images/sub/intro_image3@1x.jpg" />
                </div>
                <div
                    class="blue-bar absolute border-t-[1px] border-t-[--color-main-blue] absolute top-[50%] left-[38px] max-w-[--body-width] w-[100%] z-[-1]"
                ></div>
            </div>
            <div class="first-text-row flex justify-between mx-[13px] mt-[10px]">
                <div
                    class="w-[25%] max-w-[80px] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center"
                >
                    전문 상담과 <br />
                    예약 확정
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center"
                >
                    직영팀장님의 <br />
                    사전 해피콜
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center"
                >
                    현장 투입 및<br />
                    특이사항 체크
                </div>
            </div>

            <div class="second-row flex justify-center gap-x-[42px] relative mt-[15px]">
                <div class="image-wrapper w-[25%] max-w-[80px] z-30">
                    <img class="w-full h-full" src="@/assets/images/sub/intro_image4@1x.jpg" />
                </div>
                <div class="image-wrapper w-[25%] max-w-[80px] z-30">
                    <img class="w-full h-full" src="@/assets/images/sub/intro_image5@1x.jpg" />
                </div>
                <div
                    class="blue-bar absolute border-t-[1px] border-t-[--color-main-blue] absolute top-[50%] right-[88px] max-w-[--body-width] w-[100%] z-[-1]"
                ></div>
            </div>
            <div class="second-text-row flex justify-center gap-x-[42px] mt-[10px]">
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center"
                >
                    구역별 <br />
                    알맞은 약품청소
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center"
                >
                    고객님과 함께<br />
                    현장 검수 및 완료
                </div>
            </div>
        </div>
    </div>
</template>
