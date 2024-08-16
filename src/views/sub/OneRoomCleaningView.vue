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
    type SubPromotionType,
    SubPageType,
    type SubServiceType,
    type SubPriceType,
    type SubManageType
} from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from '@/components/PaymentButton.vue';
import { useMeta } from 'vue-meta';

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
        useMeta({
            title: '더티클리닉 - 간편클리닉 - 원룸청소',
            description: '1인 가구가 늘어난 요즘, 원룸 청소는 더티클리닉에게 맡겨주세요.'
        });
        const store = useStore();
        const introList: SubIntroType[] = [
            {
                title: '전문 상담과\n예약 확정',
                src: new URL('@/assets/images/sub/intro/phone.webp', import.meta.url).href
            },
            {
                title: '직영팀장님의\n사전 해피콜',
                src: new URL('@/assets/images/sub/intro/note.webp', import.meta.url).href
            },
            {
                title: '현장 투입 및\n특이사항 체크',
                src: new URL('@/assets/images/sub/intro/people.webp', import.meta.url).href
            },
            {
                title: '구역별\n알맞는 약품청소',
                src: new URL('@/assets/images/sub/intro/basket.webp', import.meta.url).href
            },
            {
                title: '고객님과 함께\n현장 검수 및 완료',
                src: new URL('@/assets/images/sub/intro/kitchen.webp', import.meta.url).href
            }
        ];

        const priceList: SubPriceType[] = [
            {
                src: new URL('@/assets/images/sub/price/one_room.webp', import.meta.url).href
            }
        ];

        const promotionList: SubPromotionType[] = [
            {
                src: new URL('@/assets/images/sub/promotion/one_room1.webp', import.meta.url).href
            }
        ];

        const manageList: SubManageType[] = [
            {
                title: '거실',
                content: [
                    {
                        main: '창문, 창틀 청소(외부창 제외)'
                    },
                    {
                        main: '몰딩 부분 오염도 제거'
                    },
                    {
                        main: '벽 먼지 제거'
                    },
                    {
                        main: '콘센트 먼지 제거'
                    },
                    {
                        main: '문 오염 제거'
                    },
                    {
                        main: '바닥 오염 제거'
                    },
                    {
                        main: '찌든때, 먼지 제거'
                    },
                    {
                        main: '걸레받이 오염 제거'
                    },
                    {
                        main: '서랍장 탈거 후 청소',
                        sub: '바닥 자재 강마루일 경우 물청소x(파손대비)\n먼지 흡입 및 닦는 과정 반복',
                        ext: '* 어느정도 먼지가 남아 있을 수 있습니다.'
                    }
                ],
                icon: new URL('@/assets/images/icons/brush.svg', import.meta.url).href
            },
            {
                title: '화장실, 욕실',
                content: [
                    {
                        main: '선반장 청소'
                    },
                    {
                        main: '거울, 유리부스 청소'
                    },
                    {
                        main: '타일 벽 청소'
                    },
                    {
                        main: '세면대 청소'
                    },
                    {
                        main: '변기, 욕실 청소'
                    },
                    {
                        main: '하수구 커버 분리, 세척 오염제거, 약품 살균, 소독'
                    },
                    {
                        main: '환풍구 탈거 청소'
                    }
                ],
                icon: new URL('@/assets/images/icons/bath_room.svg', import.meta.url).href
            },
            {
                title: '주방',
                content: [
                    {
                        main: '싱크대 내외부, 가스레인지 분해후 청소'
                    },
                    {
                        main: '후드 망 탈거 후 청소'
                    },
                    { main: '주방 상하부장 내외부 청소' },
                    {
                        main: '서랍장 탈거 후 청소'
                    },
                    {
                        main: '빌트인 냉장고, 세탁기, 오븐 등 가전제품 내부청소는 별도'
                    }
                ],
                icon: new URL('@/assets/images/icons/kitchen.svg', import.meta.url).href
            },
            {
                title: '베란다, 다용도실',
                content: [
                    { main: '베란다 창문 청소', sub: '2,4 외부 창문 제외' },
                    {
                        main: '빨래건조대 청소',
                        sub: '간단한 먼지제거'
                    },
                    {
                        main: '베란다 바닥 오염 제거'
                    },
                    {
                        main: '배수구 안쪽 부속품',
                        sub: '탈거, 세척, 소독, 살균 건조순으로 작업'
                    }
                ],
                icon: new URL('@/assets/images/icons/window.svg', import.meta.url).href
            },
            {
                title: '방',
                content: [
                    { main: '창문, 창틀청소' },
                    {
                        main: '천장 몰딩 얼룩 및 먼지제거'
                    },
                    {
                        main: '벽면 바닥먼지 제거',
                        sub: '벽지가 실크일 경우 일부 얼룩 제거 가능'
                    },
                    {
                        main: '전등 커버 탈거 후 청소',
                        ext: '* 실크벽지, 페인트 오염도 제거는 현장판단'
                    }
                ],
                icon: new URL('@/assets/images/icons/room.svg', import.meta.url).href
            },
            {
                title: '현관',
                content: [
                    { main: '신발장, 수납장 탈거 후 청소' },
                    {
                        main: '벽면 먼지 제거'
                    },
                    {
                        main: '천장 몰딩 얼룩 및 먼지제거',
                        ext: '* 외부 창 불가능\n* 인체에 무해한 친환경 약품 사용\n* 청소하다 생긴 작업 쓰레기는 한곳에 모아드립니다.(폐기물, 쓰레기 처리는 추가요금 발생)'
                    }
                ],
                icon: new URL('@/assets/images/icons/dustpan.svg', import.meta.url).href
            }
        ];

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '작업 인원',
                desc: '전문 교육을 받은 1-2명의 작업자와\n팀장이 함께 관리합니다.'
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
            title: '원룸청소',
            desc: '1인 가구가 늘어난 요즘,\n원룸 청소는 더티클리닉에게 맡겨주세요.'
        };

        const manageTitle = '어디까지 관리 되나요?';
        const manageDesc =
            '청결을 모토로 하여 오염요소는 완벽하게 제거해드립니다.\n' +
            '알고싶은 영역을 눌러보세요. ';

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            serviceList,
            priceList,
            promotionList,
            bannerScript,
            SubPageType,
            manageList,
            introList,
            manageTitle,
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
        <sub-manage :title="manageTitle" :desc="manageDesc" :manage-list="manageList"></sub-manage>
        <sub-promotion
            :page-type="SubPageType.ONE_ROOM"
            :price-list="priceList"
            :prom-list="promotionList"
        ></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <sub-check-list></sub-check-list>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
