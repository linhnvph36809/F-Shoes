import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';

const API_CHECK_EMAIL = '/api/check/email';

const useAuth = () => {
    const [page, setPage] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
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
                navigate('/');
            }
        } catch (error) {
            alert('account or password is incorrect');
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
                navigate('/');
            }
        } catch (error) {
            console.log(error);
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
        register,
    };
};

export default useAuth;
