import TokenManager from 'brainless-token-manager';
import axios from 'axios';

import { handleGetLocalStorage, handleRemoveLocalStorage, handleSetLocalStorage } from '../utils';
import { INFO_AUTH, TOKENS } from '../constants';

const tokenManager = new TokenManager({
    getAccessToken: async () => {
        const token = handleGetLocalStorage(TOKENS.ACCESS_TOKEN);
        return token ? token : '';
    },
    getRefreshToken: async () => {
        const refreshToken = handleGetLocalStorage(TOKENS.REFRESH_TOKEN);
        return refreshToken ? refreshToken : '';
    },
    onInvalidRefreshToken: () => {
        handleRemoveLocalStorage(TOKENS.ACCESS_TOKEN);
        handleRemoveLocalStorage(TOKENS.REFRESH_TOKEN);
        handleRemoveLocalStorage(INFO_AUTH.userName);
        window.location.href = '/'

    },

    executeRefreshToken: async () => {
        const refreshToken = handleGetLocalStorage(TOKENS.REFRESH_TOKEN);

        if (!refreshToken) {
            return {
                token: '',
                refresh_token: '',
            };
        }

        const response = await axiosInstant.post('/api/auth/refresh/token', {
            refresh_token: refreshToken,
        });
        const { access_token: accessTokenNew, refresh_token: refreshTokenNew } = response.data;

        return {
            token: accessTokenNew,
            refresh_token: refreshTokenNew,
        };
    },
    onRefreshTokenSuccess: ({ token, refresh_token }) => {
        if (token && refresh_token) {
            handleSetLocalStorage(TOKENS.ACCESS_TOKEN, token);
            handleSetLocalStorage(TOKENS.REFRESH_TOKEN, refresh_token);
        }
    },
});

export const VITE_APP_API = 'http://localhost:8000/';

export const axiosInstant = axios.create({
    baseURL: VITE_APP_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const tokenManagerInstance = async (
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    suffixUrl: string,
    data: any = null,
    configs: any = {},
) => {
    try {
        const token = configs?.token || (await tokenManager.getToken());
        const updatedConfig = {
            ...configs,
            headers: {
                ...configs.headers,
                Authorization: `Bearer ${token}`,
            },
        };

        if (['post', 'put', 'patch'].includes(method)) {
            return await axiosInstant[method](suffixUrl, data, updatedConfig);
        } else {
            return await axiosInstant[method](suffixUrl, updatedConfig);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw {
                message: error.message,
                response: error.response,
                status: error.response.status,
            };
        }
        throw error;
    }
};
