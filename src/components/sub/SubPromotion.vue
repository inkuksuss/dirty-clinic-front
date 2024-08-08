<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import { useStore } from '@/stores/store';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';
import ClinicImage from '@/components/common/ClinicImage.vue';
import { SubPageType, type SubPromotionType } from '@/utils/types';

type data = {
    profile: string;
    mainImg: string;
    subList: SubPromotionType[];
};

export default defineComponent({
    name: 'SubPromotion',
    components: { ClinicImage, Flicking: Flicking },
    props: {
        pageType: {
            type: String as PropType<SubPageType>,
            required: true
        },
        dataList: {
            type: Array as PropType<SubPromotionType[]>,
            required: false
        }
    },
    setup(props) {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const compPageType = computed(() => props.pageType);
        const compDataList = computed(() => props.dataList);
        const title = ref<string>();
        const desc = ref<string>();
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });

        onMounted(() => {
            switch (compPageType.value) {
                case SubPageType.REGULAR:
                    title.value = '정기 청소는 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '정기 청소 상담 시 청소 횟수, 청소 구역등을 상세하게 알려주세요.\n더 정확한 상담을 진행해 드리겠습니다.';
                    break;
                case SubPageType.FIRE:
                    title.value = '화재청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.TRASH:
                    title.value = '쓰레기집 청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.KEEPSAKE:
                    title.value = '유품·고독사 청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.WASTE:
                    title.value = '폐기물처리 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.COMPLETION:
                    title.value = '준공청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.PARKING:
                    title.value = '주차장 청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.WALL:
                    title.value = '건물외벽 청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.FACTORY:
                    title.value = '공장청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.SCHOOL:
                    title.value = '학교청소 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.MOLD:
                    title.value = '곰팡이 제거·차단 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.WAX:
                    title.value = '바닥왁스 코팅 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.COATING:
                    title.value = '코팅 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.GRINDING:
                    title.value = '연마 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                default:
                    title.value = '한눈에 보는 가격표로 쉽게 결정하세요.';
                    desc.value = '해당 청소 가격표를 노출하려고 합니다.';
            }
        });

        const parseUrl = (url: string): string => {
            return new URL(url, import.meta.url.replace('/src/components/sub', '')).href;
        };

        const noPriceList = [SubPageType.FIRE];

        return {
            compIsMobile,
            compDataList,
            plugins: [autoPlay],
            title,
            desc,
            SubPageType,
            compPageType,
            noPriceList,
            parseUrl
        };
    }
});
</script>

<template>
    <div
        class="promotion-wrapper w-full mt-[80px] flex justify-center"
        :class="[
            SubPageType.REGULAR === compPageType
                ? 'mb-[50px]'
                : noPriceList.includes(compPageType)
                  ? 'mb-0'
                  : 'mb-[160px]'
        ]"
    >
        <div v-if="!compIsMobile" class="promotion-content max-w-[--body-width] w-[--body-ratio]">
            <div
                class="text-area"
                :class="[noPriceList.includes(compPageType) ? 'mb-[50px]' : 'mb-[30px]']"
            >
                <div
                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    {{ title }}
                </div>
                <div
                    class="text-[--color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"
                >
                    {{ desc }}
                </div>
            </div>

            <!-- 원룸 -->
            <div v-if="compPageType === SubPageType.ONE_ROOM">
                <div class="w-full h-max mb-[50px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/one_room.png')"
                        class="w-full h-full"
                    />
                </div>
            </div>
            <!-- 부분 -->
            <div v-else-if="compPageType === SubPageType.SPOT">
                <div class="w-full">
                    <div class="mb-[20px]">
                        <span class="text-[32px] font-[700] leading-[38px] mr-[15px]">창틀</span>
                        <span class="text-[16px] font-[500] leading-[26px] text-[--color-text-gray]"
                            >*전체 단가는 공실 기준입니다.</span
                        >
                    </div>
                    <div class="w-full h-max mb-[50px]">
                        <clinic-image
                            :src="parseUrl('src/assets/images/sub/price/spot_window.png')"
                            class="w-full h-full"
                        />
                    </div>
                </div>
                <div class="w-full">
                    <div class="mb-[20px]">
                        <span class="text-[32px] font-[700] leading-[38px] mr-[15px]">화장실</span>
                        <span class="text-[16px] font-[500] leading-[26px] text-[--color-text-gray]"
                            >*전체 단가는 공실 기준입니다.</span
                        >
                    </div>
                    <div class="w-full h-max mb-[50px]">
                        <clinic-image
                            :src="parseUrl('src/assets/images/sub/price/spot_bath.png')"
                            class="w-full h-full"
                        />
                    </div>
                </div>
                <div class="w-full">
                    <div class="mb-[20px]">
                        <span class="text-[32px] font-[700] leading-[38px] mr-[15px]">베란다</span>
                        <span class="text-[16px] font-[500] leading-[26px] text-[--color-text-gray]"
                            >*전체 단가는 공실 기준입니다.</span
                        >
                    </div>
                    <div class="w-full h-max mb-[50px]">
                        <clinic-image
                            :src="parseUrl('src/assets/images/sub/price/spot_veranda.png')"
                            class="w-full h-full"
                        />
                    </div>
                </div>
                <div class="w-full">
                    <div class="mb-[20px]">
                        <span class="text-[32px] font-[700] leading-[38px] mr-[15px]">주방</span>
                        <span class="text-[16px] font-[500] leading-[26px] text-[--color-text-gray]"
                            >*전체 단가는 공실 기준입니다.</span
                        >
                    </div>
                    <div class="w-full h-max mb-[50px]">
                        <clinic-image
                            :src="parseUrl('src/assets/images/sub/price/spot_kitchen.png')"
                            class="w-full h-full"
                        />
                    </div>
                </div>
            </div>
            <!-- 외창 -->
            <div v-else-if="compPageType === SubPageType.WINDOW">
                <div class="w-full h-max">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/window.png')"
                        class="w-full h-full"
                    />
                </div>
            </div>
            <!-- 입주 -->
            <div v-else-if="compPageType === SubPageType.MOVE_IN" class="mb-[50px]">
                <div class="w-full h-max mb-[15px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/move_in.png')"
                        class="w-full h-full"
                    />
                </div>
                <span class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px]"
                    >* 해당 견적은 확장형 기준으로 정확한 견적은 홈페이지 좌측하단의 견적보기를
                    확인하세요.</span
                >
            </div>
            <!-- 이사 -->
            <div v-else-if="compPageType === SubPageType.MOVING" class="mb-[50px]">
                <div class="w-full h-max mb-[15px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/moving.png')"
                        class="w-full h-full"
                    />
                </div>
                <span class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px]"
                    >* 해당 견적은 확장형 기준으로 정확한 견적은 홈페이지 좌측하단의 견적보기를
                    확인하세요.</span
                >
            </div>
            <!-- 인테리어 -->
            <div v-else-if="compPageType === SubPageType.INTERIOR" class="mb-[50px]">
                <div class="w-full h-max mb-[15px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/interior.png')"
                        class="w-full h-full"
                    />
                </div>
                <span class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px]"
                    >* 해당 견적은 확장형 기준으로 정확한 견적은 홈페이지 좌측하단의 견적보기를
                    확인하세요.</span
                >
            </div>
            <!-- 거주대청소 -->
            <div v-else-if="compPageType === SubPageType.RESIDENTIAL" class="mb-[50px]">
                <div class="w-full h-max mb-[15px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/residential.png')"
                        class="w-full h-full"
                    />
                </div>
                <span class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px]"
                    >* 해당 견적은 확장형 기준으로 정확한 견적은 홈페이지 좌측하단의 견적보기를
                    확인하세요.</span
                >
            </div>
            <!-- 사무실 -->
            <div v-else-if="compPageType === SubPageType.OFFICE" class="mb-[50px]">
                <div class="w-full h-max mb-[15px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/office.png')"
                        class="w-full h-full"
                    />
                </div>
                <span class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px]"
                    >* 외부창문, 화장실 청소 제외된 기본 단가입니다.<br />20평 이상의 경우나
                    바닥코팅, 시스템에어컨 청소 등 특수한 경우는 상담원과 상담이 필요합니다.</span
                >
            </div>
            <!-- 상가매장 -->
            <div v-else-if="compPageType === SubPageType.STORE" class="mb-[50px]">
                <div class="w-full h-max mb-[15px]">
                    <clinic-image
                        :src="parseUrl('src/assets/images/sub/price/store.png')"
                        class="w-full h-full"
                    />
                </div>
                <span class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px]"
                    >* 외부창문, 화장실 청소 제외된 기본 단가입니다.<br />20평 이상의 경우나
                    바닥코팅, 시스템에어컨 청소 등 특수한 경우는 상담원과 상담이 필요합니다.</span
                >
            </div>

            <!--박스-->
            <div class="sub-promotion-list w-full h-max flex justify-between">
                <div
                    v-if="compDataList && compDataList.length < 3"
                    class="sub-promotion double inline-flex justify-between w-full h-max"
                >
                    <div
                        v-for="(prom, index) in compDataList"
                        :key="index"
                        class="promotion-box max-w-[430px] w-[49%] max-h-[180px] flex-center relative"
                    >
                        <clinic-image :src="prom.src" class="w-full max-h-[180px]" />
                    </div>
                </div>

                <div v-else class="sub-promotion multi w-full flex">
                    <Flicking
                        class="flicking-area flex overflow-hidden"
                        :plugins="plugins"
                        :options="{ circular: true, panelsPerView: 2, renderOnlyVisible: true }"
                    >
                        <div
                            v-for="(prom, index) in compDataList"
                            :key="index"
                            class="promotion-box w-[49%] flex-center relative mx-[10px]"
                        >
                            <img :src="prom.src" class="w-full" />
                            <div class="text-box w-[82%] h-[65%] absolute top-[22%] left-[9%]">
                                <div
                                    class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                                >
                                    더티클리닉의 꺠끗함을 만나보세요. {{ index }}
                                </div>
                                <div
                                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                                >
                                    프로모션 50%
                                </div>
                            </div>
                        </div>
                    </Flicking>
                </div>
            </div>
        </div>

        <!-- isMobile -->
        <div v-else class="promotion-content mobile max-w-[608px] w-full mx-[25px]">
            <div class="text-area mb-[30px]">
                <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]">
                    한눈에 보는 가격표를 쉽게 결정하세요.
                </div>
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                    해당 장소 가격 노출
                </div>
            </div>
            <div class="main-image w-full max-h-[430px] h-max mb-[20px]">
                <!--                <img :src="mainImg" class="w-full h-full max-h-[430px]" />-->
            </div>

            <div class="sub-promotion-list">
                <div
                    v-if="compDataList && compDataList.length === 1"
                    class="sub-promotion single w-full max-h-[180px] h-max inline-flex"
                >
                    <div class="promotion-box w-full max-h-[180px] relative">
                        <img :src="compDataList[0].img" class="w-full max-h-[180px]" />
                        <div class="text-box w-[82%] h-[65%] absolute top-[17.5%] left-[6%]">
                            <div
                                class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                            >
                                더티클리닉의 꺠끗함을 만나보세요.
                            </div>
                            <div
                                class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                            >
                                프로모션 50%
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="sub-promotion w-full">
                    <Flicking
                        class="flicking-area flex overflow-hidden"
                        :plugins="plugins"
                        :options="{ circular: true, panelsPerView: 1, renderOnlyVisible: false }"
                    >
                        <div
                            v-for="(prom, index) in compDataList"
                            :key="index"
                            class="promotion-box max-w-[608px] w-full max-h-[180px] flex-center relative"
                        >
                            <img :src="prom.src" class="w-full max-h-[180px]" />
                            <div class="text-box w-[82%] h-[65%] absolute top-[22%] left-[9%]">
                                <div
                                    class="text-[--color-text-black] text-[18px] font-[500] leading-[21px]"
                                >
                                    더티클리닉의 꺠끗함을 만나보세요. {{ index }}
                                </div>
                                <div
                                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px]"
                                >
                                    프로모션 50%
                                </div>
                            </div>
                        </div>
                    </Flicking>
                </div>
            </div>
        </div>
    </div>
</template>
