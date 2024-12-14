import { ConfigProvider, Select, Table } from 'antd';
import { useEffect, useState } from 'react';

import Heading from '../../components/Heading';
import SkeletonComponent from '../../components/Skeleton';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { useParams } from 'react-router-dom';
import FormUpdateVariant from './FormUpdateVariant';
import { formatPrice } from '../../../../utils';
import ButtonDelete from '../../components/Button/ButtonDelete';
import useVariant from '../../../../hooks/useVariant';
import ButtonBack from '../../components/ButtonBack';
import { PATH_ADMIN } from '../../../../constants/path';

const UpdateVariant = () => {
    const { slug } = useParams();
    let id: string | number | undefined;
    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const { data, isFetching, refetch } = useQueryConfig(
        `update-product-variant-${id}`,
        `/api/product/${id}}/variation`,
    );
    const { deleteVariant } = useVariant();
    const variantByIds = data?.data.data || [];

    const [idVariant, setIdVariant] = useState([]);

    const handleDeleteVariant = (id: number) => {
        deleteVariant(id);
        refetch();
    };

    useEffect(() => {
        setIdVariant(variantByIds?.ownAttributes?.map((attribute: any) => attribute.id));
    }, [variantByIds]);

    return (
        <>
            {isFetching ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <ButtonBack to={PATH_ADMIN.LIST_PRODUCT} />
                    <Heading>Update Variant</Heading>
                    <div className="grid grid-cols-2 gap-x-10">
                        <div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Select: {
                                            multipleItemHeight: 40,
                                        },
                                    },
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className="text-20px font-medium w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111] mb-5"
                                    placeholder="Please select"
                                    optionFilterProp="name"
                                    fieldNames={{ label: 'name', value: 'id' }}
                                    options={variantByIds?.ownAttributes}
                                    value={idVariant}
                                />
                            </ConfigProvider>
                            <div>
                                {variantByIds?.ownAttributes?.map((variant: any) => (
                                    <div className="p-5 bg-gray-200 rounded-lg mb-10 relative" key={variant.id}>
                                        <h3 className="color-primary text-16px font-medium mb-5">{variant.name}</h3>
                                        <div>
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Select: {
                                                            multipleItemHeight: 30,
                                                        },
                                                    },
                                                }}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    className="text-20px font-medium w-full sm:h-[35px] md:h-[40px] border-1 border-[#111111] mb-5"
                                                    placeholder="Please select"
                                                    optionFilterProp="name"
                                                    fieldNames={{ label: 'value', value: 'id' }}
                                                    options={variant.values}
                                                    value={variant.values}
                                                />
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Table: {
                                                headerBg: '#e5e7eb',
                                                headerBorderRadius: 10,
                                                fontSize: 15,
                                                padding: 20,
                                            },
                                        },
                                    }}
                                >
                                    <Table
                                        pagination={false}
                                        className="font-medium"
                                        expandable={{
                                            expandedRowRender: (record: any) => (
                                                <div>
                                                    <div className="flex items-center gap-x-5 pb-5 border-b">
                                                        <p className="text-[14px] color-primary">Variant Name : </p>
                                                        <p>{record.classify}</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">Price : </p>
                                                        <p>{formatPrice(record.price)}đ</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">SKU : </p>
                                                        <p>{record.sku}</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">Images : </p>
                                                        <div className="grid grid-cols-6 gap-5">
                                                            {record.images.map((image: any) => (
                                                                <img
                                                                    src={image.url}
                                                                    alt=""
                                                                    className="w-[80px] object-cover h-[80px] border"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                            rowExpandable: (record) => record.id !== '',
                                        }}
                                        rowKey={(record) => `table2-${record.id}`}
                                        columns={[
                                            {
                                                title: 'ID',
                                                dataIndex: 'id',
                                                key: '1',
                                            },
                                            {
                                                title: 'Variant Name',
                                                dataIndex: 'classify',
                                                key: '2',
                                            },
                                            {
                                                title: 'Action',
                                                key: '3',
                                                render: (_, { id, stock_qty, price, sku, images, values }: any) => {
                                                    return (
                                                        <div className="flex items-center gap-x-4">
                                                            <FormUpdateVariant
                                                                initialValues={{
                                                                    id,
                                                                    stock_qty: stock_qty,
                                                                    price: +price,
                                                                    sku: sku,
                                                                    images: images.map((image: any) => image.id),
                                                                    values: values.map((value: any) => value.id),
                                                                }}
                                                            />
                                                            <ButtonDelete onClick={() => handleDeleteVariant(id)} />
                                                        </div>
                                                    );
                                                },
                                            },
                                        ]}
                                        dataSource={variantByIds?.variations || []}
                                    />
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default UpdateVariant;
