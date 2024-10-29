import React from 'react';
import { Outlet } from 'react-router-dom';
import { Avatar, Badge, ConfigProvider, Input, Layout, Menu, Space } from 'antd';
import { UserOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';

import './style.scss';
import { items } from './datas';

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    width: '300px',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
    backgroundColor: '#fff',
};

const LayoutAdmin: React.FC = () => {
    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical flex justify-center py-8">
                    <svg width={59} height={22} viewBox="0 0 59 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M58.9262 0.772461L15.8854 19.0298C12.302 20.5502 9.28743 21.3087 6.85813 21.3087C4.12475 21.3087 2.13358 20.3442 0.910756 18.4184C-0.674992 15.9335 0.0181595 11.9381 2.73845 7.72033C4.35363 5.25506 6.40692 2.99251 8.40791 0.828045C7.93709 1.59313 3.78145 8.5083 8.32617 11.7648C9.22531 12.4187 10.5037 12.7391 12.0764 12.7391C13.3384 12.7391 14.7869 12.5332 16.3792 12.1179L58.9262 0.772461Z"
                            fill="#111111"
                        />
                    </svg>
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemSelectedColor: '#111111',
                                itemActiveBg: '#ccc',
                                itemSelectedBg: '#ccc',
                            },
                        },
                    }}
                >
                    <Menu
                        theme="light"
                        mode="inline"
                        className="text-[15px] font-medium"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                </ConfigProvider>
            </Sider>
            <Layout className="ml-[250px]">
                <Header className="bg-white shadow p-5 flex justify-between items-center">
                    <h3 className="ml-5 text-[32px] font-semibold">Overview</h3>
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
                <Content className="my-4 p-10 bg-white min-h-[1000px]">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
