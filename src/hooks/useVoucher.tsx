import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { PATH_ADMIN } from '../constants/path';

export const API_VOUCHER = 'api/vouchers';

const useVoucher = () => {
    const [voucher, setVoucher] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/vouchers/code/' + `${voucher}`);
            showMessageClient('Voucher Valid', '', 'success');
            setVoucher(data);
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                showMessageClient((error as any).response.data.message, '', 'warning');
            } else {
                showMessageClient('Error', (error as any).message, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteVoucher = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `api/vouchers/forceDelete/${id}`);
            showMessageAdmin('Delete Voucher successfully', '', 'success');
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const addVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_VOUCHER, voucher);
            showMessageAdmin('Add Voucher successfully', '', 'success');
            navigate(PATH_ADMIN.VOUCHER);
        } catch (error) {
            if ((error as any)?.response?.data?.message) {
                showMessageAdmin('Error', (error as any).response.data.message, 'error');
            } else {
                showMessageAdmin('Error', (error as any).message, 'error');
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
            showMessageAdmin('Update Voucher successfully', '', 'success');
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const softVocher = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_VOUCHER}/${id}`);
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const restoreVoucher = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `${API_VOUCHER}/restore/` + id);
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
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
    };
};

export default useVoucher;
