import { formatPrice } from '../../../utils';
import { STAR } from '../../../constants/icons';

export const columnsAttribute = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: '1',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: '2',
    },
    {
        title: 'Image',
        dataIndex: 'image_url',
        key: '3',
        render: (image_url: string) => {
            return (
                <div>
                    <img src={image_url} alt="" className="w-[80px] rounded-lg" />
                </div>
            );
        },
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: '5',
        render: (price: number) => <p className="text-[15px] font-medium">{formatPrice(price)}đ</p>,
    },
    {
        title: 'Quantity Sold',
        dataIndex: 'qty_sold',
        key: '5',
    },
    {
        title: 'Stock Quantity',
        dataIndex: 'stock_qty',
        key: '6',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: '7',
        render: (rating: string) => (
            <p className="flex gap-x-1 items-center">
                {rating}
                {STAR}
            </p>
        ),
    },
];
