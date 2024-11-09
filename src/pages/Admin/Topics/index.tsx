import { Link } from 'react-router-dom';
import { CircleX, RefreshCcw, SquarePen, Trash2 } from 'lucide-react';
import { Input } from 'antd';
import { useState } from 'react';

import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import useQueryConfig from '../../../hooks/useQueryConfig';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import useTopic from '../../../hooks/useTopic';
import { ITopic } from '../../../interfaces/ITopic';
import FormTopic from './FormTopic';

const ListTopic = ({ initialValues }: any) => {
    const { data, isFetching, refetch } = useQueryConfig('topic-add', 'api/topics');
    const { deleteTopic, postTopic, restoreTopic, softGroup } = useTopic();

    const [searchTerm, setSearchTerm] = useState('');

    const onFinish = (value: any) => {
        postTopic(value);
        refetch();
    };

    const handleDeleteTopic = (id?: string | number) => {
        if (id) {
            deleteTopic(id);
            refetch();
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
            softGroup(id);
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
                    <ButtonEdit>
                        {topic.deleted_at ? (
                            <RefreshCcw onClick={() => handleRestoreTopic(topic.id)} />
                        ) : (
                            <CircleX onClick={() => handleSoftTopic(topic.id)} />
                        )}
                    </ButtonEdit>
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
