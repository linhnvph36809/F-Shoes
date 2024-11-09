import { Link } from 'react-router-dom';
import { CircleX, RefreshCcw, SquarePen, Trash2 } from 'lucide-react';
import { Input } from 'antd';
import { useState } from 'react';

import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import { ITopic } from '../../../interfaces/ITopic';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { IPost } from '../../../interfaces/IPost';
import usePost from '../../../hooks/usePosts';
import ButtonPrimary from '../../../components/Button';

const ListPost = () => {
    const [searchTerm, setSearchTerm] = useState<any>();
    const { data, isFetching, refetch } = useQueryConfig('posts', '/api/posts');
    const { deletePost, loading, postPost, restorePost, softPost } = usePost();

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

    // const filteredData = data?.data.filter((topic: ITopic) =>
    //     topic.topic_name.toLowerCase().includes(searchTerm.toLowerCase()),
    // );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: '2',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: '3',
        },
        {
            title: 'Author',
            dataIndex: 'slug',
            key: '3',
        },

        {
            title: 'Topic',
            dataIndex: 'topic_id',
            key: '4',
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
            title: 'Created At',
            dataIndex: 'created_at',
            key: '3',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: '5',
            render: (_: any, post: IPost) => (
                <div className="flex gap-2">
                    <Link to={`/admin/topic/${post.id}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    <ButtonEdit>
                        {post.deleted_at ? (
                            <RefreshCcw onClick={() => handleRestorePost(post.id)} />
                        ) : (
                            <CircleX onClick={() => handleSoftPost(post.id)} />
                        )}
                    </ButtonEdit>
                    {post.deleted_at ? (
                        ''
                    ) : (
                        <ButtonEdit onClick={() => handleDeletePost(post.id)}>{<Trash2 />}</ButtonEdit>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            {false ? (
                <LoadingBlock />
            ) : (
                <div>
                    <div className="flex justify-between">
                        <div>
                            <Link to="/admin/add-posts">
                                <ButtonPrimary width="w-[150px]" height="h-[50px]">
                                    Add Post
                                </ButtonPrimary>
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Input
                                placeholder="Search by Topic Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                allowClear
                                className="w-full h-[40px]
                            border-1 border-[#111111] focus:shadow
                            font-medium focus:border-[#111111] hover:border-[#111111] px-5"
                            />
                        </div>
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={data?.data} />
                </div>
            )}
        </>
    );
};

export default ListPost;
