import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageClient } from '../utils/messages';

const API = '/api/';
const API_ORDER = '/api/orders';

const useOnlinePayment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, order);
            showMessageClient('Order successfully', '', 'success');
            navigate('/order-cash-on-delivery');
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const postVNPAY = async (value: any, orders: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, orders);
            const { data } = await tokenManagerInstance('post', API + 'vnpay', value);
            if (data?.data) {
                window.location.href = data.data;
            } else {
                window.location.href = data;
            }
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const postMomo = async (value: any, orders: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, orders);
            const { data } = await tokenManagerInstance('post', API + 'momo', value);
            if (data?.payUrl) {
                window.location.href = data.payUrl;
            }
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postVNPAY,
        postMomo,
        postOrder,
    };
};

export default useOnlinePayment;
