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
    SubManageType,
    SubPageType,
    type SubPriceType,
    type SubPromotionType,
    type SubServiceType
} from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from '@/components/PaymentButton.vue';

export default defineComponent({
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
                title: '창틀',
                titleDesc: '* 전체 단가는 공실 기준입니다.',
                src: new URL('@/assets/images/sub/price/spot_window.png', import.meta.url).href
            },
            {
                title: '화장실',
                titleDesc: '* 전체 단가는 공실 기준입니다.',
                src: new URL('@/assets/images/sub/price/spot_bath.png', import.meta.url).href
            },
            {
                title: '베란다',
                titleDesc: '* 전체 단가는 공실 기준입니다.',
                src: new URL('@/assets/images/sub/price/spot_veranda.png', import.meta.url).href
            },
            {
                title: '주방',
                titleDesc: '* 전체 단가는 공실 기준입니다.',
                src: new URL('@/assets/images/sub/price/spot_kitchen.png', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/one_room1.png', import.meta.url).href
            },
            {
                src: new URL('@/assets/images/sub/promotion/one_room1.png', import.meta.url).href
            }
        ];

        const manageList: SubManageType[] = [
            {
                title: '창틀 청소',
                content: [
                    {
                        main: '방충망'
                    },
                    {
                        main: '내부 유리창'
                    },
                    {
                        main: '창틀'
                    },
                    {
                        main: '샷시 프레임'
                    }
                ],
                icon: new URL('@/assets/images/icons/window.svg', import.meta.url).href
            },
            {
                title: '바닥 청소',
                content: [
                    {
                        main: '전체 바닥청소',
                        sub: '베란다 화장실 제외'
                    }
                ],
                icon: new URL('@/assets/images/icons/dustpan.svg', import.meta.url).href
            },
            {
                title: '주방 청소',
                content: [
                    {
                        main: '주방 상하부장'
                    },
                    {
                        main: '싱크대'
                    },
                    { main: '가스레인지' },
                    {
                        main: '인덕션'
                    },
                    {
                        main: '후드망'
                    },
                    {
                        main: '걸레받이'
                    },
                    {
                        main: '타일벽면'
                    }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '화장실 청소',
                content: [{ main: '화장실 내부공간 전체' }],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '베란다 청소',
                content: [
                    { main: '바닥' },
                    {
                        main: '수전'
                    },
                    {
                        main: '빨래걷이'
                    },
                    {
                        main: '베란다 창고'
                    },
                    { main: '배수구' }
                ],
                icon: new URL('@/assets/images/icons/room.svg', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '작업 인원',
                desc: '전문 교육을 받은 1-3명의 작업자와\n팀장이 함께 관리합니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '수도권 전지역 + 충청권에서 제공합니다.'
            },
            {
                src: new URL('@/assets/images/icons/living_room.svg', import.meta.url).href,
                title: '소요 시간',
                desc: '3시간 전후로 최상의 서비스를 제공합니다.',
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
            title: '부분청소',
            desc: '청소가 꼭 필요한 부분공간까지, 부분 청소는 더티클리닉에게 맡겨주세요.'
        };

        const manageTitle = '어디까지 관리 되나요?';
        const manageDesc =
            '청결을 모토로 하여 오염요소는 완벽하게 제거해드립니다.\n' +
            '알고싶은 영역을 눌러보세요. ';

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            priceList,
            promotionList,
            serviceList,
            bannerScript,
            SubPageType,
            manageTitle,
            manageList,
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
            :title="manageTitle"
            :desc="manageDesc"
            :page-type="SubPageType.SPOT"
            :manage-list="manageList"
        ></sub-manage>
        <sub-promotion
            :page-type="SubPageType.SPOT"
            :price-list="priceList"
            :prom-list="promotionList"
        ></sub-promotion>
        <sub-service
            main-title="궁금하신 내용을 한눈에 확인하세요."
            :data-list="serviceList"
        ></sub-service>
        <sub-check-list></sub-check-list>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
