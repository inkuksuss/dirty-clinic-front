<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import { useStore } from '@/stores/store';
import { type SubIntroType, SubPageType } from '@/utils/types';
import ClinicImage from '@/components/common/ClinicImage.vue';

export default defineComponent({
    name: 'SubIntro',
    components: { ClinicImage },
    props: {
        dataList: {
            type: Array as PropType<SubIntroType[]>,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const compWidth = computed(() => store.width);
        const compIntroList = computed(() => props.dataList);

        return { compWidth, compIntroList };
    }
});
</script>

<template>
    <!-- 430 -->
    <div class="intro-wrapper w-full flex-center w-full">
        <div
            v-if="compWidth > 430"
            class="intro-contents mt-[100px] mb-[80px] flex flex-col max-w-[--body-width] w-[--body-ratio]"
        >
            <div class="text-area w-[--body-width] mb-[30px]">
                <div
                    class="text-main text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    우리는 이렇게 청소합니다.
                </div>
                <div
                    class="text-sub text-[--color-text-black] text-[18px] font-[500] leading-[26px]"
                >
                    {{ compIntroList.length }}단계로 나눠진 더티클리닉만의 특별한 기술을
                    체험해보세요.
                </div>
            </div>

            <div class="image-area w-full flex justify-between">
                <div v-if="compIntroList.length < 7" class="w-full flex justify-between">
                    <div v-for="(data, idx) in compIntroList" :key="idx" class="">
                        <div class="image-wrapper w-full max-h-[150px]">
                            <clinic-image class="w-full h-full rounded-[50%]" :src="data.src" />
                        </div>
                        <div
                            class="mt-[20px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                        >
                            {{ data.title }}
                        </div>
                    </div>
                </div>
                <div v-else class="two-line w-full grid grid-cols-6 grid-rows-2 gap-y-[40px]">
                    <div
                        v-for="(data, idx) in compIntroList"
                        :key="idx"
                        class="content-box flex flex-col items-center"
                    >
                        <div class="image-wrapper w-full max-w-[125px] max-h-[125px]">
                            <clinic-image class="w-full h-full rounded-[50%]" :src="data.src" />
                        </div>
                        <div
                            class="mt-[20px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                        >
                            {{ data.title }}
                        </div>
                    </div>
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
                    class="w-[25%] max-w-[80px] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ compIntroList[0].title }}
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ compIntroList[1].title }}
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ compIntroList[2].title }}
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
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ compIntroList[3].title }}
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ compIntroList[4].title }}
                </div>
            </div>
        </div>
    </div>
</template>
