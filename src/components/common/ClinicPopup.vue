<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/stores/store';
import { PopupType } from '@/utils/types';
import PaymentPopup from '@/components/popup/PaymentPopup.vue';
import TermsOfUsePopup from '@/components/popup/TermsOfUsePopup.vue';
import PrivatePolicyPopup from '@/components/popup/PrivatePolicyPopup.vue';

export default defineComponent({
    name: 'ClinicPopup',
    components: { PrivatePolicyPopup, TermsOfUsePopup, PaymentPopup },
    setup() {
        const store = useStore();
        const compPopupType = computed(() => store.openPopup);

        const handleClickClose = () => {
            store.setOpenPopup(null);
        };

        return {
            compPopupType,
            PopupType,
            handleClickClose
        };
    }
});
</script>

<template>
    <div
        class="popup-wrapper w-screen h-screen fixed top-0 left-0 z-40 flex-center overflow-y-scroll"
    >
        <div class="popup-bg flex-center bg-black opacity-80 w-full h-full"></div>
        <payment-popup v-if="compPopupType === PopupType.PAYMENT"></payment-popup>
        <terms-of-use-popup v-if="compPopupType === PopupType.TERMS_OF_USE"></terms-of-use-popup>
        <private-policy-popup
            v-else-if="compPopupType === PopupType.PRIVACY_POLICY"
        ></private-policy-popup>
    </div>
</template>
