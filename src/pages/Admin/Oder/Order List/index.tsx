import React, { useState } from 'react';
import { Table, Tag, Input, Button, Pagination, Dropdown, Menu, Select, Card, Col, Row, Avatar, Typography } from 'antd';
import { SearchOutlined, EllipsisOutlined, ExclamationCircleOutlined,  CalendarOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';
import Heading from '../../components/Heading';

const { Option } = Select;

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dữ liệu mẫu
  const dataSource = [
    {
      key: '1',
      order: '#6979',
      date: 'April 15, 2023, 10:21',
      customer: 'Cristine Easom',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'ceasom@theguardian.com',
      payment: 'Pending',
      paymentMethod: '•••2356',
      status: 'Delivered',
      method: '•••2356',
      cardLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png'
    },
    {
      key: '2',
      order: '#6624',
      date: 'April 17, 2023, 6:43',
      customer: 'Fayre Screech',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'fscreech@army.mil',
      paymentMethod: '•••2356',
      payment: 'Paid',
      status: 'Delivered',
      method: '•••2077',
      cardLogo:  'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
    },
    {
      key: '3',
      order: '#9305',
      date: 'April 18, 2023, 8:05',
      customer: 'Pauline Pfaffe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'ppfaffe1@wikia.com',
      paymentMethod: '•••2356',
      payment: 'Paid',
      status: 'Out for Delivery',
      method: 'PayPal',
      cardLogo:    'data:image/png;base64,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',
    },
    {
      key: '4',
      order: '#8005',
      date: 'April 22, 2023, 3:01',
      customer: 'Maurits Nealey',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'mnealey@japanpost.jp',
      paymentMethod: '•••2356',
      payment: 'Cancelled',
      status: 'Dispatched',
      method: '•••1555',
      cardLogo:    'https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/icons/payments/paypal.png',
    },
    // Các mục khác...
  ];
  const { Text } = Typography;
  // Các cột trong bảng
  const columns = [
   
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      render: (text: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Hiển thị ảnh đại diện của khách hàng */}
          <Avatar src={record.avatar} size={40} />
          <div style={{ marginLeft: '10px' }}>
            {/* Hiển thị tên khách hàng */}
            <Text strong>{record.customer}</Text>
            <br />
            {/* Hiển thị email khách hàng */}
            <Text type="secondary">{record.email}</Text>
          </div>
        </div>
      ),
    },
    
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined) => {
        const color = payment === 'Pending' ? 'orange' : payment === 'Failed' ? 'red' : 'gray';
        return <Tag color={color}>{payment}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined) => {
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
      title: 'Method',
      key: 'paymentMethod',
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Hiển thị logo ngân hàng */}
          <Avatar src={record.cardLogo} size={24} shape="square" style={{ marginRight: '8px' }} />
          
          <Text>{record.paymentMethod}</Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
          }
        >
          <EllipsisOutlined style={{ fontSize: '20px' }} />
        </Dropdown>
      ),
    }
  ];

  const onChangePage = (page: React.SetStateAction<number>, pageSize: React.SetStateAction<number>) => {
    setPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <Heading>Order List</Heading>

      {/* Phần Badge */}
      <div style={{ padding: '20px' }}>
      <Row gutter={16} justify="space-around">
        {/* Pending Payment */}
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h2>56</h2>
                <p>Pending Payment</p>
              </div>
              <CalendarOutlined style={{ fontSize: '36px' }} />
            </div>
          </Card>
        </Col>

        {/* Completed */}
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h2>12,689</h2>
                <p>Completed</p>
              </div>
              <CheckOutlined style={{ fontSize: '36px' }} />
            </div>
          </Card>
        </Col>

        {/* Refunded */}
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h2>124</h2>
                <p>Refunded</p>
              </div>
              <CreditCardOutlined style={{ fontSize: '36px' }} />
            </div>
          </Card>
        </Col>

        {/* Failed */}
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h2>32</h2>
                <p>Failed</p>
              </div>
              <ExclamationCircleOutlined style={{ fontSize: '36px' }} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
      {/* Tìm kiếm và các chức năng */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 ,marginTop: '10px'}}>
        <Input
          placeholder="Search Order"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <div>
          <Select defaultValue={10} style={{ width: 80, marginRight: 8 }} onChange={(value) => setPageSize(value)}>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
          <Button>Export</Button>
        </div>
      </div>

      {/* Bảng hiển thị đơn hàng */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox' }}
      />

      {/* Phân trang */}
      <Pagination
        current={page}
        total={100}
        pageSize={pageSize}
        onChange={onChangePage}
        style={{ marginTop: 16, textAlign: 'right' }}
      />

      {/* Nút "Buy Now" */}
      <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white',marginTop: '20px' }}>
        Buy Now
      </Button>
    </div>
  );
};

export default OrderList;
