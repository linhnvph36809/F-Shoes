import React from 'react';
import { Card, Switch, Typography, Row, Col } from 'antd';
import Heading from '../../components/Heading';

const { Title } = Typography;

const permissions = [
  { name: 'Reviews', actions: ['View', 'Delete', 'Restore', 'ForceDelete'] },
  { name: 'Posts', actions: ['View', 'Add', 'Edit', 'Delete', 'Restore', 'ForceDelete'] },
  { name: 'Topics', actions: ['View', 'Add', 'Edit', 'Delete', 'Restore', 'ForceDelete'] },
  { name: 'Vouchers', actions: ['View', 'Add', 'Edit', 'ForceDelete'] },
  { name: 'Orders', actions: ['View', 'Detail', 'Edit'] },
  { name: 'ProductsVariant', actions: ['View', 'Add', 'Delete', 'ForceDelete', 'Restore'] },
  { name: 'Products', actions: ['View', 'Add', 'Edit', 'Delete', 'Restore', 'ForceDelete', 'Detail'] },
  { name: 'Categories', actions: ['View', 'Add', 'Edit', 'Delete', 'Restore', 'ForceDelete'] },
  { name: 'Users', actions: ['View', 'Add', 'Edit', 'Delete', 'Restore', 'ForceDelete', 'Detail'] },
];

const Authorization = () => (
  <Card title="" bordered={false} style={{ margin: '20px' }}>
    <Heading>Authorization : Customer</Heading>
    <hr className="my-4" />
    <Title level={2} style={{ fontSize: '24px', color: '#595959', marginBottom: '20px' }}>Permission</Title>
    {permissions.map((item) => (
      <div key={item.name} style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: '8px' }}>{item.name} :</Title>
        <Row gutter={[16, 8]}>
          {item.actions.map((action) => (
            <Col key={action} style={{ display: 'flex', alignItems: 'center' }}>
              <Switch />
              <span style={{ marginLeft: 8 }}>{action}</span>
            </Col>
          ))}
        </Row>
      </div>
    ))}
  </Card>
);

export default Authorization;
