<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getApiInstance } from '@/utils/api';
import {
    type ApiResponse,
    type IAmPortPaymentRequest,
    type IAmPortPaymentResponse,
    type IAmPortPgBaseRequest,
    type PaymentPrepareRequest,
    type PaymentResultRequest
} from '@/utils/types';

export default defineComponent({
    name: 'PaymentModule',
    setup() {
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
            bypass: {},
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

        //sample
        const productId = ref<number>(1);
        const phoneNumber = ref<string>('01026727162');
        const address = ref<string>('부천시 상동');
        const footage = ref<number>(29);
        const description = ref<string>('잘해주세요');

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
            return await getApiInstance().post('/payment/prepare', data);
        };

        const doPayment = async (pgBaseRequest: IAmPortPgBaseRequest) => {
            const iAmPortClient = window.IMP;
            iAmPortClient.init('imp15738717');
            const paymentRequest = Object.assign({}, paymentBaseRequest, pgBaseRequest);
            paymentRequest.name = '입주청소';
            const prepareRequest = {
                productId: productId.value,
                productName: paymentRequest.name,
                phoneNumber: phoneNumber.value,
                address: address.value,
                footage: footage.value,
                description: description.value,
                amount: paymentRequest.amount,
                isAgreePolicy: true
            } as PaymentPrepareRequest;

            if (pgBaseRequest.pg === 'html5_inicis.INIpayTest') {
                paymentRequest['bypass'] = {
                    acceptmethod: 'noeasypay' // 간편결제 버튼을 통합결제창에서 제외(PC)
                };
            }

            console.log(prepareRequest);

            try {
                const prepareResponse = await doPaymentPrepare(prepareRequest);
                console.log(prepareResponse);
                paymentRequest.merchant_uid = prepareResponse.data.data;
                paymentRequest.buyer_tel = "01026727162";
                console.log(paymentRequest);

                iAmPortClient.request_pay(paymentRequest, async (rsp: IAmPortPaymentResponse) => {
                    // callback
                    console.log(rsp);
                    const response = (await getApiInstance().post(
                        '/orders/result',
                        toRequest(rsp)
                    )) as ApiResponse<any>;
                    console.log(response);
                    if (response.data.code == 0) {
                        console.log('success');
                    } else {
                        console.log('fail');
                    }
                });
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
    <div>결제모듈</div>
    <button @click="() => doPayment(kakaoPaymentBaseRequest)">카카오 결제하기</button>
    <button @click="() => doPayment(tossPaymentBaseRequest)">토스 결제하기</button>
    <button @click="() => doPayment(kgPaymentBaseRequest)">kg 결제하기</button>
</template>

<style scoped></style>
