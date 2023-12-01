export interface User {
    id: string;
    name: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface IAmPortPaymentRequest {
    pg: string;
    pay_method: string | null;
    merchant_uid: string;
    name: string;
    amount: number;
    buyer_email: string | null;
    buyer_name: string | null;
    buyer_tel: string | null;
    buyer_addr: string | null;
    buyer_postcode: string | null;
}

export interface IAmPortPgBaseRequest {
    pg: string;
    pay_method?: string;
}

export interface IAmPortPaymentResponse {
    apply_num: string | null;
    bank_name: string | null;
    buyer_addr: string | null;
    buyer_email: string | null;
    buyer_name: string | null;
    buyer_postcode: string | null;
    buyer_tel: string | null;
    card_name: string | null;
    card_number: string | null;
    card_quota: number;
    currency: string | null;
    custom_data: string | null;
    imp_uid: string;
    merchant_uid: string;
    name: string;
    paid_amount: number;
    paid_at: number;
    pay_method: string;
    pg_provider: string;
    pg_tid: string | null;
    pg_type: string | null;
    receipt_url: string;
    status: string;
    success: boolean;
    error_msg?: string;
}

export interface PaymentPrepareRequest {
    productId: number;
    phoneNumber: string;
    address: string;
    footage: number;
    description: string;
    amount: number;
    isAgreePolicy: boolean;
}

export interface PaymentResultRequest {
    applyNum: string | null;
    bankName: string | null;
    buyerAddr: string | null;
    buyerEmail: string | null;
    buyerName: string | null;
    buyerPostcode: string | null;
    buyerTel: string | null;
    cardName: string | null;
    cardNumber: string | null;
    cardQuota: number;
    currency: string | null;
    customData: string | null;
    impUid: string;
    merchantUid: string;
    name: string;
    paidAmount: number;
    paidAt: number;
    payMethod: string;
    pgProvider: string;
    pgTid: string | null;
    pgType: string | null;
    receiptUrl: string;
    status: string;
    success: boolean;
    errorMsg?: string;
}
