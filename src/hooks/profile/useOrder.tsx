import { useState } from 'react';
import { IOrder } from '../../interfaces/IOrder.ts';
import { tokenManagerInstance } from '../../api';
import { showMessageAdmin, showMessageClient } from '../../utils/messages.ts';
import { useQueryClient } from 'react-query';

const API_ORDER = 'api/orders';
export const QUERY_KEY = 'orders';
const UseOrder = () => {
    const queryClient = useQueryClient();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState<IOrder>();

    const myOrders = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/me/orders');
         

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
            const {data} = await tokenManagerInstance('patch', `api/cancel/order/${id}`, reason);
            showMessageClient(data?.message, '', 'success');
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
        } catch (error) {
            console.log(error);
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
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
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
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
