import {Button, Card, Col, Divider, List, Modal, Row, Typography} from 'antd';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useOrder from "../../../../hooks/profile/useOrder.tsx";
import {IOrder, statusString} from "../../../../interfaces/IOrder.ts";
import {IOrderDetail} from "../../../../interfaces/IOrderDetail.ts";
import {formatPrice} from '../../../../utils';
import LoadingPage from "../../../../components/Loading/LoadingPage.tsx";
import LoadingSmall from "../../../../components/Loading/LoadingSmall.tsx";
import {showMessageActive} from "../../../../utils/messages.ts";

const {Text, Title} = Typography;

const OrderDetail = () => {
    const [order, setOrder] = useState<IOrder>();
    const [canCancel, setCanCancel] = useState(false);
    const {reOrder, reOrderLoading, getOrderDetail, orderDetail, loading, cancelOrder, cancelLoading} = useOrder();
    const [items, setItems] = useState<IOrderDetail[] | undefined>([]);
    const {id} = useParams();
    useEffect(() => {
        if (id) getOrderDetail(id);
        setOrder(orderDetail);
    }, [id]);
    useEffect(() => {
        if (order?.status && order?.status >= 3) {
            setCanCancel(false);
        } else {
            setCanCancel(true);
        }
    }, [order]);
    useEffect(() => {
        setOrder(orderDetail);
        setItems(orderDetail?.order_details);
    }, [orderDetail]);

    const handleCancelOrder = async (id: string) => {
        showMessageActive('Are you sure you want to cancel the order?', '', 'warning', () => {
            cancelOrder(id);
            setCanCancel(false);
        });


    }
    const handleBuyAgain = async (id: string) => {
        showMessageActive('Are you sure you want to reorder the order?', '', 'warning', () => {
            reOrder(id);
        });

    }

    return (
        loading || !id ? <div>
                <LoadingPage/>
            </div> :
            <div style={{padding: '20px'}}>
                {/* Header */}

                <Card bodyStyle={{padding: '8px 16px'}}>
                    <Row justify="space-between" align="middle" style={{lineHeight: '1', fontSize: '16px'}}>
                        <Col>
                            <Button type="link" style={{fontSize: '16px', padding: 0}}>
                                {'< BACK'}
                            </Button>
                        </Col>
                        <Col>
                            <Row align="middle" gutter={8}>
                                <Text strong style={{fontSize: '16px'}}>
                                    ORDER ID: {order?.id}
                                </Text>
                                <Text strong style={{margin: '0 8px', fontSize: '16px'}}>
                                    |
                                </Text>
                                <Text type={order?.status === 0 || order?.status === 6 ? 'danger' : 'secondary'} style={{fontSize: '16px'}}>
                                    {order?.status || order?.status === 0 ? statusString(order?.status) : ''}
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Divider/>

                {/* Order Item List */}
                <Card>
                    <List
                        itemLayout="vertical"
                        dataSource={items}
                        renderItem={(detail, index) => (
                            <List.Item>
                                <Link to={`/detail/${detail?.product?.slug}`}>
                                    <Row gutter={[16, 16]} className="hover:bg-gray-200 py-4 rounded"
                                         key={index}>
                                        {/* Image */}
                                        <Col span={2}>
                                            <img
                                                src={detail?.product?.image_url}
                                                alt={detail?.variation ? detail.variation?.name : detail?.product?.name}
                                                style={{width: '100%', height: '85%', borderRadius: '4px'}}
                                            />
                                        </Col>

                                        {/* Item Details */}
                                        <Col span={20}>
                                            <Title level={5} style={{fontSize: '18px'}}>
                                                {detail?.product?.name}
                                            </Title>
                                            {detail?.variation ? <Text
                                                style={{fontSize: '16px'}}>Variation: {detail?.variation?.classify}</Text> : ''}
                                            <Row justify="space-between" align="middle"
                                                 style={{marginTop: '8px'}}>
                                                <Text style={{fontSize: '16px'}}>x{detail?.quantity}</Text>
                                                {
                                                    detail?.variation ?
                                                        //Variation
                                                        detail?.variation?.sale_price ?
                                                            <Row justify="end" style={{width: '100%'}}>
                                                                <Text delete style={{
                                                                    marginRight: '10px',
                                                                    fontSize: '16px'
                                                                }}>
                                                                    {formatPrice(detail?.variation?.price)}đ
                                                                </Text>
                                                                <Text strong style={{
                                                                    color: 'red',
                                                                    fontSize: '16px'
                                                                }}>
                                                                    {formatPrice(detail?.variation?.sale_price)}đ
                                                                </Text>
                                                            </Row>
                                                            :
                                                            <Row justify="end" style={{width: '100%'}}>

                                                                <Text strong style={{
                                                                    color: 'red',
                                                                    fontSize: '16px'
                                                                }}>
                                                                    {formatPrice(detail?.variation?.price)} đ
                                                                </Text>
                                                            </Row>
                                                        // Product
                                                        : detail?.product?.sale_price ?
                                                            <Row justify="end" style={{width: '100%'}}>
                                                                <Text delete style={{
                                                                    marginRight: '10px',
                                                                    fontSize: '16px'
                                                                }}>
                                                                    {formatPrice(detail?.product?.price)} đ
                                                                </Text>
                                                                <Text strong
                                                                      style={{color: 'red', fontSize: '16px'}}>
                                                                    {formatPrice(detail?.product?.sale_price)} đ
                                                                </Text>
                                                            </Row>
                                                            :
                                                            <Row justify="end" style={{width: '100%'}}>

                                                                <Text strong
                                                                      style={{color: 'red', fontSize: '16px'}}>
                                                                    {formatPrice(detail?.product?.price)} đ
                                                                </Text>
                                                            </Row>
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Link>
                                <Divider/>
                            </List.Item>
                        )}
                    />
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
                            {/*<Row justify="space-between" align="middle" style={{padding: '8px 0'}}>*/}
                            {/*    <Text style={{fontSize: '16px'}}>Merchandise Subtotal</Text>*/}
                            {/*    <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>*/}
                            {/*    <Text style={{fontSize: '16px'}}>{item.subtotal}</Text>*/}
                            {/*</Row>*/}
                            {/*<Divider style={{margin: '0'}}/>*/}

                            {/* Shipping Fee */}
                            <Row justify="space-between" align="middle" style={{padding: '8px 0'}}>
                                <Text style={{fontSize: '16px'}}>Shipping Fee</Text>
                                <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>
                                {
                                    order?.shipping_cost ?
                                        <Text
                                            style={{fontSize: '16px'}}>{formatPrice(order?.shipping_cost)}đ</Text> : ''
                                }
                            </Row>
                            <Divider style={{margin: '0'}}/>

                            {/* Shipping Discount Subtotal */}
                            {/*<Row justify="space-between" align="middle" style={{padding: '8px 0'}}>*/}
                            {/*    <Text style={{fontSize: '16px'}}>Shipping Discount Subtotal</Text>*/}
                            {/*    <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>*/}
                            {/*    <Text style={{fontSize: '16px'}}>{item.shippingDiscount}</Text>*/}
                            {/*</Row>*/}
                            {/*<Divider style={{margin: '0'}}/>*/}

                            {/* Shopee Voucher Applied */}
                            {/*<Row justify="space-between" align="middle" style={{padding: '8px 0'}}>*/}
                            {/*    <Text style={{fontSize: '16px'}}>Shopee Voucher Applied</Text>*/}
                            {/*    <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>*/}
                            {/*    <Text style={{fontSize: '16px'}}>{item.voucher}</Text>*/}
                            {/*</Row>*/}
                            {/*<Divider style={{margin: '0'}}/>*/}

                            {/* Order Total */}
                            <Row justify="space-between" align="middle" style={{padding: '8px 0'}}>
                                <Text strong style={{color: 'red', fontSize: '16px'}}>
                                    Order Total
                                </Text>
                                <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>
                                <Text strong style={{color: 'red', fontSize: '16px'}}>
                                    {order?.total_amount ? formatPrice(order?.total_amount) + ' đ' : 'Error!'}
                                </Text>
                            </Row>
                            <Divider style={{margin: '0'}}/>

                            {/* Payment Method */}
                            <Row justify="space-between" align="middle" style={{padding: '8px 0'}}>
                                <Text style={{fontSize: '16px'}}>Payment Method</Text>
                                <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>
                                <Text style={{fontSize: '16px'}}>{order?.payment_method}</Text>
                            </Row>

                            {/*  Button  */}
                            <Row justify="space-between" align="middle" style={{padding: '8px 0'}}>

                                <Divider type="vertical" style={{height: '100%', margin: '0 8px'}}/>
                                {
                                    order?.status === 0 ?
                                        <Button className="bg-amber-200" onClick={() => handleBuyAgain(order?.id)}>Buy
                                            again</Button> : canCancel ?
                                            cancelLoading ?
                                                <Button className="bg-black cursor-default"><LoadingSmall/></Button> :
                                                <Button
                                                    onClick={() => order?.id ? handleCancelOrder(order?.id) : console.log("Something went wrong!")}>Cancel</Button>
                                            : <button
                                                className="rounded-lg cursor-default bg-gray-200 text-xl py-1 px-6 ">Cancel</button>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </div>
    );
};

export default OrderDetail;
