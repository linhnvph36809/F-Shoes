import { useState } from 'react';
import { tokenManagerInstance } from '../api';
import { IUser } from '../interfaces/IUser';
import { useNavigate } from 'react-router-dom';
import { PATH_LIST_USER } from '../constants';
import { useQueryClient } from 'react-query';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';

const API_USER = '/api/user';
export const QUERY_KEY = 'users';
const useUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [loadingRestore, setLoadingRestore] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { locale } = useContextGlobal();

    // Function to fetch all users

    const addUser = async (userData: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `${API_USER}`, userData, {
                headers: { 'Content-Type': 'application/form-data' },
            });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Add User Success ', 'Thêm người dùng thành công '),
                '',
                'success',
            );
            navigate(PATH_LIST_USER);
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

    // Function to delete a user by ID
    const deleteUser = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('delete', `${API_USER}/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Account was banned! ', 'Tài khoản đã bị hạn chế! '),
                '',
                'success',
            );
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
            setLoadingDelete(false);
        }
    };
    const restoreUser = async (id: string | number) => {
        try {
            setLoadingRestore(true);
            await tokenManagerInstance('post', `/api/restore/user/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Restore successfully!', 'Khôi phục thành công! '),
                '',
                'success',
            );
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
            setLoadingRestore(false);
        }
    };
    const editUser = async (id: any, userData: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `${API_USER}/${id}`, userData, {
                headers: { 'Content-Type': 'application/form-data' },
            });
            navigate(PATH_LIST_USER);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Update User Success ', 'Cập nhật người dùng thành công '),
                '',
                'success',
            );
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
        loading,
        loadingDelete,
        loadingRestore,
        restoreUser,
        addUser,
        deleteUser,
        editUser, // Return the editUser function to make it accessible in components
    };
};

export default useUser;
