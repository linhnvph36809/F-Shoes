import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch, Radio, Row, Col } from 'antd';
import { HomeOutlined, ShopOutlined } from '@ant-design/icons';

const { Option } = Select;

const Editthanhtoan = () => {
  const [addressType, setAddressType] = useState('home');

  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add New Address</h2>
      <p>Add new address for express delivery</p>

      <Form layout="vertical" onFinish={onFinish}>
        {/* Lựa chọn loại địa chỉ */}
        <Form.Item>
          <Radio.Group value={addressType} onChange={handleAddressTypeChange} style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Radio.Button value="home" style={{ width: '100%', textAlign: 'center' }}>
                  <HomeOutlined style={{ fontSize: '24px' }} />
                  <div>Home</div>
                  <div style={{ fontSize: '12px' }}>Delivery time (9am – 9pm)</div>
                </Radio.Button>
              </Col>
              <Col span={12}>
                <Radio.Button value="office" style={{ width: '100%', textAlign: 'center' }}>
                  <ShopOutlined style={{ fontSize: '24px' }} />
                  <div>Office</div>
                  <div style={{ fontSize: '12px' }}>Delivery time (9am – 5pm)</div>
                </Radio.Button>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>

        {/* Thông tin cá nhân */}
        <Form.Item label="First Name" name="firstName" initialValue="John">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" initialValue="Doe">
          <Input />
        </Form.Item>

        {/* Quốc gia */}
        <Form.Item label="Country" name="country">
          <Select placeholder="Select value">
            <Option value="US">United States</Option>
            <Option value="India">India</Option>
            <Option value="UK">United Kingdom</Option>
          </Select>
        </Form.Item>

        {/* Địa chỉ */}
        <Form.Item label="Address Line 1" name="addressLine1" initialValue="12, Business Park">
          <Input />
        </Form.Item>

        <Form.Item label="Address Line 2" name="addressLine2" initialValue="Mall Road">
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Landmark" name="landmark" initialValue="Nr. Hard Rock Cafe">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City" name="city" initialValue="Los Angeles">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="State" name="state" initialValue="California">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Zip Code" name="zipCode" initialValue="99950">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Sử dụng làm địa chỉ thanh toán */}
        <Form.Item name="billingAddress" valuePropName="checked">
          <Switch /> Use as a billing address?
        </Form.Item>

        {/* Nút Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
            Submit
          </Button>
          <Button>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Editthanhtoan;
