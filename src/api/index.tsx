import TokenManager from 'brainless-token-manager';
import axios from 'axios';

const tokenManager = new TokenManager({
    getAccessToken: async () => {
        const token = localStorage.getItem('accessToken');
        return token ? token : '';
    },
    getRefreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken1');
        return refreshToken ? refreshToken : '';
    },
    onInvalidRefreshToken: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    executeRefreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken1');

        if (!refreshToken) {
            return {
                token: '',
                refresh_token: '',
            };
        }

        const response = await axiosInstant.post('/api/auth/refresh/token', {
            refreshToken,
        });
        const { accessToken: accessTokenNew, refreshToken: refreshTokenNew } = response.data;

        return {
            token: accessTokenNew,
            refresh_token: refreshTokenNew,
        };
    },
    onRefreshTokenSuccess: ({ token, refresh_token }) => {
        if (token && refresh_token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refresh_token);
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
