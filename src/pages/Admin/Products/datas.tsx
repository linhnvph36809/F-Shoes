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
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: '6',
    },
];
