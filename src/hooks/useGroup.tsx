import { useEffect, useState } from 'react';
import { message } from 'antd';
import { tokenManagerInstance } from '../api';


export interface IGroup {
    id: string;
    groupName: string;
    permissions?: string;  
    
}


const API_GROUP = '/api/groups';

const useGroups = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Lấy tất cả các nhóm
    const getAllGroups = async () => {
        try {
            setLoading(true);
            const {
                data: { data },
            } = await tokenManagerInstance('get', API_GROUP);
            setGroups(data);
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi tải dữ liệu nhóm!');
        } finally {
            setLoading(false);
        }
    };

    // Xóa nhóm
    const deleteGroup = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_GROUP}/${id}`); // Thêm '/' vào trước id
            message.success('Xóa nhóm thành công!');
            getAllGroups(); // Cập nhật lại danh sách nhóm sau khi xóa
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi xóa nhóm!');
        } finally {
            setLoading(false);
        }
    };

    // Thêm nhóm mới
    const postGroup = async (group: Omit<IGroup, 'key'>) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_GROUP, { group_name: group.groupName });
            message.success('Thêm nhóm thành công!');
            getAllGroups(); // Cập nhật lại danh sách nhóm sau khi thêm
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi thêm nhóm mới!');
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
        deleteGroup,
        postGroup,
        updateGroup, 
    };
};

export default useGroups;
