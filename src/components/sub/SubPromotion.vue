<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import { useStore } from '@/stores/store';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';
import ClinicImage from '@/components/common/ClinicImage.vue';
import { SubPageType, type SubPriceType, type SubPromotionType } from '@/utils/types';

export default defineComponent({
    name: 'SubPromotion',
    components: { ClinicImage, Flicking: Flicking },
    props: {
        pageType: {
            type: String as PropType<SubPageType>,
            required: true
        },
        priceList: {
            type: Array as PropType<SubPriceType[]>,
            required: false
        },
        promList: {
            type: Array as PropType<SubPromotionType[]>,
            required: false
        },
        promLabel: {
            type: String as PropType<string>,
            required: false
        }
    },
    setup(props) {
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const compPageType = computed(() => props.pageType);
        const compPromLabel = computed(() => props.promLabel);
        const priceDataList = ref<Array<SubPriceType>>([]);
        const promDataList = ref<Array<SubPromotionType>>([]);

        const title = ref<string>();
        const desc = ref<string>();
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });
        const hasPriceList = [
            SubPageType.ONE_ROOM,
            SubPageType.SPOT,
            SubPageType.WINDOW,
            SubPageType.MOVE_IN,
            SubPageType.MOVING,
            SubPageType.INTERIOR,
            SubPageType.RESIDENTIAL,
            SubPageType.OFFICE,
            SubPageType.STORE,
            SubPageType.JOINT,
            SubPageType.RESTAURANT,
            SubPageType.APPLIANCES
        ];

        onMounted(() => {
            if (props.promList && props.promList.length > 0) promDataList.value = props.promList;
            if (props.priceList && props.priceList.length > 0)
                priceDataList.value = props.priceList;

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
                    title.value = '바닥왁스 코팅 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.GRINDING:
                    title.value = '연마 가격은 유선 상담을 통해 도와드리겠습니다.';
                    desc.value =
                        '다양한 상황에 따라 표준화된 가격으로 안내드릴 수 없는 점 양해부탁드립니다.\n꼼꼼한 상담을 통해 가격을 안내드리겠습니다.';
                    break;
                case SubPageType.APPLIANCES:
                    title.value = '한눈에 보는 가격표로 쉽게 결정하세요.';
                    desc.value = '에어컨, 냉장고, 소파, 매트리스 가격을 한번에 보세요.';
                    break;
                default:
                    title.value = '한눈에 보는 가격표로 쉽게 결정하세요.';
                    desc.value = '해당 청소 가격표를 노출하려고 합니다.';
            }
        });

        const specialClinicList = [
            SubPageType.FIRE,
            SubPageType.TRASH,
            SubPageType.KEEPSAKE,
            SubPageType.WASTE,
            SubPageType.COMPLETION,
            SubPageType.PARKING,
            SubPageType.WALL,
            SubPageType.FACTORY
        ];

        return {
            compIsMobile,
            priceDataList,
            promDataList,
            plugins: [autoPlay],
            title,
            desc,
            SubPageType,
            compPageType,
            compPromLabel,
            specialClinicList,
            hasPriceList
        };
    }
});
</script>

<template>
    <div
        class="promotion-wrapper w-full mt-[80px] flex justify-center"
        :class="[promDataList.length > 0 ? 'mb-[160px]' : 'mb-[80px]']"
    >
        <div v-if="!compIsMobile" class="promotion-content max-w-[--body-width] w-[--body-ratio]">
            <div
                class="text-area"
                :class="[specialClinicList.includes(compPageType) ? 'mb-[50px]' : 'mb-[30px]']"
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

            <div v-if="hasPriceList.includes(compPageType)" class="mb-[50px]">
                <div v-for="(price, idx) in priceDataList" :key="idx" class="">
                    <div v-if="price.mainTitle" class="text-[32px] font-[700] text-[--color-black]">{{ price.mainTitle }}</div>
                    <div v-if="price.mainSubTitle" class="text-[18px] font-[500] text-[--color-black] mb-[40px]">{{ price.mainSubTitle }}</div>
                    <div class="flex items-end">
                        <div v-if="price.title" class="text-[32px] font-[700] mr-[15px]">
                            {{ price.title }}
                        </div>
                        <span v-if="price.titleDesc" class="text-[16px] text-[--color-text-gray]">{{
                            price.titleDesc
                        }}</span>
                    </div>
                    <div
                        v-if="price.subTitle"
                        class="text-[18px] font-[500] text-[--color-black] mt-[15px]"
                    >
                        {{ price.subTitle }}
                    </div>
                    <div
                        class="w-full h-max"
                        :class="[
                            price.title ? 'mt-[20px]' : 'mt-0',
                            priceDataList.length - 1 > idx
                                ? price.ext
                                    ? 'mb-[15px]'
                                    : 'mb-[40px]'
                                : 'mb-0'
                        ]"
                    >
                        <clinic-image :src="price.src" class="w-full h-full" />
                    </div>
                    <div
                        v-if="price.ext"
                        class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px] mt-[15px] whitespace-pre-wrap"
                        :class="[idx < priceDataList.length - 1 ? 'mb-[40px]' : '']"
                    >
                        {{ price.ext }}
                    </div>
                    <div
                        v-if="price.ext2"
                        class="text-[16px] font-[500] text-[--color-text-gray] leading-[26px] mt-[15px] whitespace-pre-wrap"
                    >
                        {{ price.ext2 }}
                    </div>
                    <div
                        v-if="price.line"
                        class="border-[--color-border-blue] border-b-[1px] pt-[20px] mb-[60px]"
                    ></div>
                </div>
            </div>

            <!--박스-->
            <div class="sub-promotion-list w-full h-max flex justify-between">
                <div
                    v-if="promDataList && promDataList.length < 3"
                    class="sub-promotion double inline-flex justify-between w-full h-max"
                >
                    <div
                        v-for="(prom, index) in promDataList"
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
                            v-for="(prom, index) in promDataList"
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
            <div
                v-if="compPromLabel"
                class="mt-[20px] text-[16px] font-[500] text-[--color-text-gray]"
            >
                {{ compPromLabel }}
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
                    v-if="promDataList && promDataList.length === 1"
                    class="sub-promotion single w-full max-h-[180px] h-max inline-flex"
                >
                    <div class="promotion-box w-full max-h-[180px] relative">
<!--                        <img :src="promDataList[0].img" class="w-full max-h-[180px]" />-->
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
                            v-for="(prom, index) in promDataList"
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
