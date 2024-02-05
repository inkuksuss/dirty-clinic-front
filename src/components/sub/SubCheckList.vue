<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubCheckList',
    setup() {}
});
</script>

<template>
    <div class="check-wrapper max-w-[--body-width] w-[73%] flex justify-between mb-[160px]">
        <div class="text-area flex flex-col">
            <div class="main text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]">
                체크리스트로 더블체크하세요.
            </div>
            <div class="sub text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                직접 확인하고 작성할 수 있는 참여형 서비스를 통해 만족도를 높이고 있습니다. <br />
                제공하는 점검표 체크리스트로 더티클리닉의 꼼꼼함을 확인하세요.<br />
                <br />※ 점검표는 직접 인쇄하여 사용해주세요
            </div>
        </div>
        <div class="check-btn w-[225px] h-[55px] rounded-[80px] bg-[--color-main-blue] flex-center mt-[50px]">
            <span class="text-[--color-white] text-[20px] font-[600] leading-[26px]"
                >점검표 다운로드</span
            >
        </div>
    </div>
</template>
