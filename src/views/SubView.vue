<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubCheckList from '@/components/sub/SubCheckList.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';

export default defineComponent({
    components: { SubPromotion, SubCheckList, SubService, SubManage, SubIntro },
    setup() {
        return {};
    }
});
</script>

<template>
    <div class="sub-wrapper w-screen flex flex-col items-center justify-start">
        <div class="banner-wrapper w-full h-[270px] flex justify-center">
            <div class="banner w-full h-full flex flex-col justify-center pl-[160px]">
                <div
                    class="text-[--color-text-black] text-[48px] font-[700] leading-[57px] mb-[10px]"
                >
                    원룸청소
                </div>
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                    1인 가구가 늘어난 요즘, <br />
                    원룸 청소는 더티클리닉에게 맡겨주세요.
                </div>
            </div>
        </div>
        <sub-intro></sub-intro>
        <sub-manage></sub-manage>
        <sub-promotion
            main-img="src/assets/images/home/test-img1@1x.jpg"
            :sub-list="[{ img: 'src/assets/images/home/test-img1@1x.jpg' }]"
        ></sub-promotion>
        <sub-promotion
            main-img="src/assets/images/home/test-img1@1x.jpg"
            :sub-list="[
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' }
            ]"
        ></sub-promotion>
        <sub-promotion
            main-img="src/assets/images/home/test-img1@1x.jpg"
            :sub-list="[
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' }
            ]"
        ></sub-promotion>
        <sub-promotion
            main-img="src/assets/images/home/test-img1@1x.jpg"
            :sub-list="[
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' }
            ]"
        ></sub-promotion>
        <sub-service></sub-service>
        <sub-check-list></sub-check-list>
    </div>
</template>

<style scoped></style>
