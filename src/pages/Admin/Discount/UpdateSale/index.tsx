import { Input, Button, DatePicker, Table, Switch, Flex, Radio } from 'antd';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';
import "./style.scss";
import { IProduct } from '../../../../interfaces/IProduct.ts';
import { IVariation } from '../../../../interfaces/IVariation.ts';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';
import { showMessageActive, showMessageAdmin, showMessageClient } from '../../../../utils/messages.ts';
import useSale, { QUERY_KEY } from '../../../../hooks/useSale.tsx';
import LoadingSmall from '../../../../components/Loading/LoadingSmall.tsx';
import { BadgeCentIcon, CircleX, Filter } from 'lucide-react';
import {  useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { ISale } from '../../../../interfaces/ISale.ts';

const UpdateSale = () => {
    
    const { id } = useParams();
    const { data: dataCachingSale } = useQueryConfig(
        [QUERY_KEY, `sale/data/update/${id}`],
        `api/sale/${id}?include=products,variations`,
    );
    const theSale: ISale = dataCachingSale?.data?.discount;
    const timeNow = new Date().getTime();
    const saleStartDate = new Date(theSale?.start_date).getTime();
    const saleEndDate = new Date(theSale?.end_date).getTime();
    const [dataSourceVariation, setDataSourceVariation] = useState<IVariation[]>([]);
    const [dataSourceProduct, setDataSourceProduct] = useState<IProduct[]>([]);
    const [arrSelectOneSelectedProduct, setArrSelectOneSelectedProduct] = useState<IProduct[]>([]);
    const [arrSelectMultipleSelectedProducts, setArrSelectMultipleSelectedProducts] = useState<IProduct[]>([]);
    const [arrSelectVariationsOfOneSelectedProduct, setArrSelectVariationsOfOneSelectedProduct] = useState<
        IVariation[]
    >([]);

    const [arrSelectedVariationsOfMultipleSelectedProduct, setArrSelectedVariationsOfMultipleSelectedProduct] =
        useState<IVariation[]>([]);
    const onSelectSelectedSimpleProduct = (product: IProduct, checked: boolean) => {
        
        if (checked) {
            const filtered = arrSelectOneSelectedProduct.filter((item) => item.id !== product.id);
            setArrSelectOneSelectedProduct([...filtered, product]);
        } else {
            const filtered = arrSelectOneSelectedProduct.filter((item) => item.id !== product.id);
            setArrSelectOneSelectedProduct([...filtered]);
        }
    };
    const onSelectMultipleSelectedSimpleProduct = (_: any, products: IProduct[]) => {
        const filterArrOneProduct = arrSelectOneSelectedProduct.filter((item) => {
            return !products.find((product) => item.id === product.id);
        });
        setArrSelectOneSelectedProduct([...filterArrOneProduct]);
        setArrSelectMultipleSelectedProducts([...products]);
    };
    const onSelectSelectedVariation = (variation: IVariation, checked: boolean) => {
        if (checked) {
            const filtered = arrSelectVariationsOfOneSelectedProduct.filter((item) => item.id !== variation.id);
            setArrSelectVariationsOfOneSelectedProduct([...filtered, variation]);
        } else {
            const filtered = arrSelectVariationsOfOneSelectedProduct.filter((item) => item.id !== variation.id);
            setArrSelectVariationsOfOneSelectedProduct([...filtered]);
        }
    };
    const onSelectMultipleSelectedVariation = (_: any, variations: IVariation[]) => {
        const filterArrOneVariation = arrSelectVariationsOfOneSelectedProduct.filter((item) => {
            return !variations.find((variant) => item.id === variant.id);
        });
        setArrSelectVariationsOfOneSelectedProduct([...filterArrOneVariation]);
        setArrSelectedVariationsOfMultipleSelectedProduct([...variations]);
    };
    const onDeleteSimpleProduct = (record?: IProduct) => {
        if(saleEndDate < timeNow){
            showMessageClient('This sale has expired, you can not modifier anymore.','','warning');
            return;
        }
        showMessageActive('Delete', 'Are you sure you want to delete', 'warning', () => {
            const arrSelect = [...arrSelectOneSelectedProduct, ...arrSelectMultipleSelectedProducts, record];

            const filtered = dataSourceProduct.filter((product) => {
                return !arrSelect.find((p) => p?.id === product.id);
            });
            setDataSourceProduct([...filtered]);
        });
    };
    const onFilterSimpleProduct = (record?: IProduct) => {
        if(saleEndDate < timeNow){
            showMessageClient('This sale has expired, you can not modifier anymore.','','warning');
            return;
        }
        showMessageActive(
            'Delete',
            'Are you sure you only want to keep these products and delete the others?',
            'warning',
            () => {
                const arrSelect = [...arrSelectOneSelectedProduct, ...arrSelectMultipleSelectedProducts, record];
                const filtered = dataSourceProduct.filter((product) => {
                    return arrSelect.find((p) => p?.id === product.id);
                });
                setDataSourceProduct([...filtered]);
            },
        );
    };
    const onDeleteVariation = (record?: IVariation) => {
        if(saleEndDate < timeNow){
            showMessageClient('This sale has expired, you can not modifier anymore.','','warning');
            return;
        }
        showMessageActive('Delete', 'Are you sure you want to delete', 'warning', () => {
            const arrSelect = [
                ...arrSelectVariationsOfOneSelectedProduct,
                ...arrSelectedVariationsOfMultipleSelectedProduct,
                record,
            ];
            const filtered = dataSourceVariation.filter((variant) => {
                return !arrSelect.find((v) => v?.id === variant.id);
            });
            setDataSourceVariation([...filtered]);
        });
    };
    const onFilterVariation = (record?: IVariation) => {
        if(saleEndDate < timeNow){
            showMessageClient('This sale has expired, you can not modifier anymore.','','warning');
            return;
        }
        showMessageActive(
            'Delete',
            'Are you sure you only want to keep these products and delete the others?',
            'warning',
            () => {
                const arrSelect = [
                    ...arrSelectVariationsOfOneSelectedProduct,
                    ...arrSelectedVariationsOfMultipleSelectedProduct,
                    record,
                ];
                const filtered = dataSourceVariation.filter((variant) => {
                    return arrSelect.find((v) => v?.id === variant.id);
                });
                setDataSourceVariation([...filtered]);
            },
        );
    };
    const onChangeQuantityVariation = (e: any, record: IVariation) => {
        
        const arrSelected: IVariation[] = [
            ...arrSelectVariationsOfOneSelectedProduct,
            ...arrSelectedVariationsOfMultipleSelectedProduct,
        ];
        const arrSelect: IVariation[] = [...arrSelected.filter((p) => p.id !== record.id), record];

        const theDataSource = JSON.parse(JSON.stringify([...dataSourceVariation]));
        if (arrSelect && arrSelect.length > 0) {
            for (let i = 0; i < arrSelect.length; i++) {
                const index = theDataSource.findIndex((item: IVariation) => item.id === arrSelect[i].id);
                const data = theDataSource.find((item: IVariation) => item.id === arrSelect[i].id);
                const listVariation =JSON.parse(JSON.stringify([...theSale.variations]));
                const theVariation:IVariation = listVariation.find((item: IVariation) => item.id === data.id);
                if (index > -1 && data) {
                    if(parseInt(e.target.value) > theVariation?.stock_qty){
                        data.qty_sale = theVariation?.stock_qty;
                    }else {
                        data.qty_sale = parseInt(e.target.value);
                    }
                    
                    theDataSource.splice(index, 1, data);
                }
            }
            setDataSourceVariation([...theDataSource]);
        } else {
            const index = theDataSource.findIndex((item: IVariation) => item.id === record.id);
            const data = theDataSource.find((item: IVariation) => item.id === record.id);
            if (index > -1 && data) {
                data.qty_sale = parseInt(e.target.value);
                theDataSource.splice(index, 1, data);
            }
            setDataSourceVariation([...theDataSource]);
        }
    };
    const [searchKeyVariation,setSearchKeyVariation] = useState('');
    const onSearchVariation = (e:any) => {
        setSearchKeyVariation(e.target.value);
    }
    const [searchKeyProduct,setSearchKeyProduct] = useState('');
    const onSearchProduct = (e:any) => {
        setSearchKeyProduct(e.target.value);
    }
    
    const columnsVariations = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            filteredValue: [searchKeyVariation],
            onFilter: (value:any, record:IVariation) => {
               if(value){
                return record.name.toLowerCase().includes(value.toLowerCase()) || record.id.toString().includes(value.toLowerCase());
               }
                return true;
            }
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
            render: (name: string) => {
                return name.length > 26 ? name.slice(0, 26) + '...' : name;
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity Sale',
            dataIndex: 'qty_sale',
            key: 'qty_sale',
            render: (qty_sale: number, record: IVariation) => {
                return (
                    <div>
                        <Input
                            disabled={saleEndDate < timeNow}
                            onChange={(e) => onChangeQuantityVariation(e, record)}
                            type="number"
                            className="border-none bg-gray-200 box-border px-6 rounded-2xl"
                            value={qty_sale}
                            min={1}
                            max={qty_sale}
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
            render: (_: any, record: any) => {
                return (
                    <div className="flex space-x-2">
                        <Button className="p-2" onClick={() => onDeleteVariation(record)}>
                            <CircleX />
                        </Button>
                        <Button className="p-2" onClick={() => onFilterVariation(record)}>
                            <Filter />
                        </Button>
                    </div>
                );
            },
        },
    ];
    const onChangeQuantityProduct = (e: any, record: IProduct) => {
        const arrSelected = [...arrSelectOneSelectedProduct, ...arrSelectMultipleSelectedProducts];
        const arrSelect = [...arrSelected.filter((p) => p.id !== record.id), record];
        const theDataSource = JSON.parse(JSON.stringify([...dataSourceProduct]));
        if (arrSelect && arrSelect.length > 0) {
            for (let i = 0; i < arrSelect.length; i++) {
                const index = theDataSource.findIndex((item: IProduct) => item.id === arrSelect[i].id);
                const data = theDataSource.find((item: IProduct) => item.id === arrSelect[i].id);
                const listProduct =JSON.parse(JSON.stringify([...theSale.products]));
                const theProduct:IProduct = listProduct.find((item: IVariation) => item.id === data.id);
                if (index > -1 && data) {
                    if(parseInt(e.target.value) > theProduct?.stock_qty){
                        data.qty_sale = theProduct?.stock_qty;
                    }else {
                        data.qty_sale = parseInt(e.target.value);
                    }
                    
                    theDataSource.splice(index, 1, data);
                }
            }
            setDataSourceProduct([...theDataSource]);
        } else {
            const index = theDataSource.findIndex((item: IProduct) => item.id === record.id);
            const data = theDataSource.find((item: IProduct) => item.id === record.id);
            if (index > -1 && data) {
                data.qty_sale = parseInt(e.target.value);
                theDataSource.splice(index, 1, data);
            }
            setDataSourceProduct([...theDataSource]);
        }
    };

    const columnsProduct = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            filteredValue: [searchKeyProduct],
            onFilter: (value:any, record:IVariation) => {
               if(value){
                return record.name.toLowerCase().includes(value.toLowerCase()) || record.id.toString().includes(value.toLowerCase());
               }
                return true;
            }
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
            render: (name: string) => {
                return name.length > 100 ? name.slice(0, 100) + '...' : name;
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity Sale',
            dataIndex: 'qty_sale',
            key: 'qty_sale',
            render: (qty_sale: number, record: IProduct) => {
                return (
                    <div>
                        <Input
                             disabled={saleEndDate < timeNow}
                            onChange={(e) => onChangeQuantityProduct(e, record)}
                            type="number"
                            className={`${
                                !qty_sale ? 'border-red-400' : 'border-none'
                            } bg-slate-100 box-border px-6 rounded-2xl `}
                            value={qty_sale}
                            min={1}
                            max={qty_sale}
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
            render: (_: any, record: any) => {
                return (
                    <div className="flex space-x-2">
                        <Button className="p-2" onClick={() => onDeleteSimpleProduct(record)}>
                            <CircleX />
                        </Button>

                        <Button className="p-2" onClick={() => onFilterSimpleProduct(record)}>
                            <Filter />
                        </Button>
                    </div>
                );
            },
        },
    ];
    const [dataSale, setDataSale] = useState({
        name: theSale?.name || '',
        value: theSale?.value,
        start_date: theSale?.start_date,
        type: theSale?.type,
        end_date: theSale?.end_date,
        is_active: theSale?.is_active,
        products: {} as any,
        variations: {} as any,
    });

    useEffect(() => {
        if (theSale) {
            setDataSale({
                name: theSale?.name || '',
                value: theSale?.value,
                start_date: theSale?.start_date,
                type: theSale?.type,
                end_date: theSale?.end_date,
                is_active: theSale?.is_active,
                products: {} as any,
                variations: {} as any,
            });
            setDataSourceProduct([...theSale?.products]);
            setDataSourceVariation([...theSale?.variations]);
        }
    }, [theSale]);
    useEffect(() => {
        const formatDataProduct: { [key: string]: object } = {};
        for (let i = 0; i < dataSourceProduct.length; i++) {
            const model: { [key: string]: number } = {
                quantity: dataSourceProduct[i].qty_sale,
            };
            formatDataProduct[dataSourceProduct[i].id] = model;
        }
        const formatDataVariation: { [key: string]: object } = {};
        for (let i = 0; i < dataSourceVariation.length; i++) {
            const model: { [key: string]: number } = {
                quantity: dataSourceVariation[i].qty_sale,
            };
            formatDataVariation[dataSourceVariation[i].id] = model;
        }
        setDataSale({ ...dataSale, products: formatDataProduct, variations: formatDataVariation });
    }, [dataSourceProduct, dataSourceVariation]);
    const [error, setError] = useState({
        value: '',
        start_date: '',
        end_date: '',
        empty: false,
    });
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
    const onChangeType = (type: 'percent' | 'fixed') => {
        if(saleEndDate < timeNow){ 
            return;
        }
        if (type === theSale?.type) {
            setDataSale({ ...dataSale, type: type, value: theSale?.value });
        } else {
            setDataSale({ ...dataSale, type: type, value: 0 });
        }
    };

    const { updateSale, loadingUpdateSale } = useSale();
    const onSubmit = async () => {
        let hasError = false;
        if (!dataSale.value) {
            hasError = true;
            setError({ ...error, value: 'Value is required' });
        } else if (error.value) {
            setError({ ...error });
        } else if (dataSale.start_date === '') {
            hasError = true;
            setError({ ...error, start_date: 'Start date is required' });
        } else if (dataSale.end_date === '') {
            hasError = true;
            setError({ ...error, end_date: 'End date is required' });
        } else {
            hasError = false;
            setError({
                value: '',
                start_date: '',
                end_date: '',
                empty: false,
            });
        }
        if (!hasError) {
            
            
            if (id) {
                await updateSale(id, dataSale);
            } else {
                showMessageAdmin('Something went wrong!', '', 'error');
            }
        }
    };
    
    const optionsType = [
        { label: 'Percent', value: 'percent' },
        { label: 'Fixed', value: 'fixed' },
    ];
    
    return (
        <div className="bg-slate-50 rounded-lg p-8">
            <div className="">
                <div>
                    <Heading>Update Sale</Heading>
                    <BadgeCentIcon />
                    <div className="form-row my-4">
                        <span className="text-xl my-4">Name</span>
                        <Input value={dataSale.name} onChange={onChangeName} placeholder="Enter the sale name" />
                        {/* {error.name ? <span className='text-red-600'>{error.name}</span> : ''} */}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl mb-4">Type</span>
                        <Flex
                            aria-disabled={saleEndDate < timeNow}
                            onChange={(e: any) => onChangeType(e.target.value)}
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
                                disabled={saleEndDate < timeNow}
                                value={dataSale.value}
                                min={0}
                                type="number"
                                onChange={onChangeValueFixed}
                                placeholder="Enter the discount fixed..."
                            />
                        ) : (
                            <Input
                                value={dataSale.value}
                                disabled={saleEndDate < timeNow}
                                type="number"
                                max={100}
                                min={0}
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
                                disabled={timeNow > saleStartDate}
                                value={dataSale.start_date ? dayjs(dataSale.start_date) : ''}
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
                                disabled={saleEndDate < timeNow}
                                value={dataSale.end_date ? dayjs(dataSale.end_date) : ''}
                                onChange={onChangeEndDate}
                                className="w-full"
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                            />
                        </div>
                        {error.end_date ? <span className="text-red-600">{error.end_date}</span> : ''}
                    </div>
                    <div>
                        <span className="text-xl my-4 block">Active</span>
                        <Switch
                            checked={dataSale.is_active}
                            onChange={() => setDataSale({ ...dataSale, is_active: !dataSale.is_active })}
                        />
                    </div>
                </div>
            </div>

            <div className="product-list">
                <div className="my-8">
                    <div>
                        <Heading>Simple Product</Heading>
                        <div>
                            <Input onChange={onSearchProduct} placeholder="Search a product name or id" />
                        </div>
                        <Table
                            virtual
                            expandable={{
                                expandedRowRender: (record) => <p>{record.name}</p>,
                                rowExpandable: (record) => record.name !== '', 
                                columnWidth: 50,
                               
                            }}
                            rowKey={(record) => `table2-${record.id}`}
                            rowSelection={{
                                type: 'checkbox',
                                selections: false,
                                onSelect: (record, e) => onSelectSelectedSimpleProduct(record, e),
                                onSelectAll: (selected: boolean, records: IProduct[]) =>
                                    onSelectMultipleSelectedSimpleProduct(selected, records),
                                columnWidth: 50,
                            }}
                            dataSource={dataSourceProduct}
                            columns={columnsProduct as any}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                    
                </div>
                <div>
                        <Heading>Variation Product</Heading>
                        <div>
                            <Input onChange={onSearchVariation} placeholder="Search a variation name or id" />
                        </div>
                        <Table
                            virtual
                            tableLayout="fixed"
                            expandable={{
                                expandedRowRender: (record) => <p>{record.name}</p>,
                                rowExpandable: (record) => record.name !== '', 
                                columnWidth: 50,
                               
                            }}
                            rowKey={(record) => `table3-${record.id}`}
                            rowSelection={{
                                type: 'checkbox',
                                selections: false,
                                onSelect: (record, e) => onSelectSelectedVariation(record, e),
                                onSelectAll: (selected: boolean, records: IVariation[]) =>
                                    onSelectMultipleSelectedVariation(selected, records),
                               
                                columnWidth: 50,
                            }}
                            dataSource={dataSourceVariation}
                            columns={columnsVariations}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
            </div>
            <div className="flex items-center justify-center">
                {loadingUpdateSale ? (
                    <Button className="h-16 w-32 rounded-3xl bg-black ">
                        <LoadingSmall />
                    </Button>
                ) : (
                    <Button className="h-16 w-32 rounded-3xl " onClick={onSubmit}>
                        Save Sale
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UpdateSale;
