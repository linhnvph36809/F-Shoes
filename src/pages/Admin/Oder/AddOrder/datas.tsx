import { FormattedMessage } from 'react-intl';

export const columns = [
    {
        title: <FormattedMessage id="admin.id" />,
        dataIndex: 'id',
        key: '1',
    },
    {
        title: <FormattedMessage id="product.name" />,
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
                    <img src={image_url} alt="" className="w-[80px] rounded-lg" />
                </div>
            );
        },
    },
    {
        title: <FormattedMessage id="admin.price" />,
        dataIndex: 'price',
        key: '5',
        render: (price: number) => <p className="text-[15px] font-medium">50000 đ</p>,
    },
    {
        title: <FormattedMessage id="body.Detail.Quantity" />,
        dataIndex: 'quantity',
        key: '6',
    },
    {
        title: <FormattedMessage id="variant" />,
        dataIndex: 'variant',
        key: '6',
    },
    {
        title: <FormattedMessage id="totalAmount" />,
        dataIndex: 'total',
        key: '6',
    },
];
