import { Link, Outlet } from 'react-router-dom';
import { ConfigProvider, Layout, Menu } from 'antd';
import { ref, onValue } from 'firebase/database';
import './style.scss';

import { items } from './datas';
import { db } from '../../../../firebaseConfig';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useContextGlobal } from '../../../contexts';
import Logo from '../../Logo';

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

const ContextAdmin = createContext<any>({});
export const usePermissionContext = () => useContext(ContextAdmin);

const LayoutAdmin: React.FC = () => {
    const [permissions, setPermissions] = useState<any>();
    const { user } = useContextGlobal();
    useEffect(() => {
        const starCountRef = ref(db, `groups/${user?.group_id || 1}`);
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            try {
                const data = snapshot.val();
                const newValue = JSON.parse(data);
                setPermissions(JSON.parse(newValue));
            } catch (error) {
                console.log(error);
            }
        });

        return () => unsubscribe();
    }, []);

    const itemsPermission = useMemo(() => {
        return items?.filter((item: any) => {
            if (item.permissionName !== undefined) {
                if (permissions?.[item.permissionName]?.length == 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    }, [permissions]);

    return (
        <ContextAdmin.Provider value={{ permissions }}>
            <Layout hasSider>
                <Sider style={siderStyle}>
                    <div className="demo-logo-vertical flex justify-center py-8">
                        <Link to="/admin">
                            <Logo />
                        </Link>
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
                            items={itemsPermission}
                        />
                    </ConfigProvider>
                </Sider>
                <Layout className="ml-[250px] relative min-h-[100vh]">
                    <Header className="bg-white shadow p-5 flex justify-between items-center">
                        <h3 className="ml-5 text-[32px] font-semibold">Overview</h3>
                    </Header>
                    <Content className=" my-4 p-10 bg-[#F5F6FA]">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </ContextAdmin.Provider>
    );
};

export default LayoutAdmin;
