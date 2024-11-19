<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import homeSlider from '@/components/home/HomeSlider.vue';
import HomeScroll from '@/components/home/HomeScroll.vue';
import HomeIntro from '@/components/home/HomeIntro.vue';
import HomePromotion from '@/components/home/HomePromotion.vue';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';
import PaymentButton from '@/components/PaymentButton.vue';
import HomeService from '@/components/home/HomeService.vue';
import { useMeta } from 'vue-meta';
import Flicking from '@egjs/vue3-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {},
    setup() {
        useMeta({
            title: '회사소개',
            description:
                '저희 더티클리닉은 깨끗하고 쾌적한 생활 공간을 제공하는 것을 목표로 하는 청소 전문업체입니다. 다년간의 경험과 노하우를 바탕으로 고객의 다양한 요구에 맞춘 청소 서비스를 제공하고 있습니다. 개인 주택, 아파트, 상업용 건물, 사무실, 공장 등 모든 공간에서 최상의 청결을 유지할 수 있도록 최선을 다하고 있습니다.'
        });

        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);

        onMounted(() => {});

        return { compIsMobile };
    }
});
</script>

<template>
    <div class="introduce-wrapper pt-[--header-height] flex justify-center relative">
        <div
            v-if="!compIsMobile"
            class="bg-logo absolute bottom-[-75px] left-[43%] w-[75%] max-w-[900px] max-h-[860px] -z-10"
        >
            <img class="w-full h-full" src="/assets/images/common/bg_logo@2x.webp" />
        </div>
        <div class="introduce-contents max-w-[--body-width] w-[--body-ratio]">
            <div
                class="introduce-header pt-[60px] pb-[40px] border-b-[1px] border-[--color-border-blue]"
            >
                <div class="title text-[48px] font-[700] mb-[10px]">더티클리닉은</div>
                <!--                <div class="desc text-[18px] font-[500] leading-[26px]">-->
                <!--                    더티클리닉이 <br class="break-m" />-->
                <!--                    진행하고 있는 프로모션을 모아보세요.-->
                <!--                </div>-->
            </div>
            <div class="introduce-body pt-[40px] pb-[160px]">
                <p class="text-[20px] font-[400]">
                    안녕하십니까? <br />
                    저희 더티클리닉은 깨끗하고 쾌적한 생활 공간을 제공하는 것을 목표로 하는 청소
                    전문업체입니다. 다년간의 경험과 노하우를 바탕으로 고객의 다양한 요구에 맞춘 청소
                    서비스를 제공하고 있습니다. 개인 주택, 아파트, 상업용 건물, 사무실, 공장 등 모든
                    공간에서 최상의 청결을 유지할 수 있도록 최선을 다하고 있습니다.
                    <br />
                    <br />
                    저희 더티클리닉은 청소 서비스의 품질을 최우선으로 생각하며, 최신 장비와 친환경
                    세제를 사용해 고객의 건강과 환경까지 고려하는 청소 솔루션을 제공합니다. 또한,
                    체계적이고 효율적인 청소 프로세스를 구축하여 고객의 소중한 시간을 절약하고,
                    정기적인 유지 관리 서비스도 함께 제공하여 공간의 청결 상태를 장기적으로 유지할
                    수 있도록 지원합니다.
                    <br /><br />
                    특히 저희는 고객과의 신뢰를 바탕으로 한 투명한 소통을 중요하게 생각합니다.
                    맞춤형 상담을 통해 고객의 요구와 예산에 맞춘 최적의 청소 계획을 수립하고, 청소
                    후에도 철저한 사후 관리를 통해 100% 만족을 목표로 하고 있습니다. 정기적인 고객
                    피드백을 바탕으로 서비스 개선을 지속하며, 끊임없는 연구와 교육을 통해 직원들의
                    청소 기술 향상에도 힘쓰고 있습니다.
                    <br /><br />
                    저희 더티클리닉은 일반적인 청소 서비스뿐만 아니라 특수 청소, 해충 방제, 대형
                    건물 청소 등 다양한 전문 분야에서도 풍부한 경험을 갖추고 있습니다. 고객의 요구에
                    맞춰 맞춤형 솔루션을 제공하며, 기업과 기관, 개인 고객 모두에게 맞는 유연한
                    서비스 패키지를 제안합니다.
                    <br /><br />
                    “청소의 시작은 더티클리닉입니다.”라는 슬로건 아래, 고객의 삶의 질을 높이고
                    쾌적한 환경을 유지하는 데 이바지할 수 있도록 최선을 다하고 있습니다. 언제나
                    고객의 신뢰를 바탕으로 성장하는 기업이 되겠습니다.
                    <br /><br />
                    저희 더티클리닉을 찾아주셔서 감사합니다.
                    <br /><br />
                    고객의 공간을 더 깨끗하게, 더 쾌적하게 만들기 위해 항상 노력하는
                    더티클리닉입니다. 청소 서비스에 관한 모든 문의는 언제든지 환영하며, 최고의
                    서비스로 보답하겠습니다.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
