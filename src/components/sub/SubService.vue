<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubService',
    setup() {}
});
</script>

<template>
    <div class="service-wrapper w-[73%] max-w-[--body-width] mb-[160px]">
        <div class="text-area mb-[30px]">
            <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]">
                더티클리닉만의 서비스를 경험해보세요.
            </div>
            <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                클리닉의 철학을 가지고 고객님께 서비스를 제공합니다.
            </div>
        </div>
        <div class="service-area grid grid-rows-2 grid-cols-2 gap-[20px]">
            <div class="service-box max-w-[430px] h-[140px] bg-[--color-skyblue] flex items-center px-[30px]">
                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />
                <div class="text">
                    <div class="title text-[--color-text-black] text-[24px] font-[600] leading-[28px]">
                        작업인원
                    </div>
                    <div class="desc text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                        전문교육을 받은 1~2명의 작업자와 <br />
                        팀장이 함께 관리합니다.
                    </div>
                </div>
            </div>
            <div class="service-box max-w-[430px] h-[140px] bg-[--color-skyblue] flex items-center px-[30px]">
                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />
                <div class="text">
                    <div class="title text-[--color-text-black] text-[24px] font-[600] leading-[28px]">
                        작업인원
                    </div>
                    <div class="desc text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                        전문교육을 받은 1~2명의 작업자와 <br />
                        팀장이 함께 관리합니다.
                    </div>
                </div>
            </div>
            <div class="service-box max-w-[430px] h-[140px] bg-[--color-skyblue] flex items-center px-[30px]">
                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />
                <div class="text">
                    <div class="title text-[--color-text-black] text-[24px] font-[600] leading-[28px]">
                        작업인원
                    </div>
                    <div class="desc text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                        전문교육을 받은 1~2명의 작업자와 <br />
                        팀장이 함께 관리합니다.
                    </div>
                </div>
            </div>
            <div class="service-box max-w-[430px] h-[140px] bg-[--color-skyblue] flex items-center px-[30px]">
                <img class="w-[55px] h-[55px] mr-[20px]" src="@/assets/images/icons/people.svg" />
                <div class="text">
                    <div class="title text-[--color-text-black] text-[24px] font-[600] leading-[28px]">
                        작업인원
                    </div>
                    <div class="desc text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                        전문교육을 받은 1~2명의 작업자와 <br />
                        팀장이 함께 관리합니다.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
