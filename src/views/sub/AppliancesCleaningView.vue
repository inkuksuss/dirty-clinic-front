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
                title: '에어컨 청소',
                src: new URL('@/assets/images/sub/intro/aircon.png', import.meta.url).href
            },
            {
                title: '세탁기 청소',
                src: new URL('@/assets/images/sub/intro/washing_machine.png', import.meta.url).href
            },
            {
                title: '냉장고 청소',
                src: new URL('@/assets/images/sub/intro/refri.png', import.meta.url).href
            },
            {
                title: '소파, 매트리스 청소',
                src: new URL('@/assets/images/sub/intro/sofa.png', import.meta.url).href
            }
        ];

        const priceList: SubPriceType[] = [
            {
                title: '에어컨',
                src: new URL('@/assets/images/sub/price/aircon.png', import.meta.url).href
            },
            {
                title: '에어컨 완전 분해 청소',
                src: new URL('@/assets/images/sub/price/aircon2.png', import.meta.url).href,
                line: true
            },
            {
                mainTitle: '냉장고',
                mainSubTitle: '* 정리정돈 및 물건 있는 경우는 기본금에 추가금이 발생됩니다.',
                title: '가정용 일반 냉장고',
                src: new URL('@/assets/images/sub/price/common_refri.png', import.meta.url).href
            },
            {
                title: '김치냉장고',
                src: new URL('@/assets/images/sub/price/kimchi_refri.png', import.meta.url).href
            },
            {
                title: '업소용',
                src: new URL('@/assets/images/sub/price/market_refri.png', import.meta.url).href,
                line: true
            },
            {
                title: '소파',
                src: new URL('@/assets/images/sub/price/sofa.png', import.meta.url).href,
                ext: '* 기본 출장비: 10만원 (10만원 미만의 단가일때 해당합니다.)'
            },
            {
                title: '매트리스',
                titleDesc: '*건식 청소',
                src: new URL('@/assets/images/sub/price/matrix.png', import.meta.url).href,
                ext: '* 기본 출장비: 10만원 (10만원 미만의 단가일때 해당합니다.)'
            },
            {
                title: '매트리스',
                titleDesc: '*습식 청소',
                src: new URL('@/assets/images/sub/price/matrix2.png', import.meta.url).href,
                ext: '* 기본 출장비: 10만원 (10만원 미만의 단가일때 해당합니다.)',
                line: true
            },
            {
                title: '통돌이 세탁기',
                src: new URL('@/assets/images/sub/price/washing.png', import.meta.url).href
            },
            {
                title: '드럼 세탁기',
                src: new URL('@/assets/images/sub/price/drum_washing.png', import.meta.url).href
            },
            {
                title: '트윈워시 세탁기',
                src: new URL('@/assets/images/sub/price/twin_washing.png', import.meta.url).href
            },
            {
                title: '플렉스 워시/ 유아용/ 빌트인 세탁기',
                src: new URL('@/assets/images/sub/price/flex_washing.png', import.meta.url).href,
                ext:
                    '* 건조기는 물을 사용하는 제품이 아니라 분해세척이 필요 없습니다. 필터 세척이면 충분합니다.\n' +
                    '(건조기 청소 단독사용 불가, 세탁기 청소 진행시 건조기 청소 경우 3만원 추가)',
                ext2: '* 업소용은 별도 문의주시면 가격 안내 도와드리겠습니다.'
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/joint.png', import.meta.url).href
            },
            {
                src: new URL('@/assets/images/sub/promotion/joint.png', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '작업인원',
                desc: '작업범위에 따라 소요시간, 투입인원 및\n' + 'AS규정은 달라질 수 있습니다.',
                ext: '*상담 시 안내 도와드리겠습니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '경기·인천·서울 (수도권 전지역)'
            }
        ];

        const manageDesc =
            '청결을 모토로 하여 오염요소는 완벽하게 제거해드립니다.\n' +
            '알고싶은 영역을 눌러보세요. ';

        const bannerScript = {
            title: '가전제품 청소',
            desc: '고객님과 가족의 건강을 위하여, 곁에 있는 작은 것부터 깨끗하게 청소합니다.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            priceList,
            promotionList,
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
            :page-type="SubPageType.APPLIANCES"
        ></sub-manage>
        <div class="max-w-[--body-width] w-[--body-ratio] mt-[80px]">
            <div class="mb-[30px] text-[32px] font-[700] text-[--color-black]">청소 프로세스</div>
            <div class="border-[--color-border-blue] border-[1.5px] p-[30px]">
                <div class="mb-[30px]">
                    <div class="flex mb-[10px] items-center">
                        <div
                            class="bg-[--color-border-blue] w-[20px] h-[20px] rounded-[50%] mr-[10px]"
                        ></div>
                        <span class="text-[--color-black] text-[20px] font-[500]"
                            >에어컨, 세탁기, 냉장고</span
                        >
                    </div>
                    <div class="pl-[30px] text-[--color-black] text-[20px] font-[500]">
                        전문상담과 예약확정 > 제품 오작동 확인 및 전력차단 > 제품 분해 및 세척 >
                        제품 건조 및 재조립 ><br />제품 살균소독 > 고객님과 함께 현장검수(작동확인)
                        및 완료
                    </div>
                </div>
                <div>
                    <div class="flex mb-[10px] items-center">
                        <div
                            class="bg-[--color-border-blue] w-[20px] h-[20px] rounded-[50%] mr-[10px]"
                        ></div>
                        <span class="text-[--color-black] text-[20px] font-[500]"
                            >매트리스, 소파</span
                        >
                    </div>
                    <div class="pl-[30px] text-[--color-black] text-[20px] font-[500]">
                        전문상담과 예약확정 > 재질확인 및 특수약품 도포 > 핸드폴리셔 작업(오염도 및
                        진드기 제거) ><br />
                        폐수 흡입 및 헹굼 > 천연향료 탈취작업 및 살균소독 > 고객님과 함께 현장검수
                        및 완료
                    </div>
                </div>
            </div>
        </div>
        <sub-promotion
            :page-type="SubPageType.APPLIANCES"
            :price-list="priceList"
            :prom-list="promotionList"
        ></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
