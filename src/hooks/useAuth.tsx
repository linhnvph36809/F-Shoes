import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { tokenManagerInstance } from '../api';
import { INFO_AUTH, TOKENS } from '../constants';
import { useContextGlobal } from '../contexts';
import { useContextClient } from '../components/Layouts/LayoutClient';
import { showMessageClient } from '../utils/messages';
import { handleRemoveLocalStorage, handleSetLocalStorage } from '../utils';
const API_CHECK_EMAIL = '/api/check/email';

const removeAllLocal = () => {
    handleRemoveLocalStorage(INFO_AUTH.userName);
    handleRemoveLocalStorage(INFO_AUTH.userId);
    handleRemoveLocalStorage(INFO_AUTH.isAdmin);
    handleRemoveLocalStorage(INFO_AUTH.adminName);
    handleRemoveLocalStorage(INFO_AUTH.adminId);
    handleRemoveLocalStorage(TOKENS.ACCESS_TOKEN);
    handleRemoveLocalStorage(TOKENS.REFRESH_TOKEN);
};
const useAuth = () => {
    const [page, setPage] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [timeSendEmail, setTimeSendEmail] = useState<number>(0);
    const { setUser: setUserGlobal, refetchQuantityCart, locale } = useContextGlobal();
    const { setUserName } = useContextClient();
    const queryClient = useQueryClient();

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
            showMessageClient('Verify code has been sent to your email.', '', 'success');
            setPage('register');
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
            setUser(email);
        }
    };

    const postForgotPassword = async (email: string) => {
        try {
            await tokenManagerInstance('post', '/api/forgot/password', email);
            setTimeSendEmail(60);
        } catch (error) {
            setTimeSendEmail(0);
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
            throw new Error((error as any)?.response?.data?.message);
        } finally {
            setUser(email);
            setPage('forgotPassword');
        }
    };

    const resetForgotPassword = async (values: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', '/api/reset/password', values);
            showMessageClient(data?.message, '', 'success');
            setPage('login');
        } catch (error) {
            console.log(error);
            showMessageClient((error as any)?.response?.data?.message, '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const login = async (user: { email: string; password: string }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', `/api/login`, user);
            if (data?.access_token && data?.refresh_token) {
                handleSetLocalStorage(TOKENS.ACCESS_TOKEN, data.access_token);
                handleSetLocalStorage(TOKENS.REFRESH_TOKEN, data.refresh_token);
                handleSetLocalStorage(INFO_AUTH.userName, data.user.name);
                handleSetLocalStorage(INFO_AUTH.userId, data.user.id);
                handleSetLocalStorage(INFO_AUTH.isAdmin, data.user.is_admin);
            }
            setUserGlobal(data.user);
            refetchQuantityCart();
            navigate('/');
            showMessageClient('Login Successfuly', '', 'success');
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                console.log(error as any);
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
            showMessageClient('Logout Successfuly', '', 'success');
            navigate('/');
            removeAllLocal();
            setUserGlobal(undefined);
            setUserName('');
            queryClient.clear();
        } catch (error) {
            showMessageClient((error as any).response.data.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const logoutAdmin = async (user?: { email: string; password: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/logout`, user);
            showMessageClient('Logout Successfuly', '', 'success');
            navigate('/login-admin');
            removeAllLocal();
            setUserGlobal(undefined);
            setUserName('');
            queryClient.clear();
        } catch (error) {
            showMessageClient((error as any).response.data.message || 'Something went wrong!', '', 'error');
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
                handleSetLocalStorage(INFO_AUTH.isAdmin, data.user.is_admin);
                handleSetLocalStorage(INFO_AUTH.adminName, data.user.name);
            }
            setUserGlobal(data.user);
            navigate('/admin');
            return data;
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                console.log(error as any);
                showMessageClient((error as any).response.data.message, '', 'error');
            } else {
                showMessageClient('Something went wrong!', '', 'error');
            }
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
                handleSetLocalStorage(INFO_AUTH.userName, data.user.name);
                handleSetLocalStorage(INFO_AUTH.userId, data.user.id);
                handleSetLocalStorage(INFO_AUTH.isAdmin, data.user.is_admin);
                setUserGlobal(data.user);
                refetchQuantityCart();
                navigate('/');
                showMessageClient('Register Successfuly', '', 'success');
            }
            return data;
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

    return {
        user,
        page,
        loading,
        timeSendEmail,
        postCheckEmail,
        postForgotPassword,
        resetForgotPassword,
        login,
        loginAdmin,
        register,
        logout,
        logoutAdmin,
    };
};

export default useAuth;
