import { useState } from 'react';
import { IOrder } from '../../interfaces/IOrder.ts';
import { tokenManagerInstance } from '../../api';
import {  showMessageAdmin, showMessageClient } from '../../utils/messages.ts';
import { useQueryClient } from 'react-query';
import { useContextGlobal } from '../../contexts/index.tsx';
import { handleChangeMessage } from '../../utils/index.ts';
import { message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const API_ORDER = 'api/orders';
export const QUERY_KEY = 'orders';
const UseOrder = () => {
    const {  locale } = useContextGlobal();
    const queryClient = useQueryClient();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState<IOrder>();
    const navigator = useNavigate();
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
            const e = error as any;
            if(e?.response?.data?.errors){
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
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
            const {data} = await tokenManagerInstance('post', `api/reorder/order/${id}`);
           
            if(data?.errors && data?.errors.length > 0){
                for(let i = 0; i < data?.errors.length; i++) {
                    message.error(data?.errors[i]);
                }
                
            }else{
                
                showMessageClient(handleChangeMessage(locale,' The items was added to your cart!',' Các mặt hàng đã được thêm vào giỏ của bạn!'),'', 'success');
            }
            navigator('/cart');
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
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
