import { Input, Button, DatePicker, Table, Switch, Flex, Radio } from 'antd';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { IProduct } from '../../../../interfaces/IProduct.ts';
import { formatPrice } from '../../../../utils';
import { IVariation } from '../../../../interfaces/IVariation.ts';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';
import { useParams } from 'react-router-dom';
import { BadgeCentIcon } from 'lucide-react';
import { ISale } from '../../../../interfaces/ISale.ts';
import dayjs from 'dayjs';
const UpdateSale = () => {
    const { id } = useParams();
    const urlQuery = new URLSearchParams(useLocation().search);
    const { data: dataCachingSale } = useQueryConfig(
        `sale/data/update/${id}`,
        `api/sale/${id}?include=products,variations`,
    );
    const theSale: ISale = dataCachingSale?.data.discount;
    const [dataSale, setDataSale] = useState({
        name: '',
        value: 1,
        start_date: '',
        type: 'percent',
        end_date: '',
        is_active: true,
    });
    const [error, setError] = useState({
        value: '',
        start_date: '',
        end_date: '',
        empty: false,
    });
    useEffect(() => {
        setDataSale({
            name: theSale?.name || '',
            value: theSale?.value,
            start_date: theSale?.start_date,
            type: theSale?.type,
            end_date: theSale?.end_date,
            is_active: theSale?.is_active,
        });
    }, [dataCachingSale?.data.discount]);
    const onChangeName = (e: any) => {
        setDataSale({ ...dataSale, name: e.target.value });
    };
    const onChangeValuePercent = (e: any) => {
        if (e.target.value === '') {
            setError({ ...error, value: 'Value is required' });
        } else if (parseInt(e.target.value) > 100) {
            setError({ ...error, value: 'Value must be less than or equal to 100' });
        } else {
            setError({ ...error, value: '' });
        }
        setDataSale({ ...dataSale, value: e.target.value });
    };
    const onChangeValueFixed = (e: any) => {
        if (e.target.value === '') {
            setError({ ...error, value: 'Value is required' });
        } else {
            setError({ ...error, value: '' });
        }
        setDataSale({ ...dataSale, value: e.target.value });
    };
    const onChangeStartDate = (date: any) => {
        if (date) {
            setError({ ...error, start_date: '' });
        }
        setDataSale({ ...dataSale, start_date: date.format('YYYY-MM-DD HH:mm:ss') });
    };
    const onChangeEndDate = (date: any) => {
        setDataSale({ ...dataSale, end_date: date.format('YYYY-MM-DD HH:mm:ss') });
    };
    
    const [dataSourceVariation, setDataSourceVariation] = useState<IVariation[]>([]);
    const [dataSourceProduct, setDataSourceProduct] = useState<IProduct[]>([]);
    console.log(dataSale);
    
    const columnsVariations = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (image_url: string) => <img src={image_url} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
            render: (stock_qty: number) => {
                return (
                    <div>
                        <Input
                            type="number"
                            className="border-none bg-gray-200 box-border px-6 rounded-2xl"
                            defaultValue={stock_qty}
                            min={1}
                            max={stock_qty}
                            placeholder="Enter quantity"
                        />
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action:any, record:any) => {
                return <Button>Delete</Button>;
            },
        },
    ];
    const columnsProduct = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (image_url: string) => <img src={image_url} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
            render: (stock_qty: number) => {
                return (
                    <div>
                        <Input
                            type="number"
                            className="border-none bg-gray-200 box-border px-6 rounded-2xl"
                            defaultValue={stock_qty}
                            min={1}
                            max={stock_qty}
                            placeholder="Enter quantity"
                        />
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action:any, record:any) => {
                return <Button>Delete</Button>;
            },
        },
    ];
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (image_url: string) => <img src={image_url} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <span style={{ color: 'black' }}>{formatPrice(price)} đ</span>,
        },
    ];
    const optionsType = [
        { label: 'Percent', value: 'percent' },
        { label: 'Fixed', value: 'fixed' },
    ];
    return (
        <div className="bg-slate-50 rounded-lg p-8">
            <div className="">
                <div>
                    <Heading>Add Sale </Heading>
                    <BadgeCentIcon />

                    <div className="form-row my-4">
                        <span className="text-xl my-4">Name</span>
                        <Input value={dataSale?.name} onChange={onChangeName} placeholder="Enter the sale name" />
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl mb-4">Type</span>
                        <Flex
                            onChange={(e: any) =>
                                setDataSale({ ...dataSale, type: e?.target?.value, value: theSale.value })
                            }
                            vertical
                            gap="middle"
                            className="mt-4"
                        >
                            <Radio.Group
                                size="small"
                                options={optionsType}
                                defaultValue="percent"
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Flex>
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">Value</span>
                        {dataSale.type === 'fixed' ? (
                            <Input

                                value={dataSale.value}
                                type="number"
                                min={1}
                                onChange={onChangeValueFixed}
                                placeholder="Enter the discount fixed..."
                            />
                        ) : (
                            <Input
                                value={dataSale.value}
                                type="number"
                                max={100}
                                min={1}
                                onChange={onChangeValuePercent}
                                suffix="%"
                                placeholder="Enter the discount percentage..."
                            />
                        )}

                        {error.value ? <span className="text-red-600">{error.value}</span> : ''}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">Start date</span>
                        <div>
                            <DatePicker
                                value={dayjs(dataSale.start_date, 'YYYY/MM/DD HH:mm:ss')}
                                onChange={onChangeStartDate}
                                className="w-full"
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                            />
                        </div>
                        {error.start_date ? <span className="text-red-600">{error.start_date}</span> : ''}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">End date</span>
                        <div>
                            <DatePicker
                                value={dayjs(dataSale.end_date, 'YYYY/MM/DD HH:mm:ss')}
                                onChange={onChangeEndDate}
                                className="w-full"
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                            />
                        </div>
                        {error.end_date ? <span className="text-red-600">{error.end_date}</span> : ''}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4 block">Active</span>
                        <Switch
                            checked={dataSale.is_active}
                            onChange={() => setDataSale({ ...dataSale, is_active: !dataSale.is_active })}
                        />
                    </div>
                </div>
                <div className="form-row my-4">
                    <Button className="h-16 w-32 rounded-3xl ">Save Sale</Button>
                </div>
            </div>

            <div className="product-list">
                <div className="grid grid-cols-2 gap-8 my-8">
                    <div>
                        <Heading>Simple Product</Heading>
                        <Input placeholder="Search a product name" />
                        <Table
                            rowKey={(record) => `table2-${record.id}`}
                            dataSource={dataSourceProduct}
                            columns={columnsProduct}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                    <div>
                        <Heading>Variation Product</Heading>
                        <Input placeholder="Search a variation variations" />
                        <Table
                            rowKey={(record) => `table3-${record.id}`}
                            dataSource={dataSourceVariation}
                            columns={columnsVariations}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSale;
