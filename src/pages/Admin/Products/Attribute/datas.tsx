
export const columnsAttribute = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: '1',
    },
    {
        title: 'Attribute Name',
        dataIndex: 'name',
        key: '2',
    },
    {
        title: 'Attribute Value',
        dataIndex: 'values',
        key: '3',
        render: (values: any) => {
            return (
                <div>
                    {values.length ? values.map((value: any) => <div key={value.id}>{value.value}</div>) : 'null'}
                </div>
            );
        },
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: '4',
    },

];
