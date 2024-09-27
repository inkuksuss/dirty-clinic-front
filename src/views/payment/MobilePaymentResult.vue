<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getApiInstance } from '@/utils/api';

export default defineComponent({
    components: {},
    setup() {
        const route = useRoute();
        const router = useRouter();
        const success = ref<boolean>(false);
        const handleClickBtn = () => {
            router.push('/');
        };

        onMounted(() => {
            const query = route.query;
            if (query && query.imp_success) {
                getApiInstance()
                    .get(`/reservation/result/mobile?merchantUid=${query.merchant_uid}`)
                    .then((res) => {
                        success.value = res.data.code === 0;
                    })
                    .catch((e) => (success.value = false));
            }
        });
        return { success, handleClickBtn };
    }
});
</script>

<template>
    <div
        class="mobile-payment-result-wrapper flex flex-col w-screen h-screen fixed bg-white z-50 left-0 top-0"
    >
        <div v-if="success" class="flex-center w-full h-full flex-col text-center">
            <div class="text-[30px] font-[700] mb-[20px] leading-[36px]">결제가 완료되었어요.</div>
            <div class="text-[16px] font-[400] mb-[30px] leading-[19px]">
                최대한 빠르게 확인하여 연락드리겠습니다.<br />알맞은 서비스를 제공할 수 있도록
                최선을 다하겠습니다.
            </div>
            <div
                class="flex-center w-[190px] h-[45px] border-[--color-border-blue] border-[1.5px] rounded-[80px]"
                @click="handleClickBtn"
            >
                <span class="text-[18px] font-[600]">확인</span>
            </div>
        </div>
        <div v-else class="flex-center w-full h-full flex-col text-center">
            <div class="text-[30px] font-[700] mb-[20px] leading-[36px]">결제가 실패하였어요.</div>
            <div class="text-[16px] font-[400] mb-[30px] leading-[19px]">
                전화상담을 통해 자세히 도와드리겠습니다.<br />알맞은 서비스를 제공할 수 있도록
                최선을 다하겠습니다.
            </div>
            <div
                class="flex-center w-[190px] h-[45px] border-[--color-border-blue] border-[1.5px] rounded-[80px]"
                @click="handleClickBtn"
            >
                <span class="text-[18px] font-[600]">확인</span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
