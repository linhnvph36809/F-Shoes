import { useState } from 'react';
import { message } from 'antd';
import { useIntl } from 'react-intl';

interface Group {
    key: string;
    groupName: string;
    groupParent: string;
    createdAt: string;
}

const useGroups = () => {
    const intl = useIntl();
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
            message.success(intl.formatMessage({ id: 'group.succese.edit.pass' }));
        } else {
            // Thêm nhóm mới
            const newGroup = { key: String(dataSource.length + 1), ...values };
            setDataSource([...dataSource, newGroup]);
            message.success(intl.formatMessage({ id: 'group.succese.add.pass' }));
        }
        setEditingKey(null); // Reset trạng thái chỉnh sửa
    };

    // Xóa nhóm
    const deleteGroup = (key: string) => {
        setDataSource(dataSource.filter(item => item.key !== key));
        message.success(intl.formatMessage({ id: 'group.succese.delete' }));
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
