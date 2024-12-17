import { Button, ConfigProvider, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAttribute from '../../../../hooks/useAttribute';
import { IAttribute } from '../../../../interfaces/IAttribute';

import Heading from '../../components/Heading';
import FormAttribute from '../components/FormAttribute';

import { combine } from './datas';
import useVariant from '../../../../hooks/useVariant';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import ModalFormVariant from './ModalFormVariant';
import { showMessageActive, showMessageClient } from '../../../../utils/messages';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { PATH_ADMIN } from '../../../../constants/path';
import ButtonBack from '../../components/ButtonBack';
import { formatPrice } from '../../../../utils';
import SelectPrimary from '../../components/Forms/SelectPrimary';

import ButtonDelete from '../../components/Button/ButtonDelete';

const API_ATTRIBUTE_GET = '/api/get/attribute/values/product/';

const AddVariant = () => {
    const { slug } = useParams();
    let id: string | number | undefined;
    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }
    const [variants, setVariants] = useState<IAttribute[]>([]);
    const [variantsChanges, setVariantsChanges] = useState<IAttribute[]>([]);
    const [variantId, setVariantId] = useState<number[]>([]);
    const [listAttribute, setListAttribute] = useState<any>([]);
    const { loading:loadingPostAttribute, postAttribute } = useAttribute();
    const [datas, setDatas] = useState<any>([]);
    const [errors, setError] = useState<any>([]);
    const { data: attributeByIds, refetch } = useQueryConfig('attribute', API_ATTRIBUTE_GET + id);
    const { loading: loadingPostVariant, postVariant } = useVariant();
    const [images, setImages] = useState<any>([]);

    const onFinish = () => {
        setError(datas);
        const isSubmit = datas.some((data: any) => data === null);

        if (!isSubmit) {
            postVariant({
                variations: datas,
            });
        }
    };
    
    const handleChange = useCallback((listId: number[]) => {
        setVariantId([...listId]);
        setVariantsChanges((preVariantChanges) =>
            preVariantChanges.filter((preVariantChange) => listId.includes(+preVariantChange.id)),
        );
    }, []);
    
    
    const handleChangeItem = useCallback(
        (values: number[], id: number) => {
            const attribute = attributeByIds?.data?.find((attribute: any) => attribute.id === id);
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
        const newAttributes = attributeByIds?.data?.filter((attribute: any) => variantId.includes(+attribute.id));
        setVariants(newAttributes);
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
   
    const deleteVariations = (i:any) => {
        showMessageActive('Are you sure you want to delete?','','warning',() => {
            const listOriginAttribute = JSON.parse(JSON.stringify([...listAttribute]));
            listOriginAttribute.splice(i,1);
            setListAttribute([...listOriginAttribute]);
            const listOriginData = JSON.parse(JSON.stringify([...datas]));
            listOriginData.splice(i,1);
            
            setDatas([...listOriginData]);
            console.log(listOriginData,'data');
            
        })
        
    }
    return (
        <>
                <section>
                    <ButtonBack to={PATH_ADMIN.LIST_PRODUCT} />
                    <Heading>Add Variant</Heading>
                    <div className="grid grid-cols-2 gap-x-10">
                        <div>
                            <SelectPrimary
                                mode="multiple"
                                allowClear
                                className="text-20px font-medium w-full"
                                style={{
                                    height: '64px',
                                }}
                                placeholder="Please select attributes"
                                onChange={handleChange}
                                optionFilterProp="name"
                                fieldNames={{ label: 'name', value: 'id' }}
                                options={attributeByIds?.data}
                                value={variantId}
                            />
                            <div>
                                {variants?.map((variant) => (
                                    <div className="p-5 bg-gray-200 rounded-lg mb-10 relative" key={variant.id}>
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
                                                    allowClear
                                                    className="text-20px font-medium w-full sm:h-[35px] md:h-[40px] border-1 border-[#111111] mb-5"
                                                    placeholder="Please select variant"
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
                                        expandedRowRender: (record: any) => {
                                            const values = datas[record.index];
                                            return (
                                                <>
                                                    {values ? (
                                                        <div>
                                                            <div className="flex items-center gap-x-5 pb-5 border-b">
                                                                <p className="text-[14px] color-primary">
                                                                    Variant Name :{' '}
                                                                </p>
                                                                <p>{record.variant_name}</p>
                                                            </div>
                                                            <div className="flex items-center gap-x-5 py-5 border-b">
                                                                <p className="text-[14px] color-primary">Price : </p>
                                                                <p>{formatPrice(values.price)}đ</p>
                                                            </div>
                                                            <div className="flex items-center gap-x-5 py-5 border-b">
                                                                <p className="text-[14px] color-primary">SKU : </p>
                                                                <p>{values.sku}</p>
                                                            </div>
                                                            <div className="flex items-center gap-x-5 py-5 border-b">
                                                                <p className="text-[14px] color-primary">Images : </p>
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
                                                        <div className="text-center color-gray text-[14px]">Empty</div>
                                                    )}
                                                </>
                                            );
                                        },

                                        rowExpandable: (record) => record.id !== '',
                                    }}
                                    rowKey={(record) => `table2-${record.id}`}
                                    columns={[
                                        {
                                            title: 'Variant Name ',
                                            dataIndex: 'variant_name',
                                            key: '2',
                                        },
                                        {
                                            title: 'Action',
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
                                                        {errors[index] === null ? (
                                                            <span className="text-[12px] text-red-500">
                                                                Please enter a valid variant
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                        <ButtonDelete onClick={() => deleteVariations(index)
                                                        } />
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

                                <div className="text-end mt-10">
                                    <ButtonSubmit
                                        loading={loadingPostVariant}
                                        onClick={
                                            listAttribute.length
                                                ? () => onFinish()
                                                : () => showMessageClient('Please choose variant', '', 'warning')
                                        }
                                    />
                                </div>
                            </ConfigProvider>
                        </div>
                    </div>
                </section>
           
        </>
    );
};

export default AddVariant;
