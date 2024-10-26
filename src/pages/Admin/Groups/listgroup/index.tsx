import { Form, Select, Table } from 'antd';
import { useEffect } from 'react';

import InputPrimary from '../../../../components/Input';
import ButtonPrimary from '../../../../components/Button';
import Heading from '../../components/Heading';
import useGroups from './data';


const ListGroups = ({ initialValues }: any) => {
    const { dataSource, editingKey, addOrUpdateGroup, deleteGroup, editGroup } = useGroups();
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingKey) {
            const group = dataSource.find(item => item.key === editingKey);
            form.setFieldsValue({ groupName: group?.groupName, groupParent: group?.groupParent });
        } else {
            form.resetFields();
        }
    }, [editingKey, form, dataSource]);

    const onFinish = (values: any) => {
        addOrUpdateGroup(values);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'groupName',
            key: 'name',
        },
        {
            title: 'Group Parent',
            dataIndex: 'groupParent',
            key: 'parent',
            render: (parent: string) => (parent ? parent : 'Main'),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'created_at',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex gap-2">
                    <ButtonPrimary onClick={() => editGroup(record.key)}>Edit</ButtonPrimary>
                    <ButtonPrimary onClick={() => deleteGroup(record.key)}>Delete</ButtonPrimary>
                </div>
            ),
        },
    ];

    

    return (
        <Form form={form} initialValues={initialValues} onFinish={onFinish}>
            <Heading>List Groups</Heading>
            <div className="flex  gap-x-4 my-4">
                <Form.Item
                    name="groupName"
                    rules={[{ required: true, message: 'Please enter group name' }]}
                    className="flex-1"
                >
                    <InputPrimary placeholder="Group name" width="100%" height="40px" />
                </Form.Item>

                <Form.Item
                    name="groupParent"
                    rules={[{ required: true, message: 'Please enter group parent' }]}
                    className="flex-1"
                >
                    <InputPrimary placeholder="Group name" width="100%" height="40px" />
                </Form.Item>
                <Form.Item
                    name="createdAt"
                    rules={[{ required: true, message: 'Please enter created at' }]}
                    className="flex-1"
                >
                    <InputPrimary placeholder="Group name" width="100%" height="40px" />
                </Form.Item>

                <Form.Item>
                    <ButtonPrimary width="100px" height="80px" htmlType="submit">
                        {editingKey ? 'Update' : 'Submit'}
                    </ButtonPrimary>
                </Form.Item>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </Form>
    );
};

export default ListGroups;
