import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageAdmin } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { QUERY_KEY as QUERY_KEY_PRODUCT } from './useProduct';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
export const API_ORDER = '/api/orders';
export const QUERY_KEY = 'orders';
const useOrder = () => {
    const {  locale } = useContextGlobal();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, order);
            showMessageAdmin(handleChangeMessage(locale,'Create Order Sussccess','Tạo đơn hàng thành công'), '', 'success');
            queryClient.invalidateQueries({queryKey:[QUERY_KEY,QUERY_KEY_PRODUCT]});
            navigate('/admin/orderlist');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };

    const putOrder = async (id: string | number, order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_ORDER + `/${id}`, order);
            navigate('/admin/orderlist');
            showMessageAdmin(handleChangeMessage(locale,'Update Order Sussccess','Cập nhật đơn hàng thành công'), '', 'success');
            queryClient.invalidateQueries({queryKey:[QUERY_KEY,QUERY_KEY_PRODUCT]});
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
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
