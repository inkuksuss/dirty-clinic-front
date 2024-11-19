<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from '@/stores/store';
import {
    type ApiResponse,
    ClinicType,
    type CommonCodeType,
    type EstimateType,
    type IAmPortPaymentRequest,
    type IAmPortPaymentResponse,
    type IAmPortPgBaseRequest,
    type PaymentData,
    type PaymentPrepareRequest,
    PopupType,
    type ProductResponse,
    RoomType,
    type SelectType
} from '@/utils/types';
import ClinicInput from '@/components/common/ClinicInput.vue';
import ClinicSelect from '@/components/common/ClinicSelect.vue';
import { getApiInstance } from '@/utils/api';
import ClinicDate from '@/components/common/ClinicDate.vue';
import moment from 'moment';
import { checkHasSpecialCharacters } from '@/utils/common';

export default defineComponent({
    name: 'PaymentPopup',
    components: { ClinicDate, ClinicSelect, ClinicInput },
    setup() {
        const store = useStore();
        const selectList: Array<SelectType> = [
            { name: '네', value: 'Y' },
            { name: '아니요', value: 'N' }
        ];

        const timeSelectList: Array<SelectType> = [
            { name: '오전 8시', value: '08:00' },
            { name: '오후 2시', value: '14:00' },
            { name: '그외 시간대', value: '그외 시간대' }
        ];
        const compPopupType = computed(() => store.openPopup);
        const compIsMobile = computed(() => store.isMobile);
        const expansion = ref<string>('');
        const footage = ref<string | undefined>();
        const toiletCnt = ref<string | undefined>();
        const verandaCnt = ref<string | undefined>();
        const username = ref<string | undefined>();
        const phoneNumber = ref<string | undefined>();
        const targetTime = ref<string>('');
        const address = ref<string | undefined>();
        const targetDate = ref<Date>(new Date());
        const productResponse = ref<ProductResponse>();
        const serviceList = ref<CommonCodeType[]>([]);
        const buildingList = ref<CommonCodeType[]>([]);
        const clinicList = ref<SelectType[]>([]);
        const structureList = ref<SelectType[]>([]);
        const structureId = ref<string>('');
        const estimateData = ref<EstimateType>({
            serviceId: '',
            targetDate: new Date(),
            targetTime: '',
            username: '',
            phoneNumber: ''
        });
        const paymentTypeList = ref<
            { type: string; isSelect: boolean; src?: string; name?: string }[]
        >([
            {
                type: 'card',
                name: '신용/체크카드',
                isSelect: false
            },
            {
                type: 'toss',
                src: new URL('@/assets/images/payment/toss@2x.webp', import.meta.url).href,
                isSelect: false
            },
            {
                type: 'kakao',
                src: new URL('@/assets/images/payment/kakao@2x.webp', import.meta.url).href,
                name: '카카오페이',
                isSelect: false
            }
        ]);
        const isAgreePolicy = ref<boolean>(false);
        const paymentBaseRequest: IAmPortPaymentRequest = {
            channelKey: '',
            pay_method: '',
            merchant_uid: '',
            name: '',
            amount: 0,
            buyer_email: '',
            buyer_name: '',
            buyer_tel: '',
            buyer_addr: '',
            buyer_postcode: '',
            bypass: {},
            custom_data: {},
            display: {}
        };

        const kakaoPaymentBaseRequest: IAmPortPgBaseRequest = {
            channelKey: 'channel-key-f23b5fe1-bcb1-4a6f-ad68-103528ed2d45',
            m_redirect_url: 'https://www.dirty-clinic.com/payment/result'
        };

        const tossPaymentBaseRequest: IAmPortPgBaseRequest = {
            channelKey: 'channel-key-e23a3961-2eec-41f2-b10f-10b91c3adfff',
            pay_method: 'card',
            m_redirect_url: 'https://www.dirty-clinic.com/payment/result'
        };

        const kgPaymentBaseRequest: IAmPortPgBaseRequest = {
            channelKey: 'channel-key-499a2702-b18c-4d79-8ad9-fc2f92477bd4',
            pay_method: 'card',
            m_redirect_url: 'https://www.dirty-clinic.com/payment/result'
        };

        const paymentData = ref<PaymentData>({
            buildingId: null,
            serviceId: null,
            structureId: null,
            footage: null,
            toiletCount: null,
            expansion: null,
            verandaCount: null,
            username: null,
            phoneNumber: null,
            targetDate: null,
            targetTime: null,
            address: null
        });

        const popupPage = ref<number>(1);

        const doPaymentPrepare = async () => {
            try {
                const prepareRequest = {
                    productId: productResponse.value?.id,
                    serviceId: paymentData.value?.serviceId,
                    structureId: paymentData.value?.structureId,
                    buildingId: paymentData.value?.buildingId,
                    username: paymentData.value?.username,
                    phoneNumber: paymentData.value?.phoneNumber,
                    address: paymentData.value?.address,
                    footage: paymentData.value?.footage,
                    toiletCount: paymentData.value?.toiletCount,
                    verandaCount: paymentData.value?.verandaCount,
                    expansion: paymentData.value?.expansion,
                    depositAmount: productResponse.value?.depositAmount,
                    balanceAmount: productResponse.value?.balanceAmount,
                    isAgreePolicy: isAgreePolicy.value ? 'Y' : 'N',
                    targetDate: paymentData.value?.targetDate,
                    targetTime: paymentData.value?.targetTime,
                    memberMemo: ''
                } as PaymentPrepareRequest;
                const res = await getApiInstance().post('/payment/prepare', prepareRequest);
                if (res.data.code === 0) {
                    return res;
                } else {
                    window.alert('결제 준비를 실패하였습니다.');
                }
            } catch (e) {
                console.log(e);
            }
        };

        const doPayment = async (pgBaseRequest: IAmPortPgBaseRequest) => {
            try {
                const prepareResponse = await doPaymentPrepare();
                if (prepareResponse) {
                    const iAmPortClient = window.IMP;
                    iAmPortClient.init('imp11531748');

                    const paymentRequest = Object.assign({}, paymentBaseRequest, pgBaseRequest);
                    paymentRequest.name = `더티클리닉-${serviceList.value?.find(
                        (v) => v.id === paymentData.value?.serviceId
                    )?.name}-${paymentData.value?.footage}평`;
                    paymentRequest.buyer_name = paymentData.value?.username;
                    paymentRequest.buyer_addr = paymentData.value?.address;
                    paymentRequest.merchant_uid = prepareResponse.data.data.merchantUid;
                    paymentRequest.amount = prepareResponse.data.data.amount;
                    paymentRequest.buyer_tel = paymentData.value.phoneNumber as string;
                    paymentRequest.custom_data = Object.assign(
                        {},
                        paymentData.value,
                        productResponse.value
                    );
                    paymentRequest.m_redirect_url += `?id=${prepareResponse.data.data.merchantUid}`;
                    if (
                        pgBaseRequest.channelKey ===
                        'channel-key-499a2702-b18c-4d79-8ad9-fc2f92477bd4'
                    ) {
                        paymentRequest.bypass = {
                            acceptmethod: 'noeasypay', // 간편결제 버튼을 통합결제창에서 제외(PC)
                            P_RESERVED: 'noeasypay=Y' // 간편결제 버튼을 통합결제창에서 제외(모바일),
                        };
                        paymentRequest.display = {
                            card_quota: [] // 할부개월 6개월만 활성화
                        };
                    }

                    iAmPortClient.request_pay(
                        paymentRequest,
                        async (rsp: IAmPortPaymentResponse) => {
                            try {
                                const response = (await getApiInstance().post(
                                    '/reservation/result',
                                    {
                                        merchantUid: rsp.merchant_uid,
                                        status: rsp.status,
                                        success: rsp.success,
                                        errorMsg: rsp.error_msg
                                    }
                                )) as ApiResponse<any>;
                                if (response.data.code == 0) {
                                    handlePaymentSuccess();
                                } else {
                                    handlePaymentFail();
                                }
                                console.log(response);
                            } catch (e) {
                                console.error(e);
                                handlePaymentFail();
                            }
                        }
                    );
                }
            } catch (err) {
                console.error(err);
            }
        };

        const handleChangeFootage = (v: string) => {
            footage.value = v;
            paymentData.value.footage = Number(v);
        };

        const handleChangeToilet = (v: string) => {
            toiletCnt.value = v;
            paymentData.value.toiletCount = Number(v);
        };

        const handleChangeVeranda = (v: string) => {
            verandaCnt.value = v;
            paymentData.value.verandaCount = Number(v);
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

        const handleChangeTime = (v: string | undefined) => {
            if (v) {
                targetTime.value = v;
                paymentData.value.targetTime = v;
            }
        };

        const handleChangeEstimateDate = (v: Date) => {
            estimateData.value.targetDate = v;
        };

        const handleChangeEstimateTime = (v: string | undefined) => {
            if (v) estimateData.value.targetTime = v;
        };

        const handleChangeEstimateUsername = (v: string) => {
            estimateData.value.username = v;
        };
        const handleChangeEstimatePhoneNumber = (v: string) => {
            estimateData.value.phoneNumber = v;
        };

        const handleClickBg = () => {
            store.setOpenPopup(null);
        };

        const handleClickClose = () => {
            store.setOpenPopup(null);
        };

        const handleSelectBuilding = (building: CommonCodeType) => {
            paymentData.value.buildingId = building.id;
        };

        const setSelectValue = (v: string | undefined) => {
            paymentData.value.expansion = v as 'N' | 'Y';
        };

        const setServiceValue = (v: string | undefined) => {
            if (v) {
                estimateData.value.serviceId = v;
            }
        };

        const setSelectStructure = (value: string | undefined) => {
            if (!value) return;
            paymentData.value.structureId = parseInt(value, 10);
            structureId.value = value;
        };

        const handleSelectPaymentType = (type: string) => {
            paymentTypeList.value.forEach((v) => (v.isSelect = false));
            paymentTypeList.value
                .filter((v) => v.type === type)
                .forEach((v) => (v.isSelect = true));
        };

        const handleChangePolicy = () => {
            isAgreePolicy.value = !isAgreePolicy.value;
        };

        const handleSelectService = (service: CommonCodeType) => {
            if (service.name === '기타') {
                getApiInstance()
                    .get('/common/summary?type=service_type&subType=pay_disable')
                    .then((res) => {
                        if (res.data.code === 0) {
                            clinicList.value = res.data.data.map((v: CommonCodeType) => {
                                return { name: v.name, value: v.id.toString() };
                            });
                            popupPage.value = 7;
                        }
                    })
                    .catch((e) => console.log(e));
            } else {
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
            }
        };

        const handleNext = () => {
            switch (popupPage.value) {
                case 2: {
                    if (paymentData.value.buildingId === null) {
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
                    if (!paymentData.value.username) {
                        window.alert('예약자 명을 입력해주세요.');
                        return;
                    }

                    if (!paymentData.value.phoneNumber) {
                        window.alert('전화번호를 입력해주세요.');
                        return;
                    }

                    if (
                        !Number.isInteger(parseFloat(paymentData.value.phoneNumber)) ||
                        checkHasSpecialCharacters(paymentData.value.phoneNumber)
                    ) {
                        window.alert('전화번호는 숫자만 입력 가능합니다.');
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
                    popupPage.value++;
                    break;
                }
                case 4: {
                    if (!paymentData.value.footage) {
                        window.alert('공급면적을 입력해주세요.');
                        return;
                    }

                    if (paymentData.value.footage < 1) {
                        window.alert('공급면적은 1보다 작을 수 없습니다.');
                        return;
                    }

                    if (footage.value?.slice(-1) === '.') {
                        window.alert('공급면적 형식이 숫자가 아닙니다.');
                        return;
                    }

                    if (!paymentData.value.structureId) {
                        window.alert('구조를 입력해주세요.');
                        return;
                    }

                    if (!paymentData.value.toiletCount && paymentData.value.toiletCount !== 0) {
                        window.alert('화장실 수를 입력해주세요.');
                        return;
                    }

                    if (
                        paymentData.value.toiletCount &&
                        (!Number.isInteger(parseFloat(paymentData.value.toiletCount.toString())) ||
                            checkHasSpecialCharacters(paymentData.value.toiletCount.toString()))
                    ) {
                        window.alert('화장실 수는 숫자만 입력 가능합니다.');
                        return;
                    }

                    if (!paymentData.value.expansion) {
                        window.alert('확장 여부를 선택해주세요.');
                        return;
                    }

                    if (!paymentData.value.verandaCount && paymentData.value.verandaCount !== 0) {
                        window.alert('베란다 수를 입력해주세요.');
                        return;
                    }

                    if (
                        !Number.isInteger(parseFloat(paymentData.value.verandaCount.toString())) ||
                        checkHasSpecialCharacters(paymentData.value.verandaCount.toString())
                    ) {
                        window.alert('베란다 수는 숫자만 입력 가능합니다.');
                        return;
                    }

                    getProductInfo();
                    break;
                }
                case 5: {
                    const paymentType = paymentTypeList.value.find((v) => v.isSelect);
                    if (!paymentType) {
                        window.alert('결제 수단을 선택해주세요.');
                        return;
                    }
                    if (!isAgreePolicy.value) {
                        window.alert('이용약관 및 개인정보 수집 · 이용 동의를 체크해주세요.');
                        return;
                    }

                    doPayment(
                        paymentType.type === 'card'
                            ? kgPaymentBaseRequest
                            : paymentType.type === 'toss'
                              ? tossPaymentBaseRequest
                              : kakaoPaymentBaseRequest
                    );
                    break;
                }
                case 7: {
                    if (
                        !estimateData.value.serviceId ||
                        estimateData.value.serviceId.trim() === ''
                    ) {
                        window.alert('클리닉 종류를 선택해주세요.');
                        return;
                    }
                    if (!estimateData.value.targetDate) {
                        window.alert('예약일을 입력해주세요.');
                        return;
                    }
                    if (!estimateData.value.targetTime) {
                        window.alert('시간을 입력해주세요.');
                        return;
                    }
                    popupPage.value++;
                    break;
                }
                case 8: {
                    if (!estimateData.value.username || estimateData.value.username.trim() === '') {
                        window.alert('성함을 입력해주세요.');
                        return;
                    }

                    if (
                        !estimateData.value.phoneNumber ||
                        estimateData.value.phoneNumber.trim() === ''
                    ) {
                        window.alert('연락처를 입력해주세요.');
                        return;
                    }

                    if (
                        !Number.isInteger(parseFloat(estimateData.value.phoneNumber)) ||
                        checkHasSpecialCharacters(estimateData.value.phoneNumber)
                    ) {
                        window.alert('전화번호는 숫자만 입력 가능합니다.');
                        return;
                    }

                    doEstimateByEtc();
                    break;
                }
            }
        };

        const handlePrev = () => {
            switch (popupPage.value) {
                case 2: {
                    paymentData.value.serviceId = null;
                    paymentData.value.buildingId = null;
                    popupPage.value--;
                    break;
                }
                case 3: {
                    paymentData.value.username = null;
                    paymentData.value.phoneNumber = null;
                    paymentData.value.targetDate = null;
                    paymentData.value.targetTime = null;
                    paymentData.value.address = null;

                    username.value = undefined;
                    phoneNumber.value = undefined;
                    targetDate.value = new Date();
                    targetTime.value = '';
                    address.value = undefined;

                    paymentData.value.buildingId = null;
                    popupPage.value--;
                    break;
                }
                case 4: {
                    paymentData.value.footage = null;
                    paymentData.value.structureId = null;
                    paymentData.value.toiletCount = null;
                    paymentData.value.expansion = null;
                    paymentData.value.verandaCount = null;

                    paymentData.value.username = null;
                    paymentData.value.phoneNumber = null;
                    paymentData.value.targetDate = null;
                    paymentData.value.targetTime = null;
                    paymentData.value.address = null;

                    footage.value = undefined;
                    verandaCnt.value = undefined;
                    expansion.value = '';
                    toiletCnt.value = undefined;
                    structureId.value = '';

                    username.value = undefined;
                    phoneNumber.value = undefined;
                    targetDate.value = new Date();
                    targetTime.value = '';
                    address.value = undefined;
                    popupPage.value--;
                    break;
                }
                case 5: {
                    paymentTypeList.value.forEach((v) => (v.isSelect = false));
                    isAgreePolicy.value = false;

                    paymentData.value.footage = null;
                    paymentData.value.structureId = null;
                    paymentData.value.toiletCount = null;
                    paymentData.value.expansion = null;
                    paymentData.value.verandaCount = null;
                    footage.value = undefined;
                    verandaCnt.value = undefined;
                    expansion.value = '';
                    toiletCnt.value = undefined;
                    structureId.value = '';
                    popupPage.value--;
                    break;
                }
                case 7: {
                    estimateData.value.serviceId = '';
                    estimateData.value.targetDate = new Date();
                    estimateData.value.targetTime = '';
                    popupPage.value = 1;
                    break;
                }
                case 8: {
                    estimateData.value.serviceId = '';
                    estimateData.value.targetDate = new Date();
                    estimateData.value.targetTime = '';
                    estimateData.value.username = '';
                    estimateData.value.phoneNumber = '';
                    popupPage.value--;
                    break;
                }
            }
        };

        const getProductInfo = async () => {
            const data = {
                serviceId: paymentData.value.serviceId,
                structureId: paymentData.value.structureId,
                toiletCount: paymentData.value.toiletCount,
                verandaCount: paymentData.value.verandaCount,
                footage: paymentData.value.footage,
                expansion: paymentData.value.expansion
            };
            getApiInstance()
                .post('/product/detail', data)
                .then((res) => {
                    if (res.data.code === 0) {
                        productResponse.value = {
                            id: res.data.data.id,
                            balanceAmount: res.data.data.balanceAmount,
                            depositAmount: res.data.data.depositAmount
                        };
                        popupPage.value++;
                    } else {
                        window.alert(res.data.message);
                    }
                })
                .catch((err) => console.log(err));
        };

        const doEstimateByEtc = () => {
            const data = {
                serviceId: parseInt(estimateData.value.serviceId),
                targetDate: moment(estimateData.value.targetDate).format('YYYY-MM-DD'),
                targetTime: estimateData.value.targetTime,
                username: estimateData.value.username,
                phoneNumber: estimateData.value.phoneNumber
            };

            getApiInstance()
                .post('/reservation/estimate', data)
                .then((res) => {
                    if (res.data.code !== 0) {
                        window.alert('견적 요청에 실패하였습니다.');
                        return;
                    }
                    popupPage.value = 9;
                })
                .catch((e) => console.log(e));
        };

        const doEstimate = () => {
            if (!paymentData.value.footage) {
                window.alert('공급면적을 입력해주세요.');
                return;
            }

            if (paymentData.value.footage < 1) {
                window.alert('공급면적은 1보다 작을 수 없습니다.');
                return;
            }

            if (footage.value?.slice(-1) === '.') {
                window.alert('공급면적 형식이 숫자가 아닙니다.');
                return;
            }

            if (!paymentData.value.structureId) {
                window.alert('구조를 입력해주세요.');
                return;
            }

            if (!paymentData.value.toiletCount && paymentData.value.toiletCount !== 0) {
                window.alert('화장실 수를 입력해주세요.');
                return;
            }

            if (
                paymentData.value.toiletCount &&
                (!Number.isInteger(parseFloat(paymentData.value.toiletCount.toString())) ||
                    checkHasSpecialCharacters(paymentData.value.toiletCount.toString()))
            ) {
                window.alert('화장실 수는 숫자만 입력 가능합니다.');
                return;
            }

            if (!paymentData.value.expansion) {
                window.alert('확장 여부를 선택해주세요.');
                return;
            }

            if (!paymentData.value.verandaCount && paymentData.value.verandaCount !== 0) {
                window.alert('베란다 수를 입력해주세요.');
                return;
            }

            if (
                !Number.isInteger(parseFloat(paymentData.value.verandaCount.toString())) ||
                checkHasSpecialCharacters(paymentData.value.verandaCount.toString())
            ) {
                window.alert('베란다 수는 숫자만 입력 가능합니다.');
                return;
            }

            getApiInstance()
                .post('/reservation/estimate', paymentData.value)
                .then((res) => {
                    if (res.data.code !== 0) {
                        window.alert('견적 요청에 실패하였습니다.');
                        return;
                    }
                    popupPage.value = 9;
                })
                .catch((e) => console.log(e));
        };

        const handlePaymentSuccess = () => {
            popupPage.value = 10;
        };

        const handlePaymentFail = () => {
            popupPage.value = 11;
        };

        const handleClickPrivatePolicy = () => {};

        const handleClickTermsOfUse = () => {};

        onMounted(() => {
            window.alert('현재 준비중인 기능입니다.');
            getApiInstance()
                .get('/common/summary?type=service_type&subType=pay_able')
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
            estimateData,
            clinicList,
            timeSelectList,
            compIsMobile,
            paymentTypeList,
            isAgreePolicy,
            handleClickPrivatePolicy,
            handleClickTermsOfUse,
            handlePaymentSuccess,
            handlePaymentFail,
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
            setSelectValue,
            setServiceValue,
            handleChangeEstimateDate,
            handleChangeEstimateTime,
            handleChangeEstimateUsername,
            handleChangeEstimatePhoneNumber,
            handleSelectPaymentType,
            handleChangePolicy,
            doEstimate
        };
    }
});
</script>

<template>
    <div class="popup-payment w-[460px] h-max absolute bg-white z-50">
        <div
            v-if="popupPage === 1"
            class="payment-product w-full min-h-[535px] flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[20px]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
                        >원하는 클리닉을 선택하세요.</span
                    >
                    <span class="mb-[50px] text-[16px] font-[400] leading-[19px]"
                        >예약 할 서비스를 골라주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
                </div>
            </div>
            <div class="contents-area service-page w-full px-[20px] pb-[35px] grid grid-cols-2">
                <div
                    v-for="(service, idx) in serviceList"
                    :key="`service-${idx}`"
                    class="content min-h-[90px] flex items-center border-[--color-border-blue] border-[1.5px] pl-[20px] pr-[10px] py-[20px] mb-[10px]"
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
                            class="text-[14px] text-[--color-text-gray] font-[500]"
                        >
                            원룸, 아파트, 오피스텔 등등은 이곳을 눌러주세요.
                        </div>
                        <div
                            v-else-if="idx === 3"
                            class="text-[14px] text-[--color-text-gray] font-[500]"
                        >
                            더많은 서비스를 원하시면 이곳을 눌러주세요.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 2 -->
        <div
            v-else-if="popupPage === 2"
            class="payment-product w-full h-max flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
                        >어떤 장소를 신청하시나요?</span
                    >
                    <span class="mb-[50px] text-[16px] font-[400] leading-[19px]"
                        >클리닉을 신청할 곳을 선택해주세요.</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
                </div>
            </div>
            <div
                class="contents-area w-full grid grid-rows-2 grid-cols-2 px-[5%] gap-[10px] pb-[85px]"
            >
                <div
                    v-for="(building, idx) in buildingList"
                    :key="`place-${idx}`"
                    class="content w-full max-h-[90px] h-[160px] flex border-[--color-border-blue] border-[1.5px] px-[10%] py-[23px]"
                    :class="[
                        paymentData.buildingId === building.id ? 'bg-[--color-border-blue]' : ''
                    ]"
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
            <div class="btn-area w-full min-h-[45px] flex justify-between gap-x-[15px] px-[5%]">
                <div
                    class="flex-center h-[45px] w-full rounded-[80px] border-[--color-border-blue] border-[1.5px]"
                    @click="handlePrev"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                        >이전으로</span
                    >
                </div>
                <div
                    class="flex-center h-[45px] w-full rounded-[80px] bg-[--color-main-blue]"
                    @click="handleNext"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                        >다음으로</span
                    >
                </div>
            </div>
        </div>
        <!-- 3 -->
        <div
            v-else-if="popupPage === 3"
            class="payment-input w-full min-h-[610px] flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
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
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약자 명</div>
                    <clinic-input
                        place-holder="예약자 명"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :value="username"
                        :change-handler="handleChangeUsername"
                        :length="25"
                    ></clinic-input>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">전화번호</div>
                    <clinic-input
                        place-holder="'-'를 제외한 숫자만 입력해주세요."
                        :is-number="true"
                        :value="phoneNumber"
                        :change-handler="handleChangePhone"
                        :length="25"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-input>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약일</div>
                    <clinic-date
                        :value="targetDate"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :change-handler="handleChangeDate"
                    >
                    </clinic-date>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">시간</div>
                    <clinic-select
                        :selected-value="targetTime"
                        :select-list="timeSelectList"
                        place-holder="시간을 골라주세요."
                        :select-handler="handleChangeTime"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
                <div class="content-box flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">주소</div>
                    <clinic-input
                        place-holder="주소를 입력하세요."
                        :value="address"
                        :change-handler="handleChangeAddress"
                        :length="200"
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
        <div
            v-else-if="popupPage === 4"
            class="payment-input w-full min-h-[610px] flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
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
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">공급면적</div>
                    <clinic-input
                        place-holder="평수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :value="footage"
                        :is-number="true"
                        :change-handler="handleChangeFootage"
                        :length="5"
                    ></clinic-input>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">구조</div>
                    <clinic-select
                        :selected-value="structureId"
                        :select-list="structureList"
                        place-holder="주거 형태를 선택하세요."
                        :select-handler="setSelectStructure"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">화장실 수</div>
                    <clinic-input
                        place-holder="화장실 수를 입력해주세요."
                        :is-number="true"
                        :value="toiletCnt"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :change-handler="handleChangeToilet"
                        :length="3"
                    ></clinic-input>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">거실 베란다</div>
                    <clinic-select
                        :selected-value="expansion"
                        :select-list="selectList"
                        place-holder="거실 베란다가 있나요?"
                        :select-handler="setSelectValue"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
                <div class="content-box flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">베란다 수</div>
                    <clinic-input
                        place-holder="베란다 수를 입력해주세요."
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :value="verandaCnt"
                        :is-number="true"
                        :change-handler="handleChangeVeranda"
                        :length="3"
                    ></clinic-input>
                </div>
            </div>
            <div class="btn-area w-full flex flex-col px-[5%]">
                <div class="flex justify-between gap-x-[15px]">
                    <div
                        class="flex-center h-[45px] w-full rounded-[80px] border-[--color-border-blue] border-[1.5px]"
                        @click="handlePrev"
                    >
                        <span
                            class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                            >이전으로</span
                        >
                    </div>
                    <div
                        class="flex-center h-[45px] w-full rounded-[80px] bg-[--color-main-blue]"
                        @click="handleNext"
                    >
                        <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                            >다음으로</span
                        >
                    </div>
                </div>

                <div
                    class="w-full mt-[15px] h-[60px] rounded-[80px] bg-[--color-main-blue] flex flex-col items-center justify-center"
                    @click="doEstimate"
                >
                    <span class="text-[16px] font-[400] text-[--color-white]"
                        >원하는 옵션이 없으신가요?</span
                    >
                    <span class="text-[18px] font-[600] text-[--color-white]">견적 요청하기</span>
                </div>
            </div>
        </div>
        <div
            v-else-if="popupPage === 5"
            class="payment-input w-full min-h-[535px] flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
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
                <div class="content-box flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px] min-w-[134px] mr-[10px]">
                        서비스 예상금액
                    </div>
                    <div class="w-full relative">
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
                <div class="content-box flex justify-between items-center mb-[20px]">
                    <div class="text-[18px] font-[600] leading-[26px] min-w-[134px] mr-[10px]">
                        예약금
                    </div>
                    <div class="w-full relative">
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
            <div class="mx-[5%] pb-[10px] border-b-[1px] border-[#96C8F6]">
                <div class="text-[20px] leading-[26px] font-[600] mt-[30px] mb-[20px]">
                    결제 수단
                </div>
                <div
                    v-for="paymentType in paymentTypeList"
                    :key="paymentType.type"
                    @click="() => handleSelectPaymentType(paymentType.type)"
                    class="flex h-[26px] items-center mb-[20px]"
                >
                    <div class="w-[20px] h-[20px] mr-[10px]">
                        <img
                            v-if="paymentType.isSelect"
                            src="/assets/images/icons/checkbox_check.svg"
                            class="w-full h-full"
                        />
                        <img
                            v-else
                            src="/assets/images/icons/checkbox_uncheck.svg"
                            class="w-full h-full"
                        />
                    </div>
                    <div class="flex">
                        <img
                            v-if="paymentType.src"
                            :src="paymentType.src"
                            class="mr-[5px]"
                            :class="paymentType.type === 'toss' ? 'h-[20px]' : 'h-[26px]'"
                        />
                        <div v-if="paymentType.name" class="text-[16px] leading-[26px] font-[600]">
                            {{ paymentType.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-[5%]">
                <div class="flex mt-[30px] items-center">
                    <div class="w-[20px] h-[20px] mr-[10px]" @click="handleChangePolicy">
                        <img
                            v-if="isAgreePolicy"
                            src="/assets/images/icons/checkbox_check.svg"
                            class="w-full h-full"
                        />
                        <img
                            v-else
                            src="/assets/images/icons/checkbox_uncheck.svg"
                            class="w-full h-full"
                        />
                    </div>
                    <a
                        class="text-[16px] font-[400] text-[--color-main-blue] mr-[5px] hover:underline"
                        @click="handleClickTermsOfUse"
                        href="https://www.dirty-clinic.com?popup=terms-of-use"
                        target="_blank"
                        >이용약관</a
                    >
                    <span class="text-[16px] font-[400] text-[--color-text-gray] mr-[5px]">및</span>
                    <a
                        class="text-[16px] font-[400] text-[--color-main-blue] mr-[5px] hover:underline"
                        @click="handleClickPrivatePolicy"
                        href="https://www.dirty-clinic.com?popup=private-policy"
                        target="_blank"
                        >개인정보 수집 · 이용
                    </a>
                    <span class="text-[16px] font-[400] text-[--color-text-gray]">동의</span>
                </div>

                <div class="info-wrapper flex items-start mt-[17px]">
                    <img
                        class="w-[15px] h-[15px] mr-[5px]"
                        src="/assets/images/icons/info.svg"
                        alt="정보 아이콘"
                    />
                    <span class="text-[16px] font-[400] leading-[19px] text-[--color-text-gray]"
                        >고객님이 선택하신 서비스의 예상 금액입니다.<br />
                        현장 및 상세 예약 확인에 따라 금액이 변동될 수 있으며, 예약금 결제 후 확정
                        문자를 드립니다.</span
                    >
                </div>
                <div class="w-full h-[45px] flex justify-between gap-x-[15px] mt-[45px] mb-[15px]">
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

        <!-- 7 > 기타 선택시 -->
        <div
            v-else-if="popupPage === 7"
            class="payment-input w-full min-h-[535px] flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
                        >어떤 클리닉을 원하시나요?</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >클리닉의 종류와 연락처를 남겨주시면 상담을 도와드려요!</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
                </div>
            </div>
            <div class="contents-area flex-col px-[5%] mb-[30px]">
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">거실 베란다</div>
                    <clinic-select
                        :selected-value="estimateData.serviceId"
                        :select-list="clinicList"
                        place-holder="클리닉을 골라주세요."
                        :select-handler="setServiceValue"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약일</div>
                    <clinic-date
                        :value="estimateData.targetDate"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :change-handler="handleChangeEstimateDate"
                    >
                    </clinic-date>
                </div>
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">시간</div>
                    <clinic-select
                        :selected-value="estimateData.targetTime"
                        :select-list="timeSelectList"
                        place-holder="시간을 골라주세요."
                        :select-handler="handleChangeEstimateTime"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-select>
                </div>
            </div>
            <div
                class="btn-area w-full h-[45px] flex justify-between gap-x-[15px] px-[5%] mt-[40px]"
            >
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

        <div
            v-else-if="popupPage === 8"
            class="payment-input w-full min-h-[535px] flex flex-col p-[15px] relative"
        >
            <div class="head-area w-full flex justify-between pl-[5%]">
                <div class="flex flex-col pt-[40px]">
                    <span class="mb-[5px] text-[28px] font-[700] leading-[36px]"
                        >연락드릴 정보를 알려주세요!</span
                    >
                    <span class="mb-[30px] text-[16px] font-[400] leading-[19px]"
                        >클리닉의 종류와 연락처를 남겨주시면 상담을 도와드려요!</span
                    >
                </div>
                <div @click="handleClickClose">
                    <img src="/assets/images/icons/x-btn.svg" alt="닫기" />
                </div>
            </div>
            <div class="contents-area flex-col px-[5%] mb-[30px]">
                <div class="content-box flex justify-between items-center mb-[15px]">
                    <div class="text-[18px] font-[600] leading-[26px]">예약자 명</div>
                    <clinic-input
                        place-holder="성함을 입력하세요."
                        :value="estimateData.username"
                        :change-handler="handleChangeEstimateUsername"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                        :length="25"
                    ></clinic-input>
                </div>
                <div class="content-box flex justify-between items-center">
                    <div class="text-[18px] font-[600] leading-[26px]">전화번호</div>
                    <clinic-input
                        :is-number="true"
                        place-holder="'-'를 제외한 숫자만 입력해주세요."
                        :value="estimateData.phoneNumber"
                        :change-handler="handleChangeEstimatePhoneNumber"
                        :length="25"
                        class="max-w-[288px] max-h-[60px] w-[73%]"
                    ></clinic-input>
                </div>
            </div>
            <div
                class="btn-area w-full min-h-[45px] h-[45px] flex justify-between gap-x-[15px] px-[5%] mt-[130px]"
            >
                <div
                    class="flex-center h-full w-full rounded-[80px] border-[--color-border-blue] border-[1.5px] px-[10px]"
                    @click="handlePrev"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-text-black]"
                        >이전으로</span
                    >
                </div>
                <div
                    class="flex-center h-full w-full rounded-[80px] bg-[--color-main-blue] px-[10px]"
                    @click="handleNext"
                >
                    <span class="text-[18px] font-[600] leading-[23.5px] text-[--color-white]"
                        >견적 요청하기</span
                    >
                </div>
            </div>
        </div>
        <!-- 9 -->
        <div
            v-else-if="popupPage === 9"
            class="flex flex-col justify-center pt-[15px] pb-[35px] px-[20px]"
        >
            <div class="flex justify-end mb-[4px]">
                <img
                    @click="handleClickClose"
                    class="w-[36px] h-[36px]"
                    src="/assets/images/icons/x-btn.svg"
                />
            </div>
            <div class="text-[28px] font-[700] mb-[5px] leading-[36px]">
                견적 요청이 완료되었어요.
            </div>
            <div class="text-[16px] font-[400] mb-[30px] leading-[19px]">
                최대한 빠르게 확인하여 연락드리겠습니다.<br />알맞은 서비스를 제공할 수 있도록
                최선을 다하겠습니다.
            </div>
            <div
                class="flex-center w-[190px] h-[45px] border-[--color-border-blue] border-[1.5px] rounded-[80px]"
                @click="handleClickClose"
            >
                <span class="text-[18px] font-[600]">확인</span>
            </div>
        </div>
        <!-- 10 -->
        <div
            v-else-if="popupPage === 10"
            class="flex flex-col justify-center pt-[15px] pb-[35px] px-[20px]"
        >
            <div class="flex justify-end mb-[4px]">
                <img
                    @click="handleClickClose"
                    class="w-[36px] h-[36px]"
                    src="/assets/images/icons/x-btn.svg"
                />
            </div>
            <div class="text-[28px] font-[700] mb-[5px] leading-[36px]">결제가 완료되었어요.</div>
            <div class="text-[16px] font-[400] mb-[30px] leading-[19px]">
                최대한 빠르게 확인하여 연락드리겠습니다.<br />알맞은 서비스를 제공할 수 있도록
                최선을 다하겠습니다.
            </div>
            <div
                class="flex-center w-[190px] h-[45px] border-[--color-border-blue] border-[1.5px] rounded-[80px]"
                @click="handleClickClose"
            >
                <span class="text-[18px] font-[600]">확인</span>
            </div>
        </div>
        <!-- 11 -->
        <div
            v-else-if="popupPage === 11"
            class="flex flex-col justify-center pt-[15px] pb-[35px] px-[20px]"
        >
            <div class="flex justify-end mb-[4px]">
                <img
                    @click="handleClickClose"
                    class="w-[36px] h-[36px]"
                    src="/assets/images/icons/x-btn.svg"
                />
            </div>
            <div class="text-[28px] font-[700] mb-[5px] leading-[36px]">결제가 실패하였어요.</div>
            <div class="text-[16px] font-[400] mb-[30px] leading-[19px]">
                전화상담을 통해 자세히 도와드리겠습니다.<br />알맞은 서비스를 제공할 수 있도록
                최선을 다하겠습니다.
            </div>
            <div
                class="flex-center w-[190px] h-[45px] border-[--color-border-blue] border-[1.5px] rounded-[80px]"
                @click="handleClickClose"
            >
                <span class="text-[18px] font-[600]">확인</span>
            </div>
        </div>
    </div>
</template>
