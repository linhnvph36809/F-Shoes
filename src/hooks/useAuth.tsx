import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import useCookiesConfig from './useCookiesConfig';
import { COOKIE_USER } from '../constants';
import { useContextGlobal } from '../contexts';

const API_CHECK_EMAIL = '/api/check/email';

const useAuth = () => {
    const [page, setPage] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSetCookie, removeCookie } = useCookiesConfig(COOKIE_USER);
    const { setUser: resetUser } = useContextGlobal();

    const navigate = useNavigate();

    const postCheckEmail = async (email: string) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_CHECK_EMAIL, email);
            if (data?.exists) {
                setPage('login');
                return;
            }
            localStorage.setItem('code', data.code);
            setPage('register');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setUser(email);
        }
    };

    const login = async (user: { email: string; password: string }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', `/api/login`, user);
            if (data?.access_token && data?.refresh_token) {
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                handleSetCookie('userName', data.user.name, new Date(Date.now() + 20 * 60 * 1000));
                handleSetCookie('userId', data.user.id, new Date(Date.now() + 20 * 60 * 1000));
            }
            navigate('/');
            return data;
        } catch (error) {
            alert('account or password is incorrect');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (user?: { email: string; password: string }) => {
        try {
            setLoading(true);
            // const { data } = await tokenManagerInstance('post', `/api/logout`, user);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            removeCookie('userName');
            removeCookie('userId');
            navigate('/');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loginAdmin = async (user: { email: string; password: string }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', `/api/login`, user);
            if (data?.access_token && data?.refresh_token) {
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                handleSetCookie('adminName', data.user.name, new Date(Date.now() + 20 * 60 * 1000));
                handleSetCookie('adminId', data.user.id, new Date(Date.now() + 20 * 60 * 1000));
            }
            navigate('/admin');
            return data;
        } catch (error) {
            alert('account or password is incorrect');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const register = async (user: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', `/api/register`, user);
            if (data?.access_token && data?.refresh_token) {
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                handleSetCookie('userName', data.user.name, new Date(Date.now() + 20 * 60 * 1000));
                handleSetCookie('userId', data.user.id, new Date(Date.now() + 20 * 60 * 1000));
                navigate('/');
            }
            return data;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        page,
        loading,
        postCheckEmail,
        login,
        loginAdmin,
        register,
        logout,
    };
};

export default useAuth;
