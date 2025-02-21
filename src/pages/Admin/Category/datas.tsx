import { ReactNode } from 'react';
import { formatTime, timeToNow } from '../../../utils';
import { ICategory } from '../../../interfaces/ICategory';
import { FormattedMessage, useIntl } from 'react-intl';
import { Tag } from 'antd';
import { useContextGlobal } from '../../../contexts';

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
        render: (name: string, record: ICategory) => {
            let categoryName = name;
           
            if (record?.display || record.is_main) {
                return (
                    <div className="flex space-x-2">
                        <Tag color="red">
                            {categoryName.length > 100 ? categoryName.slice(1, 100) + '...' : categoryName}
                        </Tag>
                        <span className="text-[12px] font-mono">
                            ( <FormattedMessage id="category_display" /> )
                        </span>
                    </div>
                );
            }
            if (categoryName.length > 100) {
                return name.slice(1, 100) + '...';
            } else {
                return categoryName;
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
            return  <div>
                            <p className=" text-[10px] font-mono">{timeToNow(created_at)}</p>
                            <p className="text-[12px] font-mono">{formatTime(created_at)}</p>
                        </div>;
        },
    },
    {
        title: <FormattedMessage id="category.table.updated_at" />,
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (updated_at: string) => {
            return  <div>
            <p className=" text-[10px] font-mono">{timeToNow(updated_at)}</p>
            <p className="text-[12px] font-mono">{formatTime(updated_at)}</p>
        </div>;
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
