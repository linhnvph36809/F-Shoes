import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Heading from '../../components/Heading';
import { columns } from './datas';
import { API_ORDER } from '../../../../hooks/useOrder';
import ModalOrder from './ModalOrder';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import TableAdmin from '../../components/Table';
import { statusArr } from '../../../../interfaces/IOrder';
import { useLocation, useNavigate } from 'react-router-dom';

const { Option } = Select;

const OrderList = () => {
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(useLocation().search);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<any>([]);
    const [orderDetail, setOrderDetail] = useState<any>({
        isModalOpen: false,
        orderDetail: null,
    });

    const { data: orders } = useQueryConfig('order-admin', API_ORDER);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.trim() === '') {
            setFilteredData(orders?.data);
        } else {
            const filtered = orders?.data.filter((order: any) => {
                return (
                    order?.user?.name.toLowerCase().includes(value.toLowerCase()) ||
                    order.id.toString().includes(value.toLowerCase())
                );
            });
            setFilteredData(filtered);
        }
    };
    const handleSort = (value: number) => {
        if (value === 1) {
            setFilteredData((preData: any) => {
                const sortedDesc = preData
                    .slice()
                    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                return sortedDesc;
            });
        } else if (value === 2) {
            setFilteredData((preData: any) => {
                const sortedAsc = preData
                    .slice()
                    .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                return sortedAsc;
            });
        }
    };

    const searchStatus = urlQuery.get('status') || '';
    const onChangeStatus = (e: any) => {
        urlQuery.set('status', e);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };

    useEffect(() => {
        const originData = orders?.data ? JSON.parse(JSON.stringify([...orders.data])) : [];
        if (searchStatus !== '' && searchStatus !== 'all') {
            const filtered = originData.filter((order: any) => {
                return statusArr[order?.status] === searchStatus;
            });
            setFilteredData([...filtered]);
        } else {
            setFilteredData([...originData]);
        }
    }, [searchStatus, orders]);

    const handleRowClick = (record: any) => {
        setOrderDetail((preData: any) => ({ ...preData, isModalOpen: true, orderDetail: record }));
    };

    const handleCancel = () => {
        setOrderDetail((preData: any) => ({ ...preData, isModalOpen: false }));
    };

    return (
        <div>
            <Heading>Order List</Heading>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, marginTop: '10px' }}>
                <Input
                    placeholder="Search Order"
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    value={searchText}
                    onChange={handleSearch}
                />
                <div>
                    <Select style={{ width: 250, marginRight: 8 }} placeholder="Please select" onChange={handleSort}>
                        <Option value={1}>Sort ascending by date</Option>
                        <Option value={2}>Sort descending by date</Option>
                    </Select>
                </div>
                <div>
                    <Select
                        defaultValue={searchStatus ? searchStatus : 'all'}
                        style={{ width: 250, marginRight: 8 }}
                        placeholder="Select a status"
                        onChange={onChangeStatus}
                    >
                        <Option value="all">All</Option>
                        <Option value={statusArr[0]}>Cancelled</Option>
                        <Option value={statusArr[1]}>Waiting Confirm</Option>
                        <Option value={statusArr[2]}>Confirmed</Option>
                        <Option value={statusArr[3]}>Delivering</Option>
                        <Option value={statusArr[4]}>Delivered</Option>
                    </Select>
                </div>
            </div>

            {/* Bảng hiển thị đơn hàng */}
            <TableAdmin
                columns={columns}
                rowKey="id"
                dataSource={filteredData}
                onRow={(record: any) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <ModalOrder orderDetail={orderDetail} handleCancel={handleCancel} />
        </div>
    );
};

export default OrderList;
