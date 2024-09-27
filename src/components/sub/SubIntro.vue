<script lang="ts">
import { computed, defineComponent, onMounted, type PropType } from 'vue';
import { useStore } from '@/stores/store';
import { type SubIntroType } from '@/utils/types';
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
    <div class="intro-wrapper w-full flex-center">
        <div
            class="intro-contents mt-[100px] mb-[80px] flex flex-col max-w-[--body-width] w-[--body-ratio]"
        >
            <div class="text-area mb-[30px]">
                <div
                    class="text-main text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    우리는 이렇게 청소합니다.
                </div>
                <div
                    v-if="compIntroList.length > 4"
                    class="text-sub text-[--color-text-black] text-[18px] font-[500] leading-[26px]"
                >
                    {{ compIntroList.length }}단계로 나눠진 더티클리닉만의 특별한 기술을
                    체험해보세요.
                </div>
            </div>

            <div class="image-area flex justify-between">
                <div
                    v-if="compIntroList.length < 7"
                    class="grid-area one-line flex justify-between w-full mb-[70px] gap-x-[20px]"
                >
                    <div v-for="(data, idx) in compIntroList" :key="idx" class="content-box flex flex-col items-center">
                        <div class="image-wrapper flex-center">
                            <clinic-image
                                class="h-full rounded-[50%]"
                                :class="[
                                    compIntroList.length > 5
                                        ? 'w-[125px]'
                                        : compIntroList.length > 4
                                          ? 'w-[150px]'
                                          : 'w-[190px]'
                                ]"
                                :src="data.src"
                            />
                        </div>
                        <div
                            class="text-label mt-[20px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                        >
                            {{ data.title }}
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="grid-area two-line w-full grid grid-cols-6 grid-rows-2 gap-y-[40px] gap-x-[10px]"
                >
                    <div
                        v-for="(data, idx) in compIntroList"
                        :key="idx"
                        class="content-box flex flex-col items-center"
                    >
                        <div class="image-wrapper w-full max-w-[125px] max-h-[125px]">
                            <clinic-image class="w-full h-full rounded-[50%]" :src="data.src" />
                        </div>
                        <div
                            class="text-label mt-[20px] text-[18px] font-[500] leading-[21px] text-center whitespace-pre-wrap"
                        >
                            {{ data.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
