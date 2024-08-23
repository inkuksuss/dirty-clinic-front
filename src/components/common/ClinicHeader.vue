<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import vClickOutside from 'click-outside-vue3';
import { useStore } from '@/stores/store';
import MobileMenu from '@/components/popup/MobileMenu.vue';
import { type HeaderCategoryType, type SubHeaderType } from '@/utils/types';

export default defineComponent({
    name: 'ClinicHeader',
    components: { MobileMenu },
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
        const mobileIsOpen = ref<boolean>(false);

        const headerList = ref<Array<HeaderCategoryType>>([
            {
                id: 1,
                title: '간편클리닉',
                isSelect: false,
                mobileIsSelect: false,
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
                mobileIsSelect: false,
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
                    { title: '공동구매', dest: '' }
                ]
            },
            {
                id: 3,
                title: '특수클리닉',
                isSelect: false,
                mobileIsSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [
                    { title: '화재청소', dest: '/fire-cleaning' },
                    { title: '쓰레기집청소', dest: '/trash-cleaning' },
                    { title: '유품·고독사청소', dest: '/trauma-scene-cleaning' },
                    { title: '폐기물처리', dest: '/waste-cleaning' },
                    { title: '준공청소', dest: '/completion-cleaning' },
                    { title: '주차장청소', dest: '/parking-cleaning' },
                    { title: '건물외벽청소', dest: '/wall-cleaning' },
                    { title: '공장청소', dest: '/factory-cleaning' },
                    { title: '학교청소', dest: '/school-cleaning' }
                ]
            },
            {
                id: 4,
                title: '전문시공',
                isSelect: false,
                mobileIsSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [
                    { title: '탄성코트', dest: '' },
                    { title: '줄눈시공', dest: '/joint-cleaning' },
                    { title: '곰팡이제거·차단', dest: '/mold-cleaning' },
                    { title: '식당·후드청소', dest: '/restaurant-cleaning' },
                    { title: '사전점검', dest: '' }
                ]
            },
            {
                id: 5,
                title: '연마/코팅',
                isSelect: false,
                mobileIsSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [
                    { title: '바닥왁스코팅', dest: '/wax-cleaning' },
                    { title: '코팅', dest: '/coating-cleaning' },
                    { title: '연마', dest: '/grinding-cleaning' }
                ]
            },
            {
                id: 6,
                title: '가전클리닉',
                isSelect: false,
                mobileIsSelect: false,
                isReady: false,
                posEndX: 0,
                posCenterX: 0,
                posStartX: 0,
                subList: [{ title: '가전제품 청소', dest: '/appliances-cleaning' }]
            },
            {
                id: 7,
                title: '공기질클리닉',
                isSelect: false,
                mobileIsSelect: false,
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
                mobileIsSelect: false,
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
                mobileIsSelect: false,
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

        const handleClick = (sub: SubHeaderType) => {
            if (!sub.dest || sub.dest === '') {
                window.alert('현재 준비중인 페이지입니다.');
                return;
            }
            router.push(sub.dest);
        };

        const calculateElementWidth = () => {
            if (categoryWrapperElement.value) {
                const childBoxWidth = 150;
                const childrenElement = categoryWrapperElement.value.children;

                let startPos = 0;
                for (let i = 0; i < childrenElement.length; i++) {
                    const child = childrenElement.item(i) as Element;
                    const category = headerList.value.find(
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

        const handleMouseEnter = (category: HeaderCategoryType) => {
            isOpen.value = true;
            if (currEl.value && currEl.value.id === 'category-' + category.id) return;

            let prevCategory;
            for (let i = 0; i < headerList.value.length; i++) {
                if (headerList.value[i].isSelect) {
                    prevCategory = headerList.value[i];
                }
                headerList.value[i].isSelect = false;
                if (headerList.value[i].id === category.id) {
                    headerList.value[i].isSelect = true;
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
            headerList.value.forEach((v) => {
                v.isSelect = false;
                v.isReady = false;
            });
        };

        const handleClickLogo = () => {
            router.push('/');
        };

        const handleChangeMobileMenu = () => {
            mobileIsOpen.value = !mobileIsOpen.value;
        };

        const handleTransitionEnd = (_: TransitionEvent) => {
            if (currEl.value) {
                const targetId = currEl.value.id.replace('category-', '');
                for (const cate of headerList.value) {
                    if (cate.id === Number(targetId)) {
                        cate.isReady = true;
                    } else {
                        cate.isReady = false;
                    }
                }
            }
        };

        const handleChangeMobileIsSelect = (id: number, value: boolean): void => {
            headerList.value.forEach(h => h.mobileIsSelect = false);
            const findHeader = headerList.value.find((h) => h.id === id);
            if (findHeader) findHeader.mobileIsSelect = value;
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
            headerList,
            categoryWrapperElement,
            isOpen,
            isScroll,
            moveEl,
            mobileIsOpen,
            handleClick,
            handleMouseEnter,
            handleMouseLeave,
            handleChangeMobileMenu,
            handleClickLogo,
            handleChangeMobileIsSelect
        };
    }
});
</script>

<template>
    <header>
        <div
            v-if="!compIsMobile"
            class="header-wrapper fixed top-0 left-0 bg-[--color-white] flex items-center justify-between w-screen h-[--header-height] pl-[50px] pr-[60px] z-40 cursor-pointer"
            :class="[isScroll ? 'border-b-[1px] border-b-[--color-border-blue]' : '']"
        >
            <div class="logo-wrapper w-[133px] h-[41px]" @click="handleClickLogo">
                <img
                    class="w-full h-full"
                    src="/assets/images/home/clinic_logo@2x.webp"
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
                    <div v-for="(category, idx) in headerList" :key="idx" class="w-full h-full">
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
                    v-for="category in headerList"
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
            <div class="logo-wrapper w-[88px] h-[27px]" @click="handleClickLogo">
                <img
                    class="w-full h-full"
                    src="/assets/images/home/clinic_logo@1x.webp"
                    alt="main_logo"
                />
            </div>
            <div class="btn-wrapper w-[40px] h-full flex-center" @click="handleChangeMobileMenu">
                <img
                    class="w-[30px] h-[22px]"
                    src="/assets/images/icons/menu.svg"
                    alt="main_logo"
                />
            </div>
        </div>
        <mobile-menu
            v-if="mobileIsOpen"
            :data-list="headerList"
            :change-is-select-handler="handleChangeMobileIsSelect"
            :change-menu-handler="handleChangeMobileMenu"
        ></mobile-menu>
    </header>
</template>
