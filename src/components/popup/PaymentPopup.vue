<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';
import ClinicInput from '@/components/common/ClinicInput.vue';
import ClinicSelect, { SelectType } from '@/components/common/ClinicSelect.vue';

enum ProductType {
    NO_SELECT = 'NO_SELECT',
    APART = 'APART',
    VILLA = 'VILLA',
    COMMERCIAL_COMPLEX = 'COMMERCIAL_COMPLEX',
    HOUSE = 'HOUSE'
}

enum RoomType {
    NO_SELECT = 'NO_SELECT',
    ONE = 'ONE',
    ONE_COMPLEX = 'ONE_COMPLEX',
    ONE_POINT_AND_FIVE = 'ONE_POINT_AND_FIVE',
    TWO = 'TWO',
    THERE_OR_MORE = 'THERE_OR_MORE'
}

type PaymentData = {
    product: ProductType;
    roomType: RoomType;
    supplyArea: number;
    toiletCnt: number;
    hasVeranda: 'N' | 'Y' | null;
    verandaCnt: number;
};

export default defineComponent({
    name: 'PaymentPopup',
    components: { ClinicSelect, ClinicInput },
    setup() {
        const store = useStore();
        const selectList: Array<SelectType> = [
            { name: '예', value: 'Y' },
            { name: '아니오', value: 'N' }
        ];
        const hasVeranda = ref<string>('');
        const compPopupType = computed(() => store.openPopup);
        const paymentData = ref<PaymentData>({
            product: ProductType.NO_SELECT,
            roomType: RoomType.NO_SELECT,
            supplyArea: 0,
            toiletCnt: 0,
            hasVeranda: null,
            verandaCnt: 0
        });

        const handleClickBg = () => {
            store.setOpenPopup(null);
        };

        const handleClickClose = () => {
            store.setOpenPopup(null);
        };

        const handleSelectProduct = (v: ProductType) => {
            paymentData.value.product = v;
        };

        const handleSelectRoom = (v: RoomType) => {
            paymentData.value.roomType = v;
        };

        const setSelectValue = (v: string) => {
            paymentData.value.hasVeranda = v as 'N' | 'Y';
            console.log(paymentData.value);
        };

        return {
            paymentData,
            compPopupType,
            PopupType,
            ProductType,
            RoomType,
            selectList,
            hasVeranda,
            handleClickBg,
            handleClickClose,
            handleSelectProduct,
            handleSelectRoom,
            setSelectValue
        };
    }
});
</script>

<template>
    <div class="popup-payment absolute max-w-[460px] w-[38%] min-h-[535px] bg-white z-50 p-[15px]">
        <div v-if="paymentData.product === ProductType.NO_SELECT" class="payment-product">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >어떤 장소를 신청하시나요?</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >클리닉을 신청할 곳을 선택해주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div
                class="contents-area w-full h-full max-h-[370px] grid grid-rows-2 grid-cols-2 px-[5%] gap-[20px] pb-[35px]"
            >
                <div
                    class="content max-w-[185px] max-h-[160px] h-[160px] flex-col border-[--color-border-blue] border-[1.5px] pl-[15%] pt-[17%]"
                    @click="() => handleSelectProduct(ProductType.APART)"
                >
                    <img
                        class="mb-[15px] max-w-[40px] max-h-[40px] w-[30%]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[26px] font-[600] leading-[26px]">아파트</div>
                </div>
                <div
                    class="content max-w-[185px] max-h-[160px] h-[160px] flex-col border-[--color-border-blue] border-[1.5px] pl-[15%] pt-[17%]"
                    @click="() => handleSelectProduct(ProductType.VILLA)"
                >
                    <img
                        class="mb-[15px] max-w-[40px] max-h-[40px] w-[30%]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[26px] font-[600] leading-[26px]">
                        빌라 <br />
                        다세대 주택
                    </div>
                </div>
                <div
                    class="content max-w-[185px] max-h-[160px] h-[160px] flex-col border-[--color-border-blue] border-[1.5px] pl-[15%] pt-[17%]"
                    @click="() => handleSelectProduct(ProductType.COMMERCIAL_COMPLEX)"
                >
                    <img
                        class="mb-[15px] max-w-[40px] max-h-[40px] w-[30%]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[26px] font-[600] leading-[26px]">
                        오피스텔 <br />
                        주상복합
                    </div>
                </div>
                <div
                    class="content max-w-[185px] max-h-[160px] h-[160px] flex-col border-[--color-border-blue] border-[1.5px] pl-[15%] pt-[17%]"
                    @click="() => handleSelectProduct(ProductType.HOUSE)"
                >
                    <img
                        class="mb-[15px] max-w-[40px] max-h-[40px] w-[30%]"
                        src="@/assets/images/icons/home.svg"
                    />
                    <div class="text-[26px] font-[600] leading-[26px]">주택</div>
                </div>
            </div>
        </div>

        <div v-else-if="paymentData.roomType === RoomType.NO_SELECT" class="payment-room">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >어떤 구조를 가지고 있나요?</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >클리닉을 신청할 곳을 선택해주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div class="contents-area w-full h-full px-[5%] pb-[25px] flex flex-col gap-y-[10px]">
                <div class="first-row w-full flex justify-between">
                    <div
                        class="content flex justify-start items-center border-[--color-border-blue] border-[1.5px] w-[49%] max-w-[190px] px-[5%] py-[20px]"
                        @click="() => handleSelectRoom(RoomType.ONE)"
                    >
                        <img
                            class="max-w-[40px] max-h-[40px] w-[30%] mr-[15px]"
                            src="@/assets/images/icons/apart.svg"
                        />
                        <div class="text-[20px] font-[600] leading-[26px]">원룸</div>
                    </div>
                    <div
                        class="content flex justify-start items-center border-[--color-border-blue] border-[1.5px] w-[49%] max-w-[190px] px-[5%] py-[20px]"
                        @click="() => handleSelectRoom(RoomType.ONE_COMPLEX)"
                    >
                        <img
                            class="max-w-[40px] max-h-[40px] w-[30%] mr-[15px]"
                            src="@/assets/images/icons/apart.svg"
                        />
                        <div class="text-[20px] font-[600] leading-[26px]">원룸 복층</div>
                    </div>
                </div>
                <div
                    class="content border-[--color-border-blue] border-[1.5px] flex justify-start items-center px-[5%] py-[20px]"
                    @click="() => handleSelectRoom(RoomType.ONE_POINT_AND_FIVE)"
                >
                    <img
                        class="max-w-[40px] max-h-[40px] w-[13%] mr-[15px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[20px] font-[600] leading-[26px]">방 1.5개</div>
                </div>
                <div
                    class="content border-[--color-border-blue] border-[1.5px] flex justify-start items-center px-[5%] py-[20px]"
                    @click="() => handleSelectRoom(RoomType.TWO)"
                >
                    <img
                        class="max-w-[40px] max-h-[40px] w-[13%] mr-[15px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[20px] font-[600] leading-[26px]">방 2개</div>
                </div>
                <div
                    class="content border-[--color-border-blue] border-[1.5px] flex justify-start items-center px-[5%] py-[20px]"
                    @click="() => handleSelectRoom(RoomType.THERE_OR_MORE)"
                >
                    <img
                        class="max-w-[40px] max-h-[40px] w-[13%] mr-[15px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[20px] font-[600] leading-[26px]">방 3개 이상</div>
                </div>
            </div>
        </div>
        <div v-else class="payment-input">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >자세한 정보를 알려주세요.</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >클리닉을 신청할 곳을 선택해주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div class="contents-area flex-col px-[5%]">
                <div class="flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px]">공급면적</div>
                    <clinic-input
                        place-holder="평수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-input>
                </div>
                <div class="flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px]">화장실 수</div>
                    <clinic-input
                        place-holder="화장실 수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-input>
                </div>
                <div class="flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px]">거실 베란다</div>
                    <clinic-select
                        :selected-value="hasVeranda"
                        :select-list="selectList"
                        place-holder="베란다가 있나요?"
                        :select-handler="setSelectValue"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">베란다 수</div>
                    <clinic-input
                        place-holder="베란다 수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-input>
                </div>
            </div>
        </div>
    </div>
</template>
