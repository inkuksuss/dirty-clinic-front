<script lang="ts">
import { ref, type PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'ClinicInput',
    props: {
        value: { type: String as PropType<string | undefined> },
        placeHolder: { type: String as PropType<string>, required: false },
        length: { type: Number as PropType<number>, required: false },
        readOnly: { type: Boolean as PropType<boolean>, default: false },
        changeHandler: {
            type: Function as PropType<(v: string | undefined) => void>,
            default: () => {
                return;
            }
        },
        enterHandler: {
            type: Function as PropType<(v: string | undefined) => void>,
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
                props.enterHandler(inputValue.value);
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
    <div class="todo-input-wrapper">
        <input
            class="border-2 border-black"
            :value="value"
            :placeholder="placeHolder"
            :maxlength="length"
            @input="handleChangeInput"
            @keydown="handleKeyDown"
            :readonly="readOnly"
        />
    </div>
</template>
