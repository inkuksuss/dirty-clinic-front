<script lang="ts">
import { defineComponent } from 'vue';
import { AutoPlay } from '@egjs/flicking-plugins';
// import Flicking from '@egjs/vue3-flicking';

export default defineComponent({
    name: 'HomeSlider',
    // components: { Flicking: Flicking },
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
            class="slider-contents w-[--body-width] flex justify-between items-center"
        >
            <div class="text-area w-[32%] pb-[20px]">
                <div class="w-full text-[48px] font-[700] leading-[57px]">
                    신뢰의 <br />
                    더티클리닉
                </div>
            </div>

            <div class="image-container first-image w-[32%]">
                <img class="w-full h-full" src="@/assets/images/home/slider_1@1x.png" alt="slider_1" />
            </div>
            <div class="image-container second-image w-[32%]">
                <img class="w-full h-full" src="@/assets/images/home/test-img2@1x.png" alt="slider_2" />
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
