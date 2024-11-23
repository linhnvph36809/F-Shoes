import { Input, Button, DatePicker, Table} from 'antd';
import Heading from '../../components/Heading';
import {useEffect, useState} from "react";
import {tokenManagerInstance} from "../../../../api";
import {IProduct} from "../../../../interfaces/IProduct.ts";
import {formatPrice} from "../../../../utils";
import {IVariation} from "../../../../interfaces/IVariation.ts";
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';



const AddSale = () => {
    //const [form] = Form.useForm();
    let products = [];
    //const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const { data } = useQueryConfig(
        `sale-list_products-add_sale_page`,
        `/api/products/all/summary`,
    );
    if(data?.data?.products){
        products = data.data.products;
    }
    const dataSource = [
        ...products
    ];

    const [selectedSimpleProducts, setSelectedSimpleProducts] = useState<IProduct[]>([]);
    const [selectedVariations, setSelectedVariations] = useState<IVariation[]>([]);
    const [dataSourceVariation, setDataSourceVariation] = useState<IVariation[]>([]);
    const [dataSourceProduct, setDataSourceProduct] = useState<IProduct[]>([]);
    const selectProduct = (product: IProduct, checked: boolean) => {
        if (checked) {
            if (product?.variations && product?.variations.length > 0) {
                setSelectedVariations([...selectedVariations, ...product.variations]);
            } else {
                setSelectedSimpleProducts([...selectedSimpleProducts, product]);
            }
        } else {
            if (product?.variations && product?.variations.length > 0) {
                const filtered = selectedVariations.filter((item) => {
                    return !product.variations.find(variant => item.id === variant.id);
                });
                setSelectedVariations([...filtered]);
            } else {
                const filtered = selectedSimpleProducts.filter((item) => item.id !== product.id);
                setSelectedSimpleProducts([...filtered]);
            }
        }

    }
    useEffect(() => {
        setDataSourceVariation(selectedVariations);
        setDataSourceProduct(selectedSimpleProducts);
    }, [selectedVariations,selectedSimpleProducts]);
    
    const selectAllProduct = (checked: boolean, products: IProduct[]) => {
        if (checked) {
            let variantsInProducts:IVariation[] = [];
            let simpleProductInProducts:IProduct[] = [];
            products.map((p) => {
                if(p?.variations && p.variations.length > 0) {
                    variantsInProducts = [...variantsInProducts,...p.variations];
                }else{
                    simpleProductInProducts = [...simpleProductInProducts, p];
                }
            })
            const filteredVariation = selectedVariations.filter((item) => {
                const variationInProduct = variantsInProducts.find(variant => item.id === variant.id);
                if(variationInProduct){
                    return false;
                }
                return true;
            });
            const filteredSimpleProduct = selectedSimpleProducts.filter((item) => {
                const productInList = simpleProductInProducts.find(product => item.id === product.id);
                if(productInList){
                    return false;
                }
                return true;
            });
            setSelectedVariations([...filteredVariation, ...variantsInProducts]);
            setSelectedSimpleProducts([...filteredSimpleProduct,...simpleProductInProducts]);
        }else {
            console.log(products,'products');
        } 
    }
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
            render: (image_url: string) => <img src={image_url} alt="product" style={{width: 50, height: 50}}/>,
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

                return <div><Input type="number"
                                   className="border-none bg-gray-200 box-border px-6 rounded-2xl"
                                   defaultValue={stock_qty}
                                   min={1} max={stock_qty} placeholder="Enter quantity"/>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action,record) => {
                return (<Button>Delete</Button>)
            }
        }
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
            render: (image_url: string) => <img src={image_url} alt="product" style={{width: 50, height: 50}}/>,
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

                return <div><Input type="number"
                                   className="border-none bg-gray-200 box-border px-6 rounded-2xl"
                                   defaultValue={stock_qty}
                                   min={1} max={stock_qty} placeholder="Enter quantity"/>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action,record) => {
                return (<Button>Delete</Button>)
            }
        }
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
            render: (image_url: string) => <img src={image_url} alt="product" style={{width: 50, height: 50}}/>,
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
            render: (price: number) => <span style={{color: 'black'}}>{formatPrice(price)} đ</span>,
        },
    ];

    return (
        <div className="discount-product-list">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <Heading>Add Sale</Heading>

                    <div className="form-row my-4">
                        <span className="text-xl my-4">Name</span>
                        <Input placeholder="Enter the sale name"/>
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">Value</span>
                        <Input suffix="%" placeholder="Enter the discount percentage..."/>
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">Start date</span>
                        <div>
                            <DatePicker className="w-full" showTime format="MM/DD/YYYY HH:mm:ss"/>
                        </div>
                    </div>
                    <div className="form-row my-4">
                        <span className="text-xl my-4">End date</span>
                        <div>
                            <DatePicker className="w-full" showTime format="MM/DD/YYYY HH:mm:ss"/>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="my-4">
                        <Input placeholder="Search a name"/>
                    </div>
                    <Table rowKey="id" rowSelection={{
                        type: 'checkbox',
                        selections: false,
                        onSelect: (record, e) => selectProduct(record, e),
                        onSelectAll: (selected: boolean, records: IProduct[]) => selectAllProduct(selected, records),

                    }} dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>
                </div>
            </div>

            <div className="product-list">
                <div className="grid grid-cols-2 gap-8 my-8">
                    <div>

                        <Heading>Simple Product</Heading>
                        <Table rowKey="id" rowSelection={
                            {
                                type: 'checkbox',
                            }
                        } dataSource={dataSourceProduct} columns={columnsProduct} pagination={{pageSize: 5}}/>
                    </div>
                    <div>
                        <Heading>Variation Product</Heading>
                        <Table rowKey="id" rowSelection={{
                            type: 'checkbox',


                        }} dataSource={dataSourceVariation} columns={columnsVariations} pagination={{pageSize: 5}}/>
                    </div>
                </div>
            </div>
            <Button className="h-16 w-32 rounded-3xl">Save Sale</Button>
        </div>
    );
};

export default AddSale;
