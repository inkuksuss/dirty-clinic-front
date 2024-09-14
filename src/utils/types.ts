export enum ViewSize {
    DESKTOP = 1200,
    MOBILE = 767,
    SMALL_MOBILE = 374
}

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
    custom_data: object;
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
    serviceId: number;
    structureId: number;
    buildingId: number;
    username: string;
    phoneNumber: string;
    address: string;
    footage: number;
    toiletCount: number;
    verandaCount: number;
    expansion: 'N' | 'Y';
    depositAmount: string;
    balanceAmount: string;
    isAgreePolicy: 'N' | 'Y';
    memberMemo: string;
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

export type SubManageType = {
    title: string;
    content: Array<{
        main: string;
        sub?: string;
        ext?: string;
        imgSrc1?: string;
        imgSrc1Desc?: string;
        imgSrc2?: string;
        imgSrc2Desc?: string;
    }>;
    hasImg?: boolean;
    icon: string;
};

export enum SubPageType {
    ONE_ROOM = 'ONE_ROOM',
    SPOT = 'SPOT',
    WINDOW = 'WINDOW',
    REGULAR = 'REGULAR',
    MOVE_IN = 'MOVE_IN',
    MOVING = 'MOVING',
    INTERIOR = 'INTERIOR',
    RESIDENTIAL = 'RESIDENTIAL',
    OFFICE = 'OFFICE',
    STORE = 'STORE',
    FIRE = 'FIRE',
    TRASH = 'TRASH',
    KEEPSAKE = 'KEEPSAKE',
    WASTE = 'WASTE',
    COMPLETION = 'COMPLETION',
    PARKING = 'PARKING',
    WALL = 'WALL',
    FACTORY = 'FACTORY',
    SCHOOL = 'SCHOOL',
    JOINT = 'JOINT',
    MOLD = 'MOLD',
    RESTAURANT = 'RESTAURANT',
    WAX = 'WAX',
    COATING = 'COATING',
    GRINDING = 'GRINDING',
    APPLIANCES = 'APPLIANCES'
}

export type SubIntroType = {
    src: string;
    title: string;
};

export type SubPriceType = {
    mainTitle?: string;
    mainSubTitle?: string;
    title?: string;
    subTitle?: string;
    titleDesc?: string;
    src: string;
    ext?: string;
    ext2?: string;
    line?: boolean;
};

export type SubPromotionType = {
    src: string;
    link?: string;
};

export type SubServiceType = {
    src: string;
    title: string;
    desc: string;
    ext?: string;
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
    balanceAmount: string;
    depositAmount: string;
};

export type PaymentData = {
    serviceId: number | null;
    buildingId: number | null;
    structureId: number | null;
    footage: number | null;
    toiletCount: number | null;
    expansion: 'N' | 'Y' | null;
    verandaCount: number | null;
    username: string | null;
    phoneNumber: string | null;
    targetDate: string | null;
    targetTime: string | null;
    address: string | null;
};

export type HeaderCategoryType = {
    id: number;
    title: string;
    isSelect: boolean;
    mobileIsSelect: boolean;
    isReady: boolean;
    posStartX: number;
    posCenterX: number;
    posEndX: number;
    subList: Array<SubHeaderType>;
};

export type SubHeaderType = {
    title: string;
    dest: string;
};

export type CommonCodeType = {
    id: number;
    name: string;
    CommonCodeType: string;
    SubCommonCodeType: string;
};

export type EstimateType = {
    serviceId: string;
    targetDate: Date;
    targetTime: string;
    username: string;
    phoneNumber: string;
};
