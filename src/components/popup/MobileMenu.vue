<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref } from 'vue';
import { type HeaderCategoryType, type SubHeaderType } from '@/utils/types';
import { useRouter } from 'vue-router';
import vClickOutside from 'click-outside-vue3';

export default defineComponent({
    name: 'MobileMenu',
    components: {},
    directives: {
        clickOutside: vClickOutside.directive
    },
    props: {
        dataList: {
            type: Array as PropType<HeaderCategoryType[]>,
            required: true
        },
        changeIsSelectHandler: {
            type: Function as PropType<(id: number, value: boolean) => void>,
            required: true
        },
        changeMenuHandler: {
            type: Function as PropType<() => void>,
            required: true
        }
    },
    setup(props) {

        const router = useRouter();
        const compDataList = computed(() => props.dataList);
        const isReady = ref<boolean>(false);

        const handleClickTitle = (category: HeaderCategoryType) => {
            props.changeIsSelectHandler(category.id, !category.mobileIsSelect);
        };

        const handleClickCloseBtn = () => {
            props.changeMenuHandler();
        };

        const handleClickSubTitle = (sub: SubHeaderType) => {
            if (!sub.dest || sub.dest === '') {
                window.alert('현재 준비중인 페이지입니다.');
                return;
            }
            props.changeMenuHandler();
            router.push(sub.dest);
        };

        const handleClickOut = () => {
            props.changeMenuHandler();
        };

        onMounted(() => (isReady.value = true));

        return {
            isReady,
            compDataList,
            handleClickTitle,
            handleClickSubTitle,
            handleClickCloseBtn,
            handleClickOut
        };
    }
});
</script>

<template>
    <div class="mobile-menu w-screen h-screen fixed top-0 left-0 z-50">
        <div class="filter w-full h-full bg-black opacity-80 absolute left-0 top-0 z-50"></div>
        <transition name="slide-horizontal" mode="out-in">
            <div
                v-if="isReady"
                class="absolute w-[75%] h-full bg-white z-50 absolute right-0 top-0 px-[12px]"
                v-click-outside="handleClickOut"
            >
                <div class="header-top flex flex-row-reverse mt-[15px] mb-[3px]">
                    <div class="mr-[3px] w-[30px] h-[30px]" @click="handleClickCloseBtn">
                        <img class="w-full h-full" src="/assets/images/icons/x-btn-blue.svg" />
                    </div>
                </div>
                <div
                    v-for="(header, idx) in compDataList"
                    :key="`mobile-header-${idx}`"
                    class="header-body border-b-[1px] border-[--color-border-blue] px-[12px] py-[10px] flex flex-col"
                    @click="handleClickTitle(header)"
                >
                    <div class="title-wrapper flex justify-between items-center">
                        <div
                            class="text-[14px] font-[500] leading-[20px] text-[--color-text-black] h-[24px] py-[2px]"
                        >
                            {{ header.title }}
                        </div>
                        <div class="arrow-wrapper" :class="[header.mobileIsSelect ? 'active' : '']">
                            <img
                                class="w-[20px] h-[20px]"
                                src="/assets/images/icons/arrow_down.svg"
                            />
                        </div>
                    </div>
                    <transition name="slide-vertical" mode="out-in" class="w-full pt-[10px]">
                        <div v-if="header.mobileIsSelect">
                            <div
                                v-for="(sub, idx) in header.subList"
                                :key="`sub-category-${idx}`"
                                @click="() => handleClickSubTitle(sub)"
                                class="flex items-center px-[10px] h-[40px]"
                            >
                                <div class="w-full py-[5px] flex items-center">
                                    <span
                                        class="text-[13px] font-[500] leading-[20px] text-[--color-text-black]"
                                    >
                                        {{ '- ' + sub.title }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </div>
</template>
