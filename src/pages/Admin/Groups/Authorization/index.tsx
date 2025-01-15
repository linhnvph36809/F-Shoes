import { Switch, Typography, Row, Col, Checkbox } from 'antd';
import Heading from '../../components/Heading';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import useGroups from '../../../../hooks/useGroup';
import {
    ACTIONS_CATEGORY,
    ACTIONS_LIST,
    INFO_AUTH,
    LANGUAGE,
    LANGUAGE_VI,
    PERMISSION,
} from '../../../../constants';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import ButtonBack from '../../components/ButtonBack';
import { handleChangeMessage, handleGetLocalStorage } from '../../../../utils';
import NoAccess from '../../../../components/NotFound/NoAccess';
import { ICON_STATUS_GROUP } from '../../../../constants/icons';
import SkeletonComponent from '../../components/Skeleton';

const { Title } = Typography;

const permissionList = [
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Categories', 'Danh mục'),
        key: PERMISSION.PERMISSION_CATEGORY,
        actions: [...ACTIONS_LIST, ACTIONS_CATEGORY.ACTIONS_ADD_PRODUCT],
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Order', 'Đơn hàng'),
        key: PERMISSION.PERMISSION_ORDER,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Sale', 'Khuyến mãi'),
        key: PERMISSION.PERMISSION_SALE,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Products', 'Sản phẩm'),
        key: PERMISSION.PERMISSION_PRODUCT,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Users', 'Người dùng'),
        key: PERMISSION.PERMISSION_USER,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Groups', 'Nhóm'),
        key: PERMISSION.PERMISSION_GROUP,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Topic', 'Chủ đề'),
        key: PERMISSION.PERMISSION_TOPIC,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Posts', 'Bài viết'),
        key: PERMISSION.PERMISSION_POST,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Media', 'Thư viện'),
        key: PERMISSION.PERMISSION_MEDIA,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Voucher', 'Phiếu giảm giá'),
        key: PERMISSION.PERMISSION_VOUCHER,
        actions: ACTIONS_LIST,
    },
    {
        name: handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Review', 'Đánh giá'),
        key: PERMISSION.PERMISSION_REVIEW,
        actions: ACTIONS_LIST,
    },
];

const Authorization = () => {
    const { id } = useParams() as any;
    const { loadingDelete, getOneGroup, patchGroup } = useGroups();
    const [permissions, setPermissions] = useState<any>();
    const [groupName, setGroupName] = useState<string>('');
    const groupId = handleGetLocalStorage(INFO_AUTH.groupId) || 0;
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

    if (+groupId !== 1) {
        return <NoAccess />;
    } else if (+groupId === +id) {
        return <NoAccess />;
    }

    return (
        <div>
            <ButtonBack to="/admin/groups" />
            <Heading>
                <FormattedMessage id="group.Authorization_Customer" />
            </Heading>
            <hr className="my-4" />
            <Title level={2} style={{ fontSize: '24px', color: '#595959', marginBottom: '20px' }}>
                <FormattedMessage id="group.permission" />
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
                                            <span style={{ marginLeft: 8 }}>{ICON_STATUS_GROUP(action)}</span>
                                        </Col>
                                    ))
                                ) : (
                                    <Col key={item.actions} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Switch
                                            checked={permissions?.[item.key]?.includes(item.actions)}
                                            onChange={(checked) => handleSwitchChange(checked, item.key, item.actions)}
                                        />
                                        <span style={{ marginLeft: 8 }}>{ICON_STATUS_GROUP(item.actions)}</span>
                                    </Col>
                                )}
                                <Checkbox
                                    onChange={(e) => handleChooseAll(e.target.checked, item.key, item.actions)}
                                    className="font-medium text-[16px]"
                                >
                                    <FormattedMessage id="Choose_all" />
                                </Checkbox>
                            </Row>
                        </div>
                    ))
                ) : (
                    <SkeletonComponent />
                )}
            </div>
            <ButtonSubmit loading={loadingDelete} onClick={handleSubmit} />
        </div>
    );
};

export default Authorization;
