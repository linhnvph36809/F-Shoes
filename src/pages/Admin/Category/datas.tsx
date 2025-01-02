import { ReactNode } from 'react';
import { formatTime } from '../../../utils';
import { ICategory } from '../../../interfaces/ICategory';
import { FormattedMessage } from 'react-intl';
import { Tag } from 'antd';


export interface DataType {
    key: string;
    id: string | number;
    categoryName: string | ReactNode;
    categoryParent: number;
    createdAt: string;
}

export const columns: any['columns'] = [
    {
        title: <FormattedMessage id="admin.id" />,
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: <FormattedMessage id="category.table.category_name" />,
        dataIndex: 'name',
        key: 'name',
        render: (name: string,record:any) => {
            console.log(record);
            if(record?.display){
                return <div className='flex space-x-2'>
                    
                    <Tag color='red'>
                    {
                        name.length > 100 ?  name.slice(1, 100) + '...' : name
                    }
                </Tag>
                <span className='text-[12px] font-mono'>( Trưng Bày )</span>
                </div>
            }
            if (name.length > 100) {
                return name.slice(1, 100) + '...';
            } else {
                return name;
            }
        },
    },
    {
        title: <FormattedMessage id="category.table.category_parent" />,
        dataIndex: 'parents',
        key: 'parents',
        render: (parents: ICategory[]) => {
            if (!parents || parents.length === 0) {
                return '';
            }

            const parentNames = parents.map((parent) => parent.name).join(', ');

            return parentNames;
        },
    },
    {
        title: <FormattedMessage id="category.table.created_at" />,
        dataIndex: 'created_at',
        key: 'created_at',
        render: (created_at: string) => {
            return <p>{formatTime(created_at)}</p>;
        },
    },
    {
        title: <FormattedMessage id="category.table.updated_at" />,
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
