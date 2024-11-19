import { Avatar, Button, Tag, Typography } from 'antd';
import { SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrencyVND } from '../../../../utils/formatCurrency';
const { Text } = Typography;

export const columns = [
    {
        title: 'Order',
        dataIndex: 'id',
        key: '1',
        // render: (
        //     text:
        //         | string
        //         | number
        //         | boolean
        //         | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
        //         | Iterable<React.ReactNode>
        //         | React.ReactPortal
        //         | null
        //         | undefined,
        // ) => <a>{text}</a>,
    },
    {
        title: 'Date',
        dataIndex: 'created_at',
        key: '2',
    },
    {
        title: 'Customer',
        key: 'customer',
        dataIndex: 'user',
        render: (_: any, { user }: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Hiển thị ảnh đại diện của khách hàng */}
                <Avatar src={``} size={40} />
                <div style={{ marginLeft: '10px' }}>
                    {/* Hiển thị tên khách hàng */}
                    <Text strong>{user?.name}</Text>
                    <br />
                    {/* Hiển thị email khách hàng */}
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
        render: (
            status:
                | string
                | number
                | boolean
                | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
                | Iterable<React.ReactNode>
                | null
                | undefined,
        ) => {
            const color =
                status === 'Delivered'
                    ? 'green'
                    : status === 'Out for Delivery'
                        ? 'purple'
                        : status === 'Dispatched'
                            ? 'orange'
                            : status === 'Ready to Pickup'
                                ? 'blue'
                                : 'volcano';
            return <Tag color={color}>{status}</Tag>;
        },
    },
    {
        title: 'Total',
        key: 'paymentMethod',
        dataIndex: 'total_amount',
        render: (_: any, { total_amount }: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Hiển thị logo ngân hàng */}
                <Text className="font-medium text-red-500">{formatCurrencyVND(total_amount)} VND</Text>
            </div>
        ),
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
