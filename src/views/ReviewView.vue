<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from '@/stores/store';
import { useMeta } from 'vue-meta';
import { getApiInstance } from '@/utils/api';
import { type ReviewSummary } from '@/utils/types';
import moment from 'moment';
import router from '@/router';

export default defineComponent({
    components: {},
    setup() {
        useMeta({
            title: '리뷰',
            description: '더티클리닉이 진행한 서비스를 후기로 만나보세요!'
        });
        const reg = /<[^>]*>?/g;
        const store = useStore();
        const compIsMobile = computed(() => store.isMobile);
        const reviewList = ref<ReviewSummary[]>([]);
        const isLast = ref<boolean>(true);
        const pageNum = ref<number>(0);
        const isLoading = ref<boolean>(false);

        const handleClickReview = (id: number) => {
            router.push(`/review/${id}`);
        };

        const update = () => {
            if (isLast.value) return;
            if (isLoading.value) return;
            pageNum.value += 1;
            isLoading.value = true;
            getApiInstance()
                .get(`/review/summary?page=${pageNum.value}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        const data = res.data.data;
                        reviewList.value.push(...data.content);
                        isLast.value = data.last;
                        nextTick(() => {
                            window.scrollTo(
                                0,
                                compIsMobile.value
                                    ? 140 * 7 * pageNum.value
                                    : 190 * 7 * pageNum.value
                            );
                        });
                    }
                })
                .catch((e) => {})
                .finally(() => (isLoading.value = false));
        };

        const handleScroll = () => {
            if (compIsMobile.value) {
                if (
                    window.innerHeight + Math.round(window.scrollY) + 600 >=
                    document.body.offsetHeight
                ) {
                    update();
                }
            } else {
                if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
                    update();
                }
            }
        };

        onMounted(() => {
            getApiInstance()
                .get('/review/summary')
                .then((res) => {
                    if (res.data.code === 0) {
                        reviewList.value = res.data.data.content;
                        isLast.value = res.data.data.last;
                    }
                })
                .catch((e) => console.error(e));
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            reg,
            reviewList,
            compIsMobile,
            handleClickReview,
            moment
        };
    }
});
</script>

<template>
    <div class="review-wrapper pt-[--header-height] flex justify-center relative">
        <div
            v-if="!compIsMobile"
            class="bg-logo absolute bottom-[-75px] left-[43%] w-[75%] max-w-[900px] max-h-[860px] -z-10"
        >
            <img class="w-full h-full" src="@/assets/images/common/bg_logo@2x.webp" />
        </div>
        <div class="review-contents max-w-[--body-width] w-[--body-ratio]">
            <div
                class="review-header pt-[60px] pb-[40px] border-b-[1px] border-[--color-border-blue]"
            >
                <div class="title text-[48px] font-[700] mb-[10px]">게시판</div>
                <div class="desc text-[18px] font-[500] leading-[26px]">
                    더티클리닉이 진행한<br class="break-m" />
                    서비스를 후기로 만나보세요!
                </div>
            </div>
            <div class="review-area pb-[155px]">
                <div
                    v-for="(review, idx) in reviewList"
                    @click="() => handleClickReview(review.id)"
                    :key="review.id"
                    class="review-box flex pt-[40px] pb-[35px] border-[--color-border-blue] h-[190px] mx-[5px] cursor-pointer"
                    :class="idx === reviewList.length - 1 ? 'border-b-0' : 'border-b-[1px]'"
                >
                    <div class="text-area flex flex-col justify-start items-start max-w-[666px]">
                        <div class="title w-full text-[20px] font-[400] leading-[20px] truncate">
                            {{ review.title }}
                        </div>
                        <div
                            class="content w-full text-[14px] font-[300] leading-[20px] max-h-[60px]"
                        >
                            {{ review.content.replace(reg, '') }}
                        </div>
                        <div class="text-[14px] font-[300] leading-[20px]">
                            {{ moment(review.created).format('YY.MM.DD') }}
                        </div>
                    </div>
                    <div class="img-area w-[120px] min-w-[120px] h-[120px] min-h-[120px] ml-[75px]">
                        <img
                            class="w-full h-full"
                            :src="
                                review.thumbnail ??
                                '/assets/images/sub/promotion/one_room_1@1x.webp'
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
