import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageClient } from '../utils/messages';
import useCookiesConfig from './useCookiesConfig';
import { useContextGlobal } from '../contexts';

const API = '/api/';
const API_ORDER = '/api/orders';

const useOnlinePayment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { handleSetCookie } = useCookiesConfig('orderId');
    const { refetchQuantityCart } = useContextGlobal();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, order);
            showMessageClient('Order successfully', '', 'success');
            refetchQuantityCart();
            navigate('/order-cash-on-delivery');
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const postVNPAY = async (value: any, orders: any) => {
        try {
            setLoading(true);
            const order = await tokenManagerInstance('post', API_ORDER, orders);
            handleSetCookie('orderId', order?.data?.order?.id, new Date(Date.now() + 20 * 60 * 1000));
            const { data } = await tokenManagerInstance('post', API + 'vnpay', value);
            if (data?.data) {
                window.location.href = data.data;
            } else {
                window.location.href = data;
            }
            refetchQuantityCart();
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const postMomo = async (value: any, orders: any) => {
        try {
            setLoading(true);
            const order = await tokenManagerInstance('post', API_ORDER, orders);
            handleSetCookie('orderId', order?.data?.order?.id, new Date(Date.now() + 20 * 60 * 1000));
            const { data } = await tokenManagerInstance('post', API + 'momo', value);
            if (data?.payUrl) {
                window.location.href = data.payUrl;
            }
            refetchQuantityCart();
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const putOrder = async (paymentStatus: any, id: string | number) => {
        try {
            await tokenManagerInstance('put', `api/order/update/payment-status/${id}`, paymentStatus);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        }
    };

    return {
        loading,
        postVNPAY,
        postMomo,
        postOrder,
        putOrder,
    };
};

export default useOnlinePayment;
