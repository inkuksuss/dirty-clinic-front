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
            title: '더티클리닉 - 특수클리닉 - 폐기물처리',
            description:
                '더티클리닉은 정부의 규제를 준수하고 환경보호 및 안전을 최우선으로 고려합니다.'
        });
        const store = useStore();
        const introList: SubIntroType[] = [
            {
                title: '견적 요청 및\n전문 상담',
                src: new URL('@/assets/images/sub/intro/phone.webp', import.meta.url).href
            },
            {
                title: '일정 조정 및\n예약 확정',
                src: new URL('@/assets/images/sub/intro/note.webp', import.meta.url).href
            },
            {
                title: '투입 전 해피콜\n및 사전정보 확인',
                src: new URL('@/assets/images/sub/intro/people.webp', import.meta.url).href
            },
            {
                title: '투입 후 현장 특이사항\n' + '확인 및 공유',
                src: new URL('@/assets/images/sub/intro/checklist.webp', import.meta.url).href
            },
            {
                title: '폐기물 상차\n' + '및 수거',
                src: new URL('@/assets/images/sub/intro/trash.webp', import.meta.url).href
            },
            {
                title: '현장 검수 및\n피드백',
                src: new URL('@/assets/images/sub/intro/document.webp', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/fire.webp', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc:
                    '폐기물 처리는 특성상 소요시간,\n' +
                    '투입인원 및 AS규정은 달라질 수 있습니다.\n' +
                    '화재·음식물 등 특수한 경우나 양에 따라\n' +
                    '금액이 변동 될 수 있습니다.',
                ext: '*현장에서 안내 도와드리겠습니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '전국 서비스 가능합니다.'
            }
        ];

        const manageTitle = '세상에 존재하는\n' + '모든 쓰레기 처리 가능합니다.';
        const manageDesc = '전문 인력이 정확한 규모와 견적 안내해 드리고 있습니다.';
        const manageImg = new URL('@/assets/images/sub/manage/waste.webp', import.meta.url).href;

        const bannerScript = {
            title: '폐기물 처리',
            desc: '더티클리닉은 정부의 규제를 준수하고 환경보호 및 안전을 최우선으로 고려합니다.'
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
            :page-type="SubPageType.WASTE"
        ></sub-manage>
        <sub-promotion :page-type="SubPageType.WASTE" :prom-list="promotionList"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
