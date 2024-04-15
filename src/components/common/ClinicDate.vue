<script lang="ts">
import { ref, type PropType, defineComponent, computed } from 'vue';
import { ko } from 'date-fns/locale';
import Datepicker from 'vue3-datepicker';

export default defineComponent({
    name: 'ClinicDate',
    components: { Datepicker },
    props: {
        label: { type: String as PropType<string>, required: false },
        value: { type: Date as PropType<Date> },
        // maxValue: { type: Date as PropType<Date>, required: false },
        readOnly: { type: Boolean as PropType<boolean>, default: false },
        changeHandler: {
            type: Function as PropType<(v: Date) => void>,
            default: () => {
                return;
            }
        }
    },
    setup(props) {
        const compLabel = computed(() => props.label);
        const date = ref<Date>(props.value ? props.value : new Date());

        const compLocale = computed(() => ko);

        const handleChangeDate = (date: Date | null | undefined) => {
            if (props.changeHandler) {
                if (date) props.changeHandler(date);
            }
        };

        return {
            date,
            compLocale,
            compLabel,
            handleChangeDate
        };
    }
});
</script>

<template>
    <div class="date-wrapper w-full h-[60px] flex flex-col">
        <div
            v-if="compLabel"
            class="text-[14px] font-[900] leading-[24px] text-[--color-text-black] mb-[10px]"
        >
            {{ compLabel }}
        </div>
        <div class="relative">
            <Datepicker
                class="w-full h-[60px] border-[1.5px] border-[--color-border-blue] py-[17px] px-[20px]"
                v-model="date"
                :locale="compLocale"
                :lower-limit="new Date()"
                @update:modelValue="handleChangeDate"
            ></Datepicker>
        </div>
    </div>
</template>
