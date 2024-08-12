<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import { type SubServiceType } from '@/utils/types';

export default defineComponent({
    name: 'SubService',
    props: {
        mainTitle: { type: String as PropType<string>, required: false },
        mainSub: { type: String as PropType<string>, required: false },
        dataList: { type: Array as PropType<Array<SubServiceType>>, required: true }
    },
    setup(props) {
        const compTitle = computed(() => props.mainTitle);
        const compSub = computed(() => props.mainSub);
        const compDataList = computed(() => props.dataList);

        return {
            compTitle,
            compSub,
            compDataList
        };
    }
});
</script>

<template>
    <div class="service-wrapper max-w-[--body-width] mb-[160px] w-[--body-ratio]">
        <div class="text-area mb-[30px]">
            <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]">
                {{ compTitle ?? '궁금하신 내용을 한눈에 확인하세요.' }}
            </div>
            <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                {{ compSub ?? '클리닉의 철학을 가지고 고객님께 서비스를 제공합니다.' }}
            </div>
        </div>
        <div class="service-content">
            <div class="service-area grid grid-cols-2 gap-[20px]" :class="[dataList.length === 3 ? 'third-grid' : '']">
                <div
                    v-for="(data, index) in dataList"
                    :key="index"
                    class="service-box min-h-[140px] bg-[--color-skyblue] flex items-center pl-[30px] pr-[25px] py-[20px]"
                >
                    <img v-if="index == 0" class="w-[55px] h-[55px] mr-[20px]" :src="data.src" />
                    <img
                        v-else-if="index == 1"
                        class="w-[55px] h-[55px] mr-[20px]"
                        :src="data.src"
                    />
                    <img
                        v-else-if="index == 2"
                        class="w-[55px] h-[55px] mr-[20px]"
                        :src="data.src"
                    />
                    <img v-else class="w-[55px] h-[55px] mr-[20px]" :src="data.src" />
                    <div class="text">
                        <div
                            class="title text-[--color-text-black] text-[24px] font-[600] leading-[28px] mb-[10px]"
                        >
                            {{ data.title }}
                        </div>
                        <div
                            class="desc text-[--color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"
                        >
                            {{ data.desc }}
                        </div>
                        <div
                            v-if="data.ext"
                            class="desc text-[--color-text-gray] text-[16px] font-[500] leading-[26px]"
                        >
                            {{ data.ext }}
                        </div>
                    </div>
                </div>

                <!--            <div-->
                <!--                class="service-box max-w-[430px] h-[140px] bg-[&#45;&#45;color-skyblue] flex items-center px-[30px]"-->
                <!--            >-->
                <!--                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />-->
                <!--                <div class="text">-->
                <!--                    <div-->
                <!--                        class="title text-[&#45;&#45;color-text-black] text-[24px] font-[600] leading-[28px]"-->
                <!--                    >-->
                <!--                        작업인원-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                        class="desc text-[&#45;&#45;color-text-black] text-[18px] font-[500] leading-[26px]"-->
                <!--                    >-->
                <!--                        전문교육을 받은 1~2명의 작업자와 <br />-->
                <!--                        팀장이 함께 관리합니다.-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div-->
                <!--                class="service-box max-w-[430px] h-[140px] bg-[&#45;&#45;color-skyblue] flex items-center px-[30px]"-->
                <!--            >-->
                <!--                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />-->
                <!--                <div class="text">-->
                <!--                    <div-->
                <!--                        class="title text-[&#45;&#45;color-text-black] text-[24px] font-[600] leading-[28px]"-->
                <!--                    >-->
                <!--                        작업인원-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                        class="desc text-[&#45;&#45;color-text-black] text-[18px] font-[500] leading-[26px]"-->
                <!--                    >-->
                <!--                        전문교육을 받은 1~2명의 작업자와 <br />-->
                <!--                        팀장이 함께 관리합니다.-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div-->
                <!--                class="service-box max-w-[430px] h-[140px] bg-[&#45;&#45;color-skyblue] flex items-center px-[30px]"-->
                <!--            >-->
                <!--                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />-->
                <!--                <div class="text">-->
                <!--                    <div-->
                <!--                        class="title text-[&#45;&#45;color-text-black] text-[24px] font-[600] leading-[28px]"-->
                <!--                    >-->
                <!--                        작업인원-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                        class="desc text-[&#45;&#45;color-text-black] text-[18px] font-[500] leading-[26px]"-->
                <!--                    >-->
                <!--                        전문교육을 받은 1~2명의 작업자와 <br />-->
                <!--                        팀장이 함께 관리합니다.-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div-->
                <!--                class="service-box max-w-[430px] h-[140px] bg-[&#45;&#45;color-skyblue] flex items-center px-[30px]"-->
                <!--            >-->
                <!--                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />-->
                <!--                <div class="text">-->
                <!--                    <div-->
                <!--                        class="title text-[&#45;&#45;color-text-black] text-[24px] font-[600] leading-[28px]"-->
                <!--                    >-->
                <!--                        작업인원-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                        class="desc text-[&#45;&#45;color-text-black] text-[18px] font-[500] leading-[26px]"-->
                <!--                    >-->
                <!--                        전문교육을 받은 1~2명의 작업자와 <br />-->
                <!--                        팀장이 함께 관리합니다.-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--            </div>-->
            </div>

            <!--            <div v-else-if="dataList && dataList.length === 3" class="service-area third-grid grid grid-cols-2 gap-[20px]">-->
            <!--              <div-->
            <!--                  v-for="(data, index) in dataList"-->
            <!--                  :key="index"-->
            <!--                  class="service-box min-h-[140px] bg-[&#45;&#45;color-skyblue] flex items-center pl-[30px] pr-[25px] py-[20px]"-->
            <!--              >-->
            <!--                <img v-if="index == 0" class="w-[55px] h-[55px] mr-[20px]" :src="data.src" />-->
            <!--                <img-->
            <!--                    v-else-if="index == 1"-->
            <!--                    class="w-[55px] h-[55px] mr-[20px]"-->
            <!--                    :src="data.src"-->
            <!--                />-->
            <!--                <img-->
            <!--                    v-else-if="index == 2"-->
            <!--                    class="w-[55px] h-[55px] mr-[20px]"-->
            <!--                    :src="data.src"-->
            <!--                />-->
            <!--                <img v-else class="w-[55px] h-[55px] mr-[20px]" :src="data.src" />-->
            <!--                <div class="text">-->
            <!--                  <div-->
            <!--                      class="title text-[&#45;&#45;color-text-black] text-[24px] font-[600] leading-[28px] mb-[10px]"-->
            <!--                  >-->
            <!--                    {{ data.title }}-->
            <!--                  </div>-->
            <!--                  <div-->
            <!--                      class="desc text-[&#45;&#45;color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"-->
            <!--                  >-->
            <!--                    {{ data.desc }}-->
            <!--                  </div>-->
            <!--                  <div-->
            <!--                      v-if="data.ext"-->
            <!--                      class="desc text-[&#45;&#45;color-text-gray] text-[16px] font-[500] leading-[26px]"-->
            <!--                  >-->
            <!--                    {{ data.ext }}-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
        </div>
    </div>
</template>
