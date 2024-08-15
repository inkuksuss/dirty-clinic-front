<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import {
    PopupType,
    type SubIntroType,
    SubManageType,
    SubPageType,
    type SubPriceType,
    type SubPromotionType,
    type SubServiceType
} from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from '@/components/PaymentButton.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';

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
        const store = useStore();
        const introList: SubIntroType[] = [
            {
                title: '견적요청 및\n전문 상담',
                src: new URL('@/assets/images/sub/intro/phone.png', import.meta.url).href
            },
            {
                title: '일정조정 및\n예약확정',
                src: new URL('@/assets/images/sub/intro/note.png', import.meta.url).href
            },
            {
                title: '투입 전 해피콜\n및 사전정보 확인',
                src: new URL('@/assets/images/sub/intro/people.png', import.meta.url).href
            },
            {
                title: '투입 후 현장\n' + '특이사항 확인 및\n' + '색상 선택',
                src: new URL('@/assets/images/sub/intro/checklist.png', import.meta.url).href
            },
            {
                title: '구역별 작업 진행',
                src: new URL('@/assets/images/sub/intro/basket.png', import.meta.url).href
            },
            {
                title: '현장 검수 및\n피드백',
                src: new URL('@/assets/images/sub/intro/document.png', import.meta.url).href
            }
        ];

        const priceList: SubPriceType[] = [
            {
                title: '화장실',
                src: new URL('@/assets/images/sub/price/joint_bath.png', import.meta.url).href
            },
            {
                title: '주방',
                titleDesc: '* 신축 기준',
                src: new URL('@/assets/images/sub/price/joint_kitchen.png', import.meta.url).href
            },
            {
                title: '베란다',
                titleDesc: '* 신축 기준',
                src: new URL('@/assets/images/sub/price/joint_veranda.png', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/joint.png', import.meta.url).href
            }
        ];

        const manageList: SubManageType[] = [
            {
                title: '주방',
                content: [{ main: '싱크대 상판' }, { main: '아일랜드 식탁' }],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '화장실',
                content: [{ main: '선반 젠다이' }],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '거실·방·현관',
                content: [{ main: '대리석/폴리싱타일 제질의 바닥, 아트윌 벽면' }],
                icon: new URL('@/assets/images/icons/room.svg', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc: '연마 시공 특성상 소요시간,\n' + '투입인원 및 AS규정은 달라질 수 있습니다.',
                ext: '*현장에서 안내 도와드리겠습니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '경기·인천·서울 (수도권 전지역)'
            },
            {
                src: new URL('@/assets/images/icons/headset.svg', import.meta.url).href,
                title: '예약 방법',
                desc: '마감기한, 작업 일정(주/야), 작업 인원\n' + '상관없이 항시 준비되어 있습니다.'
            }
        ];

        const manageDesc =
            '청결을 모토로 하여 오염요소는 완벽하게 제거해드립니다.\n' +
            '알고싶은 영역을 눌러보세요. ';

        const bannerScript = {
            title: '연마',
            desc:
                '연마 작업으로만 복구되는 것이 있습니다.\n' +
                '전문가의 손길로 최고의 퀄리티를 보장합니다.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            priceList,
            promotionList,
            serviceList,
            manageList,
            manageDesc,
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
            title="어디까지 관리 되나요?"
            :desc="manageDesc"
            :page-type="SubPageType.GRINDING"
            :manage-list="manageList"
        ></sub-manage>
        <sub-promotion :page-type="SubPageType.GRINDING" :prom-list="promotionList"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
