<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import ClinicImage from '@/components/common/ClinicImage.vue';
import { resolveUrl } from '@/utils/common';
import { SubPageType } from '@/utils/types';

type ManageInfo = {
    title: string;
    content: Array<{ main: string; sub?: string }>;
    icon: string;
    isOpen: boolean;
};

export default defineComponent({
    name: 'SubManage',
    methods: { resolveUrl },
    components: { ClinicImage },
    props: {
        title: {
            type: String as PropType<string>
        },
        desc: {
            type: String as PropType<string>,
            required: false
        },
        manageList: {
            type: Array as PropType<Array<ManageInfo>>,
            required: false
        },
        pageType: {
            type: String as PropType<SubPageType>,
            required: false
        },
        mainImg: {
            type: String as PropType<string>,
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
                icon: new URL('@/assets/images/icons/living_room.svg', import.meta.url).href,
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
                icon: new URL('@/assets/images/icons/bath_room.svg', import.meta.url).href,
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
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href,
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
                icon: new URL('@/assets/images/icons/window.svg', import.meta.url).href,
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
                icon: new URL('@/assets/images/icons/room.svg', import.meta.url).href,
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
                icon: new URL('@/assets/images/icons/entrance.svg', import.meta.url).href,
                isOpen: false
            }
        ];

        const scriptList = ref<ManageInfo[]>([]);
        const compTitle = computed(() => props.title);
        const compDesc = computed(() => props.desc);
        const compPageType = computed(() => props.pageType);
        const compMainImg = computed(() => props.mainImg);

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

        const noHeaderList = [SubPageType.FIRE];

        onMounted(() => doOverwriteScript());

        return {
            scriptList,
            compTitle,
            compDesc,
            compPageType,
            SubPageType,
            noHeaderList,
            compMainImg,
            handleClick
        };
    }
});
</script>

<template>
    <div
        class="manage-wrapper bg-[--color-skyblue] w-full pt-[85px] flex justify-center"
        :class="[compPageType === SubPageType.SPOT ? 'pb-0' : 'pb-[85px]']"
    >
        <div class="manage-contents max-w-[--body-width] w-[--body-ratio] flex flex-col">
            <div v-if="!noHeaderList.includes(compPageType)" class="text-area mb-[30px]">
                <div
                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px] whitespace-pre-wrap"
                >
                    {{ compTitle }}
                </div>
                <div
                    v-if="compDesc"
                    class="text-[--color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"
                >
                    {{ compDesc }}
                </div>
            </div>
            <!-- 외창청소 -->
            <div
                v-if="compPageType === SubPageType.WINDOW"
                class="w-full min-h-[228px] flex flex-col bg-[--color-white] border-[1.5px] border-[--color-border-blue]"
            >
                <div
                    class="flex h-[80px] mx-[30px] py-[20px] items-center border-b-[1px] border-b-[--color-border-blue]"
                >
                    <div class="flex-center w-[40px] h-[40px] bg-[--color-skyblue] mr-[20px]">
                        <img src="@/assets/images/icons/window.svg" />
                    </div>
                    <span class="text-[--color-black] font-[600] text-[24px] leading-[26px]"
                        >창문을 전부다 탈거하고 진행하는 방법</span
                    >
                </div>
                <div class="ml-[90px] mr-[30px] py-[30px] flex flex-col">
                    <span
                        class="text-[20px] text-[--color-black] font-[500] mb-[10px] leading-[26px]"
                        >창문이 무겁고 파손위험이 있어 전문성이 필요해요.<br />외부 오염물은
                        간단하게 없어지지 않아요.</span
                    >
                    <span
                        class="text-[16px] text-[--color-text-gray] font-[500] leading-[26px] whitespace-pre-wrap"
                        >*자석을 이용하는 방법은 묶은 때를 벗겨 내기엔 어려워요. 아쉬운 퀄리티로
                        더티클리닉은 이용하지 않는방법이에요. 😢</span
                    >
                </div>
            </div>
            <!-- 정기청소 -->
            <div
                v-else-if="compPageType === SubPageType.REGULAR"
                class="w-full min-h-[224px] flex flex-col bg-[--color-white] border-[1.5px] border-[--color-border-blue] pl-[30px] py-[20px]"
            >
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >사무실에 매일 쓰레기가 넘쳐 버릴 사람이 필요한 경우</span
                    >
                </div>
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >공간 불문 입주청소 이후 정기적인 관리가 필요하신 경우</span
                    >
                </div>
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >거주공간, 기숙사 등 정리정돈과 청소할 시간이 없는 경우</span
                    >
                </div>
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >사람이 많이 다녀 주기적인 바닥청소와 코팅까지 필요하신 경우</span
                    >
                </div>
            </div>
            <!-- 화재청소 -->
            <div
                v-else-if="compPageType === SubPageType.FIRE"
                class="w-full flex justify-between items-center"
            >
                <div class="mr-[50px] min-w-[260px]">
                    <div
                        class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px] whitespace-pre-wrap"
                    >
                        {{ compTitle }}
                    </div>
                    <div
                        v-if="compDesc"
                        class="text-[--color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"
                    >
                        {{ compDesc }}
                    </div>
                </div>
                <div v-if="compMainImg" class="max-w-[430px]">
                    <clinic-image :src="compMainImg"></clinic-image>
                </div>
            </div>

            <div v-else class="list-area grid grid-cols-2 gap-[20px]">
                <div
                    v-for="(info, idx) in scriptList"
                    :key="idx"
                    class="content-wrapper relative h-[80px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] px-[30px] flex justify-between items-center"
                    :class="{ active: info.isOpen }"
                    @click="() => handleClick(info)"
                >
                    <div class="body flex items-center">
                        <clinic-image class="mr-[20px] w-[39px] h-[39px]" :src="info.icon" />
                        <span
                            class="text-[--color-text-black] text-[24px] font-[600] leading-[26px]"
                            >{{ info.title }}</span
                        >
                    </div>
                    <img class="arrow" src="@/assets/images/icons/arrow_down.svg" alt="arrow" />

                    <transition name="slide-fade" mode="out-in" class="w-full">
                        <div
                            v-if="info.isOpen"
                            class="info-label absolute top-[77px] left-[-1.5px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] z-10"
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

            <div
                v-if="pageType === SubPageType.SPOT"
                class="h-[85px] text-[18px] text-[--color-black] font-[400] leading-[26px] pt-[20px]"
            >
                ※ 이외 부분도 부분청소가 가능하니 상담실로 문의주시면 도와드리겠습니다.
            </div>
        </div>
    </div>
</template>
