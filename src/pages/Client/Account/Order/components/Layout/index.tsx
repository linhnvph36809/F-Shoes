import { ConfigProvider, Menu } from 'antd';
import { Outlet } from 'react-router-dom';

import Sider from 'antd/es/layout/Sider';
import MENU_ITEM from './datas';

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    borderRight: '1px solid rgba(5, 5, 5, 0.06)',
};

const LayoutOrderProfile = () => {
    return (
        <section className="flex gap-x-10 py-5">
            <div className="w-2/12">
                <Sider style={siderStyle}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    itemSelectedColor: '#111111',
                                    itemActiveBg: '#ccc',
                                    itemSelectedBg: '#f5f5f5',
                                },
                            },
                        }}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            className="text-[15px] font-medium"
                            defaultSelectedKeys={['1']}
                            items={MENU_ITEM}
                        />
                    </ConfigProvider>
                </Sider>
            </div>
            <div className="w-10/12">
                <Outlet />
            </div>
        </section>
    );
};

export default LayoutOrderProfile;
