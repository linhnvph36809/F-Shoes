import { useEffect, useState } from 'react';
import { Table, Input, Select, Card, Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Heading from '../../components/Heading';
import { columns } from './datas';
import { API_ORDER } from '../../../../hooks/useOrder';
import ModalOrder from './ModalOrder';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import TableAdmin from '../../components/Table';

const { Option } = Select;

const OrderList = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
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
            const filtered = orders?.data.filter(
                (order: any) => order?.user?.name?.toLowerCase() == value.toLowerCase(),
            );
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

    const handleRowClick = (record: any) => {
        setOrderDetail((preData: any) => ({ ...preData, isModalOpen: true, orderDetail: record }));
    };

    useEffect(() => {
        setFilteredData(orders?.data);
    }, [orders]);

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
            </div>

            {/* Bảng hiển thị đơn hàng */}
            <TableAdmin
                columns={columns}
                rowKey="id"
                dataSource={filteredData}
                className="hover:cursor-pointer"
                onRow={(record: any) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <ModalOrder orderDetail={orderDetail} handleCancel={handleCancel} />
        </div>
    );
};

export default OrderList;
