import { ReactNode } from 'react';
import { formatTime } from '../../../utils';
import { ICategory } from '../../../interfaces/ICategory';

export interface DataType {
    key: string;
    id: string | number;
    categoryName: string | ReactNode;
    categoryParent: number;
    createdAt: string;
}

export const columns: any['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Category Name',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => {
            if (name.length > 100) {
                return name.slice(1, 100) + '...';
            } else {
                return name;
            }
        },
    },
    {
        title: 'Category Parent',
        dataIndex: 'parents',
        key: 'parents',
        render: (parents: ICategory[]) => {
            if (!parents || parents.length === 0) {
                return 'Main';
            }

            const parentNames = parents.map((parent) => parent.name).join(', ');

            return parentNames;
        },
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (created_at: string) => {
            return <p>{formatTime(created_at)}</p>;
        },
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (updated_at: string) => {
            return <p>{formatTime(updated_at)}</p>;
        },
    },
];

// export const data: DataType[] = [
//     {
//         key: '1',
//         id: '0',
//         categoryName: <h1>123</h1>,
//         categoryParent: 32,
//         createdAt: '2024',
//     },
//     {
//         key: '2',
//         id: '1',
//         categoryName: <h1>123</h1>,
//         categoryParent: 32,
//         createdAt: '2024',
//     },
// ];
