import React from 'react';
import { Modal, Form, Input, Button, Select, Switch } from 'antd';

const { Option } = Select;

const EditUserModal = ({ visible, onCancel, onSubmit }) => {
  return (
    <Modal
      visible={visible}
      title="Edit User Information"
      onCancel={onCancel}
      footer={null}
      centered
    >
      <p>Updating user details will receive a privacy audit.</p>
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item label="First Name" name="firstName" initialValue="John">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" initialValue="Doe">
          <Input />
        </Form.Item>

        <Form.Item label="Username" name="username" initialValue="johndoe007">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" initialValue="example@domain.com">
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select defaultValue="Status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Tax ID" name="taxId" initialValue="TIN">
          <Input />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input.Group compact>
            <Select defaultValue="US (+1)" style={{ width: '25%' }}>
              <Option value="+1">US (+1)</Option>
              <Option value="+44">UK (+44)</Option>
              <Option value="+91">India (+91)</Option>
            </Select>
            <Input style={{ width: '75%' }} placeholder="202 555 0111" />
          </Input.Group>
        </Form.Item>

        <Form.Item label="Language" name="language" initialValue="English">
          <Select mode="multiple" defaultValue={['English']}>
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="French">French</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Country" name="country" initialValue="India">
          <Select defaultValue="India">
            <Option value="India">India</Option>
            <Option value="US">United States</Option>
            <Option value="UK">United Kingdom</Option>
          </Select>
        </Form.Item>

        <Form.Item name="billingAddress" valuePropName="checked">
          <Switch /> Use as a billing address?
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
