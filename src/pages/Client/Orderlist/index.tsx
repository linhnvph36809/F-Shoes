import { Button, Card, Col, Divider, List, Row, Typography } from 'antd';

const { Text, Title } = Typography;

const OrderList = () => {
    const orderId = '241109RBUHHH9J';
    const orderStatus = 'YOUR ORDER IS ON THE WAY';
    const orderItems = [
        {
            id: 1,
            name: 'Giày chunky derby da cột dây thời trang INICHI G1112 da lì đế chunky thời trang',
            variation: 'ĐEN G1112 43',
            quantity: 1,
            price: '319.000',
            discountPrice: '287.100',
            subtotal: '319.000',
            shippingFee: '51.500',
            shippingDiscount: '-51.500',
            voucher: '-31.900',
            total: '287.100',
            paymentMethod: 'SPayLater',
            imageUrl:
                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2197feec-9ae7-47e3-bbe4-a5c5198d5c8d/AIR+JORDAN+MULE.png', // Replace with actual image URL
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <Card bodyStyle={{ padding: '8px 16px' }}>
                <Row justify="space-between" align="middle" style={{ lineHeight: '1', fontSize: '16px' }}>
                    <Col>
                        <Button type="link" style={{ fontSize: '16px', padding: 0 }}>
                            {'< BACK'}
                        </Button>
                    </Col>
                    <Col>
                        <Row align="middle" gutter={8}>
                            <Text strong style={{ fontSize: '16px' }}>
                                ORDER ID: {orderId}
                            </Text>
                            <Text strong style={{ margin: '0 8px', fontSize: '16px' }}>
                                |
                            </Text>
                            <Text type="danger" style={{ fontSize: '16px' }}>
                                {orderStatus}
                            </Text>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Divider />

            {/* Order Item List */}
            <Card>
                <List
                    itemLayout="vertical"
                    dataSource={orderItems}
                    renderItem={(item) => (
                        <List.Item>
                            <Row gutter={[16, 16]}>
                                {/* Image */}
                                <Col span={2}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        style={{ width: '100%', height: '85%', borderRadius: '4px' }}
                                    />
                                </Col>

                                {/* Item Details */}
                                <Col span={20}>
                                    <Title level={5} style={{ fontSize: '18px' }}>
                                        {item.name}
                                    </Title>
                                    <Text style={{ fontSize: '16px' }}>Variation: {item.variation}</Text>
                                    <Row justify="space-between" align="middle" style={{ marginTop: '8px' }}>
                                        <Text style={{ fontSize: '16px' }}>x{item.quantity}</Text>
                                        <Row justify="end" style={{ width: '100%' }}>
                                            <Text delete style={{ marginRight: '10px', fontSize: '16px' }}>
                                                {item.price}
                                            </Text>
                                            <Text strong style={{ color: 'red', fontSize: '16px' }}>
                                                {item.discountPrice}
                                            </Text>
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>

                            <Divider />

                            {/* Order Details */}
                            <Row justify="end">
                                <Col
                                    span={9}
                                    style={{
                                        paddingRight: '122px',
                                        paddingLeft: '10px',
                                        borderLeft: '2px solid #e8e8e8',
                                    }}
                                >
                                    {/* Merchandise Subtotal */}
                                    <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
                                        <Text style={{ fontSize: '16px' }}>Merchandise Subtotal</Text>
                                        <Divider type="vertical" style={{ height: '100%', margin: '0 8px' }} />
                                        <Text style={{ fontSize: '16px' }}>{item.subtotal}</Text>
                                    </Row>
                                    <Divider style={{ margin: '0' }} />

                                    {/* Shipping Fee */}
                                    <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
                                        <Text style={{ fontSize: '16px' }}>Shipping Fee</Text>
                                        <Divider type="vertical" style={{ height: '100%', margin: '0 8px' }} />
                                        <Text style={{ fontSize: '16px' }}>{item.shippingFee}</Text>
                                    </Row>
                                    <Divider style={{ margin: '0' }} />

                                    {/* Shipping Discount Subtotal */}
                                    <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
                                        <Text style={{ fontSize: '16px' }}>Shipping Discount Subtotal</Text>
                                        <Divider type="vertical" style={{ height: '100%', margin: '0 8px' }} />
                                        <Text style={{ fontSize: '16px' }}>{item.shippingDiscount}</Text>
                                    </Row>
                                    <Divider style={{ margin: '0' }} />

                                    {/* Shopee Voucher Applied */}
                                    <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
                                        <Text style={{ fontSize: '16px' }}>Shopee Voucher Applied</Text>
                                        <Divider type="vertical" style={{ height: '100%', margin: '0 8px' }} />
                                        <Text style={{ fontSize: '16px' }}>{item.voucher}</Text>
                                    </Row>
                                    <Divider style={{ margin: '0' }} />

                                    {/* Order Total */}
                                    <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
                                        <Text strong style={{ color: 'red', fontSize: '16px' }}>
                                            Order Total
                                        </Text>
                                        <Divider type="vertical" style={{ height: '100%', margin: '0 8px' }} />
                                        <Text strong style={{ color: 'red', fontSize: '16px' }}>
                                            {item.total}
                                        </Text>
                                    </Row>
                                    <Divider style={{ margin: '0' }} />

                                    {/* Payment Method */}
                                    <Row justify="space-between" align="middle" style={{ padding: '8px 0' }}>
                                        <Text style={{ fontSize: '16px' }}>Payment Method</Text>
                                        <Divider type="vertical" style={{ height: '100%', margin: '0 8px' }} />
                                        <Text style={{ fontSize: '16px' }}>{item.paymentMethod}</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default OrderList;
