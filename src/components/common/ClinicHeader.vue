<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

type Category = {
    id: number;
    title: string;
    isSelect: boolean;
    posCenterX: number;
    subList: Array<SubCategory>;
};

type SubCategory = {
    title: string;
    dest: string;
};

export default defineComponent({
    name: 'ClinicHeader',
    setup() {
        const categoryWrapperElement = ref<HTMLDivElement | null>(null);
        const isOpen = ref<boolean>(false);

        const categoryList = ref<Array<Category>>([
            {
                id: 1,
                title: '간편클리닉',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '원룸청소', dest: '' },
                    { title: '부분청소', dest: '' },
                    { title: '외창청소', dest: '' },
                    { title: '정기청소', dest: '' },
                    { title: '정리정돈', dest: '' },
                    { title: '가사도우미', dest: '' }
                ]
            },
            {
                id: 2,
                title: '전문클리닉',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '입주청소', dest: '' },
                    { title: '이사청소', dest: '' },
                    { title: '인테리어청소', dest: '' },
                    { title: '거주대청소', dest: '' },
                    { title: '사무실청소', dest: '' },
                    { title: '상가매장', dest: '' },
                    { title: '식당·후드청소', dest: '' },
                    { title: '공동구매', dest: '' }
                ]
            },
            {
                id: 3,
                title: '특수클리닉',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '화재청소', dest: '' },
                    { title: '쓰레기집청소', dest: '' },
                    { title: '유품·고독사청소', dest: '' },
                    { title: '폐기물처리', dest: '' },
                    { title: '준공청소', dest: '' },
                    { title: '주차장청소', dest: '' },
                    { title: '건물외벽청소', dest: '' },
                    { title: '공장청소', dest: '' },
                    { title: '학교청소', dest: '' }
                ]
            },
            {
                id: 4,
                title: '전문시공',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '탄성코트', dest: '' },
                    { title: '줄눈시공', dest: '' },
                    { title: '곰팡이제거·차단', dest: '' },
                    { title: '사전점검', dest: '' }
                ]
            },
            {
                id: 5,
                title: '연마/코팅',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '바닥왁스코팅', dest: '' },
                    { title: '코팅', dest: '' },
                    { title: '연마', dest: '' }
                ]
            },
            {
                id: 6,
                title: '가전클리닉',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '에어컨', dest: '' },
                    { title: '세탁기', dest: '' },
                    { title: '냉장고', dest: '' },
                    { title: '소파·매트리스', dest: '' }
                ]
            },
            {
                id: 7,
                title: '공기질클리닉',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '공기질측정', dest: '' },
                    { title: '새집증후군 시공', dest: '' },
                    { title: '소독 및 감염예방', dest: '' },
                    { title: '해충방역', dest: '' }
                ]
            },
            {
                id: 8,
                title: '아카데미',
                isSelect: false,
                posCenterX: 0,
                subList: [{ title: '청소창업', dest: '' }]
            },
            {
                id: 9,
                title: '커뮤니티',
                isSelect: false,
                posCenterX: 0,
                subList: [
                    { title: '이용후기', dest: '' },
                    { title: '블로그', dest: '' },
                    { title: '프로모션', dest: '' }
                ]
            }
        ]);

        const handleClick = () => {};

        const calculateElementWidth = () => {
            if (categoryWrapperElement.value) {
                const childBoxWidth = 150;
                const childrenElement = categoryWrapperElement.value.children;
                for (let i = 0; i < childrenElement.length; i++) {
                    const child = childrenElement.item(i) as Element;
                    const category = categoryList.value.find(
                        (category) => `category-${category.id}` === child.id
                    );
                    if (category) category.posCenterX = (childBoxWidth - child.clientWidth) / 2;
                }
            }
        };

        const handleMouseEnter = (category: Category) => {
            isOpen.value = true;
            categoryList.value.forEach((category) => (category.isSelect = false));
            category.isSelect = true;
        };

        const handleMouseLeave = (category: Category) => {
            isOpen.value = false;
            category.isSelect = false;
        };

        onMounted(() => {
            calculateElementWidth();
        });

        return {
            categoryList,
            categoryWrapperElement,
            isOpen,
            handleClick,
            handleMouseEnter,
            handleMouseLeave
        };
    }
});
</script>

<template>
    <header
        class="header-wrapper fixed top-0 left-0 bg-[--color-white] flex items-center justify-between w-screen h-[--header-height] pl-[50px] pr-[60px] z-40"
        :class="[isOpen ? 'border-b-[1px] border-b-[--color-border-blue]' : '']"
    >
        <div class="logo-wrapper w-[133px] h-[41px]">
            <img
                class="w-full h-full"
                src="@/assets/images/home/clinic_logo@1x.png"
                alt="main_logo"
            />
        </div>
        <div
            class="category-wrapper flex justify-end items-center h-full"
            ref="categoryWrapperElement"
        >
            <div
                :id="`category-${category.id}`"
                class="category-contents relative inline-flex justify-end items-center h-full pl-[15px] pr-[15px]"
                v-for="category in categoryList"
                :key="category.title"
                @mouseenter="() => handleMouseEnter(category)"
                @mouseleave="() => handleMouseLeave(category)"
            >
                <div
                    class="title w-full h-full flex-center font-[500] text-[16px] hover:text-[--color-hover] hover:font-[800]"
                >
                    <span class="leading-[19px]">{{ category.title }}</span>
                </div>
                <transition name="slide-fade" mode="out-in"
                    ><div
                        class="sub-wrapper bg-[--color-white] absolute flex-center flex-col top-[--header-height] w-[150px] pt-[22.5px] pb-[22.5px] border-[1px] border-t-[0] border-[--color-border-blue]"
                        :class="[category.isSelect ? 'active' : '']"
                        :style="`left: ${-category.posCenterX}px`"
                        v-if="category.isSelect"
                    >
                        <div
                            class="title-wrapper w-full flex-center py-[7.5px] hover:bg-[--color-gray]"
                            v-for="subCategory in category.subList"
                            :key="subCategory.title"
                        >
                            <div
                                class="sub-title leading-[19px] font-[500] text-[16px]"
                                @click="handleClick"
                            >
                                {{ subCategory.title }}
                            </div>
                        </div>
                    </div></transition
                >
            </div>
        </div>
    </header>
</template>
