import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate } from 'react-router-dom';
import { showMessageClient } from '../utils/messages';
import useCookiesConfig from './useCookiesConfig';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage, handleRemoveLocalStorage } from '../utils';
import { useQueryClient } from 'react-query';
import { QUERY_KEY as QUERY_KEY_ORDER } from './useOrder';
import { QUERY_KEY as QUERY_KEY_PRODUCT } from './useProduct';

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
            setLoading(false);
        }
    };

    const putOrder = async (paymentStatus: any, id: string | number) => {
        try {
            await tokenManagerInstance('put', `api/order/update/payment-status/${id}`, paymentStatus);
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
        }
    };

    return {
        loading,
        postVNPAY,
        postMomo,
        postOrder,
        putOrder,
    };
};

export default useOnlinePayment;
