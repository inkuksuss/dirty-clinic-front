<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/stores/store';

export default defineComponent({
    name: 'HomeIntro',
    setup() {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        return {
            compIsMobile
        };
    }
});
</script>

<template>
    <div class="intro-wrapper w-[--body-width] flex flex-col justify-start mt-[100px] mb-[100px]">
        <div class="text-area mb-[30px]">
            <div class="text-[38px] font-[700] leading-[45px] mb-[10px]">
                더티클리닉은 <br class="break-m" />불가피한 선택입니다.
            </div>
            <div class="text-[18px] font-[500] leading-[21px]">
                최고의 만족도를 선사하기 위한 <br class="break-m" />더티클리닉의 핵심부서를
                소개합니다.
            </div>
        </div>
        <div class="image-area w-full flex justify-between items-start">
            <div class="first-intro content relative w-[32%]">
                <img
                    class="w-full h-full"
                    src="@/assets/images/home/intro_1@1x.png"
                    alt="intro_1"
                />
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <div
                        v-if="compIsMobile"
                        class="m-hover-filter w-full h-full flex flex-col items-center justify-center"
                    >
                        <div
                            class="w-full text-center font-[600] font-[20px] leading-[24px] text-[--color-white] mb-[10px]"
                        >
                            현장사업수행팀
                        </div>
                        <div
                            class="w-full text-center font-[400] font-[16px] leading-[19px] text-[--color-white]"
                        >
                            본사 체계적인 교육 프로세스 이수<br />2~40대로 구성된 젊은 인력<br />수도권
                            전지역에 분포되어 발빠른 대응
                        </div>
                    </div>
                    <img
                        v-else
                        class="h-full w-full"
                        src="@/assets/images/home/intro_1_filter@1x.jpg"
                        alt="intro_1_filter"
                    />
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[30%] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">현장사업수행팀</span>
                </div>
            </div>
            <div class="second-intro content relative w-[32%]">
                <img
                    class="w-full h-full"
                    src="@/assets/images/home/intro_2@1x.png"
                    alt="intro_2"
                />
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <div
                        v-if="compIsMobile"
                        class="m-hover-filter w-full h-full flex flex-col items-center justify-center"
                    >
                        <div
                            class="w-full text-center font-[600] font-[20px] leading-[24px] text-[--color-white] mb-[10px]"
                        >
                            고객지원팀
                        </div>
                        <div
                            class="w-full text-center font-[400] font-[16px] leading-[19px] text-[--color-white]"
                        >
                            친절한 상담과 정확한 견적<br />
                            배상보험가입 및 5일이내 AS보장<br />
                            방문견적 및 현장에 대한 높은 이해
                        </div>
                    </div>
                    <img
                        v-else
                        class="h-full w-full"
                        src="@/assets/images/home/intro_1_filter@1x.jpg"
                        alt="intro_2_filter"
                    />
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[30%] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">고객지원팀</span>
                </div>
            </div>
            <div class="third-intro content relative w-[32%]">
                <img
                    class="w-full h-full"
                    src="@/assets/images/home/intro_3@1x.png"
                    alt="intro_3"
                />
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <div
                        v-if="compIsMobile"
                        class="m-hover-filter w-full h-full flex flex-col items-center justify-center"
                    >
                        <div
                            class="w-full text-center font-[600] font-[20px] leading-[24px] text-[--color-white] mb-[10px]"
                        >
                            연구개발팀
                        </div>
                        <div
                            class="w-full text-center font-[400] font-[16px] leading-[19px] text-[--color-white]"
                        >
                            자체 제작된 교육 프로세스<br />
                            약품과 장비에 대한 끊임없는 연구<br />청소창업을 위한 아카데미 운영
                        </div>
                    </div>
                    <img
                        v-else
                        class="h-full w-full"
                        src="@/assets/images/home/intro_1_filter@1x.jpg"
                        alt="intro_3_filter"
                    />
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[30%] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">연구개발팀</span>
                </div>
            </div>
        </div>
    </div>
</template>
