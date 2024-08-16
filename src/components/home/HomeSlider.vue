<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AutoPlay } from '@egjs/flicking-plugins';
import ClinicImage from '@/components/common/ClinicImage.vue';
// import Flicking from '@egjs/vue3-flicking';

export default defineComponent({
    name: 'HomeSlider',
    components: { ClinicImage },
    // components: { Flicking: Flicking },
    setup() {
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });

        const firstImg = new URL('@/assets/images/home/slider_1.webp', import.meta.url).href;
        const secondImg = new URL('@/assets/images/home/slider_2.webp', import.meta.url).href;
        const firstSrc = ref<string>(firstImg);
        const secondSrc = ref<string>(secondImg);

        return {
            plugins: [autoPlay],
            firstSrc,
            secondSrc
        };
    }
});
</script>

<template>
    <div class="slider-wrapper w-full flex justify-center">
        <div
            class="slider-contents max-w-[--body-width] w-[--body-ratio] flex justify-start items-center"
        >
            <div class="text-area w-[32%] pb-[20px] mr-[85px] min-w-[210px]">
                <div class="w-full text-[48px] font-[700] leading-[57px]">
                    신뢰의 <br />
                    더티클리닉
                </div>
            </div>

            <div class="img-area flex gap-x-[17px]">
                <div class="image-container first-image w-[53%]">
                    <clinic-image class="max-w-[267px] w-full" :src="firstSrc"></clinic-image>
                </div>
                <div class="image-container second-image w-[46%]">
                    <clinic-image class="max-w-[222px] w-full" :src="secondSrc"></clinic-image>
                </div>
            </div>
        </div>
    </div>

    <!--      <div class="slider-wrapper w-full flex justify-center">-->
    <!--        <div class="slider-contents w-full flex pt-[100px]">-->
    <!--          <div class="text-area w-[300px] h-[340px] pt-[65px] z-10 bg-white">-->
    <!--            <div class="w-[220px] text-[48px] font-[700] leading-[57px]">-->
    <!--              우리는 <br />-->
    <!--              이렇게 <br />-->
    <!--              보장합니다.-->
    <!--            </div>-->
    <!--          </div>-->

    <!--                      <Flicking-->
    <!--                          class="flicking-area overflow-hidden w-[740px] h-[340px] z-0 pl-[100px]"-->
    <!--                          :plugins="plugins"-->
    <!--                          :options="{ circular: true }"-->
    <!--                      >-->
    <!--                          <div class="w-[280px] h-[340px] ml-[20px]">-->
    <!--                              <img-->
    <!--                                  class="w-full h-full min-w-[280px]"-->
    <!--                                  src="@/assets/images/home/test-img1@1x.jpg"-->
    <!--                                  alt="hello"-->
    <!--                              />-->
    <!--                          </div>-->
    <!--                          <div class="w-[280px] h-[340px] ml-[20px]">-->
    <!--                              <img-->
    <!--                                  class="w-full h-full min-w-[280px]"-->
    <!--                                  src="@/assets/images/home/test-img1@1x.jpg"-->
    <!--                                  alt="hello"-->
    <!--                              />-->
    <!--                          </div>-->
    <!--                          <div class="w-[280px] h-[340px] ml-[20px]">-->
    <!--                              <img-->
    <!--                                  class="w-full h-full min-w-[280px]"-->
    <!--                                  src="@/assets/images/home/test-img1@1x.jpg"-->
    <!--                                  alt="hello"-->
    <!--                              />-->
    <!--                          </div>-->
    <!--                          <div class="w-[280px] h-[340px] ml-[20px]">-->
    <!--                              <img-->
    <!--                                  class="w-full h-full min-w-[280px]"-->
    <!--                                  src="@/assets/images/home/test-img1@1x.jpg"-->
    <!--                                  alt="hello"-->
    <!--                              />-->
    <!--                          </div>-->
    <!--                          <div class="w-[280px] h-[340px] ml-[20px]">-->
    <!--                              <img-->
    <!--                                  class="w-full h-full min-w-[280px]"-->
    <!--                                  src="@/assets/images/home/test-img1@1x.jpg"-->
    <!--                                  alt="hello"-->
    <!--                              />-->
    <!--                          </div>-->
    <!--                      </Flicking>-->
    <!--        </div>-->
    <!--      </div>-->
</template>
