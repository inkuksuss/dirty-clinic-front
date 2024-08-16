<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/store';
import ClinicImage from '@/components/common/ClinicImage.vue';

type HomeServiceType = {
    title: string;
    desc: string;
    link: string;
    src: string;
};

export default defineComponent({
    name: 'HomeService',
    components: { ClinicImage },
    setup() {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const router = useRouter();
        const scriptList: HomeServiceType[] = [
            {
                title: '입주청소',
                desc:
                    '새로운 시작을 응원하듯, 쾌적하고 편안한 환경을 제공하여\n' +
                    '첫 입주의 기쁨을 더해줍니다.',
                link: '',
                src: new URL('@/assets/images/home/service_1.webp', import.meta.url).href
            },
            {
                title: '사업장 청소',
                desc:
                    '매장의 이미지와  브랜드 가치를 지키기 위한 마음가짐으로\n' +
                    '고객들이 안심하고 머무를 수 있는 공간을 선사합니다.',
                link: '',
                src: new URL('@/assets/images/home/service_2.webp', import.meta.url).href
            },
            {
                title: '준공청소',
                desc:
                    '전문적이고 성실한 태도로 건축물의 완성도를 높이고,\n' +
                    '깨끗한 환경을 조성합니다.',
                link: '',
                src: new URL('@/assets/images/home/service_3.webp', import.meta.url).href
            },
            {
                title: '화재청소',
                desc:
                    '화재 피해 현장 재건 및 기반 마련을 위해,\n' +
                    '더티클리닉만의 철저한 현장관리 프로세스를 보장합니다.',
                link: '',
                src: new URL('@/assets/images/home/service_4.webp', import.meta.url).href
            }
        ];

        const handleClickBtn = (link: string) => {
            router.push(link);
        };

        return {
            scriptList,
            compIsMobile,
            handleClickBtn
        };
    }
});
</script>

<template>
    <div class="service-wrapper max-w-[--body-width] w-[--body-ratio] mb-[50px] mt-[100px]">
        <div class="service-contents w-full">
            <div class="text-wrapper w-full flex flex-col items-center mb-[30px]">
                <span
                    class="text-title text-[32px] font-[700] text-[--color-text-black] leading-[38px] mb-[10px]"
                    >더티클리닉의 대표서비스</span
                >
                <span
                    class="text-sub text-[18px] font-[500] text-[--color-text-black] leading-[21px]"
                    >최고의 만족도를 선사하기 위한 <br class="break-m" />더티클리닉의 핵심부서를
                    소개합니다.</span
                >
            </div>
            <div class="contents-wrapper grid grid-cols-2 gap-x-[20px]">
                <div v-for="(script, idx) in scriptList" :key="idx">
                    <clinic-image :src="script.src" class="w-full mb-[25px]"></clinic-image>
                    <div class="description w-full flex justify-between mb-[50px]">
                        <div class="description-text w-full flex flex-col justify-between">
                            <div class="flex justify-between items-start w-full">
                                <div
                                    class="description-title w-full text-[26px] font-[600] text-[--color-text-black] leading-[31px] mb-[13px]"
                                >
                                    {{ script.title }}
                                </div>
                                <div
                                    @click="() => handleClickBtn(script.link)"
                                    class="description-button cursor-pointer pr-[20px]"
                                >
                                    <img
                                        src="/assets/images/icons/arrow_down.svg"
                                        class="w-full h-full rotate-[-90deg] w-[25px] h-[25px]"
                                        alt="arrow"
                                    />
                                </div>
                            </div>

                            <span
                                class="description-sub text-[18px] font-[500] text-[--color-text-black] leading-[21px] whitespace-pre-wrap"
                                >{{ script.desc }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
