import { Form } from 'antd';
import { Link, Navigate } from 'react-router-dom';
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
import { handleGetLocalStorage } from '../../../../utils';
import { INFO_AUTH } from '../../../../constants';
import { FormattedMessage } from 'react-intl';

const ListGroups = ({ initialValues }: any) => {
    const [form] = Form.useForm();
    const { loading, groups, postGroup, deleteGroup, softGroup, restoreGroup } = useGroups();
    const groupId = handleGetLocalStorage(INFO_AUTH.groupId) || 0;

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
            title: <FormattedMessage id="group.Group_name" />,
            dataIndex: 'group_name',
            key: '1',
        },
        {
            title: <FormattedMessage id="group.Group_created_at" />,
            dataIndex: 'created_at',
            key: '3',
        },
        {
            title: <FormattedMessage id="group.Group_action" />,
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

    // if (+groupId !== 1) {
    //     return <Navigate to="/admin" />;
    // }

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <Form form={form} initialValues={initialValues} onFinish={onFinish} layout="vertical">
                    <Heading>
                        <FormattedMessage id="group.List_Groups" />
                    </Heading>
                    <div className="my-4 w-6/12">
                        <InputPrimary
                            label={<FormattedMessage id="group.Group_name_form" />}
                            name="group_name"
                            rules={[{ required: true, message: <FormattedMessage id="group.Group_name_requie" /> }]}
                        ></InputPrimary>

                        <Form.Item>
                            <ButtonSubmit loading={loading}>
                                <FormattedMessage id="group.Group_button" />{' '}
                            </ButtonSubmit>
                        </Form.Item>
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={groups} />
                </Form>
            )}
        </>
    );
};

export default ListGroups;
