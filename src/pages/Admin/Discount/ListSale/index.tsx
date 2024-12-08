import { useEffect, useState } from 'react';
import { Table, Button, Input, Radio, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Heading from '../../components/Heading';

import { ISale } from '../../../../interfaces/ISale.ts';
import { formatTime } from '../../../../utils';
import { STREAM_SALE_LIST_URL } from '../../../../constants/index.ts';

import { showMessageActive, showMessageClient } from '../../../../utils/messages.ts';
import LoadingSmall from '../../../../components/Loading/LoadingSmall.tsx';
import { tokenManagerInstance } from '../../../../api/index.tsx';
import { API_SALE } from '../../../../hooks/useSale.tsx';
const ListSale = () => {
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(useLocation().search);

    const [data, setData] = useState<ISale[]>([]);
    const [loadingDeleteSale, setLoadingDeleteSale] = useState<boolean>(false);
    const [deletedSaleID, setDeletedSaleID] = useState<number | string>(0);
    const keySearch = urlQuery.get('search');
    const keyStatus = urlQuery.get('status') || 'all';
    const [dataSearch, setDataSearch] = useState<ISale[]>([]);
    useEffect(() => {
        const eventSource = new EventSource(STREAM_SALE_LIST_URL);
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
        const deleteSale = async (id: string | number) => {
            try {
                eventSource.close();
                setLoadingDeleteSale(true);
                const { data } = await tokenManagerInstance('delete', `${API_SALE}/${id}`);
                showMessageClient('Success', 'Sale deleted successfully!', 'success');
            } catch (error) {
                console.log(error);
                showMessageClient('Error', 'Something went wrong!', 'error');
            } finally {
                setLoadingDeleteSale(false);
            }
        };
        if (deletedSaleID !== 0) {
            deleteSale(deletedSaleID);
        }
        return () => {
            eventSource.close();
        };
    }, [deletedSaleID]);
    useEffect(() => {
        if (!loadingDeleteSale) {
            setDeletedSaleID(0);
        }
    }, [loadingDeleteSale]);
    useEffect(() => {
        const statusData = data.filter((item: ISale) => {
            const start_date = new Date(item.start_date);
            const end_date = new Date(item.end_date);
            const now = new Date();
            if (!keyStatus || keyStatus === 'all') {
                return true;
            } else if (keyStatus === 'upcoming') {
                return start_date > now;
            } else if (keyStatus === 'active') {
                return start_date < now && end_date > now;
            } else if (keyStatus === 'expired') {
                if (start_date < now && end_date < now) {
                    return true;
                }
                return false;
            } else {
                return true;
            }
        });
        if (keySearch && keySearch.length > 0) {
            setDataSearch(
                statusData.filter((item: ISale) => {
                    if (item.name) {
                        return (
                            item.name.toLowerCase().includes(keySearch.toLowerCase()) ||
                            item.id.toString().includes(keySearch.toLowerCase())
                        );
                    }
                    return item.id.toString().includes(keySearch.toLowerCase());
                }),
            );
        } else {
            setDataSearch([...statusData]);
        }
    }, [keySearch, keyStatus, data]);
    const handleDelete = async (id: string | number) => {
        await showMessageActive('Delete', 'Are you sure you want to delete?', 'warning', () => {
            setDeletedSaleID(id);
        });
    };

    // Search
    const searchSale = (e: any) => {
        urlQuery.set('search', e.target.value);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const handleStatusChange = (e: any) => {
        urlQuery.set('status', e.target.value);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const dataSource = [...dataSearch];
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
            render: (e: any, record: ISale) => {
                let buttonDelete = (
                    <Button
                        onClick={() => handleDelete(record.id)}
                        style={{ color: 'black' }}
                        danger
                        icon={<DeleteOutlined />}
                    />
                );
                if (loadingDeleteSale && deletedSaleID == record.id) {
                    buttonDelete = (
                        <Button style={{ color: 'black' }} className="bg-black" danger icon={<LoadingSmall />} />
                    );
                } else if (loadingDeleteSale && deletedSaleID != record.id) {
                    buttonDelete = (
                        <Button
                            style={{ color: 'black' }}
                            className="bg-gray-400 border-none hover:bg-gray-300"
                            danger
                            icon={<DeleteOutlined />}
                        />
                    );
                }
                return (
                    <div className="flex gap-2">
                        {buttonDelete}
                        <Button onClick={() => navigate(`/admin/sale/update/${record.id}`)} style={{ color: 'black' }} icon={<EditOutlined />} />
                    </div>
                );
            },
        },
    ];

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
                    <Radio.Group value={keyStatus} onChange={handleStatusChange} style={{ marginRight: '10px' }}>
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
