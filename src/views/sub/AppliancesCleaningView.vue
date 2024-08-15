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

        const manageList: SubManageType[] = [
            {
                title: '에어컨',
                content: [
                    {
                        main: '간단청소',
                        sub: '필터, 날개, 필터 투입부, 겉면 세척 및 살균소독 관리'
                    },
                    {
                        main: '분해청소',
                        sub: '내부 분해 후 청소 및 살균소독 관리',
                        ext: '* 액자형은 분해청소가 불가합니다.'
                    },
                    {
                        main: '에어컨 청소주기',
                        sub: '연 1회(사용 전 3-4월 또는 사용 후 10-11월)',
                        ext: '* 고객님의 상황에 맞는 청소 주기는 현장에서 확인하여 조금 더 자세하게 설명해드립니다.'
                    }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '세탁기',
                content: [
                    {
                        main: '간단청소',
                        sub: '세제 투입구, 내부통, 배수구, 겉면 세척 및 살균소독 관리'
                    },
                    {
                        main: '분해청소',
                        sub:
                            '간단청소 + 세탁기 내부분해 후 곰팡이 및 ' +
                            '오염물 제거, 통 내외부 살균 소독 처리'
                    },
                    {
                        main: '세탁기 청소 주기',
                        sub: '연 1회 (악취 발생 및 이물질이 나올 경우)',
                        ext: '* 고객님의 상황에 맞는 청소 주기는 현장에서 확인하여 조금 더 자세하게 설명해드립니다.'
                    }
                ],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '냉장고',
                content: [
                    {
                        main:
                            '음식물 쓰레기 처리, 오염도 제거, 곰팡이 ' +
                            '제거, 냉동칸 성애제거, 냉장고 하부 모터 ' +
                            '먼지청소, 내부 탈취 및 살균소독'
                    },
                    {
                        main: '냉장고 청소 주기',
                        sub: '연 3-4회\n' + '(악취 발생 및 오염도 심할 경우)',
                        ext: '* 고객님의 상황에 맞는 청소 주기는 현장에서 확인하여 조금 더 자세하게 설명해드립니다.'
                    }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '소파',
                content: [
                    { main: '건식청소', sub: '먼지 및 분진, 진드기 제거, 살균 소독' },
                    {
                        main: '습식청소',
                        sub: '먼지 및 분진, 진드기 제거, 얼룩 및 ' + '오염제거, 살균소독',
                        ext:
                            '* 각 재질마다 특성을 이해하고 알맞는 청소 방법을 ' +
                            '진행해야 합니다.(천, 패브릭, 스웨이드, 알칸타라, ' +
                            '아쿠아텍스, 인조가죽)'
                    },
                    {
                        main: '소파 청소 주기',
                        sub: '연 2회 (악취 발생 및 오염도 심할 경우)',
                        ext: '* 고객님의 상황에 맞는 청소 주기는 현장에서 확인하여 조금 더 자세하게 설명해드립니다.'
                    }
                ],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '매트리스',
                content: [
                    { main: '건식청소', sub: '먼지 및 분진, 진드기 제거, 살균 소독' },
                    {
                        main: '습식청소',
                        sub: '먼지 및 분진, 진드기 제거, 얼룩 및 ' + '오염제거, 살균소독',
                        ext:
                            '* 각 재질마다 특성을 이해하고 알맞는 청소 방법을 ' +
                            '진행해야 합니다.(천, 패브릭, 스웨이드, 알칸타라, ' +
                            '아쿠아텍스, 인조가죽)'
                    },
                    {
                        main: '매트리스 청소 주기',
                        sub: '연 4회 (악취 발생 및 오염도 심할 경우)',
                        ext: '* 고객님의 상황에 맞는 청소 주기는 현장에서 확인하여 조금 더 자세하게 설명해드립니다.'
                    }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
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
            :page-type="SubPageType.APPLIANCES"
            :manage-list="manageList"
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
