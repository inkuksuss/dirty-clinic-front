<script lang="ts">
import { ref, type PropType, defineComponent } from 'vue';
import vClickOutside from 'click-outside-vue3';
import { type SelectType } from '@/utils/types';

export default defineComponent({
    name: 'ClinicSelect',
    props: {
        placeHolder: { type: String as PropType<string>, default: '선택해주세요.' },
        selectList: { type: Array as PropType<Array<SelectType>>, required: true },
        selectedValue: { type: String as PropType<string>, required: true },
        selectHandler: {
            type: Function as PropType<(v: string | undefined) => void>,
            default: () => {
                return;
            }
        }
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    setup(props) {
        const isOpen = ref<boolean>(false);
        const inputList = ref<Array<SelectType>>(props.selectList);
        const selected = ref<string>('');

        const handleClickSelectBox = () => {
            isOpen.value = !isOpen.value;
        };

        const handleSelect = (v: SelectType) => {
            if (props.selectHandler) props.selectHandler(v.value);
            selected.value = v.name;
        };

        const handleClickOut = () => {
            isOpen.value = false;
        };

        return {
            isOpen,
            inputList,
            selected,
            handleClickSelectBox,
            handleSelect,
            handleClickOut
        };
    }
});
</script>

<template>
    <div
        class="select-wrapper relative w-full h-full border-[1.5px] border-[--color-border-blue] py-[17px] px-[20px] flex justify-between"
        @click="handleClickSelectBox"
        :class="{ active: isOpen }"
        v-click-outside="handleClickOut"
    >
        <span
            v-if="selected === ''"
            class="select-place-holder text-[18px] font-[400] leading-[26px] text-[--color-text-black]"
            >{{ placeHolder }}</span
        >
        <span class="select-place-holder" v-else>{{ selected }}</span>
        <img class="select-arrow arrow" src="/assets/images/icons/arrow_down.svg" alt="arrow" />
        <transition name="slide-fade" mode="out-in" class="w-full">
            <div
                v-if="isOpen"
                class="select-label absolute top-[100%] left-[-1.5px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] z-10"
            >
                <div
                    v-for="(item, index) in inputList"
                    :key="new Date().getTime() + '_' + index"
                    :value="item.value"
                    class="py-[17px] px-[20px]"
                    @click="() => handleSelect(item)"
                >
                    <span class="text-[18px] font-[400] leading-[26px] text-[--color-text-black]">{{
                        item.name
                    }}</span>
                </div>
            </div>
        </transition>
    </div>
</template>
