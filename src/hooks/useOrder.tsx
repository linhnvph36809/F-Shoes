import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageAdmin } from '../utils/messages';

export const API_ORDER = '/api/orders';

const useOrder = () => {
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_ORDER, order);
            showMessageAdmin('Create Order Sussccess', '', 'success');

            navigate('/admin/orderlist');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getAllOrder = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_ORDER);
            setOrders(data);
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

    useEffect(() => {
        getAllOrder();
    }, []);

    return {
        orders,
        loading,
        postOrder,
        putOrder,
    };
};

export default useOrder;
