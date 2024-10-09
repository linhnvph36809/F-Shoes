import { Collapse, ConfigProvider, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import useAttribute from '../../../../hooks/useAttribute';
import { IAttribute } from '../../../../interfaces/IAttribute';

import Heading from '../../components/Heading';
import FormAttribute from '../components/FormAttribute';
import UploadImage from '../components/Upload';
import SkeletonComponent from '../../components/Skeleton';
import InputPrimary from '../../../../components/Input';
import { combine } from './datas';

const AddVariant = () => {
    const [variants, setVariants] = useState<IAttribute[]>([]);
    const [variantsChanges, setVariantsChanges] = useState<IAttribute[]>([]);
    const [variantId, setVariantId] = useState<number[]>([]);
    const [listAttribute, setListAttribute] = useState<any>([]);
    const { loading, attributes, postAttribute } = useAttribute();

    const handleChange = useCallback((listId: number[]) => {
        setVariantId([...listId]);
        setVariantsChanges((preVariantChanges) =>
            preVariantChanges.filter((preVariantChange) => listId.includes(+preVariantChange.id)),
        );
    }, []);

    const handleChangeItem = useCallback(
        (values: number[], id: number) => {
            const attribute = attributes.find((attribute) => attribute.id === id);
            const newValues = attribute?.values.filter((value) => values.includes(+value.id));
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
        [attributes, variantsChanges],
    );

    useEffect(() => {
        const newAttributes = attributes.filter((attribute) => variantId.includes(+attribute.id));
        setVariants(newAttributes);
    }, [variantId, attributes]);

    useEffect(() => {
        const formatVariantsChanges = variantsChanges.reduce((acc: any, variantsChange: any) => {
            if (variantsChange.values.length > 0) {
                acc.push(variantsChange.values);
            }
            return acc;
        }, []);

        setListAttribute(combine(formatVariantsChanges));
    }, [variantsChanges]);

    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>Add Variant</Heading>
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
                                    onChange={handleChange}
                                    optionFilterProp="name"
                                    fieldNames={{ label: 'name', value: 'id' }}
                                    options={attributes}
                                    defaultValue={variantId}
                                />
                            </ConfigProvider>
                            <div>
                                {variants.map((variant) => (
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
                                                    optionFilterProp="value"
                                                    fieldNames={{ label: 'value', value: 'id' }}
                                                    options={variant.values}
                                                    onChange={(value) => handleChangeItem(value, +variant.id)}
                                                />
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10">
                                <h5 className="text-20px font-medium mb-3">Add variant</h5>
                                <FormAttribute postAttribute={postAttribute} setVariantId={setVariantId} />
                            </div>
                        </div>
                        <div>
                            {listAttribute.map((attribute: any, i: number) => (
                                <div key={i}>
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                borderRadiusLG: 8,
                                                colorBorder: '#111111',
                                            },
                                        }}
                                    >
                                        <Collapse
                                            className="mb-5 text-16px font-medium"
                                            expandIconPosition="end"
                                            items={[
                                                {
                                                    key: '1',
                                                    label: (
                                                        <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                            {attribute.values.join('-')}
                                                        </div>
                                                    ),
                                                    children: (
                                                        <div className="grid grid-cols-2 gap-x-10">
                                                            <InputPrimary
                                                                placeholder="Price"
                                                                textSize="text-16px"
                                                                height="h-[40px]"
                                                            />
                                                            <InputPrimary
                                                                placeholder="Sale"
                                                                textSize="text-16px"
                                                                height="h-[40px]"
                                                            />
                                                            <InputPrimary
                                                                placeholder="Quantity"
                                                                textSize="text-16px"
                                                                height="h-[40px]"
                                                            />
                                                            <UploadImage />
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </ConfigProvider>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default AddVariant;
