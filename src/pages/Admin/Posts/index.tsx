import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CircleX, RefreshCcw, SquarePen, Trash2 } from 'lucide-react';
import { Input } from 'antd';

import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { IPost } from '../../../interfaces/IPost';
import usePost, { API_POST } from '../../../hooks/usePosts';

import { PATH_ADMIN } from '../../../constants/path';
import Heading from '../components/Heading';
import ButtonAdd from '../components/Button/ButtonAdd';
import ButtonDelete from '../components/Button/ButtonDelete';
import { FormattedMessage, useIntl } from 'react-intl';

export const KEY = 'list-posts';

const ListPost = () => {
    const intl = useIntl();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_POST);
    const { deletePost, restorePost, softPost } = usePost();

    const handleDeletePost = (id?: string | number) => {
        if (id) {
            deletePost(id);
            refetch();
        }
    };

    const handleRestorePost = (id?: string | number) => {
        if (id) {
            restorePost(id);
            refetch();
        }
    };

    const handleSoftPost = (id?: string | number) => {
        if (id) {
            softPost(id);
            refetch();
        }
    };

    const filteredData = useMemo(() => {
        return data?.data.filter((post: IPost) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [data, searchTerm]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: <FormattedMessage id="post.table.title"/>,
            dataIndex: 'title',
            key: '2',
        },
        {
            title: <FormattedMessage id="post.table.image"/>,
            dataIndex: 'theme',
            key: '3',
            render: (_: any, { theme }: { theme: string }) => (
                <img src={theme} alt="" className="w-[60px] h-[80px] object-cover" />
            ),
        },
        // {
        //     title: 'Slug',
        //     dataIndex: 'slug',
        //     key: '4',
        // },
        {
            title: <FormattedMessage id="post.table.author"/>,
            dataIndex: 'topic_id',
            key: '5',
            render: (_: any, post: any) => (
                <div className="flex gap-x-5 items-center">
                    <div>
                        <img src={post?.author_id?.avatar_url} alt="" className="w-[40px] h-[40px] rounded-full" />
                    </div>
                    <div>
                        <p className="color-primary text-[16px]">{post?.author_id.name}</p>
                        <span className="text-[14px] color-gray">{post?.author_id.email}</span>
                    </div>
                </div>
            ),
        },
        {
            title:<FormattedMessage id="post.table.Created_At"/>,
            dataIndex: 'created_at',
            key: '6',
        },
        {
            title: <FormattedMessage id="post.table.Action"/>,
            dataIndex: 'id',
            key: '7',
            render: (_: any, post: IPost) => (
                <div className="flex gap-2">
                    <Link to={`/admin/update-posts/${post.id}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    {post.deleted_at ? (
                        <ButtonEdit onClick={() => handleRestorePost(post.id)} >
                            <RefreshCcw />
                        </ButtonEdit>
                    ) : (
                        <ButtonEdit onClick={() => handleSoftPost(post.id)}>
                            <CircleX />
                        </ButtonEdit>
                    )}
                    {post.deleted_at ? (
                        ''
                    ) : (
                        <ButtonDelete onClick={() => handleDeletePost(post.id)}>{<Trash2 />}</ButtonDelete>
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
                    <Heading><FormattedMessage id="post.List_Post" /></Heading>
                    <div className="flex justify-between">
                        <div>
                            <ButtonAdd to={PATH_ADMIN.ADD_POST} title={intl.formatMessage({ id: 'post.add' })} ></ButtonAdd>
                        </div>
                        <div className="mb-4">
                            <Input
                                placeholder={intl.formatMessage({ id: 'post.search' })}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                allowClear
                                className={`w-[250px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                        </div>
                    </div>
                    <TableAdmin scroll={{ x: '' }} rowKey="id" columns={columns} datas={filteredData} />
                </div>
            )}
        </>
    );
};

export default ListPost;
