import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { CircleX, Hand, RefreshCcw, SquarePen, Trash2 } from 'lucide-react';

import InputPrimary from '../../../../components/Input';
import ButtonPrimary from '../../../../components/Button';
import Heading from '../../components/Heading';
import ButtonEdit from '../../components/Button/ButtonEdit';
import TableAdmin from '../../components/Table';
import useGroups from '../../../../hooks/useGroup';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import { IGroup } from '../../../../interfaces/IGroup';
import LoadingPage from '../../../../components/Loading/LoadingPage';

const ListGroups = ({ initialValues }: any) => {
    const [form] = Form.useForm();
    const { loading, loadingDelete, groups, postGroup, deleteGroup, softGroup, restoreGroup } = useGroups();

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
                    <Link to={`/admin/update-product/${group.id}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    {group.deleted_at ? (
                        ''
                    ) : (
                        <Link to={`/admin/permissions/${group.id}`}>
                            <ButtonEdit>
                                <Hand />
                            </ButtonEdit>
                        </Link>
                    )}
                    <ButtonEdit>
                        {group.deleted_at ? (
                            <RefreshCcw onClick={() => restoreGroup(group.id)} />
                        ) : (
                            <CircleX onClick={() => softGroup(group.id)} />
                        )}
                    </ButtonEdit>
                    <ButtonEdit onClick={() => handleDeleteGroup(group.id)}>
                        {loadingDelete ? <LoadingSmall /> : <Trash2 />}
                    </ButtonEdit>
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
                        <Form.Item
                            label="Group Name"
                            name="group_name"
                            rules={[{ required: true, message: 'Please enter group name' }]}
                        >
                            <InputPrimary placeholder="Group name" width="100%" height="h-[56px]" margin="mb-0" />
                        </Form.Item>

                        <Form.Item>
                            <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                                {loading ? <LoadingSmall /> : 'Submit'}
                            </ButtonPrimary>
                        </Form.Item>
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={groups} />
                </Form>
            )}
        </>
    );
};

export default ListGroups;
