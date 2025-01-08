import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, Row, Skeleton, Tag, Typography } from 'antd';
import { Ban, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import useUser, { QUERY_KEY } from '../../../../hooks/useUser';
import { formatGroupName, formatStatus, IUser } from '../../../../interfaces/IUser';
import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import ButtonAdd from '../../components/Button/ButtonAdd';
import ButtonUpdate from '../../components/Button/ButtonUpdate';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { showMessageActive } from '../../../../utils/messages';
import { useContextGlobal } from '../../../../contexts';
import { formatTime, handleChangeMessage } from '../../../../utils';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PaginationComponent from '../../../../components/Pagination';

const { Text } = Typography;

const ListUser = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const location = useLocation();
    const urlQuery = new URLSearchParams(location.search);
    const page = urlQuery.get('page') || 1;
    const user = urlQuery.get('user') || 'empty';
    const searchKey = urlQuery.get('search') || '';
    const { data: dataCountHasOrder } = useQueryConfig([QUERY_KEY, 'count/has/order'], `api/count/user/has/orders`);
    const dataStatistics = dataCountHasOrder?.data?.count;
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
    };
    const [userBannedId,setUserBannedId] = useState<number>(0);
    const [userRestoreId, setUserRestoreId] = useState<number>(0);
    useEffect(() => {
        
    },[]);
    const { deleteUser,loadingDelete } = useUser();
    const [users, setUsers] = useState<IUser[]>([]);
    const { locale } = useContextGlobal();
    const { data: dataUser, isLoading } = useQueryConfig(
        [QUERY_KEY, `list/user?page=${page}&user=${user}&search=${searchKey}`],
        `api/user?include=profile,group&times=user&paginate=true&per_page=10&page=${page}&user=${user}&search=${searchKey}`,
    );
    const totalItems = dataUser?.data?.users?.paginator?.total_item || 0;
    const pageSize = dataUser?.data?.users?.paginator?.per_page || 10;


    const handleDeleteUser = (id: number | string) => {
        showMessageActive(
            handleChangeMessage(
                locale,
                'Are you sure want to ban this user?',
                'Bạn có chắc muốn hạn chế tài khoản này không?',
            ),
            '',
            'warning',
            () => {
                deleteUser(id);
            },
        );
    };
    const handlePageChange = (page: number) => {
        urlQuery.set('page', `${page}`);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    useEffect(() => {
        if (dataUser?.data.users.data) {
            setUsers(dataUser?.data.users.data);
        } else {
            setUsers([]);
        }
    }, [dataUser]);

    const submitSearch = () => {
        urlQuery.set('search', searchText);
        navigate(`?${urlQuery.toString()}`, { replace: true });
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
                        {formatStatus(status, locale)}
                    </Tag>
                );
            },
        },
        {
            title: <FormattedMessage id="user.table.group" />,
            dataIndex: 'group',
            key: 'group',
            render: (group: any) => {
                return (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center">
                        {formatGroupName(group?.id, group?.group_name, locale)}
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
            title: <FormattedMessage id="user.table.actions" />,
            key: 'actions',
            render: (_: any, values: IUser) => {

                return (
                    <div className="flex-row-center gap-x-5">
                        <ButtonUpdate to={`/admin/update-user/${values.nickname}`}></ButtonUpdate>
                        <Button onClick={() => handleDeleteUser(values.id)} className="w-[50px] h-[40px] font-medium">
                            <Ban />
                        </Button>
                    </div>
                );
            },
        },
    ];

    // Stat card component
    const StatCard = ({ title, value, percentage, description, icon, color }: any) => (
        <Card
            bordered={false}
            style={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}
        >
            <Row justify="space-between" align="middle">
                <Col>
                    <h3 className="font-medium text-[16px]">{title}</h3>
                    <h1 className="font-medium" style={{ fontSize: '24px' }}>
                        {value} <span style={{ color: color }}>{percentage}</span>
                    </h1>
                    <p className="color-gray text-[14px]">{description}</p>
                </Col>
                <Col>
                    <div
                        style={{
                            backgroundColor: color,
                            borderRadius: '8px',
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </div>
                </Col>
            </Row>
        </Card>
    );

    return (
        <div>
            <Heading>
                <FormattedMessage id="user.List_User" />
            </Heading>
            <Row gutter={[16, 16]} className="mb-12">
                <Col span={6}>
                    <Link to="/admin/list-user" className=" hover:bg-slate-300 rounded block p-1 cursor-pointer">
                        <StatCard
                            title={intl.formatMessage({ id: 'user.User_Total_Users' })}
                            value={dataStatistics?.all || 0}
                            description={intl.formatMessage({ id: 'user.User_Total_Users' })}
                            color="#d4d4ff"
                            icon={<UserOutlined style={{ fontSize: '20px', color: '#6c63ff' }} />}
                        />
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="?user=banned" className="hover:bg-slate-300 rounded block p-1 cursor-pointer">
                        <StatCard
                            title={<FormattedMessage id="Inactive_Users" />}
                            value={dataStatistics?.banned || 0}
                            description={intl.formatMessage({ id: 'user.User_Inactive_Users' })}
                            color="#ffd6d6"
                            icon={<UserOutlined style={{ fontSize: '20px', color: '#ff6666' }} />}
                        />
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="?user=active" className="hover:bg-slate-300 rounded p-1 block cursor-pointer">
                        <StatCard
                            title={intl.formatMessage({ id: 'user.User_Active_Users' })}
                            value={dataStatistics?.active || 0}
                            description={intl.formatMessage({ id: 'user.User_Active_Users' })}
                            color="#d6f5e6"
                            icon={<UserOutlined style={{ fontSize: '20px', color: '#66cc99' }} />}
                        />
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="?user=user-with-orders" className="hover:bg-slate-300 rounded p-1 block cursor-pointer">
                        <StatCard
                            title={intl.formatMessage({ id: 'user.User_Users_Ordering_Number' })}
                            value={dataStatistics?.with_orders || 0}
                            description={intl.formatMessage({ id: 'user.User_Users_Ordering_Number' })}
                            color="#ffecd6"
                            icon={<UserOutlined style={{ fontSize: '20px', color: '#ffa500' }} />}
                        />
                    </Link>
                </Col>
            </Row>

            <>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <section>
                        <div className="my-6 flex justify-between">
                            <ButtonAdd to="/admin/add-user" title={intl.formatMessage({ id: 'user.add_user' })} />
                            <div className="relative">
                                <Input
                                    className={`w-[350px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                    onChange={handleSearch}
                                    placeholder={intl.formatMessage({ id: 'user.User_Users_Input_section' })}
                                />
                                <Search onClick={submitSearch} className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                            </div>
                        </div>
                        <TableAdmin columns={columns} dataSource={users} pagination={false} />
                        <PaginationComponent
                            className="mt-4"
                            page={page}
                            pageSize={pageSize}
                            totalItems={totalItems}
                            handlePageChange={handlePageChange}
                        />
                    </section>
                )}
            </>
        </div>
    );
};

export default ListUser;
