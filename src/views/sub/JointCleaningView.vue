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
                title: '보양작업 및\n' + '줄눈시공',
                src: new URL('@/assets/images/sub/intro/joint.png', import.meta.url).href
            },
            {
                title: '현장 검수 및\n피드백',
                src: new URL('@/assets/images/sub/intro/document.png', import.meta.url).href
            }
        ];

        const manageList: SubManageType[] = [
            {
                title: '거실',
                content: [
                    { main: '폴리싱  타일 및 대리석등 백시멘트가 사용된 바닥 타일' },
                    { main: '아트윌 벽면' }
                ],
                icon: new URL('@/assets/images/icons/window.svg', import.meta.url).href
            },
            {
                title: '주방',
                content: [
                    { main: '싱크대 상판 및 싱크볼' },
                    { main: '실리콘 테두리' },
                    { main: '타일 벽면' }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '화장실',
                content: [
                    { main: '바닥' },
                    { main: '벽면' },
                    { main: '샤워부스' },
                    { main: '젠다이' },
                    { main: '실리콘 테두리' }
                ],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '현관',
                content: [{ main: '바닥' }, { main: '테두리' }, { main: '실리콘' }],
                icon: new URL('@/assets/images/icons/dustpan.svg', import.meta.url).href
            },
            {
                title: '베란다',
                content: [{ main: '바닥' }, { main: '테두리' }, { main: '실리콘' }],
                icon: new URL('@/assets/images/icons/entrance.svg', import.meta.url).href
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

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '시간 및 작업인원',
                desc: '줄눈시공 특성상 소요시간,\n' + '투입인원 및 AS규정은 달라질 수 있습니다.',
                ext: '*현장에서 안내 도와드리겠습니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '전국 서비스 가능합니다.'
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
            title: '줄눈시공',
            desc: '학생들의 건강과 안전에 책임을 다하여 안정적이고 편리한 환경을 제공합니다.'
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
            :page-type="SubPageType.JOINT"
            :manage-list="manageList"
        ></sub-manage>
        <div class="max-w-[--body-width] w-[--body-ratio] my-[80px]">
            <div class="mb-[30px] text-[32px] font-[700] text-[--color-black]">줄눈제 종류</div>
            <div class="border-[--color-border-blue] border-[1.5px] p-[30px]">
                <div class="mb-[30px]">
                    <div class="flex mb-[10px] items-center">
                        <div
                            class="bg-[--color-border-blue] w-[20px] h-[20px] rounded-[50%] mr-[10px]"
                        ></div>
                        <span class="text-[--color-black] text-[20px] font-[500]">폴리우레아</span>
                    </div>
                    <div class="pl-[30px] text-[--color-black] text-[20px] font-[500]">
                        일반적으로 많이 사용하는 줄눈제로 케라폭시보다 금액이 저렴하고 다양한 색상
                        및 반짝이 펄로<br />인테리어 효과를 줍니다. 황변이나 백화현상 없이 반
                        영구적으로 사용 가능합니다.
                    </div>
                </div>
                <div>
                    <div class="flex mb-[10px] items-center">
                        <div
                            class="bg-[--color-border-blue] w-[20px] h-[20px] rounded-[50%] mr-[10px]"
                        ></div>
                        <span class="text-[--color-black] text-[20px] font-[500]">케라폭시</span>
                    </div>
                    <div class="pl-[30px] text-[--color-black] text-[20px] font-[500]">
                        폴리우레아보다 금액이 2-3배 발생하지만 한번 시공 후 영구적인 수명, 강한
                        내구성을 바탕으로<br />난방이 들어오는 거실, 폴리상타일 및 대리석 등에 시공
                        시 효과적입니다.<br />
                        무광 및 매트한 디자인으로 인테리어 효과가 있습니다.
                    </div>
                </div>
            </div>
        </div>
        <sub-promotion
            :page-type="SubPageType.JOINT"
            :price-list="priceList"
            :prom-list="promotionList"
            prom-label="* 각 시공 공간 추가 시 중복할인 적용해 드립니다."
        ></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
