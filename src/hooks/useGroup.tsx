import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';

export const API_GROUP = '/api/groups';
export const KEY_GROUP = 'key-group';

const useGroups = () => {
    const queryClient = useQueryClient();
    const { locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const navigate = useNavigate();

    // Lấy tất cả các nhóm

    const getOneGroup = async (id: string | number) => {
        try {
            const { data } = await tokenManagerInstance('get', API_GROUP + `/${id}`);
            return data;
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
            navigate('/admin/groups');
        }
    };

    // Xóa nhóm
    const deleteGroup = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('delete', `${API_GROUP}/forceDelete/${id}`); // Thêm '/' vào trước id
            showMessageAdmin(
                handleChangeMessage(locale, 'Delete Group Sussccess', 'Xóa nhóm thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [KEY_GROUP] });
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
            setLoadingDelete(false);
        }
    };

    // Thêm nhóm mới
    const postGroup = async (groupName: { group_name: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_GROUP, groupName);
            showMessageAdmin(handleChangeMessage(locale, 'Add Group Sussccess', 'Thêm Nhóm Thành Công'), '', 'success');
            queryClient.invalidateQueries({ queryKey: [KEY_GROUP] });
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

    const restoreGroup = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_GROUP + `/restore/${id}`);
            showMessageAdmin(
                handleChangeMessage(locale, 'Restore Group Sussccess', 'Khôi phục Nhóm Thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [KEY_GROUP] });
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

    const patchGroup = async (id: string | number, group: { group_name: string; permissions: string }) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('patch', API_GROUP + `/${id}`, group);
            navigate('/admin/groups/');
            showMessageAdmin(
                handleChangeMessage(locale, 'Update Group Sussccess', 'Cập nhật Nhóm Thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [KEY_GROUP] });
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
            setLoadingDelete(false);
        }
    };

    const softGroup = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_GROUP}/${id}`);
            showMessageAdmin(
                handleChangeMessage(locale, 'Delete Group Sussccess', 'Xóa nhóm thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [KEY_GROUP] });
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

    return {
        loading,
        loadingDelete,
        deleteGroup,
        postGroup,
        softGroup,
        getOneGroup,
        patchGroup,
        restoreGroup,
    };
};

export default useGroups;
