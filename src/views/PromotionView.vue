<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/stores/store';
import { useMeta } from 'vue-meta';
import ClinicImage from '@/components/common/ClinicImage.vue';

export default defineComponent({
    components: {
        ClinicImage
    },
    setup() {
        useMeta({
            title: '프로모션',
            description: '더티클리닉이 진행하고 있는 프로모션을 모아보세요.'
        });

        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);

        const simpleList = ref<string[]>([
            new URL('@/assets/images/sub/promotion/spot_1.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/spot_2.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/one_room_1.webp', import.meta.url).href
        ]);

        const professionList = ref<string[]>([
            new URL('@/assets/images/sub/promotion/move_in_3.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/move_in_4.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/move_in_1.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/move_in_2.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/office_2.webp', import.meta.url).href
        ]);

        const specialList = ref<string[]>([
            new URL('@/assets/images/sub/promotion/fire_1.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/waste_1.webp', import.meta.url).href
        ]);

        const coatingList = ref<string[]>([
            new URL('@/assets/images/sub/promotion/grinding_1.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/wax_1.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/coating_1.webp', import.meta.url).href
        ]);

        const appliancesList = ref<string[]>([
            new URL('@/assets/images/sub/promotion/appliances_2.webp', import.meta.url).href,
            new URL('@/assets/images/sub/promotion/appliances_1.webp', import.meta.url).href
        ]);

        return {
            simpleList,
            professionList,
            specialList,
            coatingList,
            appliancesList,
            compIsMobile
        };
    }
});
</script>

<template>
    <div class="promotion-wrapper pt-[--header-height] flex justify-center relative">
        <div
            v-if="!compIsMobile"
            class="bg-logo absolute bottom-[-75px] left-[43%] w-[75%] max-w-[900px] max-h-[860px] -z-10"
        >
            <img class="w-full h-full" src="@/assets/images/common/bg_logo@2x.webp" />
        </div>
        <div class="promotion-contents max-w-[--body-width] w-[--body-ratio]">
            <div
                class="promotion-header pt-[60px] pb-[40px] border-b-[1px] border-[--color-border-blue]"
            >
                <div class="title text-[48px] font-[700] mb-[10px]">프로모션</div>
                <div class="desc text-[18px] font-[500] leading-[26px]">
                    더티클리닉이 <br class="break-m" />
                    진행하고 있는 프로모션을 모아보세요.
                </div>
            </div>
            <div class="simple-wrapper content-area pt-[40px]">
                <div class="main-text text-[32px] font-[700] mb-[10px]">간편클리닉 프로모션</div>
                <div class="sub-text text-[18px] font-[400] leading-[26px] mb-[30px]">
                    사용할 수 있는 프로모션은<br class="break-m" />서비스 상세페이지에서 확인하세요.
                </div>
                <div class="content-wrapper grid grid-cols-2 gap-[20px] mb-[60px]">
                    <div v-for="(data, idx) in simpleList" :key="`simple-${idx}`" class="w-full">
                        <clinic-image class="w-full" :src="data"></clinic-image>
                    </div>
                </div>
            </div>
            <div class="profession-wrapper content-area pt-[40px]">
                <div class="main-text text-[32px] font-[700] mb-[10px]">전문클리닉 프로모션</div>
                <div class="sub-text text-[18px] font-[400] leading-[26px] mb-[30px]">
                    사용할 수 있는 프로모션은<br class="break-m" />서비스 상세페이지에서 확인하세요.
                </div>
                <div class="content-wrapper grid grid-cols-2 gap-[20px] mb-[60px]">
                    <div
                        v-for="(data, idx) in professionList"
                        :key="`profession-${idx}`"
                        class="w-full"
                    >
                        <clinic-image class="w-full" :src="data"></clinic-image>
                    </div>
                </div>
            </div>
            <div class="special-wrapper content-area pt-[40px]">
                <div class="main-text text-[32px] font-[700] mb-[10px]">특수클리닉 프로모션</div>
                <div class="sub-text text-[18px] font-[400] leading-[26px] mb-[30px]">
                    사용할 수 있는 프로모션은<br class="break-m" />서비스 상세페이지에서 확인하세요.
                </div>
                <div class="content-wrapper grid grid-cols-2 gap-[20px] mb-[60px]">
                    <div v-for="(data, idx) in specialList" :key="`special-${idx}`" class="w-full">
                        <clinic-image class="w-full" :src="data"></clinic-image>
                    </div>
                </div>
            </div>
            <div class="coating-wrapper content-area pt-[40px]">
                <div class="main-text text-[32px] font-[700] mb-[10px]">연마/코팅 프로모션</div>
                <div class="sub-text text-[18px] font-[400] leading-[26px] mb-[30px]">
                    사용할 수 있는 프로모션은<br class="break-m" />서비스 상세페이지에서 확인하세요.
                </div>
                <div class="content-wrapper grid grid-cols-2 gap-[20px] mb-[60px]">
                    <div v-for="(data, idx) in coatingList" :key="`coating-${idx}`" class="w-full">
                        <clinic-image class="w-full" :src="data"></clinic-image>
                    </div>
                </div>
            </div>
            <div class="appliances-wrapper content-area pt-[40px]">
                <div class="main-text text-[32px] font-[700] mb-[10px]">가전클리닉 프로모션</div>
                <div class="sub-text text-[18px] font-[400] leading-[26px] mb-[30px]">
                    사용할 수 있는 프로모션은<br class="break-m" />서비스 상세페이지에서 확인하세요.
                </div>
                <div class="content-wrapper grid grid-cols-2 gap-[20px] mb-[160px]">
                    <div
                        v-for="(data, idx) in appliancesList"
                        :key="`appliances-${idx}`"
                        class="w-full"
                    >
                        <clinic-image class="w-full" :src="data"></clinic-image>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
