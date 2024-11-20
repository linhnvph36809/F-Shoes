import { Avatar, Button, Dropdown, Menu, Tag, Typography } from 'antd';
import { Ellipsis, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, formatTime } from '../../../../utils';
import { STATUS_ORDER } from '../../../../constants';
const { Text } = Typography;

export const columns = [
    {
        title: 'Order ID',
        dataIndex: 'id',
        key: '1',
    },
    {
        title: 'Customer',
        key: 'customer',
        dataIndex: 'user',
        render: (_: any, { user }: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={user?.avatar_url} size={40} />
                <div style={{ marginLeft: '10px' }}>
                    <Text strong>{user?.name}</Text>
                    <br />
                    <Text type="secondary">{user?.email}</Text>
                </div>
            </div>
        ),
    },

    {
        title: 'Payment',
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
            return <Tag color={color}>{payment}</Tag>;
        },
    },
    {
        title: 'Status',
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

            return <Tag color={color}>{STATUS_ORDER[status]}</Tag>;
        },
    },
    {
        title: 'Total',
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
        title: 'Date',
        dataIndex: 'created_at',
        key: '2',
        render: (_: any, { created_at }: any) => <p>{formatTime(created_at)}</p>,
    },
    {
        title: 'Actions',
        key: 'actions',
        dataIndex: 'id',
        render: (_: any, { id }: any) => (
            <div>
                <Link to={`/admin/orderupdate/${id}`}>
                    <Button className="w-[50px] h-[40px] font-medium">
                        <SquarePen />
                    </Button>
                </Link>
            </div>
        ),
    },
];
