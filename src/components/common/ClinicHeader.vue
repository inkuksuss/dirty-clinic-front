<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import vClickOutside from 'click-outside-vue3';
import { useStore } from '@/stores/store';

type Category = {
    id: number;
    title: string;
    isSelect: boolean;
    isReady: boolean;
    posStartX: number;
    posCenterX: number;
    posEndX: number;
    subList: Array<SubCategory>;
};

type SubCategory = {
    title: string;
    dest: string;
};

export default defineComponent({
    name: 'ClinicHeader',
    directives: {
        clickOutside: vClickOutside.directive
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const categoryWrapperElement = ref<HTMLDivElement | null>(null);
        const isOpen = ref<boolean>(false);
        const prevEl = ref<HTMLDivElement | null>(null);
        const currEl = ref<HTMLDivElement | null>(null);
        const moveEl = ref<HTMLDivElement>();
        const isScroll = ref<boolean>(false);
        const compWidth = computed(() => store.width);
        const compIsMobile = computed(() => store.isMobile);

        const categoryList = ref<Array<Category>>([
            {
                id: 1,
                title: '간편클리닉',
                isSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [
                    { title: '원룸청소', dest: '/one-room-cleaning' },
                    { title: '부분청소', dest: '/spot-cleaning' },
                    { title: '외창청소', dest: '/window-cleaning' },
                    { title: '정기청소', dest: '/regular-cleaning' },
                    { title: '정리정돈', dest: '' },
                    { title: '가사도우미', dest: '' }
                ]
            },
            {
                id: 2,
                title: '전문클리닉',
                isSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [
                    { title: '입주청소', dest: '/move-in-cleaning' },
                    { title: '이사청소', dest: '/moving-cleaning' },
                    { title: '인테리어청소', dest: '/interior-cleaning' },
                    { title: '거주대청소', dest: '/residential-cleaning' },
                    { title: '사무실청소', dest: '/office-cleaning' },
                    { title: '상가매장', dest: '/store-cleaning' },
                    { title: '식당·후드청소', dest: '' },
                    { title: '공동구매', dest: '' }
                ]
            },
            {
                id: 3,
                title: '특수클리닉',
                isSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
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
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
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
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
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
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
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
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
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
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [{ title: '청소창업', dest: '' }]
            },
            {
                id: 9,
                title: '커뮤니티',
                isSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [
                    { title: '이용후기', dest: '' },
                    { title: '블로그', dest: '' },
                    { title: '프로모션', dest: '' }
                ]
            }
        ]);

        const handleClick = (sub: SubCategory) => {
            router.push(sub.dest);
        };

        const calculateElementWidth = () => {
            if (categoryWrapperElement.value) {
                const childBoxWidth = 150;
                const childrenElement = categoryWrapperElement.value.children;

                let startPos = 0;
                for (let i = 0; i < childrenElement.length; i++) {
                    const child = childrenElement.item(i) as Element;
                    const category = categoryList.value.find(
                        (category) => `category-${category.id}` === child.id
                    );
                    if (category) {
                        category.posStartX = startPos;
                        startPos += child.clientWidth;
                        category.posEndX = category.posStartX + child.clientWidth;
                        category.posCenterX = (childBoxWidth - child.clientWidth) / 2;
                    }
                }
            }
        };

        const handleMouseEnter = (category: Category) => {
            isOpen.value = true;
            if (currEl.value && currEl.value.id === 'category-' + category.id) return;

            let prevCategory;
            for (let i = 0; i < categoryList.value.length; i++) {
                if (categoryList.value[i].isSelect) {
                    prevCategory = categoryList.value[i];
                }
                categoryList.value[i].isSelect = false;
                if (categoryList.value[i].id === category.id) {
                    categoryList.value[i].isSelect = true;
                }
            }

            if (moveEl.value) {
                if (prevCategory) {
                    const isNext = prevCategory.id < category.id;
                    const targetEl = document.getElementById(`category-${category.id}`);
                    const move =
                        (prevCategory.posEndX - prevCategory.posStartX) / 2 +
                        (category.posEndX - category.posStartX) / 2;
                    prevEl.value = currEl.value;
                    currEl.value = targetEl as HTMLDivElement;

                    if (prevEl.value) {
                        const curPos = (moveEl.value.style.left as string).replace(
                            'px',
                            ''
                        ) as string;
                        if (isNext) moveEl.value.style.left = `${Number(curPos) + Number(move)}px`;
                        else moveEl.value.style.left = `${Number(curPos) - Number(move)}px`;
                    }
                } else {
                    moveEl.value.style.left = `${category.posStartX - category.posCenterX}px`;
                    const targetEl = document.getElementById(`category-${category.id}`);
                    if (targetEl) {
                        currEl.value = targetEl as HTMLDivElement;
                        category.isReady = true;
                    }
                }
            }
        };

        const handleMouseLeave = () => {
            isOpen.value = false;
            prevEl.value = null;
            currEl.value = null;
            categoryList.value.forEach((v) => {
                v.isSelect = false;
                v.isReady = false;
            });
        };

        const handleClickLogo = () => {
            router.push('/');
        };

        const handleTransitionEnd = (_: TransitionEvent) => {
            if (currEl.value) {
                const targetId = currEl.value.id.replace('category-', '');
                for (const cate of categoryList.value) {
                    if (cate.id === Number(targetId)) {
                        cate.isReady = true;
                    } else {
                        cate.isReady = false;
                    }
                }
            }
        };

        const handleScroll = () => {
            isScroll.value = window.scrollY > 0;
        };

        watch(compWidth, () => {
            calculateElementWidth();
        });

        onMounted(() => {
            calculateElementWidth();
            window.addEventListener('transitionend', handleTransitionEnd);
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('transitionend', handleTransitionEnd);
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            compIsMobile,
            categoryList,
            categoryWrapperElement,
            isOpen,
            isScroll,
            moveEl,
            handleClick,
            handleMouseEnter,
            handleMouseLeave,
            handleClickLogo
        };
    }
});
</script>

<template>
    <header>
        <div
            v-if="!compIsMobile"
            class="header-wrapper fixed top-0 left-0 bg-[--color-white] flex items-center justify-between w-screen h-[--header-height] pl-[50px] pr-[60px] z-40"
            :class="[isScroll ? 'border-b-[1px] border-b-[--color-border-blue]' : '']"
        >
            <div class="logo-wrapper w-[133px] h-[41px]" @click="handleClickLogo">
                <img
                    class="w-full h-full"
                    src="@/assets/images/home/clinic_logo@1x.png"
                    alt="main_logo"
                />
            </div>
            <div
                class="category-wrapper relative flex justify-end items-center h-full"
                ref="categoryWrapperElement"
                @mouseleave="handleMouseLeave"
            >
                <div
                    ref="moveEl"
                    class="category-body absolute bg-white top-[--header-height] w-[150px] pt-[22.5px] pb-[22.5px] border-[1px] border-[--color-border-blue] flex flex-col"
                    :class="[isOpen ? 'flex' : 'hidden', isScroll ? 'border-t-[0]' : '']"
                >
                    <div v-for="(category, idx) in categoryList" :key="idx" class="w-full h-full">
                        <div v-if="category.isReady" class="w-full h-full">
                            <div
                                class="title-wrapper w-full flex-center py-[7.5px] hover:text-[--color-hover]"
                                v-for="subCategory in category.subList"
                                :key="subCategory.title"
                            >
                                <div
                                    class="sub-title leading-[19px] font-[500] text-[16px]"
                                    @click="() => handleClick(subCategory)"
                                >
                                    {{ subCategory.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    :id="`category-${category.id}`"
                    class="category-contents inline-flex justify-end items-center h-full pl-[15px] pr-[15px]"
                    v-for="category in categoryList"
                    :key="category.title"
                    @mouseenter="() => handleMouseEnter(category)"
                >
                    <div
                        class="title w-full h-full flex-center font-[500] text-[16px] hover:text-[--color-hover] hover:font-[800]"
                    >
                        <span class="leading-[19px]">{{ category.title }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="px-[20px] bg-[--color-white] h-[--header-height] flex justify-between items-center fixed top-0 left-0 w-screen z-40"
        >
            <div class="logo-wrapper w-[88px] h-[27px]">
                <img
                    class="w-full h-full"
                    src="@/assets/images/home/clinic_logo@1x.png"
                    alt="main_logo"
                />
            </div>
            <div class="btn-wrapper w-[40px] h-[40px]">
                <img
                    class="w-full h-full"
                    src="@/assets/images/home/test-img1@1x.jpg"
                    alt="main_logo"
                />
            </div>
        </div>
    </header>
</template>
