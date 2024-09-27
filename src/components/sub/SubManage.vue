<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import ClinicImage from '@/components/common/ClinicImage.vue';
import { resolveUrl } from '@/utils/common';
import { type SubManageType, SubPageType } from '@/utils/types';

type SubManageTypeView = Omit<SubManageType, 'isOpen'> & { isOpen: boolean };

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
            type: Array as PropType<Array<SubManageType>>,
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
        const scriptList = ref<SubManageTypeView[]>([]);
        const compTitle = computed(() => props.title);
        const compDesc = computed(() => props.desc);
        const compPageType = computed(() => props.pageType);
        const compMainImg = computed(() => props.mainImg);

        const handleClick = (info: SubManageTypeView) => {
            const open = scriptList.value.find((m) => m.isOpen);
            openClear();
            if (!open || open.title !== info.title) {
                info.isOpen = true;
            }
        };

        const openClear = () => {
            scriptList.value.forEach((m) => (m.isOpen = false));
        };

        const specialClinicList = [
            SubPageType.FIRE,
            SubPageType.TRASH,
            SubPageType.KEEPSAKE,
            SubPageType.WASTE,
            SubPageType.COMPLETION,
            SubPageType.PARKING,
            SubPageType.WALL,
            SubPageType.FACTORY,
            SubPageType.SCHOOL
        ];

        onMounted(() => {
            if (props.manageList && props.manageList.length > 0)
                scriptList.value = props.manageList.map(
                    (m) => Object.assign({}, m, { isOpen: false }) as SubManageTypeView
                );
        });

        return {
            scriptList,
            compTitle,
            compDesc,
            compPageType,
            SubPageType,
            specialClinicList,
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
            <div
                v-if="!compPageType || (compPageType && !specialClinicList.includes(compPageType))"
                class="text-area mb-[30px]"
            >
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
                class="window-clinic-wrapper w-full min-h-[228px] flex flex-col bg-[--color-white] border-[1.5px] border-[--color-border-blue]"
            >
                <div
                    class="header-wrapper flex min-h-[80px] mx-[30px] py-[20px] items-center border-b-[1px] border-b-[--color-border-blue]"
                >
                    <div class="flex-center w-[40px] h-[40px] bg-[--color-skyblue] mr-[20px]">
                        <img src="/assets/images/icons/window.svg" alt="창문 아이콘" />
                    </div>
                    <span class="text-[--color-black] font-[600] text-[24px] leading-[26px]"
                        >창문을 전부다 탈거하고 진행하는 방법</span
                    >
                </div>
                <div class="body-wrapper ml-[90px] mr-[30px] py-[30px] flex flex-col">
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
                class="regular-clinic-wrapper w-full min-h-[224px] flex flex-col bg-[--color-white] border-[1.5px] border-[--color-border-blue] pl-[30px] py-[20px]"
            >
                <div class="content flex items-center py-[10px]">
                    <div
                        class="content-mark w-[20px] h-[20px] min-w-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >사무실에 매일 쓰레기가 넘쳐 버릴 사람이 필요한 경우</span
                    >
                </div>
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] min-w-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >공간 불문 입주청소 이후 정기적인 관리가 필요하신 경우</span
                    >
                </div>
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] min-w-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >거주공간, 기숙사 등 정리정돈과 청소할 시간이 없는 경우</span
                    >
                </div>
                <div class="flex items-center py-[10px]">
                    <div
                        class="w-[20px] h-[20px] min-w-[20px] rounded-[50%] bg-[--color-border-blue] mr-[10px]"
                    ></div>
                    <span class="text-[20px] text-[--color-black] font-[500] leading-[26px]"
                        >사람이 많이 다녀 주기적인 바닥청소와 코팅까지 필요하신 경우</span
                    >
                </div>
            </div>
            <!-- 특수 클리닉 -->
            <div
                v-else-if="compPageType && specialClinicList.includes(compPageType)"
                class="special-clinic-wrapper w-full flex justify-between items-center"
            >
                <div class="text-area mr-[20px] min-w-[260px]">
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

            <!-- 왁스 -->
            <div
                v-else-if="compPageType === SubPageType.WAX"
                class="wax-clinic-wrapper border-[1.5px] border-[--color-border-blue] flex p-[30px] bg-[--color-white] items-center"
            >
                <div
                    class="bg-[--color-border-blue] w-[20px] h-[20px] rounded-[50%] mr-[10px] min-w-[20px]"
                ></div>
                <div class="text-content text-[20px] font-[500] text-[--color-black]">
                    데코타일, 아스타일, 디럭스타일, 피타일, PVC타일, XPE타일 등에 시공가능합니다.
                </div>
            </div>

            <div v-else class="list-area grid grid-cols-2 gap-[20px]">
                <div
                    v-for="(info, idx) in scriptList"
                    :key="idx"
                    class="content-wrapper relative h-[80px] border-[1.5px] border-[--color-border-blue] border-solid bg-[--color-white] px-[30px]"
                    :class="[info.hasImg ? 'has-img' : '', info.isOpen ? 'active' : '']"
                    @click="() => handleClick(info)"
                >
                    <div
                        class="w-full h-full flex justify-between items-center"
                        :class="[info.isOpen ? 'border-b-0' : '']"
                    >
                        <div class="body flex items-center">
                            <div
                                class="w-[40px] h-[40px] bg-[--color-skyblue] flex-center mr-[20px] p-[1px]"
                            >
                                <clinic-image class="w-full h-full" :src="info.icon" />
                            </div>
                            <span
                                class="text-[--color-text-black] text-[24px] font-[600] leading-[26px]"
                                >{{ info.title }}</span
                            >
                        </div>
                        <img class="arrow" src="/assets/images/icons/arrow_down.svg" alt="arrow" />
                    </div>

                    <transition name="slide-fade" mode="out-in" class="w-full">
                        <div
                            v-if="info.isOpen"
                            class="w-full info-label absolute top-[76px] left-0 bg-[--color-white] z-10 outline-[1.5px] outline outline-[--color-border-blue]"
                        >
                            <div
                                v-for="(content, idx) in info.content"
                                :key="new Date().getTime() + '_' + idx"
                                class="info-box flex pb-[20px] pl-[30px] pr-[20px] justify-between"
                                :class="[info.hasImg ? '!mt-[20px] !mb-0' : '']"
                            >
                                <div class="info-text-area flex flex-col mr-[30px] max-w-[430px]">
                                    <div class="flex items-start justify-start mb-[5px]">
                                        <div
                                            class="w-[20px] h-[20px] min-w-[20px] bg-[--color-border-blue] rounded-[50%] mr-[10px] my-[3px]"
                                        ></div>
                                        <span
                                            class="main text-[--color-text-black] text-[20px] font-[500] leading-[26px] whitespace-pre-wrap"
                                            >{{ content.main }}</span
                                        >
                                    </div>
                                    <span
                                        class="sub text-[--color-text-black] text-[20px] font-[500] leading-[26px] ml-[30px] whitespace-pre-wrap"
                                        v-if="content.sub"
                                        >{{ content.sub }}</span
                                    >
                                    <span
                                        class="ext mt-[5px] text-[--color-text-gray] text-[16px] font-[500] leading-[26px] ml-[30px] whitespace-pre-wrap"
                                        v-if="content.ext"
                                        >{{ content.ext }}</span
                                    >
                                </div>

                                <div
                                    v-if="content.imgSrc1 || content.imgSrc2"
                                    class="info-img-area flex gap-x-[15px] min-w-[170px]"
                                >
                                    <div v-if="content.imgSrc1" class="flex flex-col items-center">
                                        <ClinicImage
                                            :src="content.imgSrc1"
                                            class="w-[162px] h-[162px]"
                                        ></ClinicImage>
                                        <div
                                            v-if="content.imgSrc1Desc"
                                            class="text-[16px] font-[500] text-[--color-text-gray] mt-[10px]"
                                        >
                                            {{ content.imgSrc1Desc }}
                                        </div>
                                    </div>
                                    <div v-if="content.imgSrc2" class="flex flex-col items-center">
                                        <ClinicImage
                                            :src="content.imgSrc2"
                                            class="w-[162px] h-[162px]"
                                        ></ClinicImage>
                                        <div
                                            v-if="content.imgSrc2Desc"
                                            class="text-[16px] font-[500] text-[--color-text-gray] mt-[10px]"
                                        >
                                            {{ content.imgSrc2Desc }}
                                        </div>
                                    </div>
                                </div>
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
