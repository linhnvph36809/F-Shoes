import React, { useState } from 'react';
import { Table, Tag, Button, Input, Select, Card, Row, Col, Dropdown, Menu, Typography, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined, EyeOutlined, EllipsisOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import Heading from '../../components/Heading';

const { Option } = Select;
const { Title } = Typography;
const { Text } = Typography;

const ListUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [planFilter, setPlanFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State để lưu các hàng đã chọn

    // Dữ liệu giả lập cho bảng
    const data = [
        {
            key: '1',
            avatar: 'https://i.pravatar.cc/150?img=1',
            user: 'Zassaa McCleverty',
            email: 'zmcleverty@soundcloud.com',
            role: 'Maintainer',
            plan: 'Enterprise',
            billing: 'Auto Debit',
            status: 'Active',
        },
        {
            key: '2',
            user: 'Yoko Pottie',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'ypottie@privacy.gov.au',
            role: 'Subscriber',
            plan: 'Basic',
            billing: 'Auto Debit',
            status: 'Inactive',
        },
        {
            key: '2',
            user: 'Yoko Pottie',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'ypottie@privacy.gov.au',
            role: 'Subscriber',
            plan: 'Basic',
            billing: 'Auto Debit',
            status: 'Inactive',
        },
        {
            key: '2',
            user: 'Yoko Pottie',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'ypottie@privacy.gov.au',
            role: 'Subscriber',
            plan: 'Basic',
            billing: 'Auto Debit',
            status: 'Inactive',
        },
        // Thêm các hàng khác
    ];

    // Các cột cho bảng
    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (_: any, record: UserRecord) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Display user's avatar */}
                    <Avatar src={record.avatar} size={40} />
                    <div style={{ marginLeft: '10px' }}>
                        {/* Display user's name */}
                        <Text strong>{record.user}</Text>
                        <br />
                        {/* Display user's email */}
                        <Text type="secondary">{record.email}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <Tag color="blue">{role}</Tag>,
        },
        {
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Billing',
            dataIndex: 'billing',
            key: 'billing',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => {
                let color = status === 'Active' ? 'green' : status === 'Pending' ? 'orange' : 'gray';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button icon={<EyeOutlined />} />
                    <Button icon={<DeleteOutlined />} />
                    <Dropdown overlay={<Menu items={[{ key: '1', label: 'Option 1' }, { key: '2', label: 'Option 2' }]} />}>
                        <Button icon={<EllipsisOutlined />} />
                    </Dropdown>
                </div>
            ),
        },
    ];

    // Cấu hình rowSelection để thêm cột checkbox
    
    const StatCard = ({ title, value, percentage, description, icon, color }: any) => (
        <Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
            <Row justify="space-between" align="middle">
                <Col>
                    <h3>{title}</h3>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>{value} <span style={{ color: color }}>{percentage}</span></h1>
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

            <div style={{ margin: '22px 0' }}>

            <Title level={5} style={{ marginBottom: '20px' }}>Filters</Title>
                {/* Bộ lọc */}
                <Row gutter={[16, 16]} align="middle">
            <Col span={8}>
                <Select placeholder="Select Role" style={{ width: '100%' }}>
                    <Option value="Maintainer">Maintainer</Option>
                    <Option value="Subscriber">Subscriber</Option>
                    <Option value="Editor">Editor</Option>
                </Select>
            </Col>
            <Col span={8}>
                <Select placeholder="Select Plan" style={{ width: '100%' }}>
                    <Option value="Enterprise">Enterprise</Option>
                    <Option value="Basic">Basic</Option>
                    <Option value="Team">Team</Option>
                </Select>
            </Col>
            <Col span={8}>
                <Select placeholder="Select Status" style={{ width: '100%' }}>
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                    <Option value="Pending">Pending</Option>
                </Select>
            </Col>
        </Row>
        <Row style={{ marginTop: '25px' }} align="middle" justify="space-between">
            <Col>
                {/* Số lượng hiển thị */}
                <Select defaultValue="10" style={{ width: 70 }}>
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    <Option value="50">50</Option>
                </Select>
            </Col>

            <Col style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* Ô tìm kiếm */}
                <Input.Search
                    placeholder="Search User"
                    onSearch={(value) => setSearchTerm(value)}
                    style={{ width: 200 }}
                />

                {/* Nút Export */}
                <Dropdown  placement="bottomRight">
                    <Button icon={<DownloadOutlined />} style={{ backgroundColor: '#f0f0f0', border: 'none' }}>
                        Export
                    </Button>
                </Dropdown>

                {/* Nút Add New User */}
                <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#7265e6', color: 'white' }}>
                    Add New User
                </Button>
            </Col>
        </Row>
            </div>

            {/* Bảng quản lý người dùng với cột checkbox */}
            <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox' }}
      />
        </div>
    );
};

export default ListUser;
