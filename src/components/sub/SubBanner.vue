<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'SubBanner',
    props: { title: String as PropType<string>, desc: String as PropType<string> },

    setup(props) {
        const compTitle = computed(() => props.title);
        const compDesc = computed(() => props.desc);
        return { compTitle, compDesc };
    }
});
</script>

<template>
    <div class="banner-wrapper w-full h-[270px] flex justify-center">
        <div class="banner w-full h-full flex flex-col justify-center items-center">
            <div class="text-area max-w-[--body-width] w-[--body-ratio]">
                <h1
                    class="text-[--color-text-black] text-[48px] font-[700] leading-[57px] mb-[10px]"
                >
                    {{ compTitle }}
                </h1>
                <h3
                    class="text-[--color-text-black] text-[18px] font-[500] leading-[26px] whitespace-pre-wrap"
                >
                    {{ compDesc }}
                </h3>
            </div>
        </div>
    </div>
</template>
