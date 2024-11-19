import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageClient } from '../utils/messages';

const API = '/api/';
const API_ORDER = '/api/orders';

const useOnlinePayment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const postVNPAY = async (paymentMethod: string, value: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API + paymentMethod, value);
            if (data?.data) {
                window.location.href = data.data;
            } else {
                window.location.href = data;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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

    return {
        loading,
        postVNPAY,
        postOrder,
    };
};

export default useOnlinePayment;
