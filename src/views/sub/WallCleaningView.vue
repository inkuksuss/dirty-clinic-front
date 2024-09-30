<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import {
    PopupType,
    type SubIntroType,
    SubPageType,
    type SubPromotionType,
    type SubServiceType
} from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from '@/components/PaymentButton.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';
import { useMeta } from 'vue-meta';

export default defineComponent({
    computed: {
        SubPageType() {
            return SubPageType;
        }
    },
    components: {
        PaymentButton,
        SubBanner,
        SubService,
        SubPromotion,
        SubManage,
        SubIntro
    },
    setup() {
        useMeta({
            title: '더티클리닉 - 특수클리닉 - 외벽청소',
            description:
                '환경과 이미지를 한번에. 건물의 미적 가치와 지역의 환경미 증진에 이바지합니다.'
        });
        const store = useStore();
        const introList: SubIntroType[] = [
            {
                title: '방문견적\n일정 안내',
                src: new URL('@/assets/images/sub/intro/phone.webp', import.meta.url).href
            },
            {
                title: '현장실측 및\n청소 프로세스 안내',
                src: new URL('@/assets/images/sub/intro/note.webp', import.meta.url).href
            },
            {
                title: '예약확정 및\n작업준비',
                src: new URL('@/assets/images/sub/intro/people.webp', import.meta.url).href
            },
            {
                title: '고소작업대 및\n' + '현장별 특수장비 투입',
                src: new URL('@/assets/images/sub/intro/equipment.webp', import.meta.url).href
            },
            {
                title: '약품처리 후 고압세척\n' + '및 고소작업',
                src: new URL('@/assets/images/sub/intro/wash.webp', import.meta.url).href
            },
            {
                title: '현장 검수 및\n피드백',
                src: new URL('@/assets/images/sub/intro/document.webp', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc:
                    '건물 외벽 청소 특성상 소요시간,\n' +
                    '투입인원 및 AS규정은 달라질 수 있습니다.',
                ext: '*현장에서 안내 도와드리겠습니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '전국 서비스 가능합니다.'
            },
            {
                src: new URL('@/assets/images/icons/headset.svg', import.meta.url).href,
                title: '예약 방법',
                desc: '마감기한, 작업 일정(주/야), 작업 인원\n' + '상관없이 항시 준비되어 있습니다.'
            }
        ];

        const manageTitle = '건물 외벽 청소는\n' + '특성상 작업범위가 넓습니다.';
        const manageDesc = `전문인력이 현장실측 시 <br class="break-d"/>고객님의 피해 상황과 작업환경을 고려해 <br class="break-d"/>현장에서 안내해 드리고 있습니다.`;
        const manageImg = new URL('@/assets/images/sub/manage/wall.webp', import.meta.url).href;

        const bannerScript = {
            title: '건물외벽 청소',
            desc:
                '환경과 이미지를 한번에.\n' +
                '건물의 미적 가치와 지역의 환경미 증진에 이바지합니다.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            serviceList,
            manageTitle,
            manageDesc,
            manageImg,
            bannerScript,
            handleClickBtn
        };
    }
});
</script>

<template>
    <div class="sub-wrapper w-screen flex flex-col items-center justify-start">
        <sub-banner :title="bannerScript.title" :desc="bannerScript.desc"></sub-banner>
        <sub-intro :data-list="introList"></sub-intro>
        <sub-manage
            :title="manageTitle"
            :desc="manageDesc"
            :main-img="manageImg"
            :page-type="SubPageType.WALL"
        ></sub-manage>
        <sub-promotion :page-type="SubPageType.WALL"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
