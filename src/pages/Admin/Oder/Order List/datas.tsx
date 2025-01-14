import { Avatar, Button, Tag, Typography } from 'antd';
import { Eye, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACTIONS, PERMISSION } from '../../../../constants';
import { formatPrice, formatTime } from '../../../../utils';
import { paymentMethodString, statusString } from '../../../../interfaces/IOrder';
import { FormattedMessage } from 'react-intl';
import PermissionElement from '../../../../components/Permissions/PermissionElement';
import ButtonEdit from '../../components/Button/ButtonEdit';
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
                <Avatar src={order?.user?.image?.url || '../public/images/default_avatar.png'} size={40} />
                <div style={{ marginLeft: '10px' }}>
                    <Text strong>{order?.receiver_full_name}</Text>
                    <br />
                    <Text type="secondary">{order?.receiver_email}</Text>
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
                '0': '#EF4444',
                '1': '#6B7280',
                '2': '#F59E0B',
                '3': '#F97316',
                '4': '#3B82F6',
                '5': '#00f227',
                '6': '#294781',
                '7': '#d67309',
                '8': '#741111',
                '9': '#125070',
            };

            const color = statusColors[status] || 'default';

            return (
                <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color={color}>
                    {statusString(status).text}
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
        render: (_: any, { created_at }: any) => <p className="font-medium">{formatTime(created_at)}</p>,
    },
    {
        title: <FormattedMessage id="admin.update_date" />,
        dataIndex: 'updated_at',
        key: '2',
        render: (_: any, { created_at }: any) => <p className="font-medium">{formatTime(created_at)}</p>,
    },
];
