import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageAdmin } from '../utils/messages';

export const API_ORDER = '/api/orders';

const useOrder = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, order);
            showMessageAdmin('Create Order Sussccess', '', 'success');

            navigate('/admin/orderlist');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const putOrder = async (id: string | number, order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_ORDER + `/${id}`, order);
            navigate('/admin/orderlist');
            showMessageAdmin('Update Order Sussccess', '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postOrder,
        putOrder,
    };
};

export default useOrder;
