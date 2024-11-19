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
import Swal from 'sweetalert2';

export const KEY = 'list-topic';

const ListTopic = ({ initialValues }: any) => {
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
            title: 'Topic Name',
            dataIndex: 'topic_name',
            key: '2',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: '3',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: '4',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: '5',
            render: (_: any, topic: ITopic) => (
                <div className="flex gap-2">
                    <Link to={`/admin/topic/${topic.id}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    {topic.deleted_at ? (
                        <ButtonEdit onClick={() => handleRestoreTopic(topic.id)}>
                            <RefreshCcw />
                        </ButtonEdit>
                    ) : (
                        <ButtonEdit onClick={() => handleSoftTopic(topic.id)}>
                            <CircleX />
                        </ButtonEdit>
                    )}

                    {topic.deleted_at ? (
                        ''
                    ) : (
                        <ButtonEdit onClick={() => handleDeleteTopic(topic.id)}>{<Trash2 />}</ButtonEdit>
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
                    <FormTopic title="List Topic" initialValues={initialValues} onFinish={onFinish} />
                    <div className="mb-4 text-end">
                        <Input
                            placeholder="Search by Topic Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            allowClear
                            className="w-3/12 h-[40px]
                            border-1 border-[#111111] focus:shadow
                            font-medium focus:border-[#111111] hover:border-[#111111] px-5"
                        />
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={filteredData} />
                </div>
            )}
        </>
    );
};

export default ListTopic;
