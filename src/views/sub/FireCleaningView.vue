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
            title: '더티클리닉 - 특수클리닉 - 화재청소',
            description:
                '화재 피해 현장 재건 및 기반 마련을 위해, 더티클리닉만의 철저한 현장관리 프로세스를 보장합니다.'
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
                title: '예약확정 및\n작업 준비',
                src: new URL('@/assets/images/sub/intro/people.webp', import.meta.url).href
            },
            {
                title: '철거 공사',
                src: new URL('@/assets/images/sub/intro/terminate.webp', import.meta.url).href
            },
            {
                title: '폐기물 처리',
                src: new URL('@/assets/images/sub/intro/trash.webp', import.meta.url).href
            },
            {
                title: '1차 탈취 및\n살균소독',
                src: new URL('@/assets/images/sub/intro/disinfection.webp', import.meta.url).href
            },
            {
                title: '약품 처리 및\n고압세척',
                src: new URL('@/assets/images/sub/intro/wash.webp', import.meta.url).href
            },
            {
                title: '2차 소독 및\n화재 냄새 억제',
                src: new URL('@/assets/images/sub/intro/suppression.webp', import.meta.url).href
            },
            {
                title: '복구 공사',
                src: new URL('@/assets/images/sub/intro/restore.webp', import.meta.url).href
            },
            {
                title: '공사 후 청소',
                src: new URL('@/assets/images/sub/intro/basket.webp', import.meta.url).href
            },
            {
                title: '현장 검수 및\n체크리스트 작성',
                src: new URL('@/assets/images/sub/intro/checklist.webp', import.meta.url).href
            },
            {
                title: '보험관련\n서류 안내',
                src: new URL('@/assets/images/sub/intro/document.webp', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/fire_1.webp', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc: '화재청소 특성상 소요시간, 투입인원 및\n' + 'AS규정은 달라질 수 있습니다.',
                ext: '*현장에서 안내 도와드리겠습니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '전국 서비스 가능합니다.'
            },
            {
                src: new URL('@/assets/images/icons/living_room.svg', import.meta.url).href,
                title: '부가서비스',
                desc: '청소 외에도 철거, \n' + '인테리어 등 부가서비스 가능합니다.'
            },
            {
                src: new URL('@/assets/images/icons/headset.svg', import.meta.url).href,
                title: '예약 방법',
                desc: '마감기한, 작업 일정(주/야), 작업 인원\n' + '상관없이 항시 준비되어 있습니다.'
            }
        ];

        const manageTitle = '화재청소는\n특성상 작업범위가 넓습니다.';
        const manageDesc = `전문인력이 현장실측 시 <br class="break-d"/>고객님의 피해 상황과 작업환경을 고려해 <br class="break-d"/>현장에서 안내해 드리고 있습니다.`;
        const manageImg = new URL('@/assets/images/sub/manage/fire.webp', import.meta.url).href;

        const bannerScript = {
            title: '화재청소',
            desc:
                '화재 피해 현장 재건 및 기반 마련을 위해,\n' +
                '더티클리닉만의 철저한 현장관리 프로세스를 보장합니다.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            promotionList,
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
            :page-type="SubPageType.FIRE"
        ></sub-manage>
        <sub-promotion :page-type="SubPageType.FIRE" :prom-list="promotionList"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
