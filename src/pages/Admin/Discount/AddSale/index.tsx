import { Input, Button, DatePicker, Table, Switch, Modal, Flex, Radio } from 'antd';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';

import { IProduct } from '../../../../interfaces/IProduct.ts';
import { formatPrice, handleChangeMessage } from '../../../../utils';
import { IVariation } from '../../../../interfaces/IVariation.ts';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';
import { showMessageActive, showMessageAdmin } from '../../../../utils/messages.ts';
import useSale from '../../../../hooks/useSale.tsx';
import LoadingSmall from '../../../../components/Loading/LoadingSmall.tsx';
import { BadgeCentIcon, CircleX, Filter } from 'lucide-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useContextGlobal } from '../../../../contexts/index.tsx';

const AddSale = () => {
    const {  locale } = useContextGlobal();
    const intl = useIntl();
    const { data: productList } = useQueryConfig(
        `sale-list_products-add_sale_page`,
        `/api/products/all/summary?include=variations`,
    );
    const productListData = productList?.data?.products || [];

    const dataSourceProductOriginList = JSON.parse(JSON.stringify([...productListData]));

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
    const selectAllProduct = (_: any, products: IProduct[]) => {
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
    const onSelectMultipleSelectedSimpleProduct = (_: boolean, products: IProduct[]) => {
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
    const onSelectMultipleSelectedVariation = (_: boolean, variations: IVariation[]) => {
        const filterArrOneVariation = arrSelectVariationsOfOneSelectedProduct.filter((item) => {
            return !variations.find((variant) => item.id === variant.id);
        });
        setArrSelectVariationsOfOneSelectedProduct([...filterArrOneVariation]);
        setArrSelectedVariationsOfMultipleSelectedProduct([...variations]);
    };
    const onDeleteSimpleProduct = (record?: IProduct) => {
        showMessageActive(intl.formatMessage({ id: 'discount.delete' }), intl.formatMessage({ id: 'discount.delete.success' }), 'warning', () => {
            const arrSelect = [...arrSelectOneSelectedProduct, ...arrSelectMultipleSelectedProducts, record];

            const filtered = dataSourceProduct.filter((product) => {
                return !arrSelect.find((p) => p?.id === product.id);
            });
            setDataSourceProduct([...filtered]);
        });
    };
    const onDeleteVariation = (record?: IVariation) => {
        showMessageActive(intl.formatMessage({ id: 'discount.delete' }), intl.formatMessage({ id: 'discount.delete.success' }), 'warning', () => {
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
    const [searchKeyDataSouceVariation, setSearchKeyDataSouceVariation] = useState('');
    const onSearchVariation = (e: any) => {
        setSearchKeyDataSouceVariation(e.target.value);
    };
    const [searchKeyDataSouceProduct, setSearchKeyDataSouceProduct] = useState('');
    const onSearchProduct = (e: any) => {
        setSearchKeyDataSouceProduct(e.target.value);
    };
    const onFilterSimpleProduct = (record?: IProduct) => {
        showMessageActive(
            intl.formatMessage({ id: 'discount.delete' }),
            intl.formatMessage({ id: 'discount.success.delete' })
            ,
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

    const onFilterVariation = (record?: IVariation) => {
        showMessageActive(
            intl.formatMessage({ id: 'discount.delete' }),
            intl.formatMessage({ id: 'discount.success.delete' }),
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
    const columnsVariations = [
        {
            title: <FormattedMessage id="admin.id" />,
            dataIndex: 'id',
            key: 'id',
            filteredValue: [searchKeyDataSouceVariation],
            onFilter: (value: any, record: IVariation) => {
                if (value) {
                    return (
                        record.name.toLowerCase().includes(value.toLowerCase()) ||
                        record.id.toString().includes(value.toLowerCase())
                    );
                }
                return true;
            },
        },
        {
            title: <FormattedMessage id="admin.image" />,
            dataIndex: 'image_url',
            key: 'image_url',
            render: (image_url: string) => <img src={image_url} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: <FormattedMessage id="admin.name" />,
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => {
                return name.length > 26 ? name.slice(0, 26) + '...' : name;
            },
        },
        {
            title: <FormattedMessage id="admin.price" />,
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: <FormattedMessage id="body.Detail.Quantity" />,
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: <FormattedMessage id="category.table.action" />,
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

    const columnsProduct = [
        {
            title: <FormattedMessage id="admin.id" />,
            dataIndex: 'id',
            key: 'id',
            filteredValue: [searchKeyDataSouceProduct],
            onFilter: (value: any, record: IVariation) => {
                if (value) {
                    return (
                        record.name.toLowerCase().includes(value.toLowerCase()) ||
                        record.id.toString().includes(value.toLowerCase())
                    );
                }
                return true;
            },
        },
        {
            title: <FormattedMessage id="admin.image" />,
            dataIndex: 'image_url',
            key: 'image_url',
            render: (image_url: string) => <img src={image_url} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: <FormattedMessage id="admin.name" />,
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => {
                return name.length > 100 ? name.slice(0, 100) + '...' : name;
            },
        },
        {
            title: <FormattedMessage id="admin.price" />,
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: <FormattedMessage id="body.Detail.Quantity" />,
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: <FormattedMessage id="category.table.action" />,
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
    const [searchKeyListProduct, setSearchKeyProduct] = useState('');
    const onSearchKeyListProduct = (e: any) => {
        setSearchKeyProduct(e.target.value);
    };
    const columns = [
        {
            title: <FormattedMessage id="admin.id" />,
            dataIndex: 'id',
            key: 'id',
            filteredValue: [searchKeyListProduct],
            onFilter: (value: any, record: IVariation) => {
                if (value) {
                    return (
                        record.name.toLowerCase().includes(value.toLowerCase()) ||
                        record.id.toString().includes(value.toLowerCase())
                    );
                }
                return true;
            },
        },
        {
            title: <FormattedMessage id="admin.image" />,
            dataIndex: 'image_url',
            key: 'image_url',
            render: (image_url: string) => <img src={image_url} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: <FormattedMessage id="admin.name" />,
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => {
                return name.length > 20 ? name.slice(0, 20) + '...' : name;
            },
        },
        {
            title: <FormattedMessage id="body.Detail.Quantity" />,
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: <FormattedMessage id="admin.price" />,
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <span style={{ color: 'black' }}>{formatPrice(price)} đ</span>,
        },
        {
            title: <FormattedMessage id="type_of_product" />,
            dataIndex: 'is_variant',
            key: 'is_variant',
            render: (is_variant: boolean,record:IProduct) =>
                is_variant || record.variations.length > 0  ? <span>{handleChangeMessage(locale,'Yes','Có')}</span> : <span>{handleChangeMessage(locale,'No','Không')}</span>
            ,
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
        for (let i = 0; i < dataSourceProduct.length; i++) {
            const model: { [key: string]: number } = {
                quantity: 0,
            };
            formatDataProduct[dataSourceProduct[i].id] = model;
        }
        const formatDataVariation: { [key: string]: object } = {};
        for (let i = 0; i < dataSourceVariation.length; i++) {
            const model: { [key: string]: number } = {
                quantity: 0,
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
            setError({ ...error, value: intl.formatMessage({ id: 'Value is required' })});
        } else if (parseInt(e.target.value) > 100) {
            setError({ ...error, value: 'Value must be less than or equal to 100' });
        } else {
            setError({ ...error, value: '' });
        }
        setDataSale({ ...dataSale, value: e.target.value });
    };
    const onChangeValueFixed = (e: any) => {
        if (e.target.value === '') {
            setError({ ...error, value: intl.formatMessage({ id: 'Value is required' }) });
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
    const { createSale, loadingCreateSale } = useSale();
    const onSubmit = async () => {
        let hasError = false;
        if (!dataSale.value) {
            hasError = true;
            setError({ ...error, value:intl.formatMessage({ id: 'Value is required' }) });
        } else if (error.value) {
            setError({ ...error });
        } else if (dataSale.start_date === '') {
            hasError = true;
            setError({ ...error, start_date: intl.formatMessage({ id: 'Start date is required' })});
        } else if (dataSale.end_date === '') {
            hasError = true;
            setError({ ...error, end_date: intl.formatMessage({ id: 'End date is required' }) });
        } else if (dataSale.applyAll === false) {
            if (dataSourceProduct.length === 0 && dataSourceVariation.length === 0) {
                setError({ ...error, empty: true });
                showMessageAdmin('Warning', 'Please select a product!', 'warning', 5000);
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
                showMessageActive(handleChangeMessage(locale,
                    'Are you sure you want to apply the sale to all products and variations ?',
                    'Bạn có chắc chắn muốn áp dụng chương trình giảm giá cho tất cả sản phẩm và biến thể không?'),'',
                    'warning',
                    () => {
                        createSale(dataSale);
                    },
                );
            } else {
                await createSale(dataSale);
            }
        }
    };

    const optionsType = [
        { label: handleChangeMessage(locale,'Percent','Phần trăm'), value: 'percent' },
        { label: handleChangeMessage(locale,'Fixed','Cố định'), value: 'fixed' },
    ];

    return (
        <div className="bg-slate-50 rounded-lg p-8">
            <div className="">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.addSale" />
                    </Heading>
                    <BadgeCentIcon />

                    <div className="form-row my-4">
                        <span className="text-xl my-4">
                            <FormattedMessage id="admin.name" />
                        </span>
                        <Input
                            onChange={onChangeName}
                            placeholder={intl.formatMessage({ id: 'Enter_the_sale_name' })}
                        />
                        {/* {error.name ? <span className='text-red-600'>{error.name}</span> : ''} */}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl mb-4">
                            <FormattedMessage id="admin.type" />
                        </span>
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
                        <span className="text-xl my-4">
                            <FormattedMessage id="admin.value" />
                        </span>
                        {dataSale.type === 'fixed' ? (
                            <Input
                                type="number"
                                min={1}
                                onChange={onChangeValueFixed}
                                placeholder={intl.formatMessage({ id: 'Enter the discount fixed...' })}
                            />
                        ) : (
                            <Input
                                value={dataSale.value}
                                type="number"
                                max={100}
                                min={1}
                                onChange={onChangeValuePercent}
                                suffix="%"
                                placeholder={intl.formatMessage({ id: 'Enter the discount percentage...' })}
                            />
                        )}

                        {error.value ? <span className="text-red-600">{error.value}</span> : ''}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">
                            <FormattedMessage id="admin.startDate" />
                        </span>
                        <div>
                            <DatePicker
                                onChange={onChangeStartDate}
                                className="w-full"
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                            />
                        </div>
                        {error.start_date ? <span className="text-red-600">{error.start_date}</span> : ''}
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">
                            <FormattedMessage id="admin.endDate" />
                        </span>
                        <div>
                            <DatePicker
                                onChange={onChangeEndDate}
                                className="w-full"
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                            />
                        </div>
                        {error.end_date ? <span className="text-red-600">{error.end_date}</span> : ''}
                    </div>
                    <div>
                        <span className="text-xl my-4 block">
                            <FormattedMessage id="admin.active" />
                        </span>
                        <Switch
                            checked={dataSale.is_active}
                            onChange={() => setDataSale({ ...dataSale, is_active: !dataSale.is_active })}
                        />
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4 block">
                            <FormattedMessage id="Apply to all products" />
                        </span>
                        <Switch
                            checked={dataSale.applyAll}
                            onChange={() => setDataSale({ ...dataSale, applyAll: !dataSale.applyAll })}
                        />
                    </div>

                    {!dataSale.applyAll ? (
                        <div className="form-row my-4">
                            <span className="text-xl my-4 block">
                                <FormattedMessage id="Or" />
                            </span>
                            <Button onClick={() => setOpenAddProductTable(!openAddProductTable)}>
                                <FormattedMessage id="admin.addProduct" />
                            </Button>
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
                        className='min-w-[1000px]'
                    >
                        <div className='w-full p-2'>
                            <div className="my-4">
                                <Input onChange={onSearchKeyListProduct} placeholder="Search a name or an id" />
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
                                columns={columns as any}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </Modal>
                </div>
            </div>

            {!dataSale.applyAll ? (
                <div className="product-list">
                    <div className="">
                        <div>
                            <Heading>
                                <FormattedMessage id="Simple Product" />
                            </Heading>
                            <div>
                                <Input
                                    onChange={onSearchProduct}
                                    placeholder={intl.formatMessage({ id: 'Search a product name or id' })}
                                />
                            </div>
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
                                columns={columnsProduct as any}
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                        <div>
                            <Heading>
                                <FormattedMessage id="Variation Product" />
                            </Heading>
                            <Input
                                onChange={onSearchVariation}
                                placeholder={intl.formatMessage({ id: 'Search a product name or id' })}
                            />
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
            <div className="flex items-center justify-center">
                {loadingCreateSale ? (
                    <Button className="h-16 w-32 rounded-3xl bg-black ">
                        <LoadingSmall />
                    </Button>
                ) : (
                    <Button className="h-16 rounded-3xl " onClick={onSubmit}>
                        <FormattedMessage id="Save Sale" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddSale;
