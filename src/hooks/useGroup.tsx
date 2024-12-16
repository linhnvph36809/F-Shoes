import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { IGroup } from '../interfaces/IGroup';
import { useNavigate } from 'react-router-dom';
import { showMessageAdmin } from '../utils/messages';

const API_GROUP = '/api/groups';

const useGroups = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const navigate = useNavigate();

    // Lấy tất cả các nhóm
    const getAllGroups = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_GROUP);
            setGroups(data);
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getOneGroup = async (id: string | number) => {
        try {
            const { data } = await tokenManagerInstance('get', API_GROUP + `/${id}`);
            return data;
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
            navigate('/admin/groups');
        }
    };

    // Xóa nhóm
    const deleteGroup = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            tokenManagerInstance('delete', `${API_GROUP}/forceDelete/${id}`); // Thêm '/' vào trước id
            showMessageAdmin('Delete Group Sussccess', '', 'success');
            getAllGroups();
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoadingDelete(false);
        }
    };

    // Thêm nhóm mới
    const postGroup = async (groupName: { group_name: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_GROUP, groupName);
            getAllGroups();
            showMessageAdmin('Add Group Sussccess', '', 'success');

        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const restoreGroup = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_GROUP + `/restore/${id}`);
            getAllGroups();
            showMessageAdmin('Restore Group Sussccess', '', 'success');

        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const patchGroup = async (id: string | number, group: { group_name: string; permissions: string }) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('patch', API_GROUP + `/${id}`, group);
            navigate('/admin/groups/');
            showMessageAdmin('Update Group Sussccess', '', 'success');

        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoadingDelete(false);
        }
    };

    const softGroup = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_GROUP}/${id}`);
            getAllGroups();
            showMessageAdmin('Delete Group Sussccess', '', 'success');

        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllGroups();
    }, []);

    return {
        groups,
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
