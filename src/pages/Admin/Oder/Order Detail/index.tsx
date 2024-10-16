import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Tag, Timeline, Avatar, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Heading from '../../components/Heading';

const OrderDetail = () => {
    const { Text } = Typography;

    const [currentTime, setCurrentTime] = useState('');

  // Hàm cập nhật giờ hiện tại
  const updateTime = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const timeString = now.toLocaleString('en-US', options);
    setCurrentTime(timeString);
  };

  useEffect(() => {
    updateTime(); // Cập nhật ngay khi component render lần đầu
    const timer = setInterval(updateTime, 1000); // Cập nhật mỗi giây

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(timer);
  }, []);
  // Dữ liệu mẫu
  const orderItems = [
    {
      key: '1',
      product: {
        name: 'Wooden Chair',
        material: 'Wooden',
        image: 'https://i.pravatar.cc/100?img=2', 
      },
      material: 'Wooden',
      price: '$841',
      qty: 2,
      total: 1682,
    },
    {
      key: '2',
      product: {
        name: 'Wooden Chair',
        material: 'Wooden',
        image: 'https://i.pravatar.cc/100?img=2', 
      },
      material: 'Storage:128gb',
      price: '$896',
      qty: 3,
      total: 2688,
    },
    {
      key: '3',
      product: {
        name: 'Wooden Chair',
        material: 'Wooden',
        image: 'https://i.pravatar.cc/100?img=2', // URL ảnh sản phẩm
      },
      material: 'Size:8UK',
      price: '$392',
      qty: 1,
      total: 392,
    },
    {
      key: '4',
      product: {
        name: 'Wooden Chair',
        material: 'Wooden',
        image: 'https://i.pravatar.cc/100?img=2', // URL ảnh sản phẩm
      },
      material: 'Gender:Women',
      price: '$813',
      qty: 2,
      total: 1626,
    },
  ];

  // Cột trong bảng
  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      render: () => <input type="checkbox" />,
    },
    {
        title: 'PRODUCT',
        key: 'product',
        render: (text: any, record: any) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={record.product.image} size={48} shape="square" />
            <div style={{ marginLeft: '10px' }}>
              <Text strong>{record.product.name}</Text>
              <br />
              <Text type="secondary">Material: {record.product.material}</Text>
            </div>
          </div>
        ),
      },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
    },
  ];
  

  return (
    <div style={{ padding: '20px' }}>
        <Heading>Order Detail</Heading>
      {/* Thông tin chi tiết đơn hàng */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
        <Col>
          <h2>Order #32543</h2>
          <Tag color="green">Paid</Tag>
          <Tag color="blue">Ready to Pickup</Tag>
          <p>{currentTime}</p> {/* Hiển thị thời gian cập nhật liên tục */}
        </Col>
        <Col>
          <Button danger icon={<DeleteOutlined />}>Delete Order</Button>
        </Col>
      </Row>

      {/* Chi tiết sản phẩm */}
      <Card title="Order details">
        <Table dataSource={orderItems} columns={columns} pagination={false} summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={3}>Subtotal:</Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1}>$2093</Table.Summary.Cell>
          </Table.Summary.Row>
        )} />
        <div style={{ textAlign: 'right', marginTop: '16px' }}>
          <p>Discount: $2</p>
          <p>Tax: $28</p>
          <p>Total: $2113</p>
        </div>
      </Card>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={8}>
          {/* Thông tin khách hàng */}
          <Card title="Customer details" extra={<Button type="link" icon={<EditOutlined />}>Edit</Button>}>
            <p>Shamus Tuttle</p>
            <p>Customer ID: #58909</p>
            <p>12 Orders</p>
            <p>Email: Shamus889@yahoo.com</p>
            <p>Mobile: +1 (609) 972-22-22</p>
          </Card>
        </Col>

        <Col span={8}>
          {/* Địa chỉ giao hàng */}
          <Card title="Shipping address" extra={<Button type="link" icon={<EditOutlined />}>Edit</Button>}>
            <p>45 Roker Terrace</p>
            <p>Latheronwheel</p>
            <p>KW5 8NW, London, UK</p>
          </Card>
        </Col>

        <Col span={8}>
          {/* Địa chỉ thanh toán */}
          <Card title="Billing address" extra={<Button type="link" icon={<EditOutlined />}>Edit</Button>}>
            <p>45 Roker Terrace</p>
            <p>Latheronwheel</p>
            <p>KW5 8NW, London, UK</p>
            <p>Mastercard: ****4291</p>
          </Card>
        </Col>
      </Row>

      {/* Hoạt động vận chuyển */}
      <Card title="Shipping activity" style={{ marginTop: '16px' }}>
        <Timeline>
          <Timeline.Item color="blue">
            Order was placed (Order ID: #32543)
            <p>Your order has been placed successfully</p>
            <p>Tuesday 11:29 AM</p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            Pick-up scheduled with courier
            <p>Wednesday 11:29 AM</p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            Item has been picked up by courier
            <p>Thursday 11:29 AM</p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            Package arrived at an Amazon facility, NY
            <p>Saturday 15:20 AM</p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            Package has left an Amazon facility, NY
            <p>Today 14:12 PM</p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            Delivery will be delivered by tomorrow
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
};

export default OrderDetail;
