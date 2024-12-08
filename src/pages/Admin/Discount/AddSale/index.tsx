import { Input, Button, DatePicker, Table, Switch, Modal, Flex, Radio } from 'antd';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';

import { IProduct } from '../../../../interfaces/IProduct.ts';
import { formatPrice } from '../../../../utils';
import { IVariation } from '../../../../interfaces/IVariation.ts';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';
import { showMessageActive, showMessageAdmin } from '../../../../utils/messages.ts';
import useSale from '../../../../hooks/useSale.tsx';
import LoadingSmall from '../../../../components/Loading/LoadingSmall.tsx';
import { BadgeCentIcon } from 'lucide-react';

const AddSale = () => {
    const { data: productList } = useQueryConfig(`sale-list_products-add_sale_page`, `/api/products/all/summary`);
    const productListData = productList?.data?.products || [];
    const dataSourceProductOriginList = [...productListData];

    const [openAddProductTable, setOpenAddProductTable] = useState<boolean>(false);
    const [selectedSimpleProducts, setSelectedSimpleProducts] = useState<IProduct[]>([]);
    const [selectedVariations, setSelectedVariations] = useState<IVariation[]>([]);
    const [dataSourceVariation, setDataSourceVariation] = useState<IVariation[]>([]);
    const [dataSourceProduct, setDataSourceProduct] = useState<IProduct[]>([]);
    const [arrSelectMultipleProduct, setArrSelectMultipleProduct] = useState<IProduct[]>([]);
    const [arrVariationsOfMultipleProduct, setArrSelectVariationsOfMultipleProduct] = useState<IVariation[]>([]);
    const [arrSelectOneProduct, setArrSelectOneProduct] = useState<IProduct[]>([]);
    const [arrSelectedVariationsOfOneProduct, setArrSelectVariationsOfOneProduct] = useState<IVariation[]>([]);
    const selectProduct = (product: IProduct, checked: boolean) => {
        if (checked) {
            if (product?.variations && product?.variations.length > 0) {
                setArrSelectVariationsOfOneProduct([...arrSelectedVariationsOfOneProduct, ...product.variations]);
            } else {
                setArrSelectOneProduct([...arrSelectOneProduct, product]);
            }
        } else {
            if (product?.variations && product?.variations.length > 0) {
                const filtered = arrSelectedVariationsOfOneProduct.filter((item) => {
                    return !product.variations.find((variant) => item.id === variant.id);
                });
                setArrSelectVariationsOfOneProduct([...filtered]);
                const filteredMultipleOnes = arrVariationsOfMultipleProduct.filter((item) => {
                    return !product.variations.find((variant) => item.id === variant.id);
                });
                setArrSelectVariationsOfMultipleProduct([...filteredMultipleOnes]);
            } else {
                const filtered = arrSelectOneProduct.filter((item) => item.id !== product.id);
                setArrSelectOneProduct([...filtered]);
                const filteredMultipleOnes = arrSelectMultipleProduct.filter((item) => item.id !== product.id);
                setArrSelectMultipleProduct([...filteredMultipleOnes]);
            }
        }
    };
    const selectAllProduct = (checked: boolean, products: IProduct[]) => {
        let variantsInProducts: IVariation[] = [];
        let simpleProductInProducts: IProduct[] = [];
        products.map((p) => {
            if (p?.variations && p.variations.length > 0) {
                variantsInProducts = [...variantsInProducts, ...p.variations];
            } else {
                simpleProductInProducts = [...simpleProductInProducts, p];
            }
        });
        setArrSelectVariationsOfMultipleProduct([...variantsInProducts]);
        setArrSelectMultipleProduct([...simpleProductInProducts]);
    };
    useEffect(() => {
        setSelectedVariations([...arrSelectedVariationsOfOneProduct, ...arrVariationsOfMultipleProduct]);
        setSelectedSimpleProducts([...arrSelectOneProduct, ...arrSelectMultipleProduct]);
    }, [
        arrSelectOneProduct,
        arrSelectMultipleProduct,
        arrSelectedVariationsOfOneProduct,
        arrVariationsOfMultipleProduct,
    ]);
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
    const onSelectMultipleSelectedSimpleProduct = (checked: boolean, products: IProduct[]) => {
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
    const onSelectMultipleSelectedVariation = (checked: boolean, variations: IVariation[]) => {
        const filterArrOneVariation = arrSelectVariationsOfOneSelectedProduct.filter((item) => {
            return !variations.find((variant) => item.id === variant.id);
        });
        setArrSelectVariationsOfOneSelectedProduct([...filterArrOneVariation]);
        setArrSelectedVariationsOfMultipleSelectedProduct([...variations]);
    };

    const onDeleteSimpleProduct = (record?: IProduct) => {
        showMessageActive('Delete', 'Are you sure you want to delete', 'warning', () => {
            const arrSelect = [...arrSelectOneSelectedProduct, ...arrSelectMultipleSelectedProducts, record];

            const filtered = dataSourceProduct.filter((product) => {
                return !arrSelect.find((p) => p?.id === product.id);
            });
            setDataSourceProduct([...filtered]);
        });
    };
    const onDeleteVariation = (record?: IVariation) => {
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
    const onOkSelectProduct = () => {
        setDataSourceVariation(selectedVariations);
        setDataSourceProduct(selectedSimpleProducts);
        setOpenAddProductTable(false);
    };
    const onChangeQuantityVariation = (e: any, record: IVariation) => {
        const arrSelected: IVariation[] = [
            ...arrSelectVariationsOfOneSelectedProduct,
            ...arrSelectedVariationsOfMultipleSelectedProduct,
        ];
        const arrSelect: IVariation[] = [...arrSelected.filter((p) => p.id !== record.id), record];

        const theDataSource = dataSourceVariation;
        if (arrSelect && arrSelect.length > 0) {
            for (let i = 0; i < arrSelect.length; i++) {
                const index = theDataSource.findIndex((item) => item.id === arrSelect[i].id);
                const data = theDataSource.find((item) => item.id === arrSelect[i].id);
                if (index > -1 && data) {
                    data.stock_qty = parseInt(e.target.value);
                    theDataSource.splice(index, 1, data);
                }
            }
            setDataSourceVariation([...theDataSource]);
        } else {
            const index = theDataSource.findIndex((item) => item.id === record.id);
            const data = theDataSource.find((item) => item.id === record.id);
            if (index > -1 && data) {
                data.stock_qty = parseInt(e.target.value);
                theDataSource.splice(index, 1, data);
            }
            setDataSourceVariation([...theDataSource]);
        }
    };

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
            title: 'Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
            render: (stock_qty: number, record: IVariation) => {
                return (
                    <div>
                        <Input
                            onChange={(e) => onChangeQuantityVariation(e, record)}
                            type="number"
                            className="border-none bg-gray-200 box-border px-6 rounded-2xl"
                            value={stock_qty}
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
            render: (action: any, record: any) => {
                return <Button onClick={() => onDeleteVariation(record)}>Delete</Button>;
            },
        },
    ];
    const onChangeQuantityProduct = (e: any, record: IProduct) => {
        const arrSelected = [...arrSelectOneSelectedProduct, ...arrSelectMultipleSelectedProducts];
        const arrSelect = [...arrSelected.filter((p) => p.id !== record.id), record];
        const theDataSource = dataSourceProduct;
        if (arrSelect && arrSelect.length > 0) {
            for (let i = 0; i < arrSelect.length; i++) {
                const index = theDataSource.findIndex((item) => item.id === arrSelect[i].id);
                const data = theDataSource.find((item) => item.id === arrSelect[i].id);
                if (index > -1 && data) {
                    data.stock_qty = parseInt(e.target.value);
                    theDataSource.splice(index, 1, data);
                }
            }
            setDataSourceProduct([...theDataSource]);
        } else {
            const index = theDataSource.findIndex((item) => item.id === record.id);
            const data = theDataSource.find((item) => item.id === record.id);
            if (index > -1 && data) {
                data.stock_qty = parseInt(e.target.value);
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
            title: 'Quantity',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
            render: (stock_qty: number, record: IProduct) => {
                return (
                    <div>
                        <Input
                            onChange={(e) => onChangeQuantityProduct(e, record)}
                            type="number"
                            className={`${
                                !stock_qty ? 'border-red-400' : 'border-none'
                            } bg-slate-100 box-border px-6 rounded-2xl `}
                            value={stock_qty}
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
            render: (action: any, record: any) => {
                return <Button onClick={() => onDeleteSimpleProduct(record)}>Delete</Button>;
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
            render: (name: string) => {
                return name.length > 20 ? name.slice(0, 20) + '...' : name;
            },
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

    const [dataSale, setDataSale] = useState({
        name: '',
        value: 1,
        start_date: '',
        type: 'percent',
        end_date: '',
        products: {} as any,
        variations: {} as any,
        is_active: true,
        applyAll: true,
    });

    useEffect(() => {
        const formatDataProduct: { [key: string]: object } = {};
        for (let i = 0; i < dataSourceProduct.length - 1; i++) {
            const model: { [key: string]: number } = {
                quantity: dataSourceProduct[i].stock_qty,
            };
            formatDataProduct[dataSourceProduct[i].id] = model;
        }
        const formatDataVariation: { [key: string]: object } = {};
        for (let i = 0; i < dataSourceVariation.length - 1; i++) {
            const model: { [key: string]: number } = {
                quantity: dataSourceVariation[i].stock_qty,
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
        }
        setDataSale({ ...dataSale, value: e.target.value });
    };
    const onChangeValueFixed = (e: any) => {
        if (e.target.value === '') {
            setError({ ...error, value: 'Value is required' });
        } else {
            setDataSale({ ...dataSale, value: e.target.value });
        }
    };
    const onChangeStartDate = (date: any) => {
        setDataSale({ ...dataSale, start_date: date.format('YYYY-MM-DD HH:mm:ss') });
    };
    const onChangeEndDate = (date: any) => {
        setDataSale({ ...dataSale, end_date: date.format('YYYY-MM-DD HH:mm:ss') });
    };
    const { createSale, loadingCreateSale } = useSale();
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
        } else if (dataSale.applyAll === false) {
            if (dataSourceProduct.length === 0 && dataSourceVariation.length === 0) {
                setError({ ...error, empty: true });
                hasError = true;
            }
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
            if (dataSale.applyAll) {
                showMessageActive(
                    'Warning',
                    'Are you sure you want to apply the sale to all products and variations ?',
                    'warning',
                    () => {
                        createSale(dataSale);
                    },
                );
            } else {
                await createSale(dataSale);
            }
        } else {
            showMessageAdmin('Warning', 'Something is missing!Please check.', 'warning', 5000);
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
                    <Heading>Add Sale </Heading>
                    <BadgeCentIcon />

                    <div className="form-row my-4">
                        <span className="text-xl my-4">Name</span>
                        <Input onChange={onChangeName} placeholder="Enter the sale name" />
                        {/* {error.name ? <span className='text-red-600'>{error.name}</span> : ''} */}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl mb-4">Type</span>
                        <Flex
                            onChange={(e: any) => setDataSale({ ...dataSale, type: e?.target?.value, value: 1 })}
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
                                onChange={onChangeStartDate}
                                className="w-full"
                                showTime
                                format="MM/DD/YYYY HH:mm:ss"
                            />
                        </div>
                        {error.start_date ? <span className="text-red-600">{error.start_date}</span> : ''}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">End date</span>
                        <div>
                            <DatePicker
                                onChange={onChangeEndDate}
                                className="w-full"
                                showTime
                                format="MM/DD/YYYY HH:mm:ss"
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
                    <div className="form-row my-4">
                        <span className="text-xl my-4 block">Apply to all products</span>
                        <Switch
                            checked={dataSale.applyAll}
                            onChange={() => setDataSale({ ...dataSale, applyAll: !dataSale.applyAll })}
                        />
                    </div>

                    {!dataSale.applyAll ? (
                        <div className="form-row my-4">
                            <span className="text-xl my-4 block">or</span>
                            <Button onClick={() => setOpenAddProductTable(!openAddProductTable)}>Add product</Button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div>
                    <Modal
                        open={openAddProductTable}
                        onOk={onOkSelectProduct}
                        onCancel={() => setOpenAddProductTable(false)}
                    >
                        <div>
                            <div className="my-4">
                                <Input placeholder="Search a name" />
                            </div>
                            <Table
                                rowKey={(record) => `table1-${record.id}`}
                                rowSelection={{
                                    type: 'checkbox',
                                    selections: false,
                                    onSelect: (record, e) => selectProduct(record, e),
                                    onSelectAll: (selected: boolean, records: IProduct[]) =>
                                        selectAllProduct(selected, records),
                                }}
                                dataSource={dataSourceProductOriginList}
                                columns={columns}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </Modal>
                </div>
            </div>

            {!dataSale.applyAll ? (
                <div className="product-list">
                    <div className="grid grid-cols-2 gap-8 my-8">
                        <div>
                            <Heading>Simple Product</Heading>
                            <Table
                                rowKey={(record) => `table2-${record.id}`}
                                rowSelection={{
                                    type: 'checkbox',
                                    selections: false,
                                    onSelect: (record, e) => onSelectSelectedSimpleProduct(record, e),
                                    onSelectAll: (selected: boolean, records: IProduct[]) =>
                                        onSelectMultipleSelectedSimpleProduct(selected, records),
                                }}
                                dataSource={dataSourceProduct}
                                columns={columnsProduct}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                        <div>
                            <Heading>Variation Product</Heading>
                            <Table
                                rowKey={(record) => `table3-${record.id}`}
                                rowSelection={{
                                    type: 'checkbox',
                                    selections: false,
                                    onSelect: (record, e) => onSelectSelectedVariation(record, e),
                                    onSelectAll: (selected: boolean, records: IVariation[]) =>
                                        onSelectMultipleSelectedVariation(selected, records),
                                }}
                                dataSource={dataSourceVariation}
                                columns={columnsVariations}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            {loadingCreateSale ? (
                <Button className="h-16 w-32 rounded-3xl bg-black">
                    <LoadingSmall />
                </Button>
            ) : (
                <Button className="h-16 w-32 rounded-3xl " onClick={onSubmit}>
                    Save Sale
                </Button>
            )}
        </div>
    );
};

export default AddSale;
