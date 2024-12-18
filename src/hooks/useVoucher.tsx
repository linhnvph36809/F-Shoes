import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { PATH_ADMIN } from '../constants/path';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';

export const API_VOUCHER = 'api/vouchers';

const useVoucher = () => {
    const { locale } = useContextGlobal();
    const [voucher, setVoucher] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/vouchers/code/' + `${voucher}`);
            showMessageClient(handleChangeMessage(locale, 'Voucher Valid', 'Phiếu quà tặng hợp lệ'), '', 'success');
            setVoucher(data);
            console.log(data);

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
            if ((error as any)?.response?.data?.message) {
                showMessageClient((error as any).response.data.message, '', 'warning');
                setVoucher([]);
            } else {
                showMessageClient('Error', (error as any).message, 'error');
                setVoucher([]);
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

    const addVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_VOUCHER, voucher);
            showMessageAdmin(handleChangeMessage(locale, 'Add Voucher successfully', 'Thêm mã giảm giá thành công'), '', 'success');
            navigate(PATH_ADMIN.VOUCHER);
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

    const patchVoucher = async (id: string | number, voucher: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', `${API_VOUCHER}/${id}`, voucher);
            navigate('/admin/voucher');
            showMessageAdmin(handleChangeMessage(locale, 'Update Voucher successfully', 'Cập nhật voucher thành công'), '', 'success');
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

    const softVocher = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_VOUCHER}/${id}`);
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

    const restoreVoucher = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `${API_VOUCHER}/restore/` + id);
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
