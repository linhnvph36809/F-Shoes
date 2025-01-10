import { ConfigProvider, Form, Select, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import useQueryConfig from '../../../../hooks/useQueryConfig';
import FormUpdateVariant from './FormUpdateVariant';
import { formatPrice, handleChangeMessage, handleGetLocalStorage } from '../../../../utils';
import ButtonDelete from '../../components/Button/ButtonDelete';
import useVariant, { QUERY_KEY } from '../../../../hooks/useVariant';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { useForm } from 'antd/es/form/Form';
import { IAttribute } from '../../../../interfaces/IAttribute';
import { combine } from '../AddVariant/datas';
import ModalFormVariant from '../AddVariant/ModalFormVariant';
import SkeletonComponent from '../../components/Skeleton';
import { showMessageActive } from '../../../../utils/messages';

const VariantComponent = ({ datas, listAttribute, errors, setDatas, setError, setListAttribute }: any) => {
    const intl = useIntl();
    const [form] = useForm();
    const { slug } = useParams();
    let id: string | number | undefined;
    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const queryClient = useQueryClient();
    const { data, isLoading } = useQueryConfig(
        [QUERY_KEY, `update-product-variant-${id}`],
        `/api/product/${id}}/variation`,
        {
            cacheTime: 0,
            staleTime: 0,
            retry: false,
        },
    );
    const [variantDeleteId, setVariantDeleteId] = useState<number>(0);
    const { deleteVariant, loading: loadingDeleteVariant } = useVariant();
    const [listVariations, setListVariations] = useState<any>([]);
    const [variantId, setVariantId] = useState<number[]>([]);
    const [variantsChanges, setVariantsChanges] = useState<IAttribute[]>([]);
    const [variants, setVariants] = useState<IAttribute[]>([]);
    const [images, setImages] = useState<any>([]);

    const variantByIds = data?.data.data || [];

    const handleDeleteVariant = (id: number) => {
        setVariantDeleteId(id);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    };

    const deleteVariations = (i: any) => {
        showMessageActive(
            handleChangeMessage(
                handleGetLocalStorage('language') || 'vi',
                'Are you sure you want to delete?',
                'Bạn có chắc chắn muốn xóa không?',
            ),
            '',
            'warning',
            () => {
                const listOriginAttribute = JSON.parse(JSON.stringify([...listAttribute]));
                listOriginAttribute.splice(i, 1);
                setListAttribute([...listOriginAttribute]);
                const listOriginData = JSON.parse(JSON.stringify([...datas]));
                listOriginData.splice(i, 1);

                setDatas([...listOriginData]);
            },
        );
    };

    const handleChange = useCallback((listId: number[]) => {
        setVariantId([...listId]);
        setVariantsChanges((preVariantChanges) =>
            preVariantChanges.filter((preVariantChange) => listId.includes(+preVariantChange.id)),
        );
    }, []);

    const handleChangeItem = (values: number[], id: number) => {
        const attribute = variantByIds?.all_attribute?.find((attribute: any) => attribute.id === id);
        const newValues = attribute?.values.filter((value: any) => values.includes(+value.id));
        const newAttribute = { ...attribute, values: newValues } as IAttribute;

        if (variantsChanges.length == 0) {
            setVariantsChanges([newAttribute]);
        } else {
            let isPush = true;
            const newVariantsChanges = variantsChanges.map((variantsChange) => {
                if (variantsChange.id == id) {
                    isPush = false;
                    return {
                        ...variantsChange,
                        values: newValues,
                    };
                }
                return variantsChange;
            });

            if (isPush) {
                newVariantsChanges.push(newAttribute);
            }
            setVariantsChanges(newVariantsChanges as []);
        }
    };

    useEffect(() => {
        const formatVariantsChanges = variantsChanges.reduce((acc: any, variantsChange: any) => {
            if (variantsChange.values.length > 0) {
                acc.push(variantsChange.values);
            }
            return acc;
        }, []);
        const variantCombine = combine(formatVariantsChanges);

        const sumOwnAttributes = variantByIds?.ownAttributes?.reduce(
            (acc: number, cur: any) => acc + cur.values.length,
            0,
        );

        const sumVariantsChanges = variantsChanges?.reduce((acc: number, cur: any) => acc + cur.values.length, 0);

        if (sumOwnAttributes === sumVariantsChanges) {
            setDatas(
                variantByIds?.variations?.map((variation: any) => ({
                    id,
                    stock_qty: variation.stock_qty,
                    price: +variation.price,
                    sku: variation.sku,
                    images: images.map((image: any) => image.id),
                    values: variation.values.map((value: any) => value.id),
                })),
            );
        } else {
            const initArray = Array(variantCombine.length).fill(null);
            setDatas([...initArray]);
        }

        setListAttribute(variantCombine);
    }, [variantsChanges, variantByIds]);

    useEffect(() => {
        if (variantDeleteId !== 0) {
            deleteVariant(variantDeleteId);
        }
    }, [variantDeleteId]);

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

    useEffect(() => {
        if (variantByIds?.variations) {
            setListVariations([...variantByIds.variations]);
            setVariantsChanges(variantByIds?.ownAttributes);
        }
    }, [variantByIds]);

    useEffect(() => {
        const idVariant = variantByIds?.ownAttributes?.map((attribute: any) => attribute.id);
        setVariants(variantByIds.ownAttributes);
        form.setFieldValue('attribute', idVariant);
    }, [variantByIds]);

    useEffect(() => {
        const newAttributes = variantByIds?.all_attribute?.filter((attribute: any) =>
            variantId.includes(+attribute.id),
        );
        setVariants(newAttributes);
    }, [variantId]);

    return (
        <>
            <section>
                {isLoading ? (
                    <SkeletonComponent />
                ) : (
                    <div className="grid grid-cols-2 gap-x-10">
                        <div>
                            <Form form={form}>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                multipleItemHeight: 40,
                                            },
                                        },
                                    }}
                                >
                                    <Form.Item name="attribute">
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                height: '50px',
                                            }}
                                            className="text-[16px] font-medium w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111] mb-5"
                                            placeholder={intl.formatMessage({ id: 'Please select variant' })}
                                            optionFilterProp="name"
                                            fieldNames={{ label: 'name', value: 'id' }}
                                            options={variantByIds?.all_attribute}
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </ConfigProvider>
                            </Form>
                            <div>
                                {variants?.map((variant: any) => (
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
                                                    options={
                                                        variantByIds?.all_attribute?.find(
                                                            (attribute: any) => attribute.id === variant.id,
                                                        ).values
                                                    }
                                                    defaultValue={
                                                        variantByIds.ownAttributes.some(
                                                            (attribute: any) => attribute.id === variant.id,
                                                        )
                                                            ? variant.values.map((value: any) => value.id)
                                                            : []
                                                    }
                                                    onChange={(value: any) => handleChangeItem(value, +variant.id)}
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
                                                padding: 13,
                                            },
                                        },
                                    }}
                                >
                                    {variantsChanges?.reduce((acc: number, cur: any) => acc + cur.values.length, 0) ===
                                        variantByIds?.ownAttributes?.reduce(
                                            (acc: number, cur: any) => acc + cur.values.length,
                                            0,
                                        ) ? (
                                        <>
                                            <Table
                                                pagination={false}
                                                className="font-medium"
                                                expandable={{
                                                    expandedRowRender: (_: any, index: number) => {
                                                        const values = datas[index];
                                                        return (
                                                            <div>
                                                                <div className="flex items-center gap-x-5 pb-5 border-b">
                                                                    <p className="text-[14px] color-primary">
                                                                        <FormattedMessage id="Variant Name" /> :{' '}
                                                                    </p>
                                                                    <p>{values.classify}</p>
                                                                </div>
                                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                                    <p className="text-[14px] color-primary">
                                                                        <FormattedMessage id="admin.stock_qty" /> :{' '}
                                                                    </p>
                                                                    <p>{values.stock_qty}</p>
                                                                </div>
                                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                                    <p className="text-[14px] color-primary">
                                                                        <FormattedMessage id="admin.qty_sold" /> :{' '}
                                                                    </p>
                                                                    <p>{values.qty_sold}</p>
                                                                </div>
                                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                                    <p className="text-[14px] color-primary">
                                                                        <FormattedMessage id="admin.price" /> :{' '}
                                                                    </p>
                                                                    <p>{formatPrice(values.price)}đ</p>
                                                                </div>
                                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                                    <p className="text-[14px] color-primary">SKU : </p>
                                                                    <p>{values.sku}</p>
                                                                </div>
                                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                                    <p className="text-[14px] color-primary">
                                                                        <FormattedMessage id="admin.image" /> :{' '}
                                                                    </p>
                                                                    <div className="grid grid-cols-6 gap-5">
                                                                        {values.images.map((image: any) => (
                                                                            <img
                                                                                key={image.id}
                                                                                src={image.url}
                                                                                alt=""
                                                                                className="w-[80px] object-cover h-[80px] border"
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    },
                                                    rowExpandable: (record) => record.id !== '',
                                                }}
                                                rowKey={(record) => `table2-${record.id}`}
                                                columns={[
                                                    {
                                                        title: <FormattedMessage id="Variant Name" />,
                                                        dataIndex: 'classify',
                                                        key: '2',
                                                    },
                                                    {
                                                        title: <FormattedMessage id="category.table.action" />,
                                                        key: '3',
                                                        render: (
                                                            _,
                                                            { id, stock_qty, price, sku, images, values }: any,
                                                            index: number,
                                                        ) => {
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
                                                                            images: images.map(
                                                                                (image: any) => image.id,
                                                                            ),
                                                                            values: values.map(
                                                                                (value: any) => value.id,
                                                                            ),
                                                                        }}
                                                                        index={index}
                                                                        ids={values.map((value: any) => value.id)}
                                                                        setDatas={setDatas}
                                                                        setError={setError}
                                                                    />
                                                                    {buttonDelete}
                                                                </div>
                                                            );
                                                        },
                                                    },
                                                ]}
                                                dataSource={listVariations}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Table
                                                pagination={false}
                                                className="font-medium"
                                                expandable={{
                                                    expandedRowRender: (record: any) => {
                                                        const values = datas[record.index];
                                                        return (
                                                            <>
                                                                {values ? (
                                                                    <div>
                                                                        <div className="flex items-center gap-x-5 pb-5 border-b">
                                                                            <p className="text-[14px] color-primary">
                                                                                <FormattedMessage id="Variant Name" /> :{' '}
                                                                            </p>
                                                                            <p>{record.variant_name}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                                            <p className="text-[14px] color-primary">
                                                                                <FormattedMessage id="admin.price" /> :{' '}
                                                                            </p>
                                                                            <p>{formatPrice(values.price)}đ</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                                            <p className="text-[14px] color-primary">
                                                                                <FormattedMessage id="admin.stock_qty" />{' '}
                                                                                :{' '}
                                                                            </p>
                                                                            <p>{values.stock_qty}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                                            <p className="text-[14px] color-primary">
                                                                                SKU :{' '}
                                                                            </p>
                                                                            <p>{values.sku}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                                            <p className="text-[14px] color-primary">
                                                                                <FormattedMessage id="admin.image" /> :{' '}
                                                                            </p>
                                                                            <div className="grid grid-cols-6 gap-5">
                                                                                {images[record.index]?.map(
                                                                                    (image: any) => (
                                                                                        <img
                                                                                            src={image.url}
                                                                                            alt=""
                                                                                            className="w-[80px] object-cover h-[80px] border"
                                                                                        />
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-center color-gray text-[14px]">
                                                                        <FormattedMessage id="Empty" />
                                                                    </div>
                                                                )}
                                                            </>
                                                        );
                                                    },

                                                    rowExpandable: (record) => record.id !== '',
                                                }}
                                                rowKey={(record) => `table2-${record.id}`}
                                                columns={[
                                                    {
                                                        title: <FormattedMessage id="Variant Name" />,
                                                        dataIndex: 'variant_name',
                                                        key: '2',
                                                    },
                                                    {
                                                        title: <FormattedMessage id="category.table.action" />,
                                                        key: '3',
                                                        render: (_, { id }: any, index: number) => {
                                                            return (
                                                                <div className="flex items-center gap-x-4">
                                                                    <ModalFormVariant
                                                                        index={index}
                                                                        ids={id}
                                                                        setDatas={setDatas}
                                                                        setError={setError}
                                                                        setImages={setImages}
                                                                    />
                                                                    <ButtonDelete
                                                                        onClick={() => deleteVariations(index)}
                                                                    />
                                                                    {errors[index] === null ? (
                                                                        <div className="text-[12px] text-red-500">
                                                                            <FormattedMessage id="Please enter a valid variant" />
                                                                        </div>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </div>
                                                            );
                                                        },
                                                    },
                                                ]}
                                                dataSource={listAttribute.map((attribute: any, index: number) => ({
                                                    id: attribute.ids,
                                                    variant_name: attribute.values.join('-'),
                                                    index,
                                                }))}
                                            />
                                        </>
                                    )}
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default VariantComponent;
