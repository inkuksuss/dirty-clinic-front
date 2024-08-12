<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import {
    PopupType,
    type SubIntroType,
    SubPageType,
    type SubPriceType,
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
        SubService,
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
                title: '구역별\n' + '알맞은 약품청소\n' + '및 기계작업',
                src: new URL('@/assets/images/sub/intro/joint.png', import.meta.url).href
            },
            {
                title: '현장 검수 및\n체크리스트 작성',
                src: new URL('@/assets/images/sub/intro/document.png', import.meta.url).href
            }
        ];

        const priceList: SubPriceType[] = [
            {
                title: '상가 매장 청소',
                src: new URL('@/assets/images/sub/price/restaurant_store.png', import.meta.url)
                    .href,
                ext: '* 20평 이상의 경우나 시스템에어컨, 주방 집기, 냉장고 청소 등 특수한 경우는 상담원과 상담이 필요합니다.'
            },
            {
                title: '후드 기름때 청소',
                subTitle:
                    '가로 후드 사이즈: 초소형 1m 이하, 소형 1.5m 이하, 중형 1.5-2m, 대형 2.5m 이상',
                src: new URL('@/assets/images/sub/price/restaurant_hood.png', import.meta.url).href,
                ext: '* 기본 출장비가 포함되어 있는 금액으로 입주청소와 함께 진행 시 금액할인이 있습니다.'
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc: '전문교육을 받은 남성 1-3명의 작업자와\n' + '팀장이 함께 관리합니다.'
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
                ext: '* 현장 상태에 따라 시간은 변동될 수 있습니다.'
            },
            {
                src: new URL('@/assets/images/icons/headset.svg', import.meta.url).href,
                title: 'AS 안내',
                desc: '작업 종료 후 5일이내  1회 가능합니다.',
              ext: '*이사짐이 들어오거나 추가 시공의 경우 제한됨.'
            }
        ];

        const bannerScript = {
            title: '식당 후드 청소',
            desc:
                '고객님의 식사를 위해 식당·후드 청소는 주기적으로 실시되어야 하며,\n' +
                '그것이 우리의 책임과 의무입니다.'
        };

        const manageDesc =
            '청결을 모토로 하여 오염요소는 완벽하게 제거해드립니다.\n' +
            '알고싶은 영역을 눌러보세요. ';

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            priceList,
            serviceList,
            bannerScript,
            manageDesc,
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
            :page-type="SubPageType.RESTAURANT"
        ></sub-manage>
        <sub-promotion :page-type="SubPageType.RESTAURANT" :price-list="priceList"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
