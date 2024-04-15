<script lang="ts">
import { ref, type PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'ClinicInput',
    props: {
        value: { type: String as PropType<string | undefined> },
        placeHolder: { type: String as PropType<string>, required: false },
        length: { type: Number as PropType<number>, required: false },
        isNumber: { type: Boolean as PropType<boolean>, required: false },
        readOnly: { type: Boolean as PropType<boolean>, default: false },
        changeHandler: {
            type: Function as PropType<(v: string) => void>,
            default: () => {
                return;
            }
        },
        enterHandler: {
            type: Function as PropType<(v: string) => void>,
            default: (v: string | undefined) => {
                return;
            }
        }
    },
    setup(props) {
        const inputValue = ref<string | undefined>();

        const handleChangeInput = (e: Event): void => {
            const newValue = (e.target as any).value;
            props.changeHandler(newValue);
            inputValue.value = newValue;
        };

        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === 'Enter') {
                if (e.isComposing || e.keyCode === 229) return;
                props.enterHandler(inputValue.value ? inputValue.value : '');
            }
        };

        return {
            handleChangeInput,
            handleKeyDown
        };
    }
});
</script>

<template>
    <div class="input-wrapper w-full h-[60px] flex-center">
        <input
            class="w-full h-full border-[1.5px] border-[--color-border-blue] py-[17px] px-[20px]"
            :value="value"
            :placeholder="placeHolder"
            :maxlength="length"
            @input="handleChangeInput"
            @keydown="handleKeyDown"
            :readonly="readOnly"
            :type="isNumber ? 'number' : ''"
        />
    </div>
</template>
