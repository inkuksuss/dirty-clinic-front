<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';
import router from '@/router';

type FooterCategory = {
    title: string;
};

export default defineComponent({
    name: 'ClinicFooter',
    setup() {
        const categoryList: Array<FooterCategory> = [
            { title: '회사소개' },
            { title: '이용약관' },
            { title: '개인정보처리방침' },
            { title: '채용' },
            { title: '업무제휴' },
            { title: '고객센터' }
        ];

        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);

        const handleClick = (title: string) => {
            if (title === '이용약관') {
                store.setOpenPopup(PopupType.TERMS_OF_USE);
            } else if (title === '개인정보처리방침') {
                store.setOpenPopup(PopupType.PRIVACY_POLICY);
            } else if (title === '고객센터') {
                window.alert('010-3352-0037');
            } else if (title === '회사소개') {
                router.push('/introduce');
            } else {
                window.alert('준비중입니다.');
            }
        };

        return {
            categoryList,
            compIsMobile,
            handleClick
        };
    }
});
</script>

<template>
    <footer class="footer-wrapper w-screen flex-center">
        <div v-if="!compIsMobile" class="footer-contents-wrapper w-[90%] flex pb-[60px]">
            <div class="w-full h-full flex border-t-[1px] border-t-[#CCCCCC]">
                <div class="contents-img-wrapper w-[135px] h-[135px] ml-[32px] mr-[70px] mt-[77px]">
                    <img
                        class="w-full h-full"
                        src="/assets/images/common/footer_logo@2x.webp"
                        alt="더티클리닉 큰 푸터"
                    />
                </div>
                <div class="contents-body-wrapper pt-[60px]">
                    <div class="contents-link-wrapper flex">
                        <div
                            class="link-wrapper mr-[30px] text-[18px] font-[600] text-[--color-text-black] cursor-pointer"
                            v-for="category in categoryList"
                            :key="category.title"
                            @click="() => handleClick(category.title)"
                        >
                            <span>{{ category.title }}</span>
                        </div>
                    </div>
                    <div class="contents-description-wrapper flex flex-col mt-[30px]">
                        <span class="mb-[10px] text-[16px] font-[400] text-[--color-text-gray]"
                            >상호명 더티클리닉 | 경기도 부천시 소사구 경인로 1185번길 57-12,
                            1층(송내동)</span
                        >
                        <span class="mb-[10px] text-[16px] font-[400] text-[--color-text-gray]"
                            >대표자 최문석 | 이메일 chlanstjr96@naver.com</span
                        >
                        <span class="mb-[10px] text-[16px] font-[400] text-[--color-text-gray]"
                            >사업자등록번호 571-54-00602 | 통신 판매업 신고
                            제2024-부천소사-0181호</span
                        >
                        <span class="mb-[10px] text-[16px] font-[400] text-[--color-text-gray]"
                            >대표번호 1666-9278 | 팩스번호 0504-494-1720</span
                        >
                        <span class="mb-[10px] text-[16px] font-[400] text-[--color-text-gray]"
                            >Copyright © 2023 DIRTY CLINIC. All Rights Reserved.</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- mobile-->
        <div
            v-else
            class="max-w-[608px] w-full mx-[20px] border-t-[1px] border-t-[#CCCCCC] flex flex-col pt-[35px]"
        >
            <div class="contents-link-wrapper flex flex-col gap-y-[25px]">
                <div
                    class="link-wrapper mr-[30px] text-[16px] font-[600] text-[--color-text-black]"
                    v-for="category in categoryList"
                    :key="category.title"
                    @click="() => handleClick(category.title)"
                >
                    <span>{{ category.title }}</span>
                </div>
            </div>

            <div class="contents-img-wrapper w-[80px] h-[80px] mt-[25px]">
                <img
                    class="w-full h-full"
                    src="/assets/images/common/footer_logo@1x.webp"
                    alt="더티클리닉 작은 푸터"
                />
            </div>
            <div class="contents-description-wrapper flex flex-col mt-[30px]">
                <span class="text-[14px] font-[400] text-[--color-text-gray]"
                    >상호명 더티클리닉 | 경기도 부천시 소사구 경인로 1185번길 57-12,
                    1층(송내동)</span
                >
                <span
                    class="mb-[5px] text-[14px] font-[400] text-[--color-text-gray] leading-[16px]"
                    >대표자 최문석 | 이메일 chlanstjr96@naver.com</span
                >
                <span
                    class="mb-[5px] text-[14px] font-[400] text-[--color-text-gray] leading-[16px]"
                    >사업자등록번호 571-54-00602 | 통신 판매업 신고 제2024-부천소사-0181호</span
                >
                <span class="mb-[5px] text-[14px] font-[400] text-[--color-text-gray]"
                    >대표번호 1666-9278 | 팩스번호 0504-494-1720</span
                >
                <span class="mb-[20px] text-[14px] font-[400] text-[--color-text-gray]"
                    >Copyright © 2023 DIRTY CLINIC. All Rights Reserved.</span
                >
            </div>
        </div>
    </footer>
</template>
