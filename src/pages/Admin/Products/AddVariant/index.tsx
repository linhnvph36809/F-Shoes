import { ConfigProvider, Form, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import useAttribute, { QUERY_KEY } from '../../../../hooks/useAttribute';
import { IAttribute } from '../../../../interfaces/IAttribute';

import FormAttribute from '../components/FormAttribute';

import { combine } from './datas';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import ModalFormVariant from './ModalFormVariant';
import { showMessageActive } from '../../../../utils/messages';
import { formatPrice, handleChangeMessage, handleGetLocalStorage } from '../../../../utils';
import SelectPrimary from '../../components/Forms/SelectPrimary';

import ButtonDelete from '../../components/Button/ButtonDelete';
import { FormattedMessage, useIntl } from 'react-intl';
import { LANGUAGE, LANGUAGE_VI } from '../../../../constants';
import { useForm } from 'antd/es/form/Form';

const API_ATTRIBUTE_GET = '/api/attribute?include=values&times=attribute';

const AddVariant = ({ datas, listAttribute, errors, setDatas, setError, setListAttribute }: any) => {
    const intl = useIntl();
    const [form] = useForm();
    const [variants, setVariants] = useState<IAttribute[]>([]);
    const [variantsChanges, setVariantsChanges] = useState<IAttribute[]>([]);
    const [variantId, setVariantId] = useState<number[]>([]);
    const { loading: loadingPostAttribute, postAttribute } = useAttribute();
    const { data: attributeByIds, refetch } = useQueryConfig([QUERY_KEY, 'attribute'], API_ATTRIBUTE_GET);
    const [images, setImages] = useState<any>([]);
    const [valueAttributes, setValueAttributes] = useState<any>([]);

    const handleChange = (listId: number[]) => {
        setVariantId([...listId]);
        setVariantsChanges((preVariantChanges) =>
            preVariantChanges.filter((preVariantChange) => listId.includes(+preVariantChange.id)),
        );
    };

    const handleChangeItem = useCallback(
        (values: number[], id: number) => {
            const attribute = attributeByIds?.data?.data?.find((attribute: any) => attribute.id === id);
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
        },
        [attributeByIds, variantsChanges],
    );

    const handlePostAttributes = (value: any) => {
        const res = postAttribute(value);
        refetch();
        return res;
    };

    useEffect(() => {
        const result = attributeByIds?.data?.data
            ?.filter((item: any) => variantId.includes(item.id))
            .sort((a: any, b: any) => variantId.indexOf(a.id) - variantId.indexOf(b.id));
        setVariants(result);
    }, [variantId, attributeByIds]);

    useEffect(() => {
        const formatVariantsChanges = variantsChanges.reduce((acc: any, variantsChange: any) => {
            if (variantsChange.values.length > 0) {
                acc.push(variantsChange.values);
            }
            return acc;
        }, []);
        const variantCombine = combine(formatVariantsChanges);
        setDatas((preData: any) => {
            if (preData.length) {
                if (preData.length < variantCombine.length) {
                    const initArray = Array(variantCombine.length - preData.length).fill(null);
                    return [...preData, ...initArray];
                } else {
                    const initArray = Array(variantCombine.length).fill(null);
                    return initArray;
                }
            } else {
                const initArray = Array(variantCombine.length).fill(null);
                return initArray;
            }
        });
        setListAttribute(variantCombine);
    }, [variantsChanges]);

    useEffect(() => {
        valueAttributes.forEach((attribute: any, index: number) =>
            form.setFieldValue(
                `attribute${index}`,
                attribute.values.map((value: any) => value.id),
            ),
        );
    }, [valueAttributes]);

    const deleteVariations = (i: any) => {
        showMessageActive(
            handleChangeMessage(
                handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI,
                'Are you sure you want to delete?',
                'Bạn có chắc chắn muốn xóa không?',
            ),
            '',
            'warning',
            () => {
                const listOriginAttribute = JSON.parse(JSON.stringify([...listAttribute]));
                listOriginAttribute.splice(i, 1);
                const idVariants = listOriginAttribute.flatMap((item: any) => item.ids);
                const idAttributes = variantsChanges.flatMap((item: any) => item.values.map((value: any) => value.id));

                const newIdAttributes = idAttributes.filter((item: any) => idVariants.includes(item));
                const result = variantsChanges.map((item) => ({
                    ...item,
                    values: item.values.filter((value) => newIdAttributes.includes(value.id)),
                }));

                const isEmpty = result.every((item: any) => item.values.length === 0);
                if (isEmpty) {
                    setVariants([]);
                    setVariantId([]);
                    setListAttribute([]);
                    setVariantsChanges([]);

                } else {
                    setListAttribute([...listOriginAttribute]);
                }
                setValueAttributes(result);
                const listOriginData = JSON.parse(JSON.stringify([...datas]));
                listOriginData.splice(i, 1);
                setDatas([...listOriginData]);
            },
        );
    };

    return (
        <>
            <section>
                <div className="grid grid-cols-2 gap-x-10">
                    <Form form={form}>
                        <div>
                            <SelectPrimary
                                mode="multiple"
                                allowClear
                                className="text-[16px] font-medium w-full"
                                style={{
                                    height: '50px',
                                }}
                                placeholder={intl.formatMessage({ id: 'Please_select_attributes' })}
                                onChange={handleChange}
                                optionFilterProp="name"
                                fieldNames={{ label: 'name', value: 'id' }}
                                options={attributeByIds?.data?.data}
                                value={variantId}
                            />
                            <div>
                                {variants?.map((variant: any, index: number) => (
                                    <div className="px-5 py-5 bg-gray-200 rounded-lg mb-10 relative" key={variant.id}>
                                        <h3 className="color-primary text-16px font-medium mb-5 uppercase">
                                            {variant.name}
                                        </h3>
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
                                                <SelectPrimary
                                                    mode="multiple"
                                                    name={`attribute${index}`}
                                                    allowClear
                                                    className="select-sort-order text-[16px] font-medium w-full sm:h-[35px] md:h-[40px] border-1 border-[#111111]"
                                                    placeholder={intl.formatMessage({ id: 'Please select variant' })}
                                                    optionFilterProp="value"
                                                    fieldNames={{ label: 'value', value: 'id' }}
                                                    options={variant.values}
                                                    onChange={(value: any) => handleChangeItem(value, +variant.id)}
                                                />
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10">
                                <FormAttribute
                                    loading={loadingPostAttribute}
                                    handlePostAttributes={handlePostAttributes}
                                    setVariantId={setVariantId}
                                />
                            </div>
                        </div>
                    </Form>
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
                                                                <FormattedMessage id="admin.stock_qty" /> :{' '}
                                                            </p>
                                                            <p>{values.stock_qty}</p>
                                                        </div>
                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                            <p className="text-[14px] color-primary">
                                                                <FormattedMessage id="status" /> :{' '}
                                                            </p>
                                                            <p>{values.status ? <FormattedMessage id="show" /> : <FormattedMessage id="hide" />}</p>
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
                                                                {images[record.index].map((image: any) => (
                                                                    <img
                                                                        src={image.url}
                                                                        alt=""
                                                                        className="w-[80px] object-cover h-[80px] border"
                                                                    />
                                                                ))}
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
                                                    <ButtonDelete onClick={() => deleteVariations(index)} />
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
                                dataSource={listAttribute?.map((attribute: any, index: number) => ({
                                    id: attribute.ids,
                                    variant_name: attribute.values.join('-'),
                                    index,
                                }))}
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddVariant;
