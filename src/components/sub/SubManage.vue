<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';

type ManageInfo = {
    title: string;
    content: Array<{ main: string; sub?: string }>;
    icon: string;
    isOpen: boolean;
};

export default defineComponent({
    name: 'SubManage',
    props: {
        title: {
            type: String as PropType<string>,
            default: '어디까지 관리 되나요?'
        },
        desc: {
            type: String as PropType<string>,
            default: '클리닉의 철학을 가지고 고객님께 서비스를 제공합니다.'
        },
        manageList: {
            type: Array as PropType<Array<ManageInfo>>,
            required: false
        }
    },
    setup(props) {
        const defaultScript = [
            {
                title: '거실',
                content: [
                    { main: '창문, 창틀 청소', sub: '외부창 제외' },
                    { main: '몰딩 부분 오염도 제거' },
                    { main: '벽 먼지 제거' },
                    { main: '콘센트 먼지 제거' },
                    { main: '문 먼지 제거' },
                    { main: '바닥 오염 제거' },
                    { main: '찌든때, 먼지 제거' },
                    { main: '걸레받이 오염 제거' },
                    { main: '서랍장 탈거 후 청소' },
                    { main: '바닥 자재 강무리일 경우 물청소 X', sub: '파손대비' },
                    {
                        main: '먼지 흡입 및 닦는 과정 반복',
                        sub: '어느정도 먼지가 남아있을 수 있습니다.'
                    }
                ],
                icon: 'src/assets/images/icons/living_room.svg',
                isOpen: false
            },
            {
                title: '화장실, 욕실',
                content: [
                    { main: '선반장 청소' },
                    { main: '거울, 유리부스 청소' },
                    { main: '타일 벽 청소' },
                    { main: '세면대 청소' },
                    { main: '변기, 욕실 청소' },
                    { main: '하수구 커버 분리, 세척 오염 제거, 약품 살균, 소독' },
                    { main: '환풍구 탈거 청소' }
                ],
                icon: 'src/assets/images/icons/bath_room.svg',
                isOpen: false
            },
            {
                title: '주방',
                content: [
                    {
                        main: '싱크대 내외부, 가스레인지 분해 후 청소, 후드 망 탈거 후 청소, 주방 상하부장 내외부 청소'
                    },
                    { main: '서랍장 탈거 후 청소' },
                    { main: '빌트인 냉장고, 세탁기, 오븐 등 가전제품 내부청소는 별도' }
                ],
                icon: 'src/assets/images/icons/kitchen.svg',
                isOpen: false
            },
            {
                title: '베란다, 다용도실',
                content: [
                    { main: '베란다 창문 청소', sub: '1, 3면 외부 창문 제외' },
                    { main: '빨래건조대 청소', sub: '간단한 먼지 제거' },
                    { main: '베란다 바닥 오염 제거' },
                    { main: '배수구 안쪽 부속품', sub: '탈거, 세척, 소독, 살균, 건조순으로 작업' }
                ],
                icon: 'src/assets/images/icons/veranda.svg',
                isOpen: false
            },
            {
                title: '방',
                content: [
                    { main: '창문, 창틀 청소', sub: '외부창 제외' },
                    { main: '몰딩 부분 오염도 제거' },
                    { main: '벽 먼지 제거' },
                    { main: '콘센트 먼지 제거' },
                    { main: '문 먼지 제거' },
                    { main: '바닥 오염 제거' },
                    { main: '찌든때, 먼지 제거' },
                    { main: '걸레받이 오염 제거' },
                    { main: '서랍장 탈거 후 청소' },
                    { main: '바닥 자재 강무리일 경우 물청소 X', sub: '파손대비' },
                    {
                        main: '먼지 흡입 및 닦는 과정 반복',
                        sub: '어느정도 먼지가 남아있을 수 있습니다.'
                    }
                ],
                icon: 'src/assets/images/icons/room.svg',
                isOpen: false
            },
            {
                title: '현관',
                content: [
                    { main: '신발장, 수납장 탈거 후 청소' },
                    { main: '벽면 먼지 제거' },
                    { main: '천장 몰딩 얼룩 및 먼지제거' },
                    { main: '※ 외부 창 불가능' },
                    { main: '인체에 무해한 친환경약품 사용', sub: '참맑은퐁퐁, PB-1 등' },
                    {
                        main: '청소하다 생긴 작업 쓰레기는 한곳에 모아드립니다.',
                        sub: '폐기물, 쓰레기 처리는 추가요금 발생'
                    }
                ],
                icon: 'src/assets/images/icons/entrance.svg',
                isOpen: false
            }
        ];

        const scriptList = ref<ManageInfo[]>([]);
        const compTitle = computed(() => props.title);
        const compDesc = computed(() => props.desc);

        const handleClick = (info: ManageInfo) => {
            const open = scriptList.value.find((m) => m.isOpen);
            openClear();
            if (!open || open.title !== info.title) {
                info.isOpen = true;
            }
        };

        const openClear = () => {
            scriptList.value.forEach((m) => (m.isOpen = false));
        };

        const doOverwriteScript = () => {
            if (props.manageList) scriptList.value = props.manageList;
            else scriptList.value = defaultScript;
        };

        onMounted(() => doOverwriteScript());

        return {
            scriptList,
            compTitle,
            compDesc,
            handleClick
        };
    }
});
</script>

<template>
    <div class="manage-wrapper bg-[--color-skyblue] w-full pt-[85px] pb-[85px] flex justify-center">
        <div class="manage-contents max-w-[--body-width] w-[73%] flex flex-col">
            <div class="text-area mb-[30px]">
                <div
                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    {{ compTitle }}
                </div>
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                    {{ compDesc }}
                </div>
            </div>
            <div class="list-area grid grid-cols-2 gap-[20px]">
                <div
                    v-for="(info, idx) in scriptList"
                    :key="idx"
                    class="content-wrapper relative max-w-[430px] h-[80px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] px-[30px] flex justify-between items-center"
                    :class="{ active: info.isOpen }"
                    @click="() => handleClick(info)"
                >
                    <div class="body flex items-center">
                        <img class="mr-[20px]" :src="info.icon" />
                        <span
                            class="text-[--color-text-black] text-[24px] font-[600] leading-[26px]"
                            >{{ info.title }}</span
                        >
                    </div>
                    <img class="arrow" src="@/assets/images/icons/arrow_down.svg" alt="arrow" />

                    <transition name="slide-fade" mode="out-in" class="w-full">
                        <div
                            v-if="info.isOpen"
                            class="info-label absolute max-w-[430px] top-[77px] left-[-1.5px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] z-10"
                        >
                            <div
                                v-for="(content, idx) in info.content"
                                :key="new Date().getTime() + '_' + idx"
                                class="info-box flex py-[15px] px-[30px]"
                            >
                                <img class="mr-[10px]" src="@/assets/images/icons/check.svg" />
                                <span
                                    class="mr-[10px] text-[--color-text-black] text-[20px] font-[500] leading-[26px]"
                                    >{{ content.main }}</span
                                >
                                <span
                                    class="text-[--color-text-gray] text-[16px] font-[500] leading-[26px]"
                                    v-if="content.sub"
                                    >{{ content.sub }}</span
                                >
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
