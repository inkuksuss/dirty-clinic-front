<script lang="ts">
import { defineComponent } from 'vue';

type PromotionInfo = {
    title: string;
    description: string;
    image: string;
};

export default defineComponent({
    name: 'HomePromotion',
    props: {},
    setup() {
        const promList: PromotionInfo[] = [
            {
                title: '프로모션1',
                description: '안녕',
                image: '1'
            },
            {
                title: '프로모션2',
                description: '안녕',
                image: '1'
            },
            {
                title: '프로모션3',
                description: '안녕',
                image: '1'
            }
        ];

        return { promList };
    }
});
</script>

<template>
    <div class="promotion-wrapper w-screen bg-[#e8f4ff] flex justify-center items-center">
        <div class="w-[--body-width] flex justify-between items-center pt-[68px] pb-[82px]">
            <div
                v-for="(prom, idx) in promList"
                :key="idx"
                class="w-[280px] h-[310px] bg-[--color-white] pt-[47px] pl-[40px]"
            >
                <div class="text-[28px] font-[700] color-[--color-text-black] leading-[33px] mb-[10px]">
                    {{ prom.title }}
                </div>
                <div class="text-[18px] font-[500] color-[--color-text-black] leading-[21px]">
                    {{ prom.description }}
                </div>
            </div>
        </div>
    </div>
</template>
