// 요청 인터셉터 추가하기
import axios from 'axios';
import { CONSTANTS } from '../../constants';

const axiosInstance = axios.create({
    // baseURL: CONSTANTS.API_URL,
    baseURL: CONSTANTS.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const getApiInstance = () => {
    return axiosInstance;
};

export const setApiAccessToken = (token: string) => {
    // axiosInstance.defaults.headers.common['X-AUTH-TOKEN'] = token;
};
