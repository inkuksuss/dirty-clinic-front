<script lang="ts">
import { defineComponent } from 'vue';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';

export default defineComponent({
    name: 'HomeScroll',
    props: {},
    setup() {
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: false });

        return {
            plugins: [autoPlay]
        };
    }
});
</script>

<template>
    <div class="scroll-wrapper flex justify-center mt-[130px] mb-[80px]">
        <div class="banner-area w-[--full-width] flex overflow-hidden">
            <div class="banner-content w-full h-[200px] flex">
                <div class="image-content first-banner w-[1200px] h-full">
                    <img
                        class="w-full h-full"
                        src="@/assets/images/home/brand_scroll@1x.jpg"
                        alt="brand_1"
                    />
                </div>
            </div>
            <div class="banner-content w-full h-[200px] flex">
                <div class="image-content first-banner w-[1200px] h-full">
                    <img
                        class="w-full h-full"
                        src="@/assets/images/home/brand_scroll@1x.jpg"
                        alt="brand_2"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
