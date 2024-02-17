<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubCheckList from '@/components/sub/SubCheckList.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import { PopupType } from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from "@/components/PaymentButton.vue";

export default defineComponent({
    components: {PaymentButton, SubBanner, SubPromotion, SubCheckList, SubService, SubManage, SubIntro },
    setup() {
        const store = useStore();
        const serviceScriptList = [
            {
                title: '작업 인원',
                desc: '전문 교육을 받은 1-4명의 작업자와\n팀장이 함께 관리합니다.'
            },
            {
                title: '작업 가능 지역',
                desc: '수도권 전지역 + 충청권에서 제공합니다.'
            },
            {
                title: '소요 시간',
                desc: '4시간 전후로 최상의 서비스를 제공합니다.',
                ext: '* 현장 상태에 따라 시간을 변동될 수 있습니다.'
            },
            {
                title: 'AS 안내',
                desc: '작업 종류 후 5일이내 1회 가능합니다.',
                ext: '* 이사짐이 들어오거나 추가 시공의 경우 제한됨.'
            }
        ];

        const manageScriptList = [
            {
                title: '사무실 내부',
                content: [
                    { main: '벽, 가벽 먼지 청소' },
                    { main: '유리창, 틀 및 유리 파티션 청소' },
                    { main: '장식장, 선반 먼지 및 오염도 청소' },
                    { main: '천장, 몰딩, 전등갓 등 먼지 청소' },
                    { main: '현관, 신발장 청소' }
                ],
                icon: 'src/assets/images/icons/living_room.svg',
                isOpen: false
            },
            {
                title: '바닥청소',
                content: [
                    {
                        main: '데코타일, 장판, 마루, 바닥종류에 알맞는 약품 청소'
                    },
                    { main: '필요시 마루광택기 기계작업' },
                    { main: '필요시 수지왁스 코팅' },
                    { main: '걸레받이 오염도 밑 먼지 청소' }
                ],
                icon: 'src/assets/images/icons/kitchen.svg',
                isOpen: false
            },
            {
                title: '탕비실, 휴게공간',
                content: [
                    { main: '상하부장 및 수납공간 청소' },
                    { main: '가스레인지, 후드망 탈거 후 청소' },
                    { main: '싱크대, 하부장 밑 걸레밭이 분리 청소' },
                    { main: '하수구 커버 분리, 세척 오염제거, 약품 소독' }
                ],
                icon: 'src/assets/images/icons/bath_room.svg',
                isOpen: false
            },
            {
                title: '화장실',
                content: [
                    { main: '전체적인 물때 및 곰팡이 제거' },
                    { main: '거울, 선반장 청소' },
                    { main: '변기, 세면대, 타일, 바닥, 벽 청소' },
                    { main: '하수구 세척 및 약품 소독' },
                    { main: '환풍구 탈거 청소' }
                ],
                icon: 'src/assets/images/icons/bath_room.svg',
                isOpen: false
            }
        ];

        const bannerScript = {
            title: '사무실청소',
            desc: '쾌적한 공간에 맞는 업무효율,\n사무실 청소는 더티클리닉에게 맡겨주세요.'
        };

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            serviceScriptList,
            manageScriptList,
            bannerScript,
            handleClickBtn
        };
    }
});
</script>

<template>
    <div class="sub-wrapper w-screen flex flex-col items-center justify-start">
        <sub-banner :title="bannerScript.title" :desc="bannerScript.desc"></sub-banner>
        <sub-intro></sub-intro>
        <sub-manage :manage-list="manageScriptList"></sub-manage>
        <sub-promotion
            main-img="src/assets/images/home/test-img1@1x.jpg"
            :sub-list="[
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' },
                { img: 'src/assets/images/home/test-img1@1x.jpg' }
            ]"
        ></sub-promotion>
        <sub-service :service-list="serviceScriptList"></sub-service>
        <sub-check-list></sub-check-list>
      <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
