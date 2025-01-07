import { ConfigProvider, Select, Table } from 'antd';
import { useEffect, useState } from 'react';

import Heading from '../../components/Heading';

import useQueryConfig from '../../../../hooks/useQueryConfig';
import { useParams } from 'react-router-dom';
import FormUpdateVariant from './FormUpdateVariant';
import { formatPrice } from '../../../../utils';
import ButtonDelete from '../../components/Button/ButtonDelete';
import useVariant, { QUERY_KEY } from '../../../../hooks/useVariant';
import ButtonBack from '../../components/ButtonBack';
import { PATH_ADMIN } from '../../../../constants/path';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { FormattedMessage } from 'react-intl';

const UpdateVariant = () => {
    const { slug } = useParams();
    let id: string | number | undefined;
    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const { data, refetch } = useQueryConfig(
        [QUERY_KEY, `update-product-variant-${id}`],
        `/api/product/${id}}/variation`,
    );
    const [variantDeleteId, setVariantDeleteId] = useState<number>(0);
    useEffect(() => {
        if (variantDeleteId !== 0) {
            deleteVariant(variantDeleteId);
        }
    }, [variantDeleteId]);

    const { deleteVariant, loading: loadingDeleteVariant } = useVariant();
    useEffect(() => {
        if (!loadingDeleteVariant) {
            setVariantDeleteId(0);
            const originListVariations = JSON.parse(JSON.stringify([...listVariations]));
            const filtered = originListVariations.filter((v: any) => {
                return v.id !== variantDeleteId;
            });
            setListVariations([...filtered]);
        }
    }, [loadingDeleteVariant]);

    const [listVariations, setListVariations] = useState<any>([]);

    useEffect(() => {
        if (data?.data?.data?.variations) {
            setListVariations([...data?.data?.data?.variations]);
        }
    }, [data]);

    const variantByIds = data?.data.data || [];

    const [idVariant, setIdVariant] = useState([]);

    const handleDeleteVariant = (id: number) => {
        setVariantDeleteId(id);
        refetch();
    };

    useEffect(() => {
        setIdVariant(variantByIds?.ownAttributes?.map((attribute: any) => attribute.id));
    }, [variantByIds]);

    console.log(idVariant);


    return (
        <>
            <section>
                <ButtonBack to={PATH_ADMIN.LIST_PRODUCT} />
                <Heading>
                    <FormattedMessage id="Update Variant" />
                </Heading>
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
                                options={variantByIds?.all_attribute}
                                defaultValue={idVariant}
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
                                                    <p className="text-[14px] color-primary">
                                                        <FormattedMessage id="Variant Name" /> :{' '}
                                                    </p>
                                                    <p>{record.classify}</p>
                                                </div>
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">
                                                        <FormattedMessage id="admin.stock_qty" /> :{' '}
                                                    </p>
                                                    <p>{record.stock_qty}</p>
                                                </div>
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">
                                                        <FormattedMessage id="admin.qty_sold" /> :{' '}
                                                    </p>
                                                    <p>{record.qty_sold}</p>
                                                </div>
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">
                                                        <FormattedMessage id="admin.price" /> :{' '}
                                                    </p>
                                                    <p>{formatPrice(record.price)}đ</p>
                                                </div>
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">SKU : </p>
                                                    <p>{record.sku}</p>
                                                </div>
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">
                                                        <FormattedMessage id="admin.image" /> :{' '}
                                                    </p>
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
                                            title: <FormattedMessage id="admin.id" />,
                                            dataIndex: 'id',
                                            key: '1',
                                        },
                                        {
                                            title: <FormattedMessage id="Variant Name" />,
                                            dataIndex: 'classify',
                                            key: '2',
                                        },
                                        {
                                            title: <FormattedMessage id="category.table.action" />,
                                            key: '3',
                                            render: (_, { id, stock_qty, price, sku, images, values }: any) => {
                                                let buttonDelete = (
                                                    <ButtonDelete onClick={() => handleDeleteVariant(id)} />
                                                );
                                                if (loadingDeleteVariant && id === variantDeleteId) {
                                                    buttonDelete = <ButtonSubmit loading={true} />;
                                                }
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
                                                        {buttonDelete}
                                                    </div>
                                                );
                                            },
                                        },
                                    ]}
                                    dataSource={listVariations}
                                />
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UpdateVariant;
