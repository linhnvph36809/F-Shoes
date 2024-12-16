import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { CircleX, Hand, RefreshCcw } from 'lucide-react';

import Heading from '../../components/Heading';
import ButtonEdit from '../../components/Button/ButtonEdit';
import TableAdmin from '../../components/Table';
import useGroups from '../../../../hooks/useGroup';
import { IGroup } from '../../../../interfaces/IGroup';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import InputPrimary from '../../components/Forms/InputPrimary';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import ButtonUpdate from '../../components/Button/ButtonUpdate';
import ButtonDelete from '../../components/Button/ButtonDelete';

const ListGroups = ({ initialValues }: any) => {
    const [form] = Form.useForm();
    const { loading, groups, postGroup, deleteGroup, softGroup, restoreGroup } = useGroups();

    const onFinish = (value: any) => {
        postGroup(value);
    };

    const handleDeleteGroup = (id?: string | number) => {
        if (id) {
            deleteGroup(id);
        }
    };

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'group_name',
            key: '1',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: '3',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: '4',
            render: (_: any, group: IGroup) => (
                <div className="flex gap-2">
                    <ButtonUpdate to={`/admin/update-group/${group.id}`}></ButtonUpdate>
                    {group.deleted_at ? (
                        ''
                    ) : (
                        <Link to={`/admin/permissions/${group.id}`}>
                            <ButtonEdit>
                                <Hand />
                            </ButtonEdit>
                        </Link>
                    )}
                    {group.deleted_at ? (
                        <ButtonEdit onClick={() => restoreGroup(group.id)}>
                            <RefreshCcw onClick={() => restoreGroup(group.id)} />
                        </ButtonEdit>
                    ) : (
                        <ButtonEdit onClick={() => softGroup(group.id)}>
                            <CircleX />
                        </ButtonEdit>
                    )}
                    <ButtonDelete onClick={() => handleDeleteGroup(group.id)}></ButtonDelete>
                </div>
            ),
        },
    ];

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <Form form={form} initialValues={initialValues} onFinish={onFinish} layout="vertical">
                    <Heading>List Groups</Heading>
                    <div className="my-4 w-6/12">
                        <InputPrimary
                            label="Group Name"
                            name="group_name"
                            rules={[{ required: true, message: 'Please enter group name' }]}
                            placeholder="Group name"
                        ></InputPrimary>

                        <Form.Item>
                            <ButtonSubmit loading={loading} />
                        </Form.Item>
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={groups} />
                </Form>
            )}
        </>
    );
};

export default ListGroups;
