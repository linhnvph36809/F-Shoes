import { CircleX, RefreshCcw, Search } from 'lucide-react';
import { useState } from 'react';

import { ITopic } from '../../../interfaces/ITopic';
import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useTopic, { API_TOPIC, QUERY_KEY_TOPIC } from '../../../hooks/useTopic';
import { showMessageActive } from '../../../utils/messages';
import ButtonDelete from '../components/Button/ButtonDelete';
import { FormattedMessage, useIntl } from 'react-intl';
import { handleChangeMessage } from '../../../utils';
import { useContextGlobal } from '../../../contexts';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../constants';
import ModalTopic from './ModalTopic';
import Heading from '../components/Heading';
import SkeletonComponent from '../components/Skeleton';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

export const KEY = 'list-topic';

const ListTopic = () => {
    const { locale } = useContextGlobal();
    const intl = useIntl();
    const { data, isLoading } = useQueryConfig([QUERY_KEY_TOPIC, KEY], API_TOPIC);
    const { loading, deleteTopic, restoreTopic, softTopic } = useTopic();
    const [searchTerm, setSearchTerm] = useState('');
    const [indexLoading, setIndexLoading] = useState<any>();

    const handleDeleteTopic = (index: number, id?: string | number) => {
        if (id) {
            setIndexLoading((preId: any) => ({
                ...preId,
                deleteId: index,
            }));
            showMessageActive(
                handleChangeMessage(
                    locale,
                    'Are you sure you want to delete the topic?',
                    'Bạn có chắc chắn muốn xóa chủ đề này không?',
                ),
                '',
                'warning',
                () => {
                    deleteTopic(id);
                },
            );
        }
    };

    const handleRestoreTopic = (index: number, id?: string | number) => {
        if (id) {
            setIndexLoading((preId: any) => ({
                ...preId,
                restoreId: index,
            }));

            restoreTopic(id);
        }
    };

    const handleSoftTopic = (index: number, id?: string | number) => {
        if (id) {
            setIndexLoading((preId: any) => ({
                ...preId,
                softId: index,
            }));
            softTopic(id);
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
            render: (_: any, topic: ITopic, index: number) => (
                <div className="flex gap-2">
                    <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_EDIT}>
                        <ModalTopic initialValues={topic} isUpdate={true} />
                    </PermissionElement>
                    {topic.deleted_at ? (
                        <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonEdit onClick={() => handleRestoreTopic(index, topic.id)}>
                                {loading && indexLoading.restoreId === index ? (
                                    <LoadingSmall color="color-primary" />
                                ) : (
                                    <RefreshCcw />
                                )}
                            </ButtonEdit>
                        </PermissionElement>
                    ) : (
                        <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonEdit onClick={() => handleSoftTopic(index, topic.id)}>
                                <CircleX />
                            </ButtonEdit>
                        </PermissionElement>
                    )}

                    {topic.deleted_at ? (
                        ''
                    ) : (
                        <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_DELETE}>
                            <ButtonDelete
                                loading={loading && indexLoading.deleteId === index}
                                onClick={() => handleDeleteTopic(index, topic.id)}
                            ></ButtonDelete>
                        </PermissionElement>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <div>
                <Heading>
                    <FormattedMessage id="admin.listTopic" />{' '}
                </Heading>
                <div className="flex justify-between">
                    <PermissionElement keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_ADD}>
                        <ModalTopic />
                    </PermissionElement>
                    <div className="mb-4 text-end relative">
                        <input
                            placeholder={intl.formatMessage({ id: 'topic.message' })}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-[280px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                        <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                    </div>
                </div>
                {isLoading ? (
                    <SkeletonComponent className="mt-10" />
                ) : (
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={filteredData} />
                )}
            </div>
        </>
    );
};

export default ListTopic;
