import { useState } from 'react';

import { tokenManagerInstance } from '../api';

const API = '/api/';
const API_ORDER = '/api/orders';

const useOnlinePayment = () => {
    const [loading, setLoading] = useState<boolean>(false);
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
            const { data } = await tokenManagerInstance('post', API_ORDER, order);
            alert(data.message);
        } catch (error) {
            console.log(error);
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
