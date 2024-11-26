import { Table } from "antd";
import { Star } from "lucide-react";

interface Props{
    data?: Array<any>| []
}
const BestSellingProduct = ({data}:Props) => {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
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
            title: 'Quantity Sold',
            dataIndex: 'qty_sold',
            key: 'qty_sold',
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: 'Rating',
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
            title: 'Total Sold',
            dataIndex: 'total_sold_quantity',
            key: 'total_sold_quantity',
        }
    ];
    return <Table columns={columns}  dataSource={data} pagination={{ pageSize: 5 }}/>
}

export default BestSellingProduct;