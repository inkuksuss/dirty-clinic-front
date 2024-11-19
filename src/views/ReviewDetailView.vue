<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useMeta } from 'vue-meta';
import { getApiInstance } from '@/utils/api';
import { useRoute, useRouter } from 'vue-router';
import { HeaderType, type ReviewDetail, type ReviewSummary } from '@/utils/types';
import moment from 'moment';
import { useStore } from '@/stores/store';

export default defineComponent({
    components: {},
    setup() {
        useMeta({
            title: '리뷰상세',
            description: '더티클리닉이 진행한 서비스를 후기로 만나보세요!'
        });
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const review = ref<ReviewDetail>();
        const reviewSummaryList = ref<ReviewSummary[]>([]);

        const handleClickOtherReview = (id: number) => {
            router.push(`/review/${id}`);
        };

        const getSummaryList = (id: number) => {
            getApiInstance()
                .get(`/review/summary/recent?id=${id}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        reviewSummaryList.value = res.data.data;
                    }
                })
                .catch((e) => console.error(e));
        };

        const getDetail = (id: number) => {
            getApiInstance()
                .get(`/review/detail/${id}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        review.value = res.data.data;
                        if (review.value) getSummaryList(review.value.id);
                    }
                })
                .catch((e) => console.error(e));
        };

        onMounted(() => {
            store.setHeaderType(HeaderType.BACK);
            if (route.params.id) getDetail(route.params.id as unknown as number);
        });

        onUnmounted(() => {
            store.setHeaderType(null);
        });

        watch(route, () => {
            if (route.params.id) getDetail(route.params.id as unknown as number);
        });

        return {
            review,
            reviewSummaryList,
            moment,
            handleClickOtherReview
        };
    }
});
</script>

<template>
    <div
        class="review-detail-wrapper pt-[--header-height] flex justify-start flex-col items-center pb-[120px]"
    >
        <div
            v-if="review"
            class="review-contents max-w-[--body-width] w-[--body-ratio]"
            :key="`review-${new Date().getTime()}`"
        >
            <div
                class="review-header pt-[60px] pb-[20px] border-b-[1px] border-[--color-border-blue]"
            >
                <div class="title text-[30px] font-[700] mb-[20px]">{{ review.title }}</div>
                <div class="desc text-[14px] font-[400] leading-[26px]">
                    {{ moment(review.created).format('YY.MM.DD') }}
                </div>
            </div>
            <div
                v-html="review.content"
                class="review-content-wrapper pt-[60px] pb-[50px] border-b-[1px] border-[--color-border-blue]"
            ></div>
            <div
                class="creator-wrapper border-b-[1px] border-[--color-border-blue] py-[30px] w-full"
            >
                <div class="truncate">{{ review.creatorName }}</div>
            </div>
        </div>
        <div
            v-if="reviewSummaryList.length > 0"
            class="review-summary-wrapper max-w-[--body-width] w-[--body-ratio] pt-[80px]"
        >
            <div class="summary-header text-[--color-main-blue] text-[24px] font-[600]">
                다른 글 보기 >
            </div>
            <div
                v-for="(summary, idx) in reviewSummaryList"
                :key="`summary-${summary.id}`"
                @click="() => handleClickOtherReview(summary.id)"
                class="summary-box w-full flex justify-between pb-[35px] border-b-[--color-border-blue] cursor-pointer"
                :class="[
                    idx === reviewSummaryList.length - 1 ? 'border-0' : 'border-b-[1px]',
                    idx === 0 ? 'pt-[20px]' : 'pt-[40px]'
                ]"
            >
                <div class="text-area flex flex-col justify-start items-start max-w-[666px]">
                    <div
                        class="title w-full text-[20px] font-[400] leading-[20px] truncate mb-[8px]"
                    >
                        {{ summary.title }}
                    </div>
                    <div class="content w-full text-[14px] font-[300] leading-[20px] mb-[6px]">
                        {{ summary.content.replace(/<[^>]*>?/g, '') }}
                    </div>
                    <div class="text-[14px] font-[300] leading-[20px]">
                        {{ moment(summary.created).format('YY.MM.DD') }}
                    </div>
                </div>
                <div class="img-area w-[120px] min-w-[120px] h-[120px] min-h-[120px] ml-[75px]">
                    <img
                        class="w-full h-full"
                        :src="
                            summary.thumbnail ?? '/assets/images/sub/promotion/one_room_1@1x.webp'
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
