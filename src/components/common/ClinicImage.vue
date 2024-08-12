<script lang="ts">
import { ref, type PropType, defineComponent, computed, onMounted, watch, h } from 'vue';
import { useStore } from '@/stores/store';
import { ViewSize } from '@/utils/types';

export default defineComponent({
    name: 'ClinicImage',
    props: {
        src: { type: String as PropType<string>, required: true }
    },
    setup(props) {
        const store = useStore();
        const compSrc = computed(() => props.src);
        const compWidth = computed(() => store.width);
        const href = ref<string>();
        const keyword = ref<string>();

        const resolvePath = () => {
            if (compSrc.value?.includes('svg')) {
                href.value = compSrc.value;
                return;
            }

            if (compWidth.value >= ViewSize.DESKTOP) {
                // 1200
                const lastIdx = compSrc.value.lastIndexOf('.');
                href.value =
                    compSrc.value.substring(0, lastIdx).replace('/@', '') +
                    '@2x.' +
                    compSrc.value.substring(lastIdx + 1, compSrc.value.length);
            } else if (compWidth.value < ViewSize.DESKTOP && compWidth.value > ViewSize.MOBILE) {
                // 1199 ~ 768
                const lastIdx = compSrc.value.lastIndexOf('.');
                href.value =
                    compSrc.value.substring(0, lastIdx).replace('/@', '') +
                    '@2x.' +
                    compSrc.value.substring(lastIdx + 1, compSrc.value.length);
            } else {
                // 767
                const lastIdx = compSrc.value.lastIndexOf('.');
                href.value =
                    compSrc.value.substring(0, lastIdx).replace('/@', '') +
                    '@1x.' +
                    compSrc.value.substring(lastIdx + 1, compSrc.value.length);
            }
        };

        onMounted(() => {
            resolvePath();
            if (compSrc.value) {
                const lastIdx = compSrc.value.lastIndexOf('/');
                const fullName = compSrc.value.slice(lastIdx + 1, compSrc.value.length);
                const split = fullName.split('.');
                if (split && split.length > 0) {
                    keyword.value = split[0];
                }
            }
        });

        watch(compWidth, resolvePath);

        return {
            href,
            keyword
        };
    }
});
</script>

<template>
    <img :src="href" :alt="keyword" />
</template>
