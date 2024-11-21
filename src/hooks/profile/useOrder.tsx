import { useState } from 'react';
import { IOrder } from '../../interfaces/IOrder.ts';
import { tokenManagerInstance } from '../../api';

const API_ORDER = 'api/orders';
const UseOrder = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState<IOrder>();

    const myOrders = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/me/orders');
            console.log(data);

            setOrders(data);
        } catch (error) {
            console.log(error, 'error');
        } finally {
            setLoading(false);
        }
    };
    const cancelOrder = async (id: string) => {
        try {
            setCancelLoading(true);
            const { data } = await tokenManagerInstance('patch', `api/cancel/order/${id}`);

            return data.order;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setCancelLoading(false);
        }
    };
    const getOrderDetail = async (id: string) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `${API_ORDER}/${id}`);
            setOrderDetail(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return {
        orders,
        loading,
        myOrders,
        cancelOrder,
        cancelLoading,
        orderDetail,
        getOrderDetail,
    };
};

export default UseOrder;
