import React from 'react';
import { Form, Input, Button, DatePicker, Radio, Table } from 'antd';
import Heading from '../../components/Heading';


const { RangePicker } = DatePicker;

const AddCount = () => {
  const [form] = Form.useForm();

  // Dữ liệu mẫu cho bảng khách hàng
  const dataSource = [
    {
      key: '1',
      name: '123@fpt.edu.vn',
      email: '123@fpt.edu.vn',
      phone: '0969952744',
    },
    {
      key: '2',
      name: 'Vũ',
      email: 'lmhtt17171@gmail.com',
      phone: '0395080513',
    },
    {
      key: '3',
      name: 'Lmhtt',
      email: 'lmht1717@gmail.com',
      phone: '0395080513',
    },
    {
      key: '4',
      name: 'Nguyễn Anh Dũng',
      email: 'DungNA29@gmail.com',
      phone: '0387811111',
    },
  ];

  // Cột cho bảng khách hàng
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Number',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  return (
    <div className="discount-form">
      <Heading>Add Count</Heading>
      <Form
        form={form}
        layout="vertical"
        className="form-container"
      >
        <div className="form-row">
          <Form.Item
            label="Discount voucher name"
            name="name"
            rules={[{ required: true, message: 'Please enter the coupon code' }]}
          >
            <Input placeholder="Enter the coupon code" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <Input placeholder="Enter the quantity" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Percentage decrease"
            name="discount"
            rules={[{ required: true, message: 'Please enter the discount percentage' }]}
          >
            <Input suffix="%" placeholder="Enter the discount percentage..." />
          </Form.Item>
          <Form.Item
            label="Minimum single value"
            name="minValue"
            rules={[{ required: true, message: 'Please enter the minimum unit price.' }]}
          >
            <Input suffix="VNĐ" placeholder="Enter the minimum unit price..." />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Start date - End date"
            name="dateRange"
            rules={[{ required: true, message: 'Please select a date.' }]}
          >
            <RangePicker showTime format="MM/DD/YYYY HH:mm:ss" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item label="Type of discount coupon" name="type">
            <Radio.Group defaultValue="public">
              <Radio value="public" >Publicly</Radio>
              <Radio value="private">Applicable to some customers</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
        Save the discount voucher

        </Button>
      </Form>

      <Input.Search placeholder="Search for customers by name, email, phone number..." style={{ width: 300, margin: '20px 0' }} />

      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default AddCount;
