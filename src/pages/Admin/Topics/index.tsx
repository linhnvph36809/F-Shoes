import { Link } from 'react-router-dom';
import { CircleX, RefreshCcw, SquarePen, Trash2 } from 'lucide-react';
import { Input } from 'antd';
import { useState } from 'react';

import { ITopic } from '../../../interfaces/ITopic';
import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import useQueryConfig from '../../../hooks/useQueryConfig';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import useTopic, { API_TOPIC } from '../../../hooks/useTopic';
import FormTopic from './FormTopic';
import { showMessageActive } from '../../../utils/messages';
import ButtonDelete from '../components/Button/ButtonDelete';
import { FormattedMessage, useIntl } from 'react-intl';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../constants';

export const KEY = 'list-topic';

const ListTopic = ({ initialValues }: any) => {
    const intl = useIntl();
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_TOPIC);
    const { deleteTopic, postTopic, restoreTopic, softTopic } = useTopic();
    const [searchTerm, setSearchTerm] = useState('');

    const onFinish = (value: any) => {
        postTopic(value);
        refetch();
    };

    const handleDeleteTopic = (id?: string | number) => {
        if (id) {
            showMessageActive('Are you sure you want to delete the topic?', '', 'warning', () => {
                deleteTopic(id);
                refetch();
            });
        }
    };

    const handleRestoreTopic = (id?: string | number) => {
        if (id) {
            restoreTopic(id);
            refetch();
        }
    };

    const handleSoftTopic = (id?: string | number) => {
        if (id) {
            softTopic(id);
            refetch();
        }
    };

    const filteredData = data?.data.filter((topic: ITopic) =>
        topic.topic_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: <FormattedMessage id="topic.Topic_Name" />,
            dataIndex: 'topic_name',
            key: '2',
        },
        {
            title: <FormattedMessage id="topic.Topic_Slug" />,
            dataIndex: 'slug',
            key: '3',
        },
        {
            title: <FormattedMessage id="topic.Topic_Greated_at" />,
            dataIndex: 'created_at',
            key: '4',
        },
        {
            title: <FormattedMessage id="topic.Topic_Action" />,
            dataIndex: 'id',
            key: '5',
            render: (_: any, topic: ITopic) => (
                <div className="flex gap-2">
                    <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_EDIT}>
                        <Link to={`/admin/topic/${topic.id}`}>
                            <ButtonEdit>
                                <SquarePen />
                            </ButtonEdit>
                        </Link>
                    </PermissionElement>
                    {topic.deleted_at ? (
                        <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonEdit onClick={() => handleRestoreTopic(topic.id)}>
                                <RefreshCcw />
                            </ButtonEdit>
                        </PermissionElement>
                    ) : (
                        <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonEdit onClick={() => handleSoftTopic(topic.id)}>
                                <CircleX />
                            </ButtonEdit>
                        </PermissionElement>
                    )}

                    {topic.deleted_at ? (
                        ''
                    ) : (
                        <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_DELETE}>
                            <ButtonDelete onClick={() => handleDeleteTopic(topic.id)}></ButtonDelete>
                        </PermissionElement>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            {isFetching ? (
                <LoadingBlock />
            ) : (
                <div>
                    <FormTopic
                        title={intl.formatMessage({ id: 'topic.List_Topic' })}
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                    <div className="mb-4 text-end">
                        <Input
                            placeholder={intl.formatMessage({ id: 'topic.message' })}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            allowClear
                            className={`w-[250px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={filteredData} />
                </div>
            )}
        </>
    );
};

export default ListTopic;
