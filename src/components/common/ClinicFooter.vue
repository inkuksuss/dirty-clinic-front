<script lang="ts">
import { defineComponent } from 'vue';

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

        return {
            categoryList
        };
    }
});
</script>

<template>
    <div class="footer-wrapper">
        <div class="footer-contents-wrapper">
            <div class="contents-img-wrapper">
                <img src="@/assets/images/common/footer_logo1@x.png" alt="footer_logo" />
            </div>
            <div class="contents-body-wrapper">
                <div class="contents-link-wrapper">
                    <div
                        class="link-wrapper"
                        v-for="category in categoryList"
                        :key="category.title"
                    >
                        <span>{{ category.title }}</span>
                    </div>
                </div>
                <div class="contents-description-wrapper">
                    <span>경기도 부천시 경인로 29번길 32, 5동 507호(송내동, 우성아파트)</span>
                    <span>대표자 최문석 | 사업자등록번호 03030303030303</span>
                    <span>대표번호 070-393-3939</span>
                </div>
            </div>
        </div>
        <div class="footer-label-wrapper">
            <div>Copyright © 2023 DIRTY CLINIC. All Rights Reserved.</div>
        </div>
    </div>
</template>
