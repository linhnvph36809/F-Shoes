import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Avatar, ConfigProvider, Dropdown, Layout, Menu } from 'antd';
import { ref, onValue } from 'firebase/database';
import './style.scss';
import { UserOutlined } from '@ant-design/icons';


import { items } from './datas';
import { db } from '../../../../firebaseConfig';
import { useContextGlobal } from '../../../contexts';
import Logo from '../../Logo';
import { Globe, LogOut } from 'lucide-react';

import useAuth from '../../../hooks/useAuth';
import { INFO_AUTH, LANGUAGE_EN, LANGUAGE_VI } from '../../../constants';
import { FormattedMessage } from 'react-intl';
import { showMessageAdmin } from '../../../utils/messages';
import { handleGetLocalStorage } from '../../../utils';

const { Content, Sider } = Layout;

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

const userName = handleGetLocalStorage(INFO_AUTH.userName);

const LayoutAdmin: React.FC = () => {
    const [permissions, setPermissions] = useState<any>();
    const { locale, changeLanguage, user } = useContextGlobal();
    const groupId = handleGetLocalStorage(INFO_AUTH.groupId);
    const { logoutAdmin } = useAuth();

    useEffect(() => {
        const starCountRef = ref(db, `groups/${groupId}`);
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            try {
                const data = snapshot.val();
                const newValue = JSON.parse(data);
                setPermissions(JSON.parse(newValue));
            } catch (error) {
                showMessageAdmin((error as any).response.data.message || 'Something went wrong!', '', 'error');
            }
        });

        return () => unsubscribe();
    }, [groupId]);

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
    }, [permissions, groupId]);

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
                    <header className="bg-white px-5 py-10 flex justify-between items-center h-[70px]">
                        <h3 className="text-[32px] font-semibold pl-5">
                            <FormattedMessage id="admin.Overview" />
                        </h3>
                        <div
                            className="flex items-center gap-x-12"

                        >
                            <Dropdown
                                className="hover:cursor-pointer"
                                overlay={
                                    <Menu className="color-primary font-medium">
                                        <Menu.Item onClick={() => changeLanguage(LANGUAGE_VI)}>Việt Nam</Menu.Item>
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

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={user?.avatar_url} size={40} icon={<UserOutlined />} />
                                <div style={{ marginLeft: '10px' }}>
                                    <p className='text-[15px] font-medium'>{userName || user?.name}</p>
                                    <p className='text-[12px] color-gray'>{user?.group?.group_name}</p>

                                </div>
                            </div>
                            <div
                                className="flex items-center gap-x-2 text-[16px] font-medium hover:cursor-pointer hover:opacity-50 transition-global"
                                onClick={() => logoutAdmin()}
                            >
                                <FormattedMessage id="admin.logout" /> <LogOut />
                            </div>

                        </div>
                    </header>
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
