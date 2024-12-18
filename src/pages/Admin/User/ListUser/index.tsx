import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Input, Row, Skeleton, Tag, Typography } from 'antd';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { QUERY_KEY } from '../../../../hooks/useUser';
import { IUser } from '../../../../interfaces/IUser';
import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import { formatTime } from '../../../../utils';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import ButtonAdd from '../../components/Button/ButtonAdd';
import ButtonUpdate from '../../components/Button/ButtonUpdate';

const { Text } = Typography;

const ListUser = () => {
    const { data: dataCountHasOrder } = useQueryConfig([QUERY_KEY, 'count/has/order'], `api/count/user/has/orders`);
    const [users, setUsers] = useState<IUser[]>([]);
    const { data: dataUser, isFetching: loading } = useQueryConfig(
        [QUERY_KEY, 'list/user'],
        'api/user?include=profile,group&times=user',
    );

    useEffect(() => {
        if (dataUser?.data.users.data) {
            setUsers(dataUser?.data.users.data);
        } else {
            setUsers([]);
        }
    }, [dataUser]);

    const userHasOrderCount = dataCountHasOrder?.data?.count || 0;
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
    // Define table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: 'User',
            dataIndex: 'name',
            key: 'user',
            render: (_: any, record: IUser) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={record.avatar_url} size={40} icon={<UserOutlined />} />
                    <div style={{ marginLeft: '10px' }}>
                        <Text strong>{record.name}</Text>
                        <br />
                        <Text type="secondary">{record.email}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
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
            title: 'Group ',
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
            title: 'Email verified at',
            dataIndex: 'email_verified_at',
            key: 'email_verified_at',
            render: (email_verified_at: string) => {
                return <p>{formatTime(email_verified_at)}</p>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, values: IUser) => (
                <div className="flex-row-center gap-x-5">
                    <ButtonUpdate to={`/admin/update-user/${values.nickname}`}></ButtonUpdate>
                </div>
            ),
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
            <Heading>List Users</Heading>
            <Row gutter={[16, 16]} className="mb-12">
                <Col span={6}>
                    <StatCard
                        title="Total Users"
                        value={users?.length}
                        description="Total Users"
                        color="#d4d4ff"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#6c63ff' }} />}
                    />
                </Col>
                <Col span={6}>
<StatCard
                        title="Inactive Users"
                        value={users?.filter((u: IUser) => u.status !== 'active').length}
                        description="Banned or Inactive Accounts"
                        color="#ffd6d6"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#ff6666' }} />}
                    />
                </Col>
                <Col span={6}>
                    <StatCard
                        title="Active Users"
                        value={users?.filter((u: IUser) => u.status === 'active').length}
                        description="Active Accounts"
                        color="#d6f5e6"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#66cc99' }} />}
                    />
                </Col>
                <Col span={6}>
                    <StatCard
                        title="Users Ordering Number"
                        value={userHasOrderCount}
                        description="People have made purchases"
                        color="#ffecd6"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#ffa500' }} />}
                    />
                </Col>
            </Row>

            {/* User management table with loading state */}
            <>
                {loading ? (
                    <Skeleton />
                ) : (
                    <section>
                        <div className="my-6 flex justify-between">
                            <ButtonAdd to="/admin/add-user" title="Add User" />
                            <div className="relative">
                                <Input
                                    className={`w-[350px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                    onChange={filterUser}
                                    placeholder="Search an id user or name or email."
                                />
                                <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                            </div>
                        </div>
                        <TableAdmin columns={columns} dataSource={users} pagination={{ pageSize: 8 }} />
                    </section>
                )}
            </>
        </div>
    );
};

export default ListUser;
