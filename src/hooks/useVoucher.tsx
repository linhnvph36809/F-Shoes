import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { PATH_ADMIN } from '../constants/path';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';

export const API_VOUCHER = 'api/vouchers';
export const QUERY_VOUCHER = 'query-voucher';

const useVoucher = () => {
    const { locale } = useContextGlobal();
    const [voucher, setVoucher] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const postVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/vouchers/code/' + `${voucher}`);
            showMessageClient(handleChangeMessage(locale, 'Voucher Valid', 'Mã giảm giá hợp lệ'), '', 'success');
            setVoucher(data);
            queryClient.invalidateQueries({ queryKey: [QUERY_VOUCHER] });

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

    const deleteVoucher = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `api/vouchers/forceDelete/${id}`);
            showMessageAdmin(handleChangeMessage(locale, 'Delete Voucher successfully', 'Xóa voucher thành công'), '', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_VOUCHER] });

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

    const addVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_VOUCHER, voucher);
            showMessageAdmin(handleChangeMessage(locale, 'Add Voucher successfully', 'Thêm mã giảm giá thành công'), '', 'success');
            navigate(PATH_ADMIN.VOUCHER);
            queryClient.invalidateQueries({ queryKey: [QUERY_VOUCHER] });

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

    const patchVoucher = async (id: string | number, voucher: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', `${API_VOUCHER}/${id}`, voucher);
            navigate('/admin/voucher');
            showMessageAdmin(handleChangeMessage(locale, 'Update Voucher successfully', 'Cập nhật voucher thành công'), '', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_VOUCHER] });

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

    const softVocher = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_VOUCHER}/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_VOUCHER] });

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

    const restoreVoucher = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `${API_VOUCHER}/restore/` + id);
            queryClient.invalidateQueries({ queryKey: [QUERY_VOUCHER] });

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
            setLoading(false);
        }
    };

    return {
        voucher,
        loading,
        postVoucher,
        addVoucher,
        softVocher,
        patchVoucher,
        restoreVoucher,
        deleteVoucher,
        setVoucher
    };
};

export default useVoucher;
