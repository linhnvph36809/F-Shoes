import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import useCookiesConfig from './useCookiesConfig';
import { COOKIE_USER, TOKENS } from '../constants';
import { useContextGlobal } from '../contexts';
import { useContextClient } from '../components/Layouts/LayoutClient';
import { showMessageClient } from '../utils/messages';
import { handleRemoveLocalStorage, handleSetLocalStorage } from '../utils';

const API_CHECK_EMAIL = '/api/check/email';

const useAuth = () => {
    const [page, setPage] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSetCookie } = useCookiesConfig(COOKIE_USER);
    const { setUser: setUserGlobal } = useContextGlobal();
    const { setUserName } = useContextClient();

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
            showMessageClient('Something went wrong!', '', 'error');
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
                handleSetLocalStorage(TOKENS.ACCESS_TOKEN, data.access_token);
                handleSetLocalStorage(TOKENS.REFRESH_TOKEN, data.refresh_token);
                handleSetLocalStorage('userName', data.user.name);
                handleSetLocalStorage('userId', data.user.id);
            }
            setUserGlobal(data.user);
            navigate('/');
            showMessageClient('Login Successfuly', '', 'success');
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                showMessageClient((error as any).response.data.message, '', 'error');
            } else {
                showMessageClient('Something went wrong!', '', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async (user?: { email: string; password: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/logout`, user);
            handleRemoveLocalStorage(TOKENS.ACCESS_TOKEN);
            handleRemoveLocalStorage(TOKENS.REFRESH_TOKEN);
            handleRemoveLocalStorage('userName');
            handleRemoveLocalStorage('userId');
            navigate('/');
            setUserGlobal({});
            setUserName('');
            showMessageClient('Logout Successfuly', '', 'success');
        } catch (error) {
            console.log(error);
            showMessageClient('Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loginAdmin = async (user: { email: string; password: string }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', `/api/login`, user);
            if (data?.access_token && data?.refresh_token) {
                handleSetLocalStorage(TOKENS.ACCESS_TOKEN, data.access_token);
                handleSetLocalStorage(TOKENS.REFRESH_TOKEN, data.refresh_token);
                handleSetCookie('adminName', data.user.name, new Date(Date.now() + 24 * 60 * 60 * 1000));
                handleSetCookie('adminId', data.user.id, new Date(Date.now() + 24 * 60 * 60 * 1000));
            }
            navigate('/admin');
            return data;
        } catch (error) {
            showMessageClient('Something went wrong!', '', 'error');
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
                handleSetLocalStorage(TOKENS.ACCESS_TOKEN, data.access_token);
                handleSetLocalStorage(TOKENS.REFRESH_TOKEN, data.refresh_token);
                handleSetLocalStorage('userName', data.user.name);
                handleSetLocalStorage('userId', data.user.id);
                setUserGlobal(data.user);
                navigate('/');
                showMessageClient('Register Successfuly', '', 'success');
            }
            return data;
        } catch (error) {
            console.log(error);
            showMessageClient('Something went wrong!', '', 'error');
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
