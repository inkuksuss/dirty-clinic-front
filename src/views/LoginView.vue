<script lang="ts">
import { defineComponent, ref } from 'vue';
import ClinicInput from '@/components/common/ClinicInput.vue';
import { getApiInstance } from '@/utils/api';

export default defineComponent({
    name: 'LoginView',
    components: { ClinicInput },
    setup() {
        const username = ref<string | undefined>();
        const password = ref<string | undefined>();
        const apiClient = getApiInstance();

        const handleClickLoginButton = () => {
            if (username.value && password.value) {
                apiClient
                    .post('/admin/member/login-process', {
                        username: username.value,
                        password: password.value
                    })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }
        };

        const handleClickJoinButton = () => {
            if (username.value && password.value) {
                apiClient
                    .post('/admin/member/join', {
                        username: username.value,
                        password: password.value
                    })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }
        };

        const handleClickSessionButton = () => {
            if (username.value && password.value) {
                apiClient
                    .post('/admin/member/test', {})
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }
        };

        const handleClickLogoutButton = () => {
            apiClient
                .get('/admin/member/logout')
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        };

        const handleUsernameChange = (v: string | undefined) => {
            username.value = v;
        };

        const handlePasswordChange = (v: string | undefined) => {
            password.value = v;
        };

        return {
            username,
            password,
            handleClickLoginButton,
            handleClickJoinButton,
            handleClickSessionButton,
            handleClickLogoutButton,
            handleUsernameChange,
            handlePasswordChange
        };
    }
});
</script>

<template>
    <div class="login-wrapper">
        <ClinicInput
            placeholder="username"
            :value="username"
            :change-handler="handleUsernameChange"
        />
        <ClinicInput
            placeholder="password"
            :value="password"
            :change-handler="handlePasswordChange"
        />

        <button @click="handleClickLoginButton">로그인</button>
        <button @click="handleClickJoinButton">회원가입</button>
        <button @click="handleClickSessionButton">세션</button>
        <button @click="handleClickLogoutButton">로그아웃</button>
    </div>
</template>

<style scoped></style>
