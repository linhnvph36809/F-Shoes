import React, { useState } from 'react';
import { Form, Input, Select, Radio, Button } from 'antd';
import Heading from '../../components/Heading';

const { Option } = Select;

const Addorder = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Danh sách người dùng
  const users = ['User 1', 'User 2', 'User 3'];

  // Danh sách sản phẩm
  const products = [
    {
      id: '1',
      name: 'Product 1',
      variants: ['Size M', 'Size L'],
      colors: ['Red', 'Blue'],
    },
    {
      id: '2',
      name: 'Product 2',
      variants: ['Size S', 'Size XL'],
      colors: ['Green', 'Yellow'],
    },
  ];

  // Hàm xử lý khi chọn sản phẩm
  const handleProductChange = (value: string) => {
    const product = products.find((p) => p.id === value);
    setSelectedProduct(product);
  };

  return (
    <div style={{ fontSize: '20px' }}>
    <Form layout="vertical" style={{ fontSize: '18px' }}>
        <Heading>Add Order</Heading>
      {/* Select User */}
      <Form.Item label="Select User" name="user">
        <Select placeholder="Select User">
          {users.map((user, index) => (
            <Option key={index} value={user}>
              {user}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Select Product */}
      <Form.Item label="Select Product"  style={{ fontSize: '18px' }} name="product">
        <Select placeholder="Select Product" onChange={handleProductChange}>
          {products.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

       {/* Hiển thị lựa chọn biến thể và màu sắc khi sản phẩm đã được chọn */}
       {selectedProduct && (
        <>
          {/* Select Biến thể */}
          <Form.Item label="Chọn Biến thể" style={{ fontSize: '18px' }} name="variant">
            <Select placeholder="Chọn biến thể">
              {selectedProduct.variants.map((variant, index) => (
                <Option key={index} value={variant}>
                  {variant}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Select Màu sắc */}
          <Form.Item label="Chọn Màu sắc"  name="color">
            <Select placeholder="Chọn màu sắc">
              {selectedProduct.colors.map((color, index) => (
                <Option key={index} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}

      {/* Input tên người nhận */}
      <Form.Item label="Recipient name"  name="receiverName">
        <Input placeholder="Enter recipient name" />
      </Form.Item>

      {/* Input số điện thoại */}
      <Form.Item label="Number"  name="phoneNumber">
        <Input placeholder="Enter phone number" />
      </Form.Item>

      {/* Radio chọn phương thức thanh toán */}
      <Form.Item label="Payment method"  name="paymentMethod">
        <Radio.Group>
          <Radio value="COD" >Cash on Delivery (COD)</Radio>
          <Radio value="Online" >Online payment</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Radio chọn phương thức vận chuyển */}
      <Form.Item label="Shipping method"  name="shippingMethod">
        <Radio.Group>
          <Radio value="Standard" >Standard Shipping</Radio>
          <Radio value="Express" >Fast shipping</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Nút submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit"
         style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' ,fontSize: '20px', padding: '15px 40px'}}>
        Order
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Addorder;
