import {useState} from 'react';
import {IOrder} from '../../interfaces/IOrder.ts';
import {tokenManagerInstance} from '../../api';
import {showMessageClient} from "../../utils/messages.ts";
import {useNavigate} from "react-router-dom";

const API_ORDER = 'api/orders';
const UseOrder = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState<IOrder>();
    const navigator = useNavigate();
    const [reOrderLoading, setReOrderLoading] = useState(false);
    const myOrders = async () => {
        try {
            setLoading(true);
            const {data} = await tokenManagerInstance('get', 'api/me/orders');
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
            await tokenManagerInstance('patch', `api/cancel/order/${id}`);
            showMessageClient('', 'Order cancelled successfully', 'success');

        } catch (error) {
            console.log(error);
            showMessageClient('', 'Something went wrong!', 'error');
        } finally {
            setCancelLoading(false);
        }
    };
    const getOrderDetail = async (id: string) => {
        try {
            setLoading(true);
            const {data} = await tokenManagerInstance('get', `${API_ORDER}/${id}`);
            setOrderDetail(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const reOrder = async (id: string) => {
        try {
            setReOrderLoading(true);
            await tokenManagerInstance('post', `api/reorder/order/${id}`);
            showMessageClient('', 'Order\'s product get back to the order !', 'success');
            navigator('/cart');
        } catch (error) {
            console.log(error);
            showMessageClient('', 'Something went wrong!', 'error');
            navigator('/');
        }finally {
            setReOrderLoading(false);
        }
    }
    return {
        orders,
        loading,
        myOrders,
        cancelOrder,
        cancelLoading,
        orderDetail,
        getOrderDetail,
        reOrder,
        reOrderLoading
    };
};

export default UseOrder;
