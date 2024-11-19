import { Table } from 'antd';
import { Star } from 'lucide-react';

import useQueryConfig from '../../../../hooks/useQueryConfig';

const TopProduct = () => {
    const { data: product } = useQueryConfig('statistic-product', '/api/statistics/product');
    console.log(product);

    const sortedData = Array.isArray(product?.data?.data)
        ? [...product.data.data].sort((a: any, b: any) => b.stock_qty - a.stock_qty).slice(0, 5)
        : [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (url: string) => <img src={url} alt="Product" style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: string) => `${parseFloat(price).toLocaleString()}đ`,
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: 'Quantity Sold',
            dataIndex: 'qty_sold',
            key: 'qty_sold',
        },
        {
            title: 'Stars',
            dataIndex: 'stars',
            key: 'stars',
            render: (stars: string) => (
                <p className="flex gap-x-2 items-center">
                    {stars}
                    <Star className="w-[16px] text-yellow-500" />
                </p>
            ),
        },
    ];

    return <Table columns={columns} dataSource={sortedData} rowKey="name" pagination={false} />;
};

export default TopProduct;
