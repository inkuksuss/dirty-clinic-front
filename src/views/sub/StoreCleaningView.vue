<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubCheckList from '@/components/sub/SubCheckList.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import {
    PopupType,
    type SubIntroType,
    SubPageType,
    type SubPriceType,
    type SubPromotionType,
    type SubServiceType
} from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from '@/components/PaymentButton.vue';

export default defineComponent({
    computed: {
        SubPageType() {
            return SubPageType;
        }
    },
    components: {
        PaymentButton,
        SubBanner,
        SubPromotion,
        SubCheckList,
        SubService,
        SubManage,
        SubIntro
    },
    setup() {
        const store = useStore();
        const introList: SubIntroType[] = [
            {
                title: '전문 상담과\n예약 확정',
                src: new URL('@/assets/images/sub/intro/phone.png', import.meta.url).href
            },
            {
                title: '직영팀장님의\n사전 해피콜',
                src: new URL('@/assets/images/sub/intro/note.png', import.meta.url).href
            },
            {
                title: '현장 투입 및\n특이사항 체크',
                src: new URL('@/assets/images/sub/intro/people.png', import.meta.url).href
            },
            {
                title: '구역별\n알맞는 약품청소',
                src: new URL('@/assets/images/sub/intro/basket.png', import.meta.url).href
            },
            {
                title: '고객님과 함께\n현장 검수 및 완료',
                src: new URL('@/assets/images/sub/intro/kitchen.png', import.meta.url).href
            }
        ];

        const priceList: SubPriceType[] = [
            {
                src: new URL('@/assets/images/sub/price/store.png', import.meta.url).href,
                ext:
                    '* 외부창문, 화장실 청소 제외된 기본 단가입니다.\n' +
                    '20평 이상의 경우나 바닥코팅, 시스템에어컨 청소 등 특수한 경우는 상담원과 상담이 필요합니다.'
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/move_in1.png', import.meta.url).href
            },
            {
                src: new URL('@/assets/images/sub/promotion/move_in1.png', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '작업 인원',
                desc: '전문교육을 받은 2명 이상의 작업자와\n팀장이 함께 관리합니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '수도권 전지역 + 충청권에서 제공합니다.'
            },
            {
                src: new URL('@/assets/images/icons/living_room.svg', import.meta.url).href,
                title: '소요 시간',
                desc: '4시간 전후로 최상의 서비스를 제공합니다.',
                ext: '* 현장 상태에 따라 시간을 변동될 수 있습니다.'
            },
            {
                src: new URL('@/assets/images/icons/headset.svg', import.meta.url).href,
                title: 'AS 안내',
                desc: '작업 종류 후 5일이내 1회 가능합니다.',
                ext: '* 이사짐이 들어오거나 추가 시공의 경우 제한됨.'
            }
        ];

        const bannerScript = {
            title: '상가매장청소',
            desc: '깔끔함으로 손님들의 마음까지, 상가·매장청소는 더티클리닉에게 맡겨주세요.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            priceList,
            promotionList,
            serviceList,
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
            desc="입주청소와 동힐하게 집안 전체를 청소합니다."
        ></sub-manage>
        <sub-promotion
            :page-type="SubPageType.STORE"
            :price-list="priceList"
            :prom-list="promotionList"
        ></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <sub-check-list></sub-check-list>
        <payment-button :click-handle="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
