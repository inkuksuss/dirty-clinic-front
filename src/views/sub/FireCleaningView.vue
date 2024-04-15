<script lang="ts">
import { defineComponent } from 'vue';
import SubIntro from '@/components/sub/SubIntro.vue';
import SubManage from '@/components/sub/SubManage.vue';
import SubService from '@/components/sub/SubService.vue';
import SubCheckList from '@/components/sub/SubCheckList.vue';
import SubBanner from '@/components/sub/SubBanner.vue';
import { PopupType, type SubIntroScript } from '@/utils/types';
import { useStore } from '@/stores/store';
import PaymentButton from '@/components/PaymentButton.vue';

export default defineComponent({
    components: {
        PaymentButton,
        SubBanner,
        SubCheckList,
        SubService,
        SubManage,
        SubIntro
    },
    setup() {
        const store = useStore();
        const serviceScriptList = [
            {
                title: '작업 인원',
                desc: '현장 상황과 조건에 따라 소요시간과 투입인원의 변동이 있습니다.'
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

        const bannerScript = {
            title: '화재청소',
            desc: '화재시 발생되는 유독물질,\n화재청소는 더티클리닉에게 맡겨주세요.'
        };

        const introScript = [
            { title: '현장 실측\n및 예약확정' },
            { title: '폐기물 처리 및\n철거' },
            { title: '약품청소 및\n고압 세척' },
            { title: '탈취 및 소독' },
            { title: '현장 검수 및\n보험서류 안내' }
        ] as SubIntroScript[];

        const handleClickBtn = () => {
            store.setOpenPopup(PopupType.PAYMENT);
        };

        return {
            serviceScriptList,
            bannerScript,
            introScript,
            handleClickBtn
        };
    }
});
</script>

<template>
    <div class="sub-wrapper w-screen flex flex-col items-center justify-start">
        <sub-banner :title="bannerScript.title" :desc="bannerScript.desc"></sub-banner>
        <sub-intro :intro-script-list="introScript"></sub-intro>
        <sub-manage desc="시공 후 분진제거를 중심적으로 청소합니다."></sub-manage>
        <sub-service class="mt-[160px]" :service-list="serviceScriptList"></sub-service>
        <sub-check-list></sub-check-list>
        <payment-button :click-handler="handleClickBtn"></payment-button>
    </div>
</template>

<style scoped></style>
