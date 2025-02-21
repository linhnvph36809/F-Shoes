import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { tokenManagerInstance } from '../api';
import { INFO_AUTH, TOKENS } from '../constants';
import { useContextGlobal } from '../contexts';
import { useContextClient } from '../components/Layouts/LayoutClient';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { handleChangeMessage, handleRemoveLocalStorage, handleSetLocalStorage } from '../utils';
import { notification } from 'antd';
const API_CHECK_EMAIL = '/api/check/email';

const removeAllLocal = () => {
    handleRemoveLocalStorage(INFO_AUTH.userName);
    handleRemoveLocalStorage(INFO_AUTH.userId);
    handleRemoveLocalStorage(INFO_AUTH.isAdmin);
    handleRemoveLocalStorage(INFO_AUTH.adminName);
    handleRemoveLocalStorage(INFO_AUTH.groupId);
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
            showMessageClient(
                handleChangeMessage(
                    locale,
                    'Verify code has been sent to your email',
                    'Mã xác minh đã được gửi đến email của bạn',
                ),
                '',
                'success',
            );
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
                handleSetLocalStorage(INFO_AUTH.groupId, data.user.group_id);
                if (data?.user?.is_admin) {
                    handleSetLocalStorage(INFO_AUTH.isAdmin, data?.user?.is_admin);
                }
            }

            setUserGlobal(data.user);
            refetchQuantityCart();
            navigate('/');
            showMessageClient(handleChangeMessage(locale, 'Login Successfuly', 'Đăng nhập thành công'), '', 'success');
        } catch (error) {
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async (user?: { email: string; password: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/logout`, user);
            showMessageClient(handleChangeMessage(locale, 'Logout Successfuly', 'Đăng xuất thành công'), '', 'success');
            navigate('/');
            setUserName('');
            removeAllLocal();
            setUserGlobal(undefined);
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
            showMessageClient(handleChangeMessage(locale, 'Logout Successfuly', 'Đăng xuất thành công'), '', 'success');
            navigate('/login-admin');
            removeAllLocal();
            setUserGlobal(undefined);
            queryClient.clear();
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
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
                handleSetLocalStorage(INFO_AUTH.userName, data.user.name);
                handleSetLocalStorage(INFO_AUTH.userId, data.user.id);
                handleSetLocalStorage(INFO_AUTH.groupId, data.user.group_id);
                if (data?.user?.is_admin) {
                    handleSetLocalStorage(INFO_AUTH.isAdmin, data?.user?.is_admin);
                }
            }
            setUserGlobal(data.user);
            navigate('/admin');
            return data;
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
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
                if (data?.user?.is_admin) {
                    handleSetLocalStorage(INFO_AUTH.isAdmin, data?.user?.is_admin);
                }
                setUserGlobal(data.user);
                refetchQuantityCart();
                navigate('/');
                showMessageClient(
                    handleChangeMessage(locale, 'Register successfully!', 'Đăng kí thành công!'),
                    '',
                    'success',
                );
            }
            return data;
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
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
