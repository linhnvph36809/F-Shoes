import { Avatar, Button, Tag, Typography } from 'antd';
import { SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACTIONS, PERMISSION, STATUS_ORDER } from '../../../../constants';
import { formatPrice, formatTime } from '../../../../utils';
import { paymentMethodString } from '../../../../interfaces/IOrder';
import { FormattedMessage } from 'react-intl';
import PermissionElement from '../../../../components/Permissions/PermissionElement';
const { Text } = Typography;

export const columns = [
    {
        title: <FormattedMessage id="admin.id" />,
        dataIndex: 'id',
        key: '1',
    },
    {
        title: <FormattedMessage id="admin.customer" />,
        key: 'customer',
        dataIndex: 'user',
        render: (_: any, order: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={order?.user?.avatar_url} size={40} />
                <div style={{ marginLeft: '10px' }}>
                    <Text strong>{order?.receiver_full_name}</Text>
                    <br />
                    <Text type="secondary">{order?.user?.email}</Text>
                </div>
            </div>
        ),
    },

    {
        title: <FormattedMessage id="admin.payment" />,
        dataIndex: 'payment_method',
        key: 'payment',
        render: (
            payment:
                | string
                | number
                | boolean
                | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
                | Iterable<React.ReactNode>
                | null
                | undefined,
        ) => {
            const color = payment === 'Pending' ? 'orange' : payment === 'Failed' ? 'red' : 'gray';
            return (
                <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center " color={color}>
                    {paymentMethodString(payment as string)}
                </Tag>
            );
        },
    },
    {
        title: <FormattedMessage id="admin.status" />,
        dataIndex: 'status',
        key: 'status',
        render: (_: any, { status }: any) => {
            const statusColors: Record<string, string> = {
                '0': 'red',
                '1': 'purple',
                '2': 'orange',
                '3': 'blue',
                '4': 'green',
                '5': 'pink',
                '6': '#930510',
                '7': 'gray',
            };

            const color = statusColors[status] || 'default';

            return (
                <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color={color}>
                    {STATUS_ORDER[status]}
                </Tag>
            );
        },
    },
    {
        title: <FormattedMessage id="admin.total" />,
        key: 'paymentMethod',
        dataIndex: 'total_amount',
        render: (_: any, { total_amount }: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Hiển thị logo ngân hàng */}
                <Text className="font-medium text-red-500">{formatPrice(total_amount)} đ</Text>
            </div>
        ),
    },
    {
        title: <FormattedMessage id="admin.date" />,
        dataIndex: 'created_at',
        key: '2',
        render: (_: any, { created_at }: any) => <p>{formatTime(created_at)}</p>,
    },
    {
        title: <FormattedMessage id="admin.actions" />,
        key: 'actions',
        dataIndex: 'id',
        render: (_: any, { id }: any) => (
            <div>
                <PermissionElement keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_EDIT}>
                    <Link to={`/admin/orderupdate/${id}`}>
                        <Button className="w-[50px] h-[40px] font-medium">
                            <SquarePen />
                        </Button>
                    </Link>
                </PermissionElement>
            </div>
        ),
    },
];
