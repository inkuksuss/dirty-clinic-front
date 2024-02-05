<script lang="ts">
import { defineComponent } from 'vue';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';

export default defineComponent({
    name: 'HomeSlider',
    components: { Flicking: Flicking },
    setup() {
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });

        return {
            plugins: [autoPlay]
        };
    }
});
</script>

<template>
    <div class="slider-wrapper w-full flex justify-center">
        <div
            class="slider-contents max-w-[--body-width] w-[73%] flex pt-[100px] justify-between items-center"
        >
            <div class="text-area max-w-[280px] w-[32%] pb-[20px]">
                <div class="w-full text-[48px] font-[700] leading-[57px]">
                    우리는 <br />
                    이렇게 <br />
                    보장합니다.
                </div>
            </div>

            <div class="image-container max-w-[280px] w-[32%] max-h-[340px]">
                <img
                    class="w-full"
                    src="@/assets/images/home/test-img2@1x.png"
                    alt="hello"
                />
            </div>
            <div class="image-container max-w-[280px] w-[32%] max-h-[340px]">
                <img
                    class="w-full"
                    src="@/assets/images/home/test-img2@1x.png"
                    alt="hello"
                />
            </div>
        </div>
    </div>

    <!--  <div class="slider-wrapper w-full flex justify-center">-->
    <!--    <div class="slider-contents w-full flex pt-[100px]">-->
    <!--      <div class="text-area w-[300px] h-[340px] pt-[65px] z-10 bg-white">-->
    <!--        <div class="w-[220px] text-[48px] font-[700] leading-[57px]">-->
    <!--          우리는 <br />-->
    <!--          이렇게 <br />-->
    <!--          보장합니다.-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      &lt;!&ndash;            <Flicking&ndash;&gt;-->
    <!--      &lt;!&ndash;                class="flicking-area overflow-hidden w-[740px] h-[340px] z-0 pl-[100px]"&ndash;&gt;-->
    <!--      &lt;!&ndash;                :plugins="plugins"&ndash;&gt;-->
    <!--      &lt;!&ndash;                :options="{ circular: true }"&ndash;&gt;-->
    <!--      &lt;!&ndash;            >&ndash;&gt;-->
    <!--      &lt;!&ndash;                <div class="w-[280px] h-[340px] ml-[20px]">&ndash;&gt;-->
    <!--      &lt;!&ndash;                    <img&ndash;&gt;-->
    <!--      &lt;!&ndash;                        class="w-full h-full min-w-[280px]"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        src="@/assets/images/home/test-img1@1x.jpg"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        alt="hello"&ndash;&gt;-->
    <!--      &lt;!&ndash;                    />&ndash;&gt;-->
    <!--      &lt;!&ndash;                </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;                <div class="w-[280px] h-[340px] ml-[20px]">&ndash;&gt;-->
    <!--      &lt;!&ndash;                    <img&ndash;&gt;-->
    <!--      &lt;!&ndash;                        class="w-full h-full min-w-[280px]"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        src="@/assets/images/home/test-img1@1x.jpg"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        alt="hello"&ndash;&gt;-->
    <!--      &lt;!&ndash;                    />&ndash;&gt;-->
    <!--      &lt;!&ndash;                </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;                <div class="w-[280px] h-[340px] ml-[20px]">&ndash;&gt;-->
    <!--      &lt;!&ndash;                    <img&ndash;&gt;-->
    <!--      &lt;!&ndash;                        class="w-full h-full min-w-[280px]"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        src="@/assets/images/home/test-img1@1x.jpg"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        alt="hello"&ndash;&gt;-->
    <!--      &lt;!&ndash;                    />&ndash;&gt;-->
    <!--      &lt;!&ndash;                </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;                <div class="w-[280px] h-[340px] ml-[20px]">&ndash;&gt;-->
    <!--      &lt;!&ndash;                    <img&ndash;&gt;-->
    <!--      &lt;!&ndash;                        class="w-full h-full min-w-[280px]"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        src="@/assets/images/home/test-img1@1x.jpg"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        alt="hello"&ndash;&gt;-->
    <!--      &lt;!&ndash;                    />&ndash;&gt;-->
    <!--      &lt;!&ndash;                </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;                <div class="w-[280px] h-[340px] ml-[20px]">&ndash;&gt;-->
    <!--      &lt;!&ndash;                    <img&ndash;&gt;-->
    <!--      &lt;!&ndash;                        class="w-full h-full min-w-[280px]"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        src="@/assets/images/home/test-img1@1x.jpg"&ndash;&gt;-->
    <!--      &lt;!&ndash;                        alt="hello"&ndash;&gt;-->
    <!--      &lt;!&ndash;                    />&ndash;&gt;-->
    <!--      &lt;!&ndash;                </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;            </Flicking>&ndash;&gt;-->
    <!--    </div>-->
    <!--  </div>-->
</template>
