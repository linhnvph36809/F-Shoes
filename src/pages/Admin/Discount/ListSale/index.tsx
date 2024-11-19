import {useEffect, useState} from 'react';
import {Table, Button, Input, Radio, Tag, Space} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import Heading from '../../components/Heading';
import useSale from "../../../../hooks/useSale.tsx";
import {ISale} from "../../../../interfaces/ISale.ts";
import {formatTime} from "../../../../utils";
import { Switch } from "antd";
const ListSale = () => {
    const {switchStatus} = useSale();
    const [statusFilter, setStatusFilter] = useState('all');
    const [data, setData] = useState<ISale[]>([]);
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/api/sales/stream?column=id&sort=desc');
        eventSource.onmessage = (event) => {
            const sales = JSON.parse(event.data);
            if(sales.data){
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
    const onClickSwitchActive = (e) => {
        console.log(e);

    }
    const searchSale = (e) => {
        console.log(e);
    }
    const dataSource = [
        ...data
    ];
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
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
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
            render: (start_date: string) => (
                <>{formatTime(start_date)}</>
            )
        },
        {
            title: 'End date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (end_date: string) => (
                <>{formatTime(end_date)}</>
            )
        },
        {
            title: 'Active',
            key: 'is_active',
            dataIndex: 'is_active',
            render: (is_active:boolean,record:ISale) => {

                return (
                    <>
                        <Switch onChange={onClickSwitchActive} />
                    </>
                )
            },
        },
        {
            title: 'Action',
            key: 'actions',
            render: () => (
                <Space>
                    <Button icon={<EditOutlined/>}/>
                    <Button style={{color: 'black'}} danger icon={<DeleteOutlined/>}/>
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
            <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Input onChange={searchSale} placeholder="Search for discounts by name, code..." style={{width: 300}}/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: 10}}>Status:</span>
                    <Radio.Group value={statusFilter} onChange={handleStatusChange} style={{marginRight: '10px'}}>
                        <Radio value="all">All</Radio>
                        <Radio value="upcoming">Upcoming</Radio>
                        <Radio value="active">Ongoing</Radio>
                        <Radio value="expired">It has ended.</Radio>
                    </Radio.Group>
                    <Button type="primary" style={{backgroundColor: 'black', borderColor: 'black', color: 'white'}}>
                        <Link to="/admin/addsale"
                              style={{backgroundColor: 'black', borderColor: 'black', color: 'white'}}>
                            Add a discount coupon.
                        </Link>
                    </Button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>
        </div>
    );
};

export default ListSale;
