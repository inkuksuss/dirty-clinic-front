<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubCheckList from '@/components/sub/SubCheckList.vue';
import SubPromotion from '@/components/sub/SubPromotion.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import { PopupType, type SubIntroType, SubPageType, type SubServiceType } from '@/utils/types';
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

        const serviceList: SubServiceType[] = [
            {
                src: new URL('@/assets/images/icons/people.svg', import.meta.url).href,
                title: '작업 인원 & 소요시간',
                desc: '전문 교육을 받은 남성 2-3명의 작업자와\n팀장이 함께 관리합니다.'
            },
            {
                src: new URL('@/assets/images/icons/map.svg', import.meta.url).href,
                title: '작업 가능 지역',
                desc: '수도권 전지역 + 충청권에서 제공합니다.'
            },
            {
                src: new URL('@/assets/images/icons/headset.svg', import.meta.url).href,
                title: 'CS 안내',
                desc: '방문 견적, 계약에 필요한 서류, 청소범위나\n주기 변경 등 자세한 상담을 제공합니다.',
                ext: '* 이사짐이 들어오거나 추가 시공의 경우 제한됨.'
            }
        ];

        const bannerScript = {
            title: '정기청소',
            desc: '주기적인 관리가 필요하신가요? 정기 청소는 더티클리닉에게 맡겨주세요.'
        };

        const manageTitle = "정기적인 서비스가 필요하신가요?\n한개라도 해당되시는 고객님들은 상담을 받아보세요.";

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            introList,
            serviceList,
            bannerScript,
            SubPageType,
          manageTitle,
            handleClickBtn
        };
    }
});
</script>

<template>
    <div class="sub-wrapper w-screen flex flex-col items-center justify-start">
        <sub-banner :title="bannerScript.title" :desc="bannerScript.desc"></sub-banner>
        <sub-intro :data-list="introList"></sub-intro>
        <sub-manage :title="manageTitle" :page-type="SubPageType.REGULAR"></sub-manage>
        <sub-promotion :page-type="SubPageType.REGULAR"></sub-promotion>
        <sub-service :data-list="serviceList"></sub-service>
        <sub-check-list></sub-check-list>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
