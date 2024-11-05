import { useEffect, useState } from 'react';
import { message } from 'antd';

import { tokenManagerInstance } from '../api';
import { IGroup } from '../interfaces/IGroup';
import { useNavigate } from 'react-router-dom';

const API_GROUP = '/api/groups';

const useGroups = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const navigate = useNavigate();

    // Lấy tất cả các nhóm
    const getAllGroups = async () => {
        try {
            const { data } = await tokenManagerInstance('get', API_GROUP);
            setGroups(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getOneGroup = async (id: string | number) => {
        try {
            const { data } = await tokenManagerInstance('get', API_GROUP + `/${id}`);
            return data;
        } catch (error) {
            console.error(error);
            navigate('/admin/groups');
        }
    };

    // Xóa nhóm
    const deleteGroup = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            tokenManagerInstance('delete', `${API_GROUP}/forceDelete/${id}`); // Thêm '/' vào trước id
            getAllGroups();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingDelete(false);
        }
    };

    // Thêm nhóm mới
    const postGroup = async (groupName: { group_name: string }) => {
        try {
            setLoading(true);
            tokenManagerInstance('post', API_GROUP, groupName);
            getAllGroups();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const patchGroup = async (id: string | number, group: { group_name: string; permissions: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_GROUP + `/${id}`, group);
            navigate('/admin/groups/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Sửa nhóm
    const updateGroup = async (id: string | number, updatedGroup: Partial<IGroup>) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_GROUP}/${id}`, updatedGroup);
            message.success('Cập nhật nhóm thành công!');
            getAllGroups();
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi cập nhật nhóm!');
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
        updateGroup,
        getOneGroup,
        patchGroup,
    };
};

export default useGroups;
