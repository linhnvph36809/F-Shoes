import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ConfigProvider, Dropdown, Layout, Menu } from 'antd';
import { ref, onValue } from 'firebase/database';
import './style.scss';

import { items } from './datas';
import { db } from '../../../../firebaseConfig';
import { useContextGlobal } from '../../../contexts';
import Logo from '../../Logo';
import { Bell, Globe, LogOut } from 'lucide-react';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useAuth from '../../../hooks/useAuth';
import { LANGUAGE_EN, LANGUAGE_VI } from '../../../constants';
import { FormattedMessage } from 'react-intl';

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
    const { locale, changeLanguage, user } = useContextGlobal();
    const { logout } = useAuth();

    useEffect(() => {
        const starCountRef = ref(db, `groups/${user?.group_id}`);
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
    }, [user]);

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
    }, [permissions, user]);
    const { data: countOrderWaiting } = useQueryConfig(
        ['orders', 'products', 'count-order-waiting'],
        'api/v1/statistics/count/order/waitings',
    );
    const [messageWaitingConfirm, setMessageWaitingConfirm] = useState(false);

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
                    <Header className="bg-white px-5 py-10 flex justify-between items-center h-[70px]">
                        <h3 className="text-[32px] font-semibold pl-5">
                            <FormattedMessage id="admin.Overview" />
                        </h3>
                        <div
                            className="flex items-center gap-x-12"
                            onMouseEnter={() => setMessageWaitingConfirm(true)}
                            onMouseLeave={() => setMessageWaitingConfirm(false)}
                        >
                            <Dropdown
                                className="hover:cursor-pointer"
                                overlay={
                                    <Menu className="color-primary font-medium">
                                        <Menu.Item onClick={() => changeLanguage(LANGUAGE_VI)}>Viet Nam</Menu.Item>
                                        <Menu.Item onClick={() => changeLanguage(LANGUAGE_EN)}>English</Menu.Item>
                                    </Menu>
                                }
                                trigger={['click']}
                            >
                                <p className="text-[14px] color-primary font-medium hover:opacity-70 flex items-center gap-x-3">
                                    <Globe className="w-8" />
                                    {locale === LANGUAGE_VI ? 'Viet Nam' : 'English'}
                                </p>
                            </Dropdown>
                            <div className="relative">
                                <span className="absolute -right-3 -top-2 flex items-center justify-center w-[18px] h-[18px] text-white font-medium text-[12px] rounded-full bg-[#d33918]">
                                    {countOrderWaiting?.data?.data ? countOrderWaiting?.data?.data : ''}
                                </span>
                                <Bell className="size-10" />
                                {messageWaitingConfirm ? (
                                    <div className="w-[480px] h-[40px] absolute bg-slate-200 right-0 rounded-lg flex items-center justify-center text-gray-500 transition-all">
                                        {countOrderWaiting?.data?.data ? (
                                            <p>
                                                {`You have ${countOrderWaiting?.data?.data} orders on waiting confirmation. `}
                                                <Link to={`/admin/orderlist?status=waiting_confirm`}>
                                                    <FormattedMessage id="admin.Checkout!" />
                                                </Link>
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div
                                className="flex items-center gap-x-2 text-[16px] font-medium hover:cursor-pointer hover:opacity-50 transition-global"
                                onClick={() => logout()}
                            >
                                <FormattedMessage id="admin.logout" /> <LogOut />
                            </div>
                        </div>
                    </Header>
                    <Content className=" my-4 p-10 bg-[#F5F6FA]">
                        <div className="bg-white p-10 rounded-[14px] min-h-[100vh]">
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ContextAdmin.Provider>
    );
};

export default LayoutAdmin;
