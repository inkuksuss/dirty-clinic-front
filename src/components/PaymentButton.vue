<script lang="ts">
import { ref, type PropType, defineComponent, onMounted, onUnmounted, computed } from 'vue';
import vClickOutside from 'click-outside-vue3';
import { useStore } from '@/stores/store';

export type SelectType = {
    name: string;
    value: string;
};

export default defineComponent({
    name: 'PaymentButton',
    props: {
        clickHandler: {
            type: Function as PropType<() => void>,
            default: () => {
                return;
            }
        }
    },
    setup(props) {
        const store = useStore();
        const isScrolled = ref<boolean>(false);
        const compIsMobile = computed(() => store.isMobile);

        const handleScroll = () => {
            isScrolled.value = window.scrollY > 0;
        };

        const handleClickBtn = () => {
            if (props.clickHandler) props.clickHandler();
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            isScrolled,
            compIsMobile,
            handleClickBtn
        };
    }
});
</script>

<template>
    <transition name="fade" mode="out-in">
        <div
            v-if="isScrolled && !compIsMobile"
            class="online-btn fixed bottom-[40px] right-[30px] w-[175px] h-[75px] bg-[--color-main-blue] rounded-[100px] flex-center opacity-1 cursor-pointer"
            @click="handleClickBtn"
        >
            <div class="w-[33px] h-[30px] mr-[10px]">
                <img class="w-full h-full" src="/assets/images/icons/calendar.png" alt="달력"/>
            </div>
            <div class="font-[600] text-[20px] leading-[26px] text-[--color-white]">
                온라인 <br />
                예약하기
            </div>
        </div>
    </transition>
</template>
