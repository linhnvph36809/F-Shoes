import ButtonEdit from "../../components/Button/ButtonEdit";

export const columnsAttribute = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Attribute Name',
        dataIndex: 'attributeName',
        key: 'attributeName',
    },
    {
        title: 'Attribute Value',
        dataIndex: 'attributeValue',
        key: 'attributeValue',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: '',
        dataIndex: 'id',
        key: 'id',
        render: () => {
            return <ButtonEdit>Edit</ButtonEdit>
        },
    },
];

export const dataSourceAttribute = [
    {
        key: '1',
        id: '1',
        attributeName: 'Nmae',
        attributeValue: '1231',
        createdAt: '2024',
    },
];
