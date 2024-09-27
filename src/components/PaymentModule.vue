<script lang="ts">
import { computed, defineComponent, type PropType, ref } from 'vue';
import { getApiInstance } from '@/utils/api';
import {
    type ApiResponse,
    type CommonCodeType,
    type IAmPortPaymentRequest,
    type IAmPortPaymentResponse,
    type IAmPortPgBaseRequest,
    type PaymentData,
    type PaymentPrepareRequest,
    PopupType,
    type ProductResponse
} from '@/utils/types';
import { useStore } from '@/stores/store';

export default defineComponent({
    name: 'PaymentModule',
    props: {
        serviceList: Object as PropType<CommonCodeType[]>,
        paymentData: Object as PropType<PaymentData>,
        productData: Object as PropType<ProductResponse>,
        successHandler: {
            type: Function as PropType<() => void>,
            required: true
        },
        failHandler: {
            type: Function as PropType<() => void>,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const compPaymentData = computed(() => props.paymentData);
        const compProductData = computed(() => props.productData);
        const compServiceList = computed(() => props.serviceList);

        const paymentBaseRequest: IAmPortPaymentRequest = {
            pg: '',
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
            pg: 'kakaopay.TC0ONETIME',
            m_redirect_url: 'https://www.forori.com/payment/result'
        };

        const tossPaymentBaseRequest: IAmPortPgBaseRequest = {
            pg: 'tosspay.tosstest',
            pay_method: 'card',
            m_redirect_url: 'https://www.forori.com/payment/result'
        };

        const kgPaymentBaseRequest: IAmPortPgBaseRequest = {
            pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            m_redirect_url: 'https://www.forori.com/payment/result'
        };

        const doPaymentPrepare = async () => {
            try {
                const prepareRequest = {
                    productId: compProductData.value?.id,
                    serviceId: compPaymentData.value?.serviceId,
                    structureId: compPaymentData.value?.structureId,
                    buildingId: compPaymentData.value?.buildingId,
                    username: compPaymentData.value?.username,
                    phoneNumber: compPaymentData.value?.phoneNumber,
                    address: compPaymentData.value?.address,
                    footage: compPaymentData.value?.footage,
                    toiletCount: compPaymentData.value?.toiletCount,
                    verandaCount: compPaymentData.value?.verandaCount,
                    expansion: compPaymentData.value?.expansion,
                    depositAmount: compProductData.value?.depositAmount,
                    balanceAmount: compProductData.value?.balanceAmount,
                    isAgreePolicy: 'Y',
                    targetDate: compPaymentData.value?.targetDate,
                    targetTime: compPaymentData.value?.targetTime,
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

        const closePopup = () => {
            store.setOpenPopup(null);
        };

        const doPayment = async (pgBaseRequest: IAmPortPgBaseRequest) => {
            console.log(compProductData.value);
            console.log(compPaymentData.value);
            try {
                if (compPaymentData.value && compProductData.value) {
                    const prepareResponse = await doPaymentPrepare();
                    if (prepareResponse) {
                        console.log('resp', prepareResponse);
                        const iAmPortClient = window.IMP;
                        iAmPortClient.init('imp15738717');
                        const paymentRequest = Object.assign({}, paymentBaseRequest, pgBaseRequest);
                        paymentRequest.name = `더티클리닉-${compServiceList.value?.find(
                            (v) => v.id === compPaymentData.value?.serviceId
                        )?.name}-${compPaymentData.value?.footage}평`;
                        paymentRequest.buyer_name = compPaymentData.value?.username;
                        paymentRequest.buyer_addr = compPaymentData.value?.address;
                        paymentRequest.merchant_uid = prepareResponse.data.data.merchantUid;
                        paymentRequest.amount = prepareResponse.data.data.amount;
                        paymentRequest.buyer_tel = compPaymentData.value.phoneNumber as string;
                        paymentRequest.custom_data = Object.assign(
                            {},
                            compPaymentData.value,
                            compProductData.value
                        );
                        paymentRequest.m_redirect_url += `?id=${prepareResponse.data.data.merchantUid}`;
                        if (pgBaseRequest.pg === 'html5_inicis.INIpayTest') {
                            paymentRequest.bypass = {
                                acceptmethod: 'noeasypay', // 간편결제 버튼을 통합결제창에서 제외(PC)
                                P_RESERVED: 'noeasypay=Y', // 간편결제 버튼을 통합결제창에서 제외(모바일),
                            };
                            paymentRequest.display = {
                                card_quota: [] // 할부개월 6개월만 활성화
                            };
                        }

                        console.warn(paymentRequest);

                        iAmPortClient.request_pay(
                            paymentRequest,
                            async (rsp: IAmPortPaymentResponse) => {
                                // callback
                                console.log(rsp);
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
                                    console.log(response);
                                    if (response.data.code == 0) {
                                        props.successHandler();
                                    } else {
                                        props.failHandler();
                                    }
                                } catch (e) {
                                    props.failHandler();
                                }
                            }
                        );
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        return {
            doPayment,
            kakaoPaymentBaseRequest,
            tossPaymentBaseRequest,
            kgPaymentBaseRequest
        };
    }
});
</script>

<template>
    <div class="flex flex-col gap-y-[15px] w-[285px]">
        <div
            class="flex justify-between items-center px-[10px] py-[10px] border-[1px]"
            @click="() => doPayment(kakaoPaymentBaseRequest)"
        >
            <img
                class="w-[60px]"
                src="/assets/images/payment/payment_kakao@1x.webp"
                alt="카카오 결제"
            />
            <span>카카오페이</span>
        </div>
        <div
            class="flex justify-between items-center px-[10px] py-[10px] border-[1px]"
            @click="() => doPayment(tossPaymentBaseRequest)"
        >
            <img
                class="w-[60px]"
                src="/assets/images/payment/payment_toss@1x.webp"
                alt="토스 결제"
            /><span>토스페이먼츠</span>
        </div>
        <div
            class="flex justify-center items-center px-[10px] py-[10px] border-[1px]"
            @click="() => doPayment(kgPaymentBaseRequest)"
        >
            <span>신용카드</span>
        </div>
    </div>
</template>

<style scoped></style>
