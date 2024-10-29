import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';

const API_ORDER = '/api/orders';

const useOrder = () => {
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_ORDER, order);
            alert(data.message);
            navigate('/admin/orderlist');
        } catch (error) {
            console.log(error);
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
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const putOrder = async (id: string | number, order: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('patch', API_ORDER + `/${id}`, order);
            alert(data.message);
            navigate('/admin/orderlist');
        } catch (error) {
            console.log(error);
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
