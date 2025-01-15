import { Form, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { CircleX, Hand, RefreshCcw } from 'lucide-react';

import Heading from '../../components/Heading';
import ButtonEdit from '../../components/Button/ButtonEdit';
import TableAdmin from '../../components/Table';
import useGroups, { API_GROUP, KEY_GROUP } from '../../../../hooks/useGroup';
import { IGroup } from '../../../../interfaces/IGroup';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { handleChangeMessage, handleGetLocalStorage } from '../../../../utils';
import { INFO_AUTH } from '../../../../constants';
import { FormattedMessage } from 'react-intl';
import NotFound from '../../../../components/NotFound';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import ModalAddGroup from './ModalAddGroup';
import { showMessageActive } from '../../../../utils/messages';
import { useContextGlobal } from '../../../../contexts';

const ListGroups = ({ initialValues }: any) => {
    const [form] = Form.useForm();
    const { postGroup, deleteGroup, softGroup, restoreGroup } = useGroups();
    const { data, isFetching } = useQueryConfig([KEY_GROUP, 'all-groups'], API_GROUP);
    const groupId = handleGetLocalStorage(INFO_AUTH.groupId) || 0;
    const groups = data?.data || [];
    const { locale } = useContextGlobal();

    const onFinish = (value: any) => {
        postGroup(value);
    };

    const handleDeleteGroup = (id?: string | number) => {
        if (id) {
            showMessageActive(
                handleChangeMessage(locale, 'Are you sure you want to delete?', 'Bạn có chắc chắn muốn xóa không?'),
                '',
                'warning',
                () => {
                    deleteGroup(id);
                },
            );
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
                    {group?.id === 1 || group?.id === 2 || group?.id === 3 ? (
                        ''
                    ) : (
                        <ModalAddGroup initialValues={group} isUpdate={true} />
                    )}
                    {group.deleted_at ? (
                        ''
                    ) : (
                        <>
                            {+groupId !== group.id ? (
                                <Link to={`/admin/permissions/${group.id}`}>
                                    <ButtonEdit>
                                        <Hand />
                                    </ButtonEdit>
                                </Link>
                            ) : (
                                ''
                            )}
                        </>
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
                    {group?.id === 1 || group?.id === 2 || group?.id === 3 ? (
                        ''
                    ) : (
                        <ButtonDelete onClick={() => handleDeleteGroup(group.id)}></ButtonDelete>
                    )}
                </div>
            ),
        },
    ];

    if (+groupId !== 1) {
        return <NotFound />;
    }
    return (
        <>
            <Form form={form} initialValues={initialValues} onFinish={onFinish} layout="vertical">
                <Heading>
                    <FormattedMessage id="group.List_Groups" />
                </Heading>
                <ModalAddGroup />
                {isFetching ? (
                    <Skeleton className="mt-10" />
                ) : (
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={groups} />
                )}
            </Form>
        </>
    );
};

export default ListGroups;
