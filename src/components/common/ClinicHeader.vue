<script lang="ts">
import { defineComponent } from 'vue';



export default defineComponent({
    name: 'ClinicHeader',
    setup() {
      type Category = {
        title: string;
      };

        const categoryList: Array<Category> = [
            { title: '간편클리닉' },
            { title: '전문클리닉' },
            { title: '특수클리닉' },
            { title: '전문시공' },
            { title: '연마/코팅' },
            { title: '가전클리닉' },
            { title: '공기질클리닉' },
            { title: '아카데미' },
            { title: '커뮤니티' }
        ];

        return {
            categoryList
        };
    }
});
</script>

<template>
    <header class="header-wrapper">
        <div class="logo-wrapper">
            <img src="@/assets/images/home/clinic_logo@1x.png" alt="main_logo" />
        </div>
        <div class="category-wrapper">
            <div class="category-contents" v-for="category in categoryList" :key="category.title">
                <span>{{ category.title }}</span>
            </div>
        </div>
    </header>
</template>
