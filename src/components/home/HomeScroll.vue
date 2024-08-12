<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeScroll',
    setup() {}
});
</script>

<template>
    <div class="scroll-wrapper w-screen h-[200px] flex justify-center mt-[130px] mb-[80px]">
        <div class="banner-area w-full h-full flex">
            <div class="banner-content w-full h-[200px] flex flex-col">
                <div class="banner first-row w-full h-full flex relative overflow-x-hidden">
                    <div class="img-wrapper absolute w-[1336px] h-[60px] absolute flex">
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_1@1x.png"
                            alt="brand_1"
                        />
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_1@1x.png"
                            alt="brand_1"
                        />
                    </div>
                    <div class="img-wrapper absolute w-[1336px] h-[60px] absolute flex">
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_1@1x.png"
                            alt="brand_1"
                        />
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_1@1x.png"
                            alt="brand_1"
                        />
                    </div>
                </div>
                <div class="banner second-row w-full h-full flex relative overflow-x-hidden">
                    <div class="img-wrapper absolute w-[1336px] h-[60px] absolute flex">
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_2@1x.png"
                            alt="brand_1"
                        />
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_2@1x.png"
                            alt="brand_1"
                        />
                    </div>
                    <div class="img-wrapper absolute w-[1336px] h-[60px] absolute flex">
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_2@1x.png"
                            alt="brand_1"
                        />
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_2@1x.png"
                            alt="brand_1"
                        />
                    </div>
                </div>
                <div class="banner third-row w-full h-full flex relative overflow-x-hidden">
                    <div class="img-wrapper absolute w-[1336px] h-[60px] absolute flex">
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_3@1x.png"
                            alt="brand_1"
                        />
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_3@1x.png"
                            alt="brand_1"
                        />
                    </div>
                    <div class="img-wrapper absolute w-[1336px] h-[60px] absolute flex">
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_3@1x.png"
                            alt="brand_1"
                        />
                        <img
                            class="w-full h-full"
                            src="/images/home/brand_3@1x.png"
                            alt="brand_1"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
