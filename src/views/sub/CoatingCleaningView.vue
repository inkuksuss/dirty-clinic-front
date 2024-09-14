<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import {
    PopupType,
    type SubIntroType,
    type SubManageType,
    SubPageType,
    type SubPriceType,
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
            title: '연마/코팅 - 코팅',
            description: '손과 발이 닿는 공간을 조금 더 깔끔하게 관리할 수 있도록 보호해드립니다.'
        });
        const store = useStore();
        const introList: SubIntroType[] = [
            {
                title: '견적요청 및\n전문 상담',
                src: new URL('@/assets/images/sub/intro/phone.webp', import.meta.url).href
            },
            {
                title: '일정조정 및\n예약확정',
                src: new URL('@/assets/images/sub/intro/note.webp', import.meta.url).href
            },
            {
                title: '투입 전 해피콜\n및 사전정보 확인',
                src: new URL('@/assets/images/sub/intro/people.webp', import.meta.url).href
            },
            {
                title: '투입 후 현장\n' + '특이사항 확인 및\n' + '색상 선택',
                src: new URL('@/assets/images/sub/intro/checklist.webp', import.meta.url).href
            },
            {
                title: '구역별 작업 진행',
                src: new URL('@/assets/images/sub/intro/basket.webp', import.meta.url).href
            },
            {
                title: '현장 검수 및\n피드백',
                src: new URL('@/assets/images/sub/intro/document.webp', import.meta.url).href
            }
        ];

        const priceList: SubPriceType[] = [
            {
                title: '화장실',
                src: new URL('@/assets/images/sub/price/joint_bath.webp', import.meta.url).href
            },
            {
                title: '주방',
                titleDesc: '* 신축 기준',
                src: new URL('@/assets/images/sub/price/joint_kitchen.webp', import.meta.url).href
            },
            {
                title: '베란다',
                titleDesc: '* 신축 기준',
                src: new URL('@/assets/images/sub/price/joint_veranda.webp', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/coating_1.webp', import.meta.url).href
            }
        ];

        const manageList: SubManageType[] = [
            {
                title: '마루코팅',
                content: [{ main: '마루종류(원목,강마루 등)의 제질에 시공 가능합니다.' }],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '나노코팅',
                content: [
                    { main: '주방', sub: '싱크대 상판, 수전, 싱크볼, 스테인레스' },
                    {
                        main: '화장실',
                        sub: '도기, 수전, 스테인레스, 변기, 거울, 젠다이, 샤워부스, 샤워기, 휴지걸이, 욕조'
                    }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '타일코팅',
                content: [
                    { main: '타일종류(포쉐린, 세라믹, 바블타일 등)의 제질에 시공 가능합니다.' }
                ],
                icon: new URL('@/assets/images/icons/room.svg', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc: '코팅 특성상 소요시간,\n' + '투입인원 및 AS규정은 달라질 수 있습니다.',
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
            title: '코팅',
            desc: '손과 발이 닿는 공간을 조금 더 깔끔하게 관리할 수 있도록 보호해드립니다.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            priceList,
            promotionList,
            manageList,
            serviceList,
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
            :page-type="SubPageType.COATING"
            :manage-list="manageList"
        ></sub-manage>
        <sub-promotion
            :page-type="SubPageType.COATING"
            :price-list="priceList"
            :prom-list="promotionList"
        ></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
