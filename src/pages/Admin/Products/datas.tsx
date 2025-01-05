import { formatPrice } from '../../../utils';
import { STAR } from '../../../constants/icons';
import { FormattedMessage } from 'react-intl';

export const columnsAttribute = [
    {
        title: <FormattedMessage id="admin.id" />,
        dataIndex: 'id',
        key: '1',
    },
    {
        title: <FormattedMessage id="admin.name" />,
        dataIndex: 'name',
        key: '2',
    },
    {
        title: <FormattedMessage id="admin.image" />,
        dataIndex: 'image_url',
        key: '3',
        render: (image_url: string) => {
            return (
                <div>
                    <img src={image_url} alt="" className="w-[80px] h-[100px] object-cover rounded-lg" />
                </div>
            );
        },
    },
    {
        title: <FormattedMessage id="admin.price" />,
        dataIndex: 'price',
        key: '5',
        render: (price: number) => <p className="text-[15px] font-medium">{formatPrice(price)}đ</p>,
    },
    {
        title: <FormattedMessage id="admin.qty_sold" />,
        dataIndex: 'qty_sold',
        key: '5',
    },
    {
        title: <FormattedMessage id="admin.stock_qty" />,
        dataIndex: 'stock_qty',
        key: '6',
    },
    {
        title: <FormattedMessage id="Rating" />,
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
