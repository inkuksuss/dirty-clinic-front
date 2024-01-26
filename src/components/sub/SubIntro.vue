<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubIntro',
    setup() {}
});
</script>

<template>
  <div class="intro-wrapper mt-[100px] mb-[80px] flex flex-col w-[--body-width]">
    <div class="text-area mb-[30px]">
      <div class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]">우리는 이렇게 청소합니다.</div>
      <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">5단계로 나눠진 더티클리닉만의 특별한 기술을 체험해보세요.</div>
    </div>
    <div class="image-area relative flex justify-between">
      <div class="w-[150px]">
        <img class="w-full h-[150px] mb-[30px] z-30" src="@/assets/images/sub/intro_image1@1x.jpg"/>
        <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px] text-center">전문 상담과 <br /> 예약 확정</div>
      </div>
      <div class="w-[150px]">
        <img class="w-full h-[150px] mb-[30px]" src="@/assets/images/sub/intro_image2@1x.jpg"/>
        <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px] text-center">해피콜과 <br /> 특이사항 체크</div>
      </div>
      <div class="w-[150px]">
        <img class="w-full h-[150px] mb-[30px]" src="@/assets/images/sub/intro_image3@1x.jpg"/>
        <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px] text-center">현장의 특이사항 <br /> 체크</div>
      </div>
      <div class="w-[150px]">
        <img class="w-full h-[150px] mb-[30px]" src="@/assets/images/sub/intro_image4@1x.jpg"/>
        <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px] text-center">알맞는 약품</div>
      </div>
      <div class="w-[150px]">
        <img class="w-full h-[150px] mb-[30px]" src="@/assets/images/sub/intro_image5@1x.jpg"/>
        <div class="text-[--color-text-black] text-[18px] font-[500] leading-[21px] text-center">고객님과 함께 <br /> 현장 검수 및 완료</div>
      </div>
      <div class="border-t-[1px] border-t-[--color-main-blue] absolute top-[75px] left-0 w-[--body-width] z-[-1]"></div>
    </div>
  </div>
</template>
