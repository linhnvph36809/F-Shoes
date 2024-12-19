import { useState } from 'react';
import { IOrder } from '../../interfaces/IOrder.ts';
import { tokenManagerInstance } from '../../api';
import { showMessageAdmin, showMessageClient } from '../../utils/messages.ts';
import { useQueryClient } from 'react-query';
import { useContextGlobal } from '../../contexts/index.tsx';
import { handleChangeMessage } from '../../utils/index.ts';

const API_ORDER = 'api/orders';
export const QUERY_KEY = 'orders';
const UseOrder = () => {
    const {  locale } = useContextGlobal();
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
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
            await tokenManagerInstance('post', `api/reorder/order/${id}`);
            showMessageClient(handleChangeMessage(locale,' The items was added to your cart!',' Các mặt hàng đã được thêm vào giỏ của bạn!'),'', 'success');
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
        } catch (error) {
            console.log(error);
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
