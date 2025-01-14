import { useState } from 'react';
import { tokenManagerInstance } from '../api';
import { ISale } from '../interfaces/ISale.ts';
import { showMessageAdmin, showMessageClient } from '../utils/messages.ts';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { handleChangeMessage } from '../utils/index.ts';
import { useContextGlobal } from '../contexts/index.tsx';
import { notification } from 'antd';

export const QUERY_KEY = 'sales';
export const API_SALE = 'api/sale';

const useSale = () => {
    const { locale } = useContextGlobal();
    const [sales, setSales] = useState<ISale[]>([]);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [loadingCreateSale, setLoadingCreateSale] = useState<boolean>(false);
    const [loadingUpdateSale, setLoadingUpdateSale] = useState<boolean>(false);
    const [updateStatusLoad, setUpdateStatusLoad] = useState(false);
    const all = async () => {
        try {
            const { data } = await tokenManagerInstance('get', API_SALE);
            setSales(data.data.data);
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
        }
    };
    const switchStatus = async (id: string | number, is_active: boolean) => {
        try {
            setUpdateStatusLoad(true);
            const { data } = await tokenManagerInstance('put', `api/sale/switch/active/${id}`, {
                is_active: is_active,
            });
            return data.status;
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
            return false;
        } finally {
            setUpdateStatusLoad(false);
        }
    };
    const createSale = async (dataSale: any) => {
        try {
            setLoadingCreateSale(true);
            const { data } = await tokenManagerInstance('post', API_SALE, dataSale);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            navigate('/admin/listsale');
            showMessageClient(
                handleChangeMessage(locale, 'Sale created successfully', 'Bán hàng đã được tạo thành công'),
                '',
                'success',
            );
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
            setLoadingCreateSale(false);
        }
    };
    const updateSale = async (id: string | number, dataSale: any) => {
        try {
            setLoadingUpdateSale(true);
            const { data } = await tokenManagerInstance('put', `${API_SALE}/${id}`, dataSale);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            navigate('/admin/listsale');
            showMessageClient(data?.message, '', 'success');
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
            setLoadingUpdateSale(false);
        }
    };
    return {
        all,
        sales,
        switchStatus,
        updateStatusLoad,
        createSale,
        loadingCreateSale,
        loadingUpdateSale,
        updateSale,
    };
};
export default useSale;
