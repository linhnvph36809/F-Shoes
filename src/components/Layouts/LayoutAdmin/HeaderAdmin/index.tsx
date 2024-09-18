import React from 'react';
import {
    HomeOutlined,
    SwapOutlined,
    WalletOutlined,
    BankOutlined,
    CreditCardOutlined,
    SettingOutlined,
    BellOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Input, Avatar, Space, Badge } from 'antd';
// Import component AdminDashboard
import AdminDashboard from './../../../../pages/DashboardAdmin/index';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const HeaderAdmin = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sider width={230} style={{ backgroundColor: '#f0f2f5', paddingLeft: '20px' }}>
                <div className="text-blue-600 font-bold mb-10 flex items-center space-x-2 p-5 text-28px">
                    <BankOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                    <span>BankDash.</span>
                </div>
                <nav>
                    <ul className="space-y-7 px-5 color-gray font-semibold">
                        <li className="flex items-center">
                            <HomeOutlined className="mr-6" /> Dashboard
                        </li>
                        <li className="flex items-center">
                            <SwapOutlined className="mr-6" /> Transactions
                        </li>
                        <li className="flex items-center">
                            <WalletOutlined className="mr-6" /> Accounts
                        </li>
                        <li className="flex items-center">
                            <BankOutlined className="mr-6" /> Investments
                        </li>
                        <li className="flex items-center">
                            <CreditCardOutlined className="mr-6" /> Credit Cards
                        </li>
                        <li className="flex items-center">
                            <SettingOutlined className="mr-6" /> Services
                        </li>
                        <li className="flex items-center">
                            <SettingOutlined className="mr-6" /> Settings
                        </li>
                    </ul>
                </nav>
            </Sider>

            {/* Main Content */}
            <Layout>
                {/* Header */}
                <Header className="bg-white shadow p-5 flex justify-between items-center">
                    <h3 className="ml-5 text-28px font-semibold">Overview</h3>
                    <div className="flex items-center space-x-4">
                        <Input.Search placeholder="Search for something" style={{ width: 400 }} />
                    </div>
                    <div className="flex items-center space-x-4 mt-3">
                        <Space size="large">
                            <button>
                                <SettingOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />
                            </button>
                            <button>
                                <Badge className="mr-10" count={9}>
                                    <BellOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                                </Badge>
                            </button>
                        </Space>
                        <button className="pb-6">
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </button>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default HeaderAdmin;
