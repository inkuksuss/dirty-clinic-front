<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';

export type ServiceType = {
    title?: string;
    desc?: string;
    ext?: string;
};

export default defineComponent({
    name: 'SubService',
    props: {
        mainTitle: { type: String as PropType<string>, required: false },
        mainSub: { type: String as PropType<string>, required: false },
        serviceList: { type: Array as PropType<Array<ServiceType>>, required: false }
    },
    setup(props) {
        const defaultServiceScript = [
            {
                title: '작업 인원',
                desc: '전문 교육을 받은 1-2명의 작업자와\n팀장이 함께 관리합니다.'
            },
            {
                title: '작업 가능 지역',
                desc: '수도권 전지역 + 충청권에서 제공합니다.'
            },
            {
                title: '소요 시간',
                desc: '3시간 전후로 최상의 서비스를 제공합니다.',
                ext: '* 현장 상태에 따라 시간을 변동될 수 있습니다.'
            },
            {
                title: 'AS 안내',
                desc: '작업 종류 후 5일이내 1회 가능합니다.',
                ext: '* 이사짐이 들어오거나 추가 시공의 경우 제한됨.'
            }
        ];

        const compTitle = computed(() => props.mainTitle);
        const compSub = computed(() => props.mainSub);

        const scriptList = ref<ServiceType[]>([]);

        const doOverwriteScript = () => {
            if (props.serviceList) {
                scriptList.value = Object.assign(
                    {},
                    defaultServiceScript,
                    props.serviceList
                ) as Array<ServiceType>;
            } else {
                scriptList.value = Object.assign({}, defaultServiceScript);
            }
        };

        onMounted(() => {
            doOverwriteScript();
        });

        return {
            compTitle,
            compSub,
            scriptList
        };
    }
});
</script>

<template>
    <div class="service-wrapper w-[73%] max-w-[--body-width] mb-[160px]">
        <div class="text-area mb-[30px]">
            <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]">
                {{ compTitle ?? '더티클리닉만의 서비스를 경험해보세요.' }}
            </div>
            <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                {{ compSub ?? '클리닉의 철학을 가지고 고객님께 서비스를 제공합니다.' }}
            </div>
        </div>
        <div class="service-area grid grid-rows-2 grid-cols-2 gap-[20px]">
            <div
                v-for="(script, index) in scriptList"
                :key="index"
                class="service-box max-w-[430px] min-h-[140px] bg-[--color-skyblue] flex items-center pl-[30px] pr-[25px] py-[20px]"
            >
                <img
                    v-if="index == 0"
                    class="w-[55px] h-[55px] mr-[20px]"
                    src="@/assets/images/icons/people.svg"
                />
                <img
                    v-else-if="index == 1"
                    class="w-[55px] h-[55px] mr-[20px]"
                    src="@/assets/images/icons/map.svg"
                />
                <img
                    v-else-if="index == 2"
                    class="w-[55px] h-[55px] mr-[20px]"
                    src="@/assets/images/icons/living_room.svg"
                />
                <img
                    v-else
                    class="w-[55px] h-[55px] mr-[20px]"
                    src="@/assets/images/icons/headset.svg"
                />
                <div class="text">
                    <div
                        class="title text-[--color-text-black] text-[24px] font-[600] leading-[28px] mb-[10px]"
                    >
                        {{ script.title }}
                    </div>
                    <div
                        class="desc text-[--color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"
                    >
                        {{ script.desc }}
                    </div>
                    <div
                        v-if="script.ext"
                        class="desc text-[--color-text-gray] text-[16px] font-[500] leading-[26px]"
                    >
                        {{ script.ext }}
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
    </div>
</template>
