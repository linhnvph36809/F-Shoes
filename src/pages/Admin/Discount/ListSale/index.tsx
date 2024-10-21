import React, { useState } from 'react';
import { Table, Button, Input, Radio, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';

const ListSale = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  // Dữ liệu mẫu
  const dataSource = [
    {
      key: '1',
      code: 'p302',
      name: 'p302',
      value: 10,
      startDate: '17:51:00 21/12/2023',
      endDate: '17:51:00 30/12/2023',
      status: 'active',
    },
    {
      key: '2',
      code: 'chiltk',
      name: 'Kim Chi',
      value: 10,
      startDate: '19:14:00 18/12/2023',
      endDate: '19:15:01 18/12/2023',
      status: 'expired',
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
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
            <Tag color="black">It has ended</Tag>
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
          <Button style={{  color: 'black'}} danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  // Xử lý thay đổi bộ lọc trạng thái
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div>
      <Heading>List Sale</Heading>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input.Search placeholder="Search for discounts by name, code..." style={{ width: 300 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 10 }}>Startus:</span>
          <Radio.Group value={statusFilter} onChange={handleStatusChange} style={{ marginRight: '10px' }}>
            <Radio value="all">All</Radio>
            <Radio value="upcoming">Upcoming</Radio>
            <Radio value="active">Ongoing</Radio>
            <Radio value="expired">It has ended.</Radio>
          </Radio.Group>
          <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white'}}>
          <Link to="/admin/addsale" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white'}}>
          Add a discount coupon.
  </Link>
          </Button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ListSale;
