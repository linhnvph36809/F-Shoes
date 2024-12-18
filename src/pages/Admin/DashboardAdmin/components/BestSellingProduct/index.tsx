import { Table } from 'antd';
import { Star } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface Props {
    data?: Array<any> | [];
}
const BestSellingProduct = ({ data }: Props) => {
    const columns = [
        {
            title: <FormattedMessage id="admin.id" />,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: <FormattedMessage id="admin.name" />,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <FormattedMessage id="admin.image" />,
            dataIndex: 'image_url',
            key: 'image_url',
            render: (url: string) => <img src={url} alt="Product" style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: <FormattedMessage id="admin.price" />,
            dataIndex: 'price',
            key: 'price',
            render: (price: string) => `${parseFloat(price).toLocaleString()}đ`,
        },
        {
            title: <FormattedMessage id="admin.qty_sold" />,
            dataIndex: 'qty_sold',
            key: 'qty_sold',
        },
        {
            title: <FormattedMessage id="admin.stock_qty" />,
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: <FormattedMessage id="admin.rating" />,
            dataIndex: 'rating',
            key: 'rating',
            render: (stars: string) => (
                <p className="flex gap-x-2 items-center">
                    {stars}
                    <Star className="w-[16px] text-yellow-500" />
                </p>
            ),
        },
        {
            title: <FormattedMessage id="admin.total_sold_quantity" />,
            dataIndex: 'total_sold_quantity',
            key: 'total_sold_quantity',
        },
    ];
    return (
        <div>
            <h3 className="text-[18px] font-bold">
                <FormattedMessage id="admin.Best_Selling_Product" />
            </h3>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default BestSellingProduct;
