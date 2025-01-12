import { useState, useMemo } from 'react';
import { CircleX, RefreshCcw, Trash2 } from 'lucide-react';
import { Input } from 'antd';

import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { IPost } from '../../../interfaces/IPost';
import usePost, { API_POST, QUERY_KEY } from '../../../hooks/usePosts';

import Heading from '../components/Heading';
import ButtonDelete from '../components/Button/ButtonDelete';
import { FormattedMessage, useIntl } from 'react-intl';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import { ACTIONS, LANGUAGE, LANGUAGE_VI, PERMISSION } from '../../../constants';
import ModalFormPost from './ModalFormPost';
import SkeletonComponent from '../components/Skeleton';
import { showMessageActive } from '../../../utils/messages';
import { handleChangeMessage, handleGetLocalStorage } from '../../../utils';
import ButtonRestore from '../components/Button/ButtonRestore';

export const KEY = 'list-posts';

const ListPost = () => {
    const intl = useIntl();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data, isLoading } = useQueryConfig([QUERY_KEY, KEY], API_POST);
    const { loading, deletePost, restorePost, softPost } = usePost();
    const [indexLoading, setIndexLoading] = useState<any>();

    const handleDeletePost = (index: number, id?: string | number) => {
        if (id) {
            setIndexLoading((preId: any) => ({
                ...preId,
                deleteId: index,
            }));
            showMessageActive(
                handleChangeMessage(
                    handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI,
                    'Are you sure you want to delete the post?',
                    'Bạn có chắc chắn muốn xóa bài viết này không?',
                ),
                '',
                'warning',
                () => {
                    deletePost(id);
                },
            );
        }
    };

    const handleRestorePost = (index: number, id?: string | number) => {
        if (id) {
            setIndexLoading((preId: any) => ({
                ...preId,
                restoreId: index,
            }));
            restorePost(id);
        }
    };

    const handleSoftPost = (index: number, id?: string | number) => {
        if (id) {
            setIndexLoading((preId: any) => ({
                ...preId,
                softId: index,
            }));
            softPost(id);
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
            title: <FormattedMessage id="post.table.title" />,
            dataIndex: 'title',
            key: '2',
        },
        {
            title: <FormattedMessage id="post.table.image" />,
            dataIndex: 'theme',
            key: '3',
            render: (_: any, { theme }: { theme: string }) => (
                <img src={theme} alt="" className="w-[60px] h-[80px] object-cover" />
            ),
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: '4',
        },
        {
            title: <FormattedMessage id="post.table.author" />,
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
            title: <FormattedMessage id="post.table.Created_At" />,
            dataIndex: 'created_at',
            key: '6',
        },
        {
            title: <FormattedMessage id="post.table.Action" />,
            dataIndex: 'id',
            key: '7',
            render: (_: any, post: IPost, index: number) => (
                <div className="flex gap-2">
                    <PermissionElement keyName={PERMISSION.PERMISSION_POST} action={ACTIONS.ACTIONS_EDIT}>
                        <ModalFormPost isUpdate={true} initialValues={post} />
                    </PermissionElement>
                    {post.deleted_at ? (
                        <PermissionElement keyName={PERMISSION.PERMISSION_POST} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonRestore loading={loading && indexLoading.restoreId === index} onClick={() => handleRestorePost(index, post.id)} />
                        </PermissionElement>
                    ) : (
                        <PermissionElement keyName={PERMISSION.PERMISSION_POST} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonEdit loading={loading && indexLoading.softId === index} onClick={() => handleSoftPost(index, post.id)}>
                                <CircleX />
                            </ButtonEdit>
                        </PermissionElement>
                    )}
                    {post.deleted_at ? (
                        ''
                    ) : (
                        <PermissionElement keyName={PERMISSION.PERMISSION_POST} action={ACTIONS.ACTIONS_DELETE}>
                            <ButtonDelete loading={loading && indexLoading.deleteId === index} onClick={() => handleDeletePost(index, post.id)} />
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
                    <FormattedMessage id="post.List_Post" />
                </Heading>
                <div className="flex justify-between">
                    <div>
                        <PermissionElement keyName={PERMISSION.PERMISSION_POST} action={ACTIONS.ACTIONS_ADD}>
                            <ModalFormPost />
                        </PermissionElement>
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
                {isLoading ? (
                    <SkeletonComponent className="mt-10" />
                ) : (
                    <TableAdmin
                        expandable={{
                            expandedRowRender: (record: any) => {
                                return (
                                    <>
                                        <div dangerouslySetInnerHTML={{
                                            __html: record?.content,
                                        }}>

                                        </div>
                                    </>
                                );
                            },

                            rowExpandable: (record: any) => record.id !== '',
                        }}
                        rowKey={(record: any) => `table-${record.id}`}
                        scroll={{ x: '' }} columns={columns} datas={filteredData} />
                )}
            </div>
        </>
    );
};

export default ListPost;
