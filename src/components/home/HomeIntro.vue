<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/stores/store';
import ClinicImage from '@/components/common/ClinicImage.vue';

type data = {
    src: string;
    mobileSrc: string;
    filterSrc: string;
    title: string;
    desc: string;
};

export default defineComponent({
    name: 'HomeIntro',
    components: { ClinicImage },
    setup() {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);

        const dataList = ref<data[]>([
            {
                src: new URL('@/assets/images/home/intro_1.webp', import.meta.url).href,
                mobileSrc: new URL('@/assets/images/home/intro_1_mobile@2x.webp', import.meta.url).href,
                filterSrc: new URL('@/assets/images/home/intro_1_filter.webp', import.meta.url).href,
                title: '현장사업수행팀',
                desc:
                    '본사 체계적인 교육 프로세스 이수\n' +
                    '2~40대로 구성된 젊은 인력\n' +
                    '수도권 전지역에 분포되어 발빠른 대응'
            },
            {
                src: new URL('@/assets/images/home/intro_2.webp', import.meta.url).href,
                mobileSrc: new URL('@/assets/images/home/intro_2_mobile@2x.webp', import.meta.url).href,
                filterSrc: new URL('@/assets/images/home/intro_2_filter.webp', import.meta.url).href,
                title: '고객지원팀',
                desc:
                    '친절한 상담과 정확한 견적\n' +
                    '배상보험가입 및 5일이내 AS보장\n' +
                    '방문견적 및 현장에 대한 높은 이해'
            },
            {
                src: new URL('@/assets/images/home/intro_3.webp', import.meta.url).href,
                mobileSrc: new URL('@/assets/images/home/intro_3_mobile@2x.webp', import.meta.url).href,
                filterSrc: new URL('@/assets/images/home/intro_3_filter.webp', import.meta.url).href,
                title: '연구개발팀',
                desc:
                    '자체 제작된 교육 프로세스\n' +
                    '약품과 장비에 대한 끊임없는 연구\n' +
                    '청소창업을 위한 아카데미 운영'
            }
        ]);

        return {
            compIsMobile,
            dataList
        };
    }
});
</script>

<template>
    <div
        class="intro-wrapper max-w-[--body-width] w-[--body-ratio] flex flex-col justify-start mt-[100px] mb-[100px]"
    >
        <div class="text-area mb-[30px] text-center">
            <div class="text-[38px] font-[700] leading-[45px] mb-[10px]">
                더티클리닉은 <br class="break-m" />불가피한 선택입니다.
            </div>
            <div class="text-[18px] font-[500] leading-[21px]">
                최고의 만족도를 선사하기 위한 <br class="break-m" />더티클리닉의 핵심부서를
                소개합니다.
            </div>
        </div>
        <div class="image-area w-full flex justify-between items-start">
            <div
                v-for="(data, idx) in dataList"
                :key="idx"
                class="intro-box content relative w-[32%]"
            >
                <img v-if="compIsMobile" :src="data.mobileSrc" alt="더티클리닉 부서소개">
                <clinic-image v-else
                    class="w-full"
                    :src="compIsMobile ? data.mobileSrc : data.src"
                ></clinic-image>
                <div class="hover-filter absolute left-0 top-0 w-full h-full hidden">
                    <div
                        v-if="compIsMobile"
                        class="m-hover-filter w-full h-full flex flex-col items-center justify-center"
                    >
                        <div
                            class="w-full text-center font-[600] font-[20px] leading-[24px] text-[--color-white] mb-[10px] whitespace-pre-wrap"
                        >
                            {{ data.title }}
                        </div>
                        <div
                            class="w-full text-center font-[400] font-[16px] leading-[19px] text-[--color-white] whitespace-pre-wrap"
                        >
                            {{ data.desc }}
                        </div>
                    </div>
                    <div v-else class="w-full h-full">
                        <!--                        <div-->
                        <!--                            class="relative w-full h-full flex flex-col justify-center items-center"-->
                        <!--                        >-->
                        <!--                            <div class="text-[&#45;&#45;color-white] text-[24px] font-[700] mb-[15px] z-10">-->
                        <!--                                {{ data.title }}-->
                        <!--                            </div>-->
                        <!--                            <div class="w-[20%] h-[5px] bg-[&#45;&#45;color-white] mb-[20px] z-10"></div>-->
                        <!--                            <div class="text-[&#45;&#45;color-white] text-[18px] font-[500] z-10 text-center whitespace-pre-wrap">-->
                        <!--                                {{ data.desc }}-->
                        <!--                            </div>-->
                        <!--                            <div-->
                        <!--                                class="absolute w-full h-full top-0 left-0 bg-[&#45;&#45;color-black] opacity-40 z-0"-->
                        <!--                            ></div>-->
                        <!--                        </div>-->

                        <clinic-image :src="data.filterSrc" class="w-full"></clinic-image>
                    </div>
                </div>
                <div
                    class="text-label absolute bottom-0 left-0 bg-[--color-main-blue] w-full h-[30%] flex justify-center items-center"
                >
                    <span class="text-[24px] font-[700] text-[--color-white]">{{
                        data.title
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
