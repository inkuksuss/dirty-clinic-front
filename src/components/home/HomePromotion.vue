<script lang="ts">
import { defineComponent } from 'vue';

type PromotionInfo = {
    title: string;
    description: string;
    image: string;
};

export default defineComponent({
    name: 'HomePromotion',
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
    <div class="promotion-wrapper w-full bg-[#e8f4ff] flex justify-center items-center">
        <div
            class="promotion-contents max-w-[--body-width] w-[73%] flex justify-between items-center pt-[68px] pb-[82px]"
        >
            <div
                v-for="(prom, idx) in promList"
                :key="idx"
                class="content w-[32%] max-w-[280px] bg-[--color-white] flex-center"
            >
                <div class="w-[71%] h-[70%]">
                    <div
                        class="text-[28px] font-[700] color-[--color-text-black] leading-[33px] mb-[10px]"
                    >
                        {{ prom.title }}
                    </div>
                    <div class="text-[18px] font-[500] color-[--color-text-black] leading-[21px]">
                        {{ prom.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
