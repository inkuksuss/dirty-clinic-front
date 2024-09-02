<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from '@/stores/store';
import {
    ClinicType,
    type CommonCodeType,
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
        const address = ref<string | undefined>();
        const targetDate = ref<Date>(new Date());
        const balanceAmount = ref<number>(0);
        const depositAmount = ref<number>(0);
        const productResponse = ref<ProductResponse>();
        const serviceList = ref<CommonCodeType[]>([]);
        const buildingList = ref<CommonCodeType[]>([]);
        const structureList = ref<SelectType[]>([]);
        const structureId = ref<string>('');

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

        const handleChangeAddress = (v: string) => {
            address.value = v;
            paymentData.value.address = v;
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
            roomId: null,
            serviceId: null,
            structureId: null,
            footage: null,
            toiletCnt: null,
            expansion: null,
            verandaCnt: null,
            username: null,
            phoneNumber: null,
            targetDate: null,
            targetTime: null,
            address: null
        });

        const popupPage = ref<number>(1);

        const handleClickBg = () => {
            store.setOpenPopup(null);
        };

        const handleClickClose = () => {
            store.setOpenPopup(null);
        };

        const handleSelectBuilding = (place: CommonCodeType) => {
            paymentData.value.roomId = place.id;
        };

        const setSelectValue = (v: string | undefined) => {
            paymentData.value.expansion = v as 'N' | 'Y';
        };

        const setSelectStructure = (value: string | undefined) => {
            if (!value) return;
            paymentData.value.structureId = parseInt(value, 10);
            structureId.value = value;
        };

        const handleSelectService = (service: CommonCodeType) => {
            getApiInstance()
                .get('/common/summary?type=building_type')
                .then((res) => {
                    if (res.data.code === 0) {
                        buildingList.value = res.data.data;
                        paymentData.value.serviceId = service.id;
                        popupPage.value = 2;
                    }
                })
                .catch((e) => console.log(e));
        };

        const handleNext = () => {
            switch (popupPage.value) {
                case 2: {
                    if (paymentData.value.roomId === null) {
                        window.alert('장소를 신청해주세요.');
                        return;
                    }
                    getApiInstance()
                        .get('/common/summary?type=structure_type')
                        .then((res) => {
                            if (res.data.code === 0) {
                                structureList.value = res.data.data.map((v: CommonCodeType) => {
                                    return { value: v.id.toString(), name: v.name };
                                });
                                popupPage.value++;
                            }
                        })
                        .catch((e) => console.log(e));
                    break;
                }
                case 3: {
                    if (!paymentData.value.structureId) {
                        window.alert('구조를 입력해주세요.');
                        return;
                    }

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

                    if (!paymentData.value.address || !address.value) {
                        window.alert('주소를 입력해주세요.');
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
                    paymentData.value.serviceId = null;
                    paymentData.value.roomId = null;
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
                    paymentData.value.roomId = null;
                    popupPage.value--;
                    break;
                }
                case 4: {
                    paymentData.value.structureId = null;
                    paymentData.value.footage = null;
                    paymentData.value.toiletCnt = null;
                    paymentData.value.expansion = null;
                    paymentData.value.verandaCnt = null;
                    paymentData.value.username = null;
                    paymentData.value.phoneNumber = null;
                    paymentData.value.targetDate = null;
                    paymentData.value.targetTime = null;
                    paymentData.value.address = null;
                    footage.value = undefined;
                    verandaCnt.value = undefined;
                    expansion.value = '';
                    toiletCnt.value = undefined;
                    username.value = undefined;
                    phoneNumber.value = undefined;
                    targetDate.value = new Date();
                    targetTime.value = undefined;
                    address.value = undefined;
                    popupPage.value--;
                    break;
                }
                case 5: {
                    paymentData.value.username = null;
                    paymentData.value.phoneNumber = null;
                    paymentData.value.targetDate = null;
                    paymentData.value.targetTime = null;
                    paymentData.value.address = null;
                    username.value = undefined;
                    phoneNumber.value = undefined;
                    targetDate.value = new Date();
                    targetTime.value = undefined;
                    address.value = undefined;
                    popupPage.value--;
                    break;
                }
            }
        };

        const getProductInfo = async () => {
            const data = {
                serviceId: paymentData.value.serviceId,
                structureId: paymentData.value.structureId,
                toiletCount: paymentData.value.toiletCnt,
                verandaCount: paymentData.value.verandaCnt,
                footage: paymentData.value.footage,
                expansion: paymentData.value.expansion
            };
            console.log(data);
            getApiInstance()
                .post('/product/detail', data)
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

        onMounted(() => {
            getApiInstance()
                .get('/common/summary?type=service_type')
                .then((res) => {
                    if (res.data.code === 0) {
                        serviceList.value = res.data.data;
                    }
                })
                .catch((e) => console.log(e));
        });

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
            serviceList,
            buildingList,
            structureList,
            structureId,
            address,
            setSelectStructure,
            handleNext,
            handlePrev,
            handleClickBg,
            handleClickClose,
            handleSelectService,
            handleSelectBuilding,
            handleChangeFootage,
            handleChangeToilet,
            handleChangeVeranda,
            handleChangeUsername,
            handleChangePhone,
            handleChangeDate,
            handleChangeTime,
            handleChangeAddress,
            setSelectValue
        };
    }
});
</script>

<template>
    <div class="popup-payment absolute max-w-[460px] w-[38%] min-h-[535px] bg-white z-50 p-[15px]">
        <div v-if="popupPage === 1" class="payment-product">
            <div class="head-area max-w-[430px] flex justify-between pl-[20px]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[30px] font-[700] leading-[36px]"
                        >원하는 클리닉을 선택하세요.</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >예약 할 서비스를 골라주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
                </div>
            </div>
            <div class="contents-area service-page w-full h-full px-[20px] pb-[35px]">
                <div class="w-full h-full grid grid-cols-2">
                    <div
                        v-for="(service, idx) in serviceList"
                        :key="`service-${idx}`"
                        class="content h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] pl-[20px] pr-[10px] mb-[10px]"
                        @click="() => handleSelectService(service)"
                    >
                        <img
                            class="w-[30px] h-[30px] mr-[10px]"
                            src="/assets/images/icons/apart.svg"
                            alt="아파트 아이콘"
                        />
                        <div>
                            <div class="text-[18px] font-[600] leading-[26px]">
                                {{ service.name }}
                            </div>
                            <div
                                v-if="idx === 2"
                                class="text-[16px] text-[--color-text-gray] font-[500]"
                            >
                                원룸, 아파트, 오피스텔 등등은 이곳을 눌러주세요.
                            </div>
                            <div
                                v-else-if="idx === 3"
                                class="text-[16px] text-[--color-text-gray] font-[500]"
                            >
                                더많은 서비스를 원하시면 이곳을 눌러주세요.
                            </div>
                        </div>
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
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
                </div>
            </div>
            <div
                class="contents-area w-full h-full max-h-[370px] grid grid-rows-2 grid-cols-2 px-[5%] gap-[10px] pb-[85px]"
            >
                <div
                    v-for="(building, idx) in buildingList"
                    :key="`place-${idx}`"
                    class="content max-w-[185px] max-h-[90px] h-[160px] flex border-[--color-border-blue] border-[1.5px] px-[10%] py-[23px]"
                    :class="[paymentData.roomId === building.id ? 'bg-[--color-border-blue]' : '']"
                    @click="() => handleSelectBuilding(building)"
                >
                    <img
                        v-if="idx === 3"
                        class="w-[30px] h-[30px] mr-[10px] my-[7px]"
                        src="/assets/images/icons/home.svg"
                        alt="아파트 아이콘"
                    />
                    <img
                        v-else
                        class="w-[30px] h-[30px] mr-[10px] my-[7px]"
                        src="/assets/images/icons/apart.svg"
                        alt="아파트 아이콘"
                    />
                    <div
                        class="text-[18px] font-[600] leading-[22px] my-auto"
                        v-html="building.name.replace('/', '<br/>')"
                    ></div>
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
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
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
                    <div class="text-[18px] font-[600] leading-[26px]">구조</div>
                    <clinic-select
                        :selected-value="structureId"
                        :select-list="structureList"
                        place-holder="주거 형태를 선택하세요."
                        :select-handler="setSelectStructure"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
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
                    <div class="text-[18px] font-[600] leading-[26px]">거실 베란다</div>
                    <clinic-select
                        :selected-value="expansion"
                        :select-list="selectList"
                        place-holder="거실 베란다가 있나요?"
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
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
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
                <div class="flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">시간</div>
                    <clinic-time
                        :value="targetTime"
                        :change-handler="handleChangeTime"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-time>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">주소</div>
                    <clinic-input
                        place-holder="주소를 입력하세요."
                        :value="address"
                        :change-handler="handleChangeAddress"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
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
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
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
                    <img
                        class="w-[15px] h-[15px] mr-[5px]"
                        src="/assets/images/icons/info.svg"
                        alt="정보 아이콘"
                    />
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
