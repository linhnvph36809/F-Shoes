import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { QUERY_KEY as QUERY_KEY_PRODUCT } from './useProduct';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
import { notification } from 'antd';
export const API_ORDER = '/api/orders';
export const QUERY_KEY = 'orders';
export const QUERY_KEY_STATISTICS = 'statistics-orders';

const useOrder = () => {
    const { locale } = useContextGlobal();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, order);
            showMessageAdmin(
                handleChangeMessage(locale, 'Create Order Sussccess', 'Tạo đơn hàng thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PRODUCT] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATISTICS] });
            navigate('/admin/orderlist');
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const putOrder = async (id: string | number, order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_ORDER + `/${id}`, order);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PRODUCT] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATISTICS] });
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const putPaymentOrder = async (id: string | number, order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `/api/order/update/payment-status/${id}`, order);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PRODUCT] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATISTICS] });
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };
    const deleteOrder = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_ORDER + `/${id}`);
            showMessageAdmin(
                handleChangeMessage(locale, 'Delete Order Sussccess', 'Xóa đơn hàng thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PRODUCT] });
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postOrder,
        putOrder,
        putPaymentOrder,
        deleteOrder,
    };
};

export default useOrder;
