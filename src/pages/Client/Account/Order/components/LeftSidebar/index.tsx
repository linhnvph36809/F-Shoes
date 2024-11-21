import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, Menu, Typography } from 'antd';

type Props = {
    className?: string;
    title?: string;
};

const { Title } = Typography;

const items = [
    {
        path: '',
        label: 'All',
        key: '',
    },
    {
        path: '?status=waiting_confirm',
        label: 'Waiting Confirm',
        key: 'waiting_confirm',
    },
    {
        path: '?status=confirmed',
        label: 'Confirmed',
        key: 'confirmed',
    },
    {
        path: '?status=delivering',
        label: 'Delivering',
        key: 'delivering',
    },
    {
        path: '?status=delivered',
        label: 'Delivered',
        key: 'delivered',
    },
    {
        path: '?status=return_processing',
        label: 'Return Processing',
        key: 'return_processing',
    },
    {
        path: '?status=denied_return',
        label: 'Denied Return',
        key: 'denied_return',
    },
    {
        path: '?status=returned',
        label: 'Returned',
        key: 'returned',
    },
    {
        path: '?status=cancelled',
        label: 'Cancelled',
        key: 'cancelled',
    },
];

const LeftSidebar: React.FC<Props> = ({ className, title }) => {
    const [searchParams] = useSearchParams();
    const statusOptionParam = searchParams.get('status');

    return (
        <Card
            className={`w-[400px] ${className}`}
            style={{ borderRadius: 12, padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
            <Title level={3} style={{ marginBottom: 20, textAlign: 'center' }}>
                {title}
            </Title>
            <Menu
                mode="vertical"
                selectedKeys={[statusOptionParam || '']}
                style={{ border: 'none', fontSize: '16px', fontWeight: 500 }}
                items={items.map((item) => ({
                    key: item.key,
                    label: (
                        <Link to={item.path} style={{ color: 'inherit' }}>
                            {item.label}
                        </Link>
                    ),
                }))}
            />
        </Card>
    );
};

export default LeftSidebar;
