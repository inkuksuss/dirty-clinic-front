import Big from 'big.js';

export type User = {
    id: string;
    name: string;
};

export enum PopupType {
    PAYMENT = 'PAYMENT'
}

export type ApiResponse<T> = {
    code: number;
    message: string;
    data: T;
};

export type IAmPortPaymentRequest = {
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
    bypass?: object;
    notice_url?: string;
};

export type IAmPortPgBaseRequest = {
    pg: string;
    pay_method?: string;
    buyer_tel?: string;
};

export type IAmPortPaymentResponse = {
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
};

export type PaymentPrepareRequest = {
    productId: number;
    productName: string;
    phoneNumber: string;
    address: string;
    footage: number;
    description: string;
    depositAmount: string;
    balanceAmount: string;
    isAgreePolicy: 'N' | 'Y';
};

export type PaymentResultRequest = {
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
};

export type SubIntroScript = {
    title: string;
};

export type SelectType = {
    name: string;
    value: string;
};

export enum ProductType {
    NO_SELECT = 'NO_SELECT',
    APART = 'APART',
    VILLA = 'VILLA',
    COMMERCIAL_COMPLEX = 'COMMERCIAL_COMPLEX',
    HOUSE = 'HOUSE'
}

export enum RoomType {
    NO_SELECT = 'NO_SELECT',
    APART = 'APART',
    VILLA = 'VILLA',
    COMMERCIAL_COMPLEX = 'COMMERCIAL_COMPLEX',
    HOUSE = 'HOUSE'
}

export enum ClinicType {
    NO_SELECT = 'NO_SELECT',
    ONE_ROOM_CLINIC = 'ONE_ROOM_CLINIC',
    MOVE_IN_OR_MOVING_CLINIC = 'MOVE_IN_OR_MOVING_CLINIC',
    RESIDENTIAL_CLINIC = 'RESIDENTIAL_CLINIC',
    BUSINESS_CLINIC = 'BUSINESS_CLINIC',
    SPECIAL_CLINIC = 'SPECIAL_CLINIC'
}

export type ProductResponse = {
    id: number;
    name: string;
    description: string;
    balanceAmount: string;
    depositAmount: string;
    serviceType: string;
    created: Date;
    updated: Date;
};

export type PaymentData = {
    roomType: RoomType;
    clinicType: ClinicType;
    footage: number | null;
    toiletCnt: number | null;
    expansion: 'N' | 'Y' | null;
    verandaCnt: number | null;
    username: string | null;
    phoneNumber: string | null;
    targetDate: string | null;
    targetTime: string | null;
};
