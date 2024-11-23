import { useEffect, useState } from 'react';
import { Table, Button, Input, Radio, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';

import { ISale } from '../../../../interfaces/ISale.ts';
import { formatTime } from '../../../../utils';
const ListSale = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [data, setData] = useState<ISale[]>([]);
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/api/sales/stream?column=id&sort=desc');
        eventSource.onmessage = (event) => {
            const sales = JSON.parse(event.data);
            if (sales.data) {
                setData(sales.data);
            }
        };
        eventSource.onerror = (error) => {
            console.error('Something went wrong!:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const searchSale = (e: any) => {
        console.log(e);
    };
    const dataSource = [...data];
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <span className={text ? 'text-gray-500' : 'text-amber-500'}>
                    {text ? text : 'This sale name is empty'}
                </span>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => <Tag color={type === 'percent' ? 'blue' : 'red'}>{type}</Tag>,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (start_date: string) => <>{formatTime(start_date)}</>,
        },
        {
            title: 'End date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (end_date: string) => <>{formatTime(end_date)}</>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: ISale) => {
                if (status) {
                    console.log(status);
                }
                const start_date = new Date(record.start_date);
                const end_date = new Date(record.end_date);
                const now = new Date();
                if (start_date < now && end_date < now) {
                    return <Tag color="red">Ended</Tag>;
                } else if (start_date < now && end_date > now) {
                    return <Tag color="green">On going</Tag>;
                } else if (start_date > now) {
                    return <Tag color="gold">Upcomming</Tag>;
                }
            },
        },
        {
            title: 'Active',
            key: 'is_active',
            dataIndex: 'is_active',
            render: (is_active: boolean, record: ISale) => {
                return is_active ? <Tag color="geekblue">Active</Tag> : <Tag color="red">Inactive</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'actions',
            render: () => (
                <Space>
                    <Button icon={<EditOutlined />} />
                    <Button style={{ color: 'black' }} danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const handleStatusChange = (e: any) => {
        setStatusFilter(e.target.value);
    };

    return (
        <div>
            <Heading>List Sale</Heading>
            <div
                style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Input
                    onChange={searchSale}
                    placeholder="Search for discounts by name, code..."
                    style={{ width: 300 }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 10 }}>Status:</span>
                    <Radio.Group value={statusFilter} onChange={handleStatusChange} style={{ marginRight: '10px' }}>
                        <Radio value="all">All</Radio>
                        <Radio value="upcoming">Upcoming</Radio>
                        <Radio value="active">Ongoing</Radio>
                        <Radio value="expired">It has ended.</Radio>
                    </Radio.Group>
                    <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
                        <Link
                            to="/admin/addsale"
                            style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}
                        >
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
