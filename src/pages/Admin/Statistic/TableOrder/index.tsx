import { useState, useEffect } from 'react';
import { Table, DatePicker } from 'antd';
import { formatPrice } from '../../../../utils';

const { RangePicker } = DatePicker;

const TableOrder = ({ dataSource }: any) => {
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        if (!dataSource) return;

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();

        const defaultData = dataSource.filter((item: any) => {
            const createAtTime = new Date(item.create_at).getTime();
            return createAtTime >= startOfMonth && createAtTime <= endOfMonth;
        });

        setFilteredData(defaultData);
    }, [dataSource]);

    const columns = [
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: (_: any, order: any) => <p>{formatPrice(order.total_amount)}đ</p>,
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            key: 'payment_method',
        },
        {
            title: 'Created At',
            dataIndex: 'create_at',
            key: 'create_at',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (status === 1 ? 'Active' : 'Inactive'),
        },
    ];

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        if (!dates) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();

            const defaultData = dataSource.filter((item: any) => {
                const createAtTime = new Date(item.create_at).getTime();
                return createAtTime >= startOfMonth && createAtTime <= endOfMonth;
            });

            setFilteredData(defaultData);
            return;
        }

        const [startDate, endDate] = dateStrings.map((date) => new Date(date).getTime());

        const filtered = dataSource.filter((item: any) => {
            const createAtTime = new Date(item.create_at).getTime();
            return createAtTime >= startDate && createAtTime <= endDate;
        });

        setFilteredData(filtered);
    };

    return (
        <div className="my-20">
            <div className="text-end">
                <RangePicker onChange={handleDateChange} className="mb-10" />
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey={(_: any, index: any) => index}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default TableOrder;
