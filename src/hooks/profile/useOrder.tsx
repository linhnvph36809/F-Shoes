import { useState } from 'react';
import { IOrder } from '../../interfaces/IOrder.ts';
import { tokenManagerInstance } from '../../api';
import { showMessageAdmin, showMessageClient } from '../../utils/messages.ts';

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

    const cancelOrder = async (id: string, reason: { reason_cancelled: string }) => {
        try {
            setCancelLoading(true);
            await tokenManagerInstance('patch', `api/cancel/order/${id}`, reason);
            showMessageClient('', 'Order cancelled successfully', 'success');
        } catch (error) {
            console.log(error);
            showMessageClient('Something went wrong!', '', 'error');
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

    const reOrder = async (id: number | string) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `api/reorder/order/${id}`);
            showMessageClient('Reorder', 'The items was added to your cart!', 'success');
        } catch (error) {
            console.log(error);
            showMessageAdmin('Error', 'Something went wrong!', 'error');
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
        reOrder,
    };
};

export default UseOrder;
