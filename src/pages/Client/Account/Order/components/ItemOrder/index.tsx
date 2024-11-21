import { IOrder, statusString } from '../../../../../../interfaces/IOrder.ts';
import React, { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Divider, Typography, Space } from 'antd';
import { timeToNow, formatPrice } from '../../../../../../utils';
import { Link, useNavigate } from 'react-router-dom';
import useOrder from '../../../../../../hooks/profile/useOrder.tsx';
import LoadingSmall from '../../../../../../components/Loading/LoadingSmall.tsx';
import { Eye } from 'lucide-react';

type Props = {
    order: IOrder;
};

const { Text, Title } = Typography;

const ItemOrder: React.FC<Props> = ({ order }) => {
    const navigator = useNavigate();
    const { cancelOrder, cancelLoading: loading } = useOrder();
    const [canCancel, setCanCancel] = useState(true);

    useEffect(() => {
        if (order.status >= 3) {
            setCanCancel(false);
        }
    }, []);

    const handleCancelOrder = async (id: string) => {
        if (confirm('Are you sure you want to cancel this order?')) {
            const cancelledOrder = await cancelOrder(id);
            if (cancelledOrder) {
                navigator(0);
                alert('Order cancelled successfully!');
                setCanCancel(false);
            } else {
                navigator(0);
                alert('Something went wrong!');
            }
        }
    };

    return (
        <Card
            bordered
            style={{
                height: '550px',
                borderRadius: '12px',
                background: '#f9f9f9',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Header */}
            <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                    <Title level={5} style={{ fontSize: '18px', fontWeight: 600 }}>
                        Order ID: {order?.id}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                        {statusString(order?.status)}
                    </Text>
                </div>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    {timeToNow(order?.created_at)}
                </Text>
            </Space>

            <Divider />

            {/* Order Information */}
            <Descriptions
                column={1}
                bordered
                size="middle"
                labelStyle={{ fontWeight: 600, fontSize: '16px' }}
                contentStyle={{ fontSize: '16px' }}
            >
                <Descriptions.Item label="Receiver Name">{order?.receiver_full_name}</Descriptions.Item>
                <Descriptions.Item label="Phone">{order?.phone}</Descriptions.Item>
                <Descriptions.Item label="Delivery Address">{order?.address}</Descriptions.Item>
                <Descriptions.Item label="Note">
                    {order?.note && order?.note !== '' ? (
                        order?.note
                    ) : (
                        <Text type="secondary">
                            This order doesn't have any notes.{' '}
                            <Link to={`/profile/order/${order.id}`} style={{ textDecoration: 'underline' }}>
                                Watch order detail!
                            </Link>
                        </Text>
                    )}
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    Confirm receipt after you've checked the received items
                </Text>
                <Space direction="vertical" style={{ alignItems: 'center' }}>
                    <Title level={5} style={{ margin: 0, fontSize: '20px' }}>
                        Order Total:{' '}
                        <Text style={{ color: '#ff4d4f', fontSize: '18px' }}>{formatPrice(order.total_amount)}đ</Text>
                    </Title>
                    <Space>
                        <Link to={`/profile/order/${order?.id}`}>
                            <Button type="primary" icon={<Eye />} size="large">
                                Watch Detail
                            </Button>
                        </Link>
                        {order?.status === 0 ? (
                            <Button type="default" size="large">
                                Buy again
                            </Button>
                        ) : canCancel ? (
                            loading ? (
                                <Button type="default" size="large" disabled>
                                    <LoadingSmall />
                                </Button>
                            ) : (
                                <Button type="default" size="large" danger onClick={() => handleCancelOrder(order?.id)}>
                                    Cancel
                                </Button>
                            )
                        ) : (
                            <Button type="default" size="large" disabled>
                                Cancel
                            </Button>
                        )}
                    </Space>
                </Space>
            </div>
        </Card>
    );
};

export default ItemOrder;
