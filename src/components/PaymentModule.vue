<script lang="ts">
import { computed, defineComponent, type PropType, ref } from 'vue';
import { getApiInstance } from '@/utils/api';
import {
    type ApiResponse,
    type IAmPortPaymentRequest,
    type IAmPortPaymentResponse,
    type IAmPortPgBaseRequest,
    type PaymentData,
    type PaymentPrepareRequest,
    type PaymentResultRequest,
    type ProductResponse
} from '@/utils/types';

export default defineComponent({
    name: 'PaymentModule',
    props: {
        paymentData: Object as PropType<PaymentData>,
        productData: Object as PropType<ProductResponse>
    },
    setup(props) {
        const paymentData = ref<PaymentData | undefined>(props.paymentData);
        const productData = ref<ProductResponse | undefined>(props.productData);

        const paymentBaseRequest: IAmPortPaymentRequest = {
            pg: '',
            pay_method: '',
            merchant_uid: '',
            name: '',
            amount: 5,
            buyer_email: '',
            buyer_name: '',
            buyer_tel: '',
            buyer_addr: '',
            buyer_postcode: '',
            bypass: {}
        };

        const kakaoPaymentBaseRequest: IAmPortPgBaseRequest = {
            pg: 'kakaopay.TC0ONETIME'
        };

        const tossPaymentBaseRequest: IAmPortPgBaseRequest = {
            pg: 'tosspay.tosstest',
            pay_method: 'card'
        };

        const kgPaymentBaseRequest: IAmPortPgBaseRequest = {
            pg: 'html5_inicis.INIpayTest',
            // pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            buyer_tel: '01026727162'
        };

        const toRequest = (rsp: IAmPortPaymentResponse): PaymentResultRequest => {
            return {
                applyNum: rsp.apply_num,
                bankName: rsp.bank_name,
                buyerAddr: rsp.buyer_addr,
                buyerEmail: rsp.buyer_email,
                buyerName: rsp.buyer_name,
                buyerPostcode: rsp.buyer_postcode,
                buyerTel: rsp.buyer_tel,
                cardName: rsp.card_name,
                cardNumber: rsp.card_number,
                cardQuota: rsp.card_quota,
                currency: rsp.currency,
                customData: rsp.custom_data,
                impUid: rsp.imp_uid,
                merchantUid: rsp.merchant_uid,
                name: rsp.name,
                paidAmount: rsp.paid_amount,
                paidAt: rsp.paid_at,
                payMethod: rsp.pay_method,
                pgProvider: rsp.pg_provider,
                pgTid: rsp.pg_tid,
                pgType: rsp.pg_type,
                receiptUrl: rsp.receipt_url,
                status: rsp.status,
                success: rsp.success,
                errorMsg: rsp.error_msg
            };
        };

        const doPaymentPrepare = async (data: PaymentPrepareRequest) => {
            const res = await getApiInstance().post('/payment/prepare', data);
            if (res.data.code === 0) {
                return res;
            } else {
                window.alert(res.data.message);
            }
        };

        const doPayment = async (pgBaseRequest: IAmPortPgBaseRequest) => {
            console.log(paymentData.value);
            console.log(productData.value);

            if (productData.value && paymentData.value) {
                const iAmPortClient = window.IMP;
                iAmPortClient.init('imp15738717');
                const paymentRequest = Object.assign({}, paymentBaseRequest, pgBaseRequest);
                paymentRequest.name = productData.value.name;
                console.log('targetData', paymentData.value.targetDate);
                console.log('target', paymentData.value.targetTime);
                const prepareRequest = {
                    productId: productData.value.id,
                    productName: productData.value.name,
                    phoneNumber: paymentData.value.phoneNumber,
                    address: '주소',
                    footage: paymentData.value.footage,
                    description: '잘해주세요',
                    depositAmount: productData.value.depositAmount,
                    balanceAmount: productData.value.balanceAmount,
                    isAgreePolicy: 'Y',
                    targetDate: paymentData.value.targetDate,
                    targetTime: paymentData.value.targetTime
                } as PaymentPrepareRequest;

                if (pgBaseRequest.pg === 'html5_inicis.INIpayTest') {
                    paymentRequest['bypass'] = {
                        acceptmethod: 'noeasypay' // 간편결제 버튼을 통합결제창에서 제외(PC)
                    };
                }

                console.log(prepareRequest);

                try {
                    const prepareResponse = await doPaymentPrepare(prepareRequest);
                    if (prepareResponse) {
                        console.log('resp', prepareResponse);
                        paymentRequest.merchant_uid = prepareResponse.data.data.merchantUid;
                        paymentRequest.amount = prepareResponse.data.data.amount;
                        paymentRequest.buyer_tel = paymentData.value.phoneNumber as string;
                        console.log(paymentRequest);

                        iAmPortClient.request_pay(
                            paymentRequest,
                            async (rsp: IAmPortPaymentResponse) => {
                                // callback
                                console.log(rsp);
                                const response = (await getApiInstance().post(
                                    '/reservation/result',
                                    toRequest(rsp)
                                )) as ApiResponse<any>;
                                console.log(response);
                                if (response.data.code == 0) {
                                    window.alert("success");
                                    console.log('success', response);
                                } else {
                                    console.log('fail');
                                }
                            }
                        );
                    }
                } catch (err) {
                    console.error(err);
                }
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
            <img class="w-[60px]" src="@/assets/images/payment/payment_kakao@1x.png" />
            <span>카카오페이</span>
        </div>
        <div
            class="flex justify-between items-center px-[10px] py-[10px] border-[1px]"
            @click="() => doPayment(tossPaymentBaseRequest)"
        >
            <img class="w-[60px]" src="@/assets/images/payment/payment_toss@1x.png" /><span
                >토스페이먼츠</span
            >
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
