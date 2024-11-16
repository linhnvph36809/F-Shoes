import {Button, Card, Col, Divider, List, Row, Typography} from 'antd';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useOrder from "../../../../hooks/profile/useOrder.tsx";
import {IOrder, statusString} from "../../../../interfaces/IOrder.ts";
import {IOrderDetail} from "../../../../interfaces/IOrderDetail.ts";
import { formatPrice } from '../../../../utils';
import LoadingPage from "../../../../components/Loading/LoadingPage.tsx";

const {Text, Title} = Typography;

const OrderDetail = () => {
    const [order, setOrder] = useState<IOrder>();
    const {getOrderDetail, orderDetail, loading} = useOrder();
    const [items, setItems] = useState<IOrderDetail[] | undefined>([]);
    console.log(order,'order');
    const {id} = useParams();
    useEffect(() => {
        if (id) getOrderDetail(id);
        setOrder(orderDetail);
    }, [id]);
    useEffect(() => {
        setOrder(orderDetail);
        setItems(orderDetail?.order_details);
    }, [orderDetail]);
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
                            <Text type="danger" style={{fontSize: '16px'}}>
                                {order?.status ? statusString(order?.status) : ''}
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
                    dataSource={orderItems}
                    renderItem={() => (
                        <List.Item>


                                {
                                    items && items?.length > 0 ?
                                        items.map((detail, index) => (
                                            <Link to={`/detail/${detail?.product?.slug}`}>
                                            <Row gutter={[16, 16]} className="hover:bg-gray-200 py-4 rounded" key={index}>
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
                                                    {detail?.variation ? <Text style={{fontSize: '16px'}}>Variation: {detail?.variation?.classify}</Text> : ''}
                                                    <Row justify="space-between" align="middle" style={{marginTop: '8px'}}>
                                                        <Text style={{fontSize: '16px'}}>x{detail?.quantity}</Text>
                                                        {
                                                            detail?.variation ?
                                                                //Variation
                                                                detail?.variation?.sale_price ?
                                                                    <Row justify="end" style={{width: '100%'}}>
                                                                        <Text delete style={{marginRight: '10px', fontSize: '16px'}}>
                                                                            {formatPrice(detail?.variation?.price)}đ
                                                                        </Text>
                                                                        <Text strong style={{color: 'red', fontSize: '16px'}}>
                                                                            {formatPrice(detail?.variation?.sale_price)}đ
                                                                        </Text>
                                                                    </Row>
                                                                    :
                                                                    <Row justify="end" style={{width: '100%'}}>

                                                                        <Text strong style={{color: 'red', fontSize: '16px'}}>
                                                                            {formatPrice(detail?.variation?.price)} đ
                                                                        </Text>
                                                                    </Row>
                                                                // Product
                                                                : detail?.product?.sale_price ?  <Row justify="end" style={{width: '100%'}}>
                                                                        <Text delete style={{marginRight: '10px', fontSize: '16px'}}>
                                                                            {formatPrice(detail?.product?.price)} đ
                                                                        </Text>
                                                                        <Text strong style={{color: 'red', fontSize: '16px'}}>
                                                                            {formatPrice(detail?.product?.sale_price)} đ
                                                                        </Text>
                                                                    </Row>
                                                                 :
                                                                    <Row justify="end" style={{width: '100%'}}>

                                                                        <Text strong style={{color: 'red', fontSize: '16px'}}>
                                                                            {formatPrice(detail?.product?.price)} đ
                                                                        </Text>
                                                                    </Row>
                                                        }
                                                    </Row>
                                                </Col>
                                            </Row>
                                            </Link>
                                        ))
                                        :
                                        <Row>
                                            <Col span={22} className="text-center ">
                                                Something went wrong!
                                            </Col>
                                        </Row>
                                }


                            <Divider/>

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
                                                <Text style={{fontSize: '16px'}}>{formatPrice(order?.shipping_cost)}đ</Text> : ''
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
                                            {order?.total_amount ? formatPrice(order?.total_amount)+' đ' : 'Error!'}
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
                                        <Button >Cancel</Button>
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

export default OrderDetail;
