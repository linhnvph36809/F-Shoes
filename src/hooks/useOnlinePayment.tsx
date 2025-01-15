import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import useCookiesConfig from './useCookiesConfig';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage, handleRemoveLocalStorage } from '../utils';
import { useQueryClient } from 'react-query';
import { QUERY_KEY as QUERY_KEY_ORDER } from './useOrder';
import { QUERY_KEY as QUERY_KEY_PRODUCT } from './useProduct';
import { notification } from 'antd';

const API = '/api/';
const API_ORDER = '/api/orders';

const useOnlinePayment = () => {
    const { locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { handleSetCookie } = useCookiesConfig('orderId');
    const { refetchQuantityCart } = useContextGlobal();
    const queryClient = useQueryClient();

    const postOrder = async (order: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_ORDER, order);
            showMessageClient(handleChangeMessage(locale, 'Order successfully', 'Đặt hàng thành công'), '', 'success');
            refetchQuantityCart();
            navigate('/order-cash-on-delivery');
            handleRemoveLocalStorage('orderId');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ORDER] });
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

    const postVNPAY = async (value: any, orders: any, isAddOrder: boolean = true) => {
        try {
            setLoading(true);
            if (isAddOrder) {
                const order = await tokenManagerInstance('post', API_ORDER, orders);
                handleSetCookie('orderId', order?.data?.order?.id, new Date(Date.now() + 20 * 60 * 1000));
            }
            const { data } = await tokenManagerInstance('post', API + 'vnpay', value);
            if (data?.data) {
                window.location.href = data.data;
            } else {
                window.location.href = data;
            }
            await refetchQuantityCart();
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

    const postMomo = async (value: any, orders: any, isAddOrder: boolean = true) => {
        try {
            setLoading(true);
            if (isAddOrder) {
                const order = await tokenManagerInstance('post', API_ORDER, orders);
                handleSetCookie('orderId', order?.data?.order?.id, new Date(Date.now() + 20 * 60 * 1000));
            }
            const { data } = await tokenManagerInstance('post', API + 'momo', value);
            if (data?.payUrl) {
                window.location.href = data.payUrl;
            }
            await refetchQuantityCart();
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

    const putOrder = async (paymentStatus: any, id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `api/order/update/payment-status/${id}`, paymentStatus);
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

    const postOrderAdmin = async (paymentStatus: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `api/admin/create/order`, paymentStatus);
            showMessageClient(handleChangeMessage(locale, 'Order successfully', 'Đặt hàng thành công'), '', 'success');

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
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return {
        loading,
        postVNPAY,
        postMomo,
        postOrder,
        putOrder,
        postOrderAdmin
    };
};

export default useOnlinePayment;
