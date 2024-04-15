<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/stores/store';
import {
    ClinicType,
    type PaymentData,
    PopupType,
    type ProductResponse,
    RoomType,
    type SelectType
} from '@/utils/types';
import ClinicInput from '@/components/common/ClinicInput.vue';
import ClinicSelect from '@/components/common/ClinicSelect.vue';
import PaymentModule from '@/components/PaymentModule.vue';
import { getApiInstance } from '@/utils/api';
import ClinicDate from '@/components/common/ClinicDate.vue';
import ClinicTime from '@/components/common/ClinicTime.vue';
import moment from 'moment';

export default defineComponent({
    name: 'PaymentPopup',
    components: { ClinicTime, ClinicDate, PaymentModule, ClinicSelect, ClinicInput },
    setup() {
        const store = useStore();
        const selectList: Array<SelectType> = [
            { name: '확장형', value: 'Y' },
            { name: '기본형', value: 'N' }
        ];
        const compPopupType = computed(() => store.openPopup);
        const expansion = ref<string>('');
        const footage = ref<string | undefined>();
        const toiletCnt = ref<string | undefined>();
        const verandaCnt = ref<string | undefined>();
        const username = ref<string | undefined>();
        const phoneNumber = ref<string | undefined>();
        const targetTime = ref<string | undefined>();
        const targetDate = ref<Date>(new Date());
        const balanceAmount = ref<number>(0);
        const depositAmount = ref<number>(0);
        const productResponse = ref<ProductResponse>();

        const handleChangeFootage = (v: string) => {
            footage.value = v;
            paymentData.value.footage = Number(v);
        };

        const handleChangeToilet = (v: string) => {
            toiletCnt.value = v;
            paymentData.value.toiletCnt = Number(v);
        };

        const handleChangeVeranda = (v: string) => {
            verandaCnt.value = v;
            paymentData.value.verandaCnt = Number(v);
        };

        const handleChangeUsername = (v: string) => {
            username.value = v;
            paymentData.value.username = v;
        };

        const handleChangePhone = (v: string) => {
            phoneNumber.value = v;
            paymentData.value.phoneNumber = v;
        };

        const handleChangeDate = (v: Date) => {
            targetDate.value = v;
            paymentData.value.targetDate = moment(targetDate.value).format('YYYY-MM-DD');
        };
        const handleChangeTime = (v: string) => {
            targetTime.value = v;
            paymentData.value.targetTime = v;
        };

        const paymentData = ref<PaymentData>({
            roomType: RoomType.NO_SELECT,
            clinicType: ClinicType.NO_SELECT,
            footage: null,
            toiletCnt: null,
            expansion: null,
            verandaCnt: null,
            username: null,
            phoneNumber: null,
            targetDate: null,
            targetTime: null
        });

        const popupPage = ref<number>(1);

        const handleClickBg = () => {
            store.setOpenPopup(null);
        };

        const handleClickClose = () => {
            store.setOpenPopup(null);
        };

        const handleSelectRoom = (v: RoomType) => {
            paymentData.value.roomType = v;
        };

        const setSelectValue = (v: string | undefined) => {
            paymentData.value.expansion = v as 'N' | 'Y';
        };

        const handleSelectClinic = (v: ClinicType) => {
            paymentData.value.clinicType = v;
            if (v === ClinicType.BUSINESS_CLINIC || v === ClinicType.SPECIAL_CLINIC) {
                window.alert('관리자에게 문의해주세요.');
            } else {
                popupPage.value = 2;
            }
        };

        const handleNext = () => {
            switch (popupPage.value) {
                case 2: {
                    if (paymentData.value.roomType === RoomType.NO_SELECT) {
                        window.alert('장소를 신청해주세요.');
                        return;
                    }
                    popupPage.value++;
                    break;
                }
                case 3: {
                    if (!paymentData.value.footage) {
                        window.alert('공급면적을 입력해주세요.');
                        return;
                    }

                    if (!paymentData.value.toiletCnt && paymentData.value.toiletCnt !== 0) {
                        window.alert('화장실 수를 입력해주세요.');
                        return;
                    }

                    if (!paymentData.value.expansion) {
                        window.alert('확장 여부를 선택해주세요.');
                        return;
                    }

                    if (!paymentData.value.verandaCnt && paymentData.value.verandaCnt !== 0) {
                        window.alert('베란다 수를 입력해주세요.');
                        return;
                    }

                    popupPage.value++;
                    break;
                }
                case 4: {
                    if (!paymentData.value.username) {
                        window.alert('예약자 명을 입력해주세요.');
                        return;
                    }

                    if (!paymentData.value.phoneNumber) {
                        window.alert('화장실 수를 입력해주세요.');
                        return;
                    }

                    if (!paymentData.value.targetDate) {
                        window.alert('예약일을 입력해주세요.');
                        return;
                    }

                    if (
                        !paymentData.value.targetTime ||
                        paymentData.value.targetTime.includes('HH') ||
                        paymentData.value.targetTime.includes('mm')
                    ) {
                        window.alert('예약시간을 입력해주세요.');
                        return;
                    }

                    getProductInfo();
                    break;
                }
                case 5: {
                    popupPage.value++;
                    break;
                }
            }
        };

        const handlePrev = () => {
            switch (popupPage.value) {
                case 2: {
                    paymentData.value.clinicType = ClinicType.NO_SELECT;
                    paymentData.value.roomType = RoomType.NO_SELECT;
                    popupPage.value--;
                    break;
                }
                case 3: {
                    paymentData.value.footage = null;
                    paymentData.value.toiletCnt = null;
                    paymentData.value.expansion = null;
                    paymentData.value.verandaCnt = null;
                    footage.value = undefined;
                    verandaCnt.value = undefined;
                    expansion.value = '';
                    toiletCnt.value = undefined;
                    paymentData.value.roomType = RoomType.NO_SELECT;
                    popupPage.value--;
                    break;
                }
                case 4: {
                    paymentData.value.footage = null;
                    paymentData.value.toiletCnt = null;
                    paymentData.value.expansion = null;
                    paymentData.value.verandaCnt = null;
                    paymentData.value.username = null;
                    paymentData.value.phoneNumber = null;
                    paymentData.value.targetDate = null;
                    paymentData.value.targetTime = null;
                    footage.value = undefined;
                    verandaCnt.value = undefined;
                    expansion.value = '';
                    toiletCnt.value = undefined;
                    username.value = undefined;
                    phoneNumber.value = undefined;
                    targetDate.value = new Date();
                    targetTime.value = undefined;
                    popupPage.value--;
                    break;
                }
                case 5: {
                    paymentData.value.username = null;
                    paymentData.value.phoneNumber = null;
                    paymentData.value.targetDate = null;
                    paymentData.value.targetTime = null;
                    username.value = undefined;
                    phoneNumber.value = undefined;
                    targetDate.value = new Date();
                    targetTime.value = undefined;
                    popupPage.value--;
                    break;
                }
            }
        };

        const getProductInfo = async () => {
            const data = {
                toiletCount: paymentData.value.toiletCnt,
                verandaCount: paymentData.value.verandaCnt,
                footage: paymentData.value.footage,
                clinicType: paymentData.value.clinicType,
                expansion: paymentData.value.expansion
            };
            console.log(data);
            getApiInstance()
                .post('/product/getDetail', data)
                .then((res) => {
                    if (res.data.code === 0) {
                        productResponse.value = {
                            id: res.data.data.id,
                            name: res.data.data.name,
                            description: res.data.data.description,
                            balanceAmount: res.data.data.balanceAmount,
                            depositAmount: res.data.data.depositAmount,
                            serviceType: res.data.data.serviceType,
                            created: res.data.data.created,
                            updated: res.data.data.updated
                        };
                        productResponse.value.balanceAmount = res.data.data.balanceAmount;
                        depositAmount.value = res.data.data.depositAmount;
                        popupPage.value++;
                    } else {
                        window.alert(res.data.message);
                    }
                })
                .catch((err) => console.log(err));
        };

        return {
            paymentData,
            compPopupType,
            PopupType,
            RoomType,
            selectList,
            expansion,
            popupPage,
            footage,
            toiletCnt,
            verandaCnt,
            username,
            phoneNumber,
            targetTime,
            targetDate,
            productResponse,
            ClinicType,
            handleNext,
            handlePrev,
            handleClickBg,
            handleClickClose,
            handleSelectClinic,
            handleSelectRoom,
            handleChangeFootage,
            handleChangeToilet,
            handleChangeVeranda,
            handleChangeUsername,
            handleChangePhone,
            handleChangeDate,
            handleChangeTime,
            setSelectValue
        };
    }
});
</script>

<template>
    <div class="popup-payment absolute max-w-[460px] w-[38%] min-h-[535px] bg-white z-50 p-[15px]">
        <div v-if="popupPage === 1" class="payment-product">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >원하는 클리닉을 선택하세요.</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >예약 할 서비스를 골라주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div class="contents-area w-full h-full px-[5%] pb-[35px]">
                <div class="w-full h-full grid grid-rows-2 grid-cols-2 gap-[10px]">
                    <div
                        class="content max-w-[185px] h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] px-[10%]"
                        @click="() => handleSelectClinic(ClinicType.ONE_ROOM_CLINIC)"
                    >
                        <img
                            class="w-[30px] h-[30px] mr-[10px]"
                            src="@/assets/images/icons/apart.svg"
                        />
                        <div class="text-[18px] font-[600] leading-[26px]">원룸 청소</div>
                    </div>
                    <div
                        class="content max-w-[185px] h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] px-[10%]"
                        @click="() => handleSelectClinic(ClinicType.RESIDENTIAL_CLINIC)"
                    >
                        <img
                            class="w-[30px] h-[30px] mr-[10px]"
                            src="@/assets/images/icons/apart.svg"
                        />
                        <div class="text-[18px] font-[600] leading-[26px]">거주 청소</div>
                    </div>
                    <div
                        class="content max-w-[185px] h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] px-[10%]"
                        @click="() => handleSelectClinic(ClinicType.MOVE_IN_OR_MOVING_CLINIC)"
                    >
                        <img
                            class="w-[30px] h-[30px] mr-[10px]"
                            src="@/assets/images/icons/apart.svg"
                        />
                        <div class="text-[18px] font-[600] leading-[26px]">
                            입주 청소<br />이사 청소
                        </div>
                    </div>
                    <div
                        class="content max-w-[185px] h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] px-[10%]"
                        @click="() => handleSelectClinic(ClinicType.BUSINESS_CLINIC)"
                    >
                        <img
                            class="w-[30px] h-[30px] mr-[10px]"
                            src="@/assets/images/icons/apart.svg"
                        />
                        <div class="text-[18px] font-[600] leading-[26px]">사업장 청소</div>
                    </div>
                </div>
                <div
                    class="mt-[10px] w-full h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] px-[5%]"
                    @click="() => handleSelectClinic(ClinicType.SPECIAL_CLINIC)"
                >
                    <img
                        class="py-[7.5px] w-[30px] h-full mr-[10px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="flex flex-col">
                        <span class="text-[18px] font-[600] leading-[26px]"
                            >특수청소 및 전문시공</span
                        >
                        <span class="text-[16px] font-[500] text-[--color-text-gray]"
                            >더많은 서비스를 원하시면 이곳을 눌러주세요.</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <!-- 2 -->
        <div v-else-if="popupPage === 2" class="payment-product">
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
                class="contents-area w-full h-full max-h-[370px] grid grid-rows-2 grid-cols-2 px-[5%] gap-[10px] pb-[85px]"
            >
                <div
                    class="content max-w-[185px] max-h-[90px] h-[160px] flex border-[--color-border-blue] border-[1.5px] px-[10%] py-[23px]"
                    @click="() => handleSelectRoom(RoomType.APART)"
                >
                    <img
                        class="w-[30px] h-[30px] mr-[10px] my-[7px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[18px] font-[600] leading-[22px] my-auto">아파트</div>
                </div>
                <div
                    class="content max-w-[185px] max-h-[90px] h-[160px] flex border-[--color-border-blue] border-[1.5px] px-[10%] py-[23px]"
                    @click="() => handleSelectRoom(RoomType.VILLA)"
                >
                    <img
                        class="w-[30px] h-[30px] mr-[10px] my-[7px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[18px] font-[600] leading-[22px] my-auto">
                        빌라<br />다세대 주택
                    </div>
                </div>
                <div
                    class="content max-w-[185px] max-h-[90px] h-[160px] flex border-[--color-border-blue] border-[1.5px] px-[10%] py-[23px]"
                    @click="() => handleSelectRoom(RoomType.COMMERCIAL_COMPLEX)"
                >
                    <img
                        class="w-[30px] h-[30px] mr-[10px] my-[7px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[18px] font-[600] leading-[22px] my-auto">
                        오피스텔<br />주상복합
                    </div>
                </div>
                <div
                    class="content max-w-[185px] max-h-[90px] h-[160px] flex border-[--color-border-blue] border-[1.5px] px-[10%] py-[23px]"
                    @click="() => handleSelectRoom(RoomType.HOUSE)"
                >
                    <img
                        class="w-[30px] h-[30px] mr-[10px] my-[7px]"
                        src="@/assets/images/icons/apart.svg"
                    />
                    <div class="text-[18px] font-[600] leading-[22px] my-auto">주택</div>
                </div>
            </div>
            <div class="btn-area w-full h-[45px] flex justify-between gap-x-[15px] px-[5%]">
                <div
                    class="flex-center h-full w-full rounded-[80px] border-[--color-border-blue] border-[1.5px]"
                    @click="handlePrev"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                        >이전으로</span
                    >
                </div>
                <div
                    class="flex-center h-full w-full rounded-[80px] bg-[--color-main-blue]"
                    @click="handleNext"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                        >다음으로</span
                    >
                </div>
            </div>
        </div>
        <!-- 3 -->
        <div v-else-if="popupPage === 3" class="payment-input">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >자세한 정보를 알려주세요.</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >구조를 알려주세요. 더 정확한 견적을 받을 수 있어요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div class="contents-area flex-col px-[5%] mb-[30px]">
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">공급면적</div>
                    <clinic-input
                        place-holder="평수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :value="footage"
                        :is-number="true"
                        :change-handler="handleChangeFootage"
                    ></clinic-input>
                </div>
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">화장실 수</div>
                    <clinic-input
                        place-holder="화장실 수를 입력해주세요."
                        :is-number="true"
                        :value="toiletCnt"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :change-handler="handleChangeToilet"
                    ></clinic-input>
                </div>
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">확장 여부</div>
                    <clinic-select
                        :selected-value="expansion"
                        :select-list="selectList"
                        place-holder="확장형 인가요?"
                        :select-handler="setSelectValue"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">베란다 수</div>
                    <clinic-input
                        place-holder="베란다 수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :value="verandaCnt"
                        :is-number="true"
                        :change-handler="handleChangeVeranda"
                    ></clinic-input>
                </div>
            </div>
            <div class="btn-area w-full h-[45px] flex justify-between gap-x-[15px] px-[5%]">
                <div
                    class="flex-center h-full w-full rounded-[80px] border-[--color-border-blue] border-[1.5px]"
                    @click="handlePrev"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                        >이전으로</span
                    >
                </div>
                <div
                    class="flex-center h-full w-full rounded-[80px] bg-[--color-main-blue]"
                    @click="handleNext"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                        >다음으로</span
                    >
                </div>
            </div>
        </div>
        <!-- 4 -->
        <div v-else-if="popupPage === 4" class="payment-input">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >예약자 정보를 알려주세요.</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >예약 진행 상황을 받을 수 있는 정보를 알려주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div class="contents-area flex-col px-[5%] mb-[30px]">
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약자 명</div>
                    <clinic-input
                        place-holder="예약자 명"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :value="username"
                        :change-handler="handleChangeUsername"
                    ></clinic-input>
                </div>
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">전화번호</div>
                    <clinic-input
                        place-holder="전화번호를 입력해주세요."
                        :is-number="true"
                        :value="phoneNumber"
                        :change-handler="handleChangePhone"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-input>
                </div>
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약일</div>
                    <clinic-date
                        :value="targetDate"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :change-handler="handleChangeDate"
                    >
                    </clinic-date>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">시간</div>
                    <clinic-time
                        :value="targetTime"
                        :change-handler="handleChangeTime"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-time>
                    <!--                    <clinic-input-->
                    <!--                        place-holder="시간을 입력해주세요."-->
                    <!--                        class="max-w-[288px] max-h-[60px] w-[73%]"-->
                    <!--                    ></clinic-input>-->
                </div>
            </div>
            <div class="btn-area w-full h-[45px] flex justify-between gap-x-[15px] px-[5%]">
                <div
                    class="flex-center h-full w-full rounded-[80px] border-[--color-border-blue] border-[1.5px]"
                    @click="handlePrev"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                        >이전으로</span
                    >
                </div>
                <div
                    class="flex-center h-full w-full rounded-[80px] bg-[--color-main-blue]"
                    @click="handleNext"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                        >다음으로</span
                    >
                </div>
            </div>
        </div>
        <div v-else-if="popupPage === 5" class="payment-input">
            <div class="head-area max-w-[430px] flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >예약금을 결제해요.</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >선택한 서비스의 예상금액과 예약금입니다.<br />서비스 예약 확정을 위해
                        예약금을 결제해주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="@/assets/images/icons/x-btn.svg" />
                </div>
            </div>
            <div class="contents-area flex-col mx-[5%] border-b-[1px] border-[#96C8F6] pb-[5px]">
                <div class="flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px]">서비스 예상금액</div>
                    <div class="w-[256px] relative">
                        <input
                            :value="productResponse ? productResponse.balanceAmount : null"
                            readonly="true"
                            class="w-full h-full bg-[#C5DEF5] py-[17px] px-[20px]"
                        />
                        <span class="absolute font-[600] text-[18px] right-[20px] top-[16px]">
                            원
                        </span>
                    </div>
                </div>
                <div class="flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약금</div>
                    <div class="w-[256px] relative">
                        <input
                            :value="productResponse ? productResponse.depositAmount : null"
                            readonly="true"
                            class="w-full h-full bg-[#C5DEF5] py-[17px] px-[20px]"
                        />
                        <span class="absolute font-[600] text-[18px] right-[20px] top-[16px]">
                            원
                        </span>
                    </div>
                </div>
            </div>
            <div class="mx-[5%]">
                <div class="info-wrapper flex items-start mt-[15px]">
                    <img class="w-[15px] h-[15px] mr-[5px]" src="@/assets/images/icons/info.svg" />
                    <span class="text-[16px] font-[400] leading-[19px] text-[--color-text-gray]"
                        >고객님이 선택하신 서비스의 예상 금액입니다.<br />
                        현장 및 상세 예약 확인에 따라 금액이 변동될 수 있으며,<br />
                        예약금 결제 후 확정 문자를 드립니다.</span
                    >
                </div>
                <div class="w-full h-[45px] flex justify-between gap-x-[15px] mt-[45px]">
                    <div
                        class="flex-center h-full w-full rounded-[80px] border-[--color-border-blue] border-[1.5px]"
                        @click="handlePrev"
                    >
                        <span
                            class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                            >이전으로</span
                        >
                    </div>
                    <div
                        class="flex-center h-full w-full rounded-[80px] bg-[--color-main-blue]"
                        @click="handleNext"
                    >
                        <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                            >결제하기</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="popupPage === 6" class="payment-input">
            <payment-module
                :payment-data="paymentData"
                :product-data="productResponse"
            ></payment-module>
        </div>
    </div>
</template>
