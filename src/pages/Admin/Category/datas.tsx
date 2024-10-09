import { Form, Select, TableProps } from 'antd';
import { ReactNode } from 'react';

import InputPrimary from '../../../components/Input';
import ButtonComponent from '../components/Button/ButtonSubmit';
import ButtonEdit from '../components/Button/ButtonEdit';

export interface DataType {
    key: string;
    id: string;
    categoryName: string | ReactNode;
    categoryParent: number;
    createdAt: string;
}

export const columns: TableProps<DataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, _, index) => {
            if (index === 0) {
                return {
                    children: (
                        <div className="text-center">
                            <Form>
                                <div className="flex justify-center gap-x-5">
                                    <InputPrimary placeholder="Category Name" margin="mb-0" />
                                    <Select
                                        defaultValue="lucy"
                                        className="w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111] mb-5"
                                        options={[
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                        ]}
                                    />
                                    <ButtonComponent>Submit</ButtonComponent>
                                </div>
                            </Form>
                        </div>
                    ),
                    props: {
                        colSpan: 5,
                    },
                };
            }
            return text;
        },
    },
    {
        title: 'Category Name',
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (text, _, index) => {
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
        dataIndex: 'categoryParent',
        key: 'categoryParent',
        render: (text, _, index) => {
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
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, _, index) => {
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
        title: '',
        dataIndex: 'id',
        key: 'id',
        render: (__, _, index) => {
            if (index === 0) {
                return {
                    children: '',
                    props: {
                        colSpan: 0,
                    },
                };
            }
            return <ButtonEdit>Edit</ButtonEdit>;
        },
    },
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
