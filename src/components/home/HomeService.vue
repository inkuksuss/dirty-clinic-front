<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

type HomeServiceType = {
    title: string;
    desc: string;
    link: string;
};

export default defineComponent({
    name: 'HomeService',
    setup() {
        const router = useRouter();
        const scriptList: HomeServiceType[] = [
            {
                title: '전문클리닉',
                desc: '첫번째 약속에 대한\n첫번째 약속에 대한 설명을 여기에',
                link: ''
            },
            {
                title: '특수클리닉',
                desc: '첫번째 약속에 대한\n첫번째 약속에 대한 설명을 여기에',
                link: ''
            },
            {
                title: '전문시공',
                desc: '첫번째 약속에 대한\n첫번째 약속에 대한 설명을 여기에',
                link: ''
            },
            {
                title: '연마/코팅',
                desc: '첫번째 약속에 대한\n첫번째 약속에 대한 설명을 여기에',
                link: ''
            }
        ];

        const handleClickBtn = (link: string) => {
            router.push(link);
        };

        return {
            scriptList,
            handleClickBtn
        };
    }
});
</script>

<template>
    <div class="service-wrapper max-w-[--body-width] w-[73%] mb-[50px] mt-[100px]">
        <div class="service-contents w-full">
            <div class="text-wrapper w-full flex flex-col items-center mb-[30px]">
                <span
                    class="text-title text-[32px] font-[700] text-[--color-text-black] leading-[38px] mb-[10px]"
                    >더티클리닉의 대표서비스</span
                >
                <span
                    class="text-sub text-[18px] font-[500] text-[--color-text-black] leading-[21px]"
                    >여기에 서브 타이틀을 넣으려고 합니다. 원하는 문구 있으신가요?</span
                >
            </div>
            <div class="contents-wrapper grid grid-cols-2 gap-x-[20px]">
                <div v-for="(script, idx) in scriptList" :key="idx">
                    <img
                        v-if="idx === 0"
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/test-img1@1x.jpg"
                        alt="test"
                    />
                    <img
                        v-else-if="idx === 1"
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/test-img1@1x.jpg"
                        alt="test"
                    />
                    <img
                        v-else-if="idx === 2"
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/test-img1@1x.jpg"
                        alt="test"
                    />
                    <img
                        v-else
                        class="w-full mb-[25px]"
                        src="@/assets/images/home/test-img1@1x.jpg"
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
