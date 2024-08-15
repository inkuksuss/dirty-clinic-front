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
                title: '투입 후 현장\n' + '특이사항 확인 및\n' + '공유',
                src: new URL('@/assets/images/sub/intro/checklist.png', import.meta.url).href
            },
            {
                title: '구역별 작업진행',
                src: new URL('@/assets/images/sub/intro/basket.png', import.meta.url).href
            },
            {
                title: '현장 검수 및\n피드백',
                src: new URL('@/assets/images/sub/intro/document.png', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/fire.png', import.meta.url).href
            }
        ];

        const manageList: SubManageType[] = [
            {
                title: '욕실',
                content: [
                    { main: '타일' },
                    { main: '실리콘' },
                    { main: '변기' },
                    { main: '세면대' },
                    { main: '욕조' },
                    { main: '줄눈' },
                    { main: '배수구' }
                ],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '주방',
                content: [
                    { main: '싱크볼' },
                    { main: '실리콘' },
                    { main: '벽타일' },
                    { main: '배수구' }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '베란다',
                content: [{ main: '타일' }, { main: '창틀 실리콘' }, { main: '줄눈' }],
                icon: new URL('@/assets/images/icons/room.svg', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc:
                    '곰팡이 제거·차단 특성상 소요시간,\n' +
                    '투입인원 및 AS규정은 달라질 수 있습니다.',
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

        const manageTitle = '어디까지 관리되나요';
        const manageDesc =
            '청결을 모토로 하여 오염요소는 완벽하게 제거해드립니다.\n' +
            '알고싶은 영역을 눌러보세요. ';

        const bannerScript = {
            title: '곰팡이 제거·차단',
            desc:
                '전문적이고 친환경적인 시공 작업으로\n' +
                '우리 신체의 호흡기와 알레르기 유발을 보호합니다.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            promotionList,
            manageList,
            serviceList,
            manageTitle,
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
            :title="manageTitle"
            :desc="manageDesc"
            :page-type="SubPageType.MOLD"
            :manage-list="manageList"
        ></sub-manage>
        <sub-promotion :page-type="SubPageType.MOLD" :prom-list="promotionList"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
