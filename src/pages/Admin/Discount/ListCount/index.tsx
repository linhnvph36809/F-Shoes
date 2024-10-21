import React, { useState } from 'react';
import { Table, Button, Input, Radio, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';

const DiscountList = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  // Dữ liệu mẫu
  const dataSource = [
    {
      key: '1',
      code: 'VBS03',
      name: 'Kim Chi',
      minOrder: '100,000 đ',
      discount: '10%',
      quantity: 10,
      status: 'active',
    },
    {
      key: '2',
      code: 'VBS02',
      name: 'Đinh Hải Dương',
      minOrder: '4 đ',
      discount: '10%',
      quantity: 15,
      status: 'expired',
    },
    {
      key: '3',
      code: 'VBS01',
      name: 'Kim Chi',
      minOrder: '100,000 đ',
      discount: '10%',
      quantity: 70,
      status: 'active',
    },
  ];

  // Cột cho bảng Ant Design
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Discount code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Minimum order',
      dataIndex: 'minOrder',
      key: 'minOrder',
    },
    {
      title: 'Reduce',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => (
        <>
          {status === 'active' ? (
            <Tag color="black">Ongoing</Tag>
          ) : (
            <Tag color="black">Ended</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button style={{ borderColor: 'black' }} danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  // Xử lý thay đổi bộ lọc trạng thái
  const handleStatusChange = (e: any) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div>
        <Heading>List Count</Heading>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input.Search placeholder="Nhập mã" style={{ width: 300 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 10 }}>Status:</span>
          <Radio.Group value={statusFilter} onChange={handleStatusChange} style={{ marginRight: '10px' }}>
            <Radio value="all">All</Radio>
            <Radio value="upcoming">Upcoming</Radio>
            <Radio value="active">Ongoing</Radio>
            <Radio value="expired">Ended</Radio>
          </Radio.Group>
          <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
          <Link to="/admin/addcount" >
          Add discount coupon
  </Link>
          </Button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default DiscountList;
