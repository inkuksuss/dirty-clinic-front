<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import { useStore } from '@/stores/store';
import { type SubIntroScript } from '@/utils/types';

export default defineComponent({
    name: 'SubIntro',
    props: {
        introScriptList: Array as PropType<SubIntroScript[]>
    },
    setup(props) {
        const store = useStore();
        const compWidth = computed(() => store.width);

        const scriptList = ref<SubIntroScript[]>([
            { title: '전문 상담과\n예약 확정' },
            { title: '해피콜과\n특이사항 체크' },
            { title: '현장의 특이사항\n체크' },
            { title: '알맞는 약품청소' },
            { title: '고객님과 함께\n현장 검수 및 완료' }
        ]);

        onMounted(() => {
            if (props.introScriptList && props.introScriptList.length > 0)
                scriptList.value = props.introScriptList;
        });

        return { compWidth, scriptList };
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
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[0].title }}
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[1].title }}
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[2].title }}
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[3].title }}
                </div>
                <div
                    class="w-[17%] max-w-[150px] text-[--color-text-black] w-[150px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[4].title }}
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
                    {{ scriptList[0].title }}
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[1].title }}
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[2].title }}
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
                    {{ scriptList[3].title }}
                </div>
                <div
                    class="w-[25%] text-[--color-text-black] w-[150px] text-[14px] font-[400] leading-[17px] text-center whitespace-pre-wrap"
                >
                    {{ scriptList[4].title }}
                </div>
            </div>
        </div>
    </div>
</template>
