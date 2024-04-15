<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from "@/stores/store";

type HomeServiceType = {
    title: string;
    desc: string;
    link: string;
};

export default defineComponent({
    name: 'HomeService',
    setup() {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const router = useRouter();
        const scriptList: HomeServiceType[] = [
            {
                title: '전문클리닉',
                desc: '첫번째 약속에 대한\n설명을 여기에 작성합니다.',
                link: ''
            },
            {
                title: '특수클리닉',
                desc: '첫번째 약속에 대한\n설명을 여기에 작성합니다.',
                link: ''
            },
            {
                title: '전문시공',
                desc: '첫번째 약속에 대한\n설명을 여기에 작성합니다.',
                link: ''
            },
            {
                title: '연마/코팅',
                desc: '첫번째 약속에 대한\n설명을 여기에 작성합니다.',
                link: ''
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
    <div class="service-wrapper w-[--body-width] mb-[50px] mt-[100px]">
        <div class="service-contents w-full">
            <div class="text-wrapper w-full flex flex-col items-center mb-[30px]">
                <span
                    class="text-title text-[32px] font-[700] text-[--color-text-black] leading-[38px] mb-[10px]"
                    >더티클리닉의 대표서비스</span
                >
                <span
                    class="text-sub text-[18px] font-[500] text-[--color-text-black] leading-[21px]"
                    >최고의 만족도를 선사하기 위한 <br class="break-m">더티클리닉의 핵심부서를 소개합니다.</span
                >
            </div>
            <div class="contents-wrapper grid grid-cols-2 gap-x-[20px]">
                <div v-for="(script, idx) in scriptList" :key="idx">
                    <img
                        v-if="idx === 0"
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/service_1@1x.png"
                        alt="test"
                    />
                    <img
                        v-else-if="idx === 1"
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/service_2@1x.png"
                        alt="test"
                    />
                    <img
                        v-else-if="idx === 2"
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/service_3@1x.png"
                        alt="test"
                    />
                    <img
                        v-else
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/service_4@1x.png"
                        alt="test"
                    />
                    <div class="description flex justify-between mb-[50px]">
                        <div class="description-text flex flex-col justify-between">
                            <span
                                class="description-title text-[26px] font-[600] text-[--color-text-black] leading-[31px] mb-[13px]"
                                >{{ script.title }}</span
                            >
                            <span
                                class="description-sub text-[18px] font-[500] text-[--color-text-black] leading-[21px] whitespace-pre-wrap"
                                >{{ script.desc }}</span
                            >
                        </div>
                        <div
                            @click="() => handleClickBtn(script.link)"
                            class="description-button bg-[--color-gray] w-[100px] h-[40px] rounded-[90px] flex-center mt-[23px] cursor-pointer"
                        >
                            <span
                                class="text-[18px] font-[500] text-[--color-text-black] leading-[21px]"
                                >more</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
