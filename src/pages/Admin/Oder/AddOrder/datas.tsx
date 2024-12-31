import { FormattedMessage } from 'react-intl';
import { formatPrice } from '../../../../utils';

export const columns = [
    {
        title: <FormattedMessage id="product.name" />,
        dataIndex: 'product_name',
        key: '2',
        render: (product_name: string) => <p className="text-[15px] font-medium">{product_name}</p>,
    },
    {
        title: <FormattedMessage id="admin.image" />,
        dataIndex: 'product_image',
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
        title: <FormattedMessage id="admin.price" />,
        dataIndex: 'price',
        key: '5',
        render: (price: number) => <p className="text-[15px] font-medium">{formatPrice(price)}đ</p>,
    },
    {
        title: <FormattedMessage id="body.Detail.Quantity" />,
        dataIndex: 'quantity',
        key: '6',
        render: (quantity: number) => <p className="text-[15px] font-medium">{quantity}đ</p>,
    },
    {
        title: <FormattedMessage id="variant" />,
        dataIndex: 'classify',
        key: '7',
        render: (classify: string) => <p className="text-[15px] font-medium">{classify || 'Trống'}</p>,
    },
    {
        title: <FormattedMessage id="totalAmount" />,
        dataIndex: 'total_amount',
        key: '8',
        render: (total_amount: number) => (
            <p className="text-[18px] font-medium text-red-500">{formatPrice(total_amount)}đ</p>
        ),
    },
];
