import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, message, Row, Tag, Typography } from 'antd';
import { SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingBlock from '../../../../components/Loading/LoadingBlock';
import useUser from '../../../../hooks/useUser';
import { IUser } from '../../../../interfaces/IUser';
import ButtonEdit from '../../components/Button/ButtonEdit';
import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';

const { Text } = Typography;

const ListUser = () => {
    const { users, loading, deleteUser } = useUser();

    // Hàm xử lý xoá người dùng
    const handleDeleteUser = async (id: string | number) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá người dùng này không?')) {
            try {
                await deleteUser(id); // Giả sử deleteUser trả về kết quả thành công hoặc lỗi

                message.success('Xóa người dùng thành công!');
            } catch (error) {
                message.error('Đã xảy ra lỗi khi xóa người dùng. Vui lòng thử lại.');
            }
        }
    };

    // Define table columns
    const columns = [
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
                let color = status === 'Active' ? 'green' : status === 'Pending' ? 'orange' : 'gray';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, values: IUser) => (
                <div className="flex-row-center gap-x-5">
                    <Link to={`/admin/update-user/${values.id}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    <ButtonEdit onClick={() => handleDeleteUser(values.id)}>
                        <Trash2 />
                    </ButtonEdit>
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
                    <h3>{title}</h3>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>
                        {value} <span style={{ color: color }}>{percentage}</span>
                    </h1>
                    <p style={{ color: 'gray', margin: 0 }}>{description}</p>
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
        <div style={{ padding: '20px' }}>
            <Heading>List Users</Heading>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <StatCard
                        title="Session"
                        value="21,459"
                        percentage="(+29%)"
                        description="Total Users"
                        color="#d4d4ff"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#6c63ff' }} />}
                    />
                </Col>
                <Col span={6}>
                    <StatCard
                        title="Paid Users"
                        value="4,567"
                        percentage="(+18%)"
                        description="Last week analytics"
                        color="#ffd6d6"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#ff6666' }} />}
                    />
                </Col>
                <Col span={6}>
                    <StatCard
                        title="Active Users"
                        value="19,860"
                        percentage="(-14%)"
                        description="Last week analytics"
                        color="#d6f5e6"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#66cc99' }} />}
                    />
                </Col>
                <Col span={6}>
                    <StatCard
                        title="Pending Users"
                        value="237"
                        percentage="(+42%)"
                        description="Last week analytics"
                        color="#ffecd6"
                        icon={<UserOutlined style={{ fontSize: '20px', color: '#ffa500' }} />}
                    />
                </Col>
            </Row>

            {/* User management table with loading state */}
            <>
                {loading ? (
                    <LoadingBlock />
                ) : (
                    <section>
                        <TableAdmin
                            columns={columns}
                            dataSource={users}
                            pagination={{ pageSize: 8 }}
                            rowSelection={{ type: 'checkbox' }}
                        />
                    </section>
                )}
            </>
        </div>
    );
};

export default ListUser;
