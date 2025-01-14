import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Input, Modal, Skeleton, Tag, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { QUERY_KEY } from '../../../../hooks/useUser';
import { IUser } from '../../../../interfaces/IUser';
import { formatTime } from '../../../../utils';
import { CopyPlus, Search, SearchXIcon } from 'lucide-react';
import TableAdmin from '../../components/Table';
import ButtonEdit from '../../components/Button/ButtonEdit';
import PaginationComponent from '../../../../components/Pagination';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ModalUser = ({ setUser }: any) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('pageUser') || 1;
    const searchKey = params.get('searchUser') || '';
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { data: dataUser, isFetching } = useQueryConfig(
        [QUERY_KEY, `list/user?page=${page}&search=${searchKey}`],
        `api/user?paginate=true&per_page=5&page=${page}&search=${searchKey}&include=profile,group&times=user`,
    );
    const totalItems = dataUser?.data?.users.paginator?.total_item || 0;
    const pageSize = dataUser?.data?.users.paginator?.per_page || 5;
    const handlePageChange = (page: number) => {
        params.set('pageUser', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleSearch = () => {
        params.delete('pageUser');
        params.set('searchUser', search);
        navigate(`?${params.toString()}`, { replace: true });
    };
    const handleRemoveSearch = () => {
        setSearch('');
        params.delete('searchUser');
        params.delete('pageUser');
        navigate(`?${params.toString()}`, { replace: true });
    };

    useEffect(() => {
        if (dataUser?.data.users.data) {
            setUsers(dataUser?.data.users.data);
        } else {
            setUsers([]);
        }
    }, [dataUser]);

    const filterUser = (e: any) => {
        const dataOrigin = JSON.parse(JSON.stringify([...dataUser?.data.users.data]));
        if (e.target.value !== '') {
            const filtered = dataOrigin.filter((item: IUser) => {
                return (
                    item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.id.toString().includes(e.target.value.toLowerCase())
                );
            });
            setUsers([...filtered]);
        } else {
            setUsers([...dataUser?.data.users.data]);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: <FormattedMessage id="user.table.user" />,
            dataIndex: 'name',
            key: 'user',
            render: (_: any, record: IUser) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={record.avatar_url} size={40} icon={<UserOutlined />} />
                    <div style={{ marginLeft: '10px' }}>
                        <Text
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: '250px',
                                display: 'inline-block',
                            }}
                        >
                            {record.name}
                        </Text>
                        <br />
                        <Text type="secondary">{record.email}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: <FormattedMessage id="user.table.status" />,
            dataIndex: 'status',
            key: 'status',
            render: (status: any) => {
                let color = status === 'active' ? 'green' : 'gray';
                return (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color={color}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: <FormattedMessage id="phone" />,
            dataIndex: 'phone',
            key: 'phone',
            render: (profile: any) => {
                return <p>{formatTime(profile?.phone)}</p>;
            },
        },
        {
            title: <FormattedMessage id="user.table.group" />,
            dataIndex: 'group',
            key: 'group',
            render: (group: any) => {
                return (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center">
                        {group?.group_name}
                    </Tag>
                );
            },
        },
        {
            title: <FormattedMessage id="user.table.Email_verified_at" />,
            dataIndex: 'email_verified_at',
            key: 'email_verified_at',
            render: (email_verified_at: string) => {
                return <p>{formatTime(email_verified_at)}</p>;
            },
        },
        {
            title: <FormattedMessage id="category.table.action" />,
            dataIndex: 'email_verified_at',
            key: 'email_verified_at',
            render: (_: number, user: any) => (
                <ButtonEdit
                    onClick={() => {
                        handleOk();
                        setUser(user);
                    }}
                >
                    <CopyPlus />
                </ButtonEdit>
            ),
        },
    ];

    return (
        <>
            <button
                onClick={showModal}
                className="px-5 py-3 bg-primary text-white rounded-lg hover:opacity-70 transition-global"
            >
                <FormattedMessage id="Select_customer" />
            </button>
            <Modal
                width={1500}
                title={
                    <h3 className="text-[32px] font-medium">
                        <FormattedMessage id="Choose_User" />
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <>
                    {isFetching ? (
                        <Skeleton />
                    ) : (
                        <section>
                            <div className="my-6 flex justify-end">
                                <div className="relative">
                                    <Input
                                        className={`w-[380px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                        onChange={(e) => setSearch(e?.target?.value)}
                                        placeholder={intl.formatMessage({ id: 'user.User_Users_Input_section' })}
                                        value={search}
                                    />
                                    <SearchXIcon
                                        onClick={handleRemoveSearch}
                                        className="absolute top-1/2 right-4 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global"
                                    />
                                    <Search
                                        onClick={handleSearch}
                                        className="absolute top-1/2 right-16 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global"
                                    />
                                </div>
                            </div>
                            <TableAdmin columns={columns} dataSource={users} pagination={false} />
                            <div className="mt-8">
                                <PaginationComponent
                                    page={page || (1 as any)}
                                    totalItems={totalItems}
                                    pageSize={pageSize}
                                    handlePageChange={handlePageChange}
                                />
                            </div>
                        </section>
                    )}
                </>
            </Modal>
        </>
    );
};

export default ModalUser;
