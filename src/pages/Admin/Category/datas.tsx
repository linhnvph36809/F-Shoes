import { ReactNode } from 'react';

export interface DataType {
    key: string;
    id: string | number;
    categoryName: string | ReactNode;
    categoryParent: number;
    createdAt: string;
}

export const columns: any['columns'] = [
    {
        title: 'Category Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: any, _: any, index: any) => {
            if (index === 0) {
                return {
                    props: {
                        colSpan: 0,
                    },
                };
            }
            return text;
        },
    },
    {
        title: 'Category Parent',
        dataIndex: 'parents',
        key: 'parents',
        render: (parents: { name: string }[] | undefined, _: any, index: any) => {
            if (index === 0) {
                return {
                    props: {
                        colSpan: 0,
                    },
                };
            }
            if (!parents || parents.length === 0) {
                return 'Main';
            }

            const parentNames = parents.map((parent) => parent.name).join(', ');

            return parentNames;
        },
    },

    // {
    //     title: 'Created At',
    //     dataIndex: 'created_at',
    //     key: 'created_at',
    //     render: (text: any, _: any, index: any) => {
    //         if (index === 0) {
    //             return {
    //                 props: {
    //                     colSpan: 0,
    //                 },
    //             };
    //         }
    //         return text;
    //     },
    // },
];

export const data: DataType[] = [
    {
        key: '1',
        id: '0',
        categoryName: <h1>123</h1>,
        categoryParent: 32,
        createdAt: '2024',
    },
    {
        key: '2',
        id: '1',
        categoryName: <h1>123</h1>,
        categoryParent: 32,
        createdAt: '2024',
    },
];
