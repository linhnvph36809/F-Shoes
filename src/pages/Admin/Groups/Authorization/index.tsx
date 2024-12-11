import { Card, Switch, Typography, Row, Col, Checkbox } from 'antd';
import Heading from '../../components/Heading';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useGroups from '../../../../hooks/useGroup';
import ButtonPrimary from '../../../../components/Button';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import { ACTIONS, ACTIONS_LIST, PERMISSION } from '../../../../constants';
import LoadingPage from '../../../../components/Loading/LoadingPage';

const { Title } = Typography;

const permissionList = [
    { name: 'Dashboard', key: PERMISSION.PERMISSION_DASHBOARD, actions: ACTIONS.ACTIONS_VIEW },
    { name: 'Categories', key: PERMISSION.PERMISSION_CATEGORY, actions: ACTIONS_LIST },
    { name: 'Products', key: PERMISSION.PERMISSION_PRODUCT, actions: ACTIONS_LIST },
    { name: 'Users', key: PERMISSION.PERMISSION_USER, actions: ACTIONS_LIST },
    { name: 'Topic', key: PERMISSION.PERMISSION_TOPIC, actions: ACTIONS_LIST },
    { name: 'Post', key: PERMISSION.PERMISSION_POST, actions: ACTIONS_LIST },
    { name: 'Media', key: PERMISSION.PERMISSION_MEDIA, actions: ACTIONS_LIST },
    { name: 'Voucher', key: PERMISSION.PERMISSION_VOUCHER, actions: ACTIONS_LIST },
    { name: 'Review', key: PERMISSION.PERMISSION_REVIEW, actions: ACTIONS_LIST },
];

const Authorization = () => {
    const { id } = useParams();
    const { loadingDelete, getOneGroup, patchGroup } = useGroups();
    const [permissions, setPermissions] = useState<any>();
    const [groupName, setGroupName] = useState<string>('');

    const handleSwitchChange = useCallback(
        (checked: boolean, key: string, action: string) => {
            if (checked) {
                if (permissions?.[key] && permissions?.[key].includes(action) == false) {
                    setPermissions((prePermission: any) => ({
                        ...prePermission,
                        [key]: [...permissions?.[key], action],
                    }));
                } else {
                    setPermissions((prePermission: any) => ({
                        ...prePermission,
                        [key]: [action],
                    }));
                }
            } else {
                setPermissions((prePermission: any) => ({
                    ...prePermission,
                    [key]: permissions?.[key].filter((permission: string) => permission !== action),
                }));
            }
        },
        [permissions],
    );

    const handleSubmit = () => {
        if (id && groupName && permissions)
            patchGroup(id, {
                group_name: groupName,
                permissions: JSON.stringify(permissions),
            });
    };

    const handleChooseAll = (checked: boolean, key: string, actions: any) => {
        if (checked) {
            setPermissions((prePermissions: any) => ({
                ...prePermissions,
                [key]: actions,
            }));
        } else {
            setPermissions((prePermissions: any) => ({
                ...prePermissions,
                [key]: [],
            }));
        }
    };

    useEffect(() => {
        (async function () {
            if (id) {
                const data = await getOneGroup(id);
                setPermissions(JSON.parse(data.permissions) || {});
                setGroupName(data.group_name);
            }
        })();
    }, []);

    return (
        <Card title="" bordered={false} style={{ margin: '20px' }}>
            <Heading>Authorization : Customer</Heading>
            <hr className="my-4" />
            <Title level={2} style={{ fontSize: '24px', color: '#595959', marginBottom: '20px' }}>
                Permission
            </Title>
            <div className="min-h-[200px] relative">
                {permissions ? (
                    permissionList.map((item: any) => (
                        <div key={item.name} style={{ marginBottom: 32 }}>
                            <Title level={5} style={{ marginBottom: '8px' }}>
                                {item.name} :
                            </Title>
                            <Row gutter={[16, 8]}>
                                {Array.isArray(item.actions) ? (
                                    item?.actions?.map((action: any) => (
                                        <Col key={action} style={{ display: 'flex', alignItems: 'center' }}>
                                            <Switch
                                                checked={permissions?.[item.key]?.includes(action)}
                                                onChange={(checked) => handleSwitchChange(checked, item.key, action)}
                                            />
                                            <span style={{ marginLeft: 8 }}>{action}</span>
                                        </Col>
                                    ))
                                ) : (
                                    <Col key={item.actions} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Switch
                                            checked={permissions?.[item.key]?.includes(item.actions)}
                                            onChange={(checked) => handleSwitchChange(checked, item.key, item.actions)}
                                        />
                                        <span style={{ marginLeft: 8 }}>{item.actions}</span>
                                    </Col>
                                )}
                                <Checkbox
                                    onChange={(e) => handleChooseAll(e.target.checked, item.key, item.actions)}
                                    className="font-medium text-[16px]"
                                >
                                    Choose all
                                </Checkbox>
                            </Row>
                        </div>
                    ))
                ) : (
                    <LoadingPage />
                )}
            </div>
            <ButtonPrimary onClick={handleSubmit} width="w-[100px]" height="h-[40px]">
                {loadingDelete ? <LoadingSmall /> : 'Submit'}
            </ButtonPrimary>
        </Card>
    );
};

export default Authorization;
