import { useState } from 'react';
import { message } from 'antd';

interface Group {
    key: string;
    groupName: string;
    groupParent: string;
    createdAt: string;
}

const useGroups = () => {
    const [dataSource, setDataSource] = useState<Group[]>([
        {
            key: '1',
            groupName: '123',
            groupParent: 'Main',
            createdAt: '2024',
        },
    ]);
    const [editingKey, setEditingKey] = useState<string | null>(null);

    // Thêm hoặc cập nhật nhóm
    const addOrUpdateGroup = (values: Omit<Group, 'key'>) => {
        if (editingKey) {
            // Cập nhật nhóm
            setDataSource(dataSource.map(item => (item.key === editingKey ? { ...item, ...values } : item)));
            message.success('Group updated successfully!');
        } else {
            // Thêm nhóm mới
            const newGroup = { key: String(dataSource.length + 1), ...values };
            setDataSource([...dataSource, newGroup]);
            message.success('Group added successfully!');
        }
        setEditingKey(null); // Reset trạng thái chỉnh sửa
    };

    // Xóa nhóm
    const deleteGroup = (key: string) => {
        setDataSource(dataSource.filter(item => item.key !== key));
        message.success('Group deleted successfully!');
    };

    // Chỉnh sửa nhóm
    const editGroup = (key: string) => {
        setEditingKey(key);
    };

    // Hủy chỉnh sửa
    const cancelEdit = () => {
        setEditingKey(null);
    };

    return {
        dataSource,
        editingKey,
        addOrUpdateGroup,
        deleteGroup,
        editGroup,
        cancelEdit,
    };
};

export default useGroups;
