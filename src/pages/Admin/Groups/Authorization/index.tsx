import { Card, Switch, Typography, Row, Col, Checkbox } from 'antd';
import Heading from '../../components/Heading';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGroups from '../../../../hooks/useGroup';
import ButtonPrimary from '../../../../components/Button';
import LoadingBlock from '../../../../components/Loading/LoadingBlock';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';

const { Title } = Typography;

const permissionList = [
    { name: 'Products', key: 'product', actions: ['view', 'add', 'edit', 'delete'] },
    { name: 'Categories', key: 'category', actions: ['view', 'add', 'edit', 'delete'] },
    { name: 'Users', key: 'user', actions: ['view', 'add', 'edit', 'delete'] },
];

const Authorization = () => {
    const { id } = useParams();
    const { loading, getOneGroup, patchGroup } = useGroups();
    const [permissions, setPermissions] = useState<any>();
    const [groupName, setGroupName] = useState<string>('');

    const handleSwitchChange = useCallback(
        (checked: boolean, key: string, action: string) => {
            console.log('Name:', name, 'Action:', action, 'Checked:', checked);
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
                    permissionList.map((item) => (
                        <div key={item.name} style={{ marginBottom: 32 }}>
                            <Title level={5} style={{ marginBottom: '8px' }}>
                                {item.name} :
                            </Title>
                            <Row gutter={[16, 8]}>
                                {item.actions.map((action: any) => (
                                    <Col key={action} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Switch
                                            checked={permissions?.[item.key]?.includes(action)}
                                            onChange={(checked) => handleSwitchChange(checked, item.key, action)}
                                        />
                                        <span style={{ marginLeft: 8 }}>{action}</span>
                                    </Col>
                                ))}
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
                    <LoadingBlock />
                )}
            </div>
            <ButtonPrimary onClick={handleSubmit} width="w-[100px]" height="h-[40px]">
                {loading ? <LoadingSmall /> : 'Submit'}
            </ButtonPrimary>
        </Card>
    );
};

export default Authorization;
