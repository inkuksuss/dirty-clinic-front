<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { AutoPlay } from '@egjs/flicking-plugins';
import ClinicImage from '@/components/common/ClinicImage.vue';
import { useStore } from '@/stores/store';
import Flicking from '@egjs/vue3-flicking';

export default defineComponent({
    name: 'HomeSlider',
    components: { ClinicImage, Flicking: Flicking },
    setup() {
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });
        const store = useStore();

        const compIsMobile = computed(() => store.isMobile);
        const imgList = ref<string[]>([
            new URL('@/assets/images/home/slider_1.webp', import.meta.url).href,
            new URL('@/assets/images/home/slider_2.webp', import.meta.url).href,
            new URL('@/assets/images/home/slider_3.webp', import.meta.url).href
        ]);

        onMounted(() => {});

        return {
            plugins: [autoPlay],
            imgList,
            compIsMobile
        };
    }
});
</script>

<template>
    <div class="slider-wrapper w-full flex">
        <div class="slider-contents w-full flex justify-start items-center pl-[13.5%]">
            <div class="text-area w-[210px] pb-[20px] mr-[85px] min-w-[210px]">
                <div class="w-full text-[48px] font-[700] leading-[57px]">
                    신뢰의 <br />
                    더티클리닉
                </div>
            </div>
            <Flicking
                v-if="compIsMobile"
                class="img-area flex justify-between items-center pt-[30px] overflow-hidden"
                :options="{
                    bound: true,
                    panelsPerView: -1,
                    noPanelStyleOverride: true,
                    resizeOnContentsReady: true
                }"
            >
                <div v-for="(img, idx) in imgList" :key="`slider-${idx}`" class="image-container">
                    <clinic-image class="w-full" :src="img"></clinic-image>
                </div>
            </Flicking>

            <div v-else class="img-area flex gap-x-[17px] w-full">
                <div
                    v-for="(img, idx) in imgList"
                    class="image-container"
                    :key="`slider-${idx}`"
                    :class="idx === 0 ? 'max-w-[267px]' : 'max-w-[222px]'"
                >
                    <clinic-image class="w-full" :src="img"></clinic-image>
                </div>
            </div>
        </div>
    </div>
</template>
