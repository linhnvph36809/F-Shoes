import { Collapse, ConfigProvider, Form, Select } from 'antd';
import { useEffect, useState } from 'react';

import useVariant from '../../../../hooks/useVariant';
import Heading from '../../components/Heading';
import SkeletonComponent from '../../components/Skeleton';
import ButtonPrimary from '../../../../components/Button';
import ModalImage from '../AddProduct/ModalImage';
import InputPrimary from '../../../../components/Input';
import { IImage } from '../../../../interfaces/IImage';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { useParams } from 'react-router-dom';

const UpdateVariant = () => {
    const [form] = Form.useForm();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const { loading, putVariant } = useVariant();
    const { data } = useQueryConfig(`update-product-variant-${id}`, `/api/product/${id}}/variation`);
    const variantByIds = data?.data.data || [];
    console.log(variantByIds);

    const [idVariant, setIdVariant] = useState([]);
    const [images, setImages] = useState<{
        isShow: boolean;
        images: IImage[];
    }>({
        isShow: false,
        images: [],
    });
    const [imagesVariants, setImagesVariants] = useState<any>({});

    useEffect(() => {
        setIdVariant(variantByIds?.ownAttributes?.map((attribute: any) => attribute.id));
    }, [variantByIds]);

    const onFinish = (values: any, i: number, id: string | number) => {
        const variantIds = variantByIds?.variations[i]?.values?.map((value: any) => value.id);
        const newValues = {
            ...values,
            status: true,
            values: variantIds,
            images: imagesVariants[i] || variantByIds?.variations[i]?.images?.map((image: any) => image.id),
        };

        putVariant(newValues, id);
    };

    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
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
                            {variantByIds?.variations?.map((variation: any, i: number) => (
                                <Form
                                    form={form}
                                    onFinish={(value: any) => onFinish(value, i, variation.id)}
                                    name={`form-attribute-${i}`}
                                    autoComplete="off"
                                    key={i}
                                    initialValues={{
                                        price: variation.price,
                                        sku: variation.sku,
                                        stock_qty: variation.stock_qty,
                                    }}
                                >
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
                                                            {variation.values
                                                                .map((value: any) => value.value)
                                                                .join('-')}
                                                        </div>
                                                    ),
                                                    children: (
                                                        <>
                                                            <div className="grid grid-cols-2 gap-x-10">
                                                                <Form.Item
                                                                    name="price"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Please enter price',
                                                                        },
                                                                        {
                                                                            validator: (_, value) =>
                                                                                !value || value > 0
                                                                                    ? Promise.resolve()
                                                                                    : Promise.reject(
                                                                                        'Price must be greater than 0',
                                                                                    ),
                                                                        },
                                                                    ]}
                                                                >
                                                                    <InputPrimary
                                                                        margin="my-2"
                                                                        placeholder="Price"
                                                                        textSize="text-16px"
                                                                        height="h-[40px]"
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    name="sku"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Please enter sale sku',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <InputPrimary
                                                                        margin="mb-2"
                                                                        placeholder="Sku"
                                                                        textSize="text-16px"
                                                                        height="h-[40px]"
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    name="stock_qty"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Please enter quantity',
                                                                        },
                                                                        {
                                                                            validator: (_, value) =>
                                                                                !value || value > 0
                                                                                    ? Promise.resolve()
                                                                                    : Promise.reject(
                                                                                        'Quantity must be greater than 0',
                                                                                    ),
                                                                        },
                                                                    ]}
                                                                >
                                                                    <InputPrimary
                                                                        margin="mb-2"
                                                                        placeholder="Quantity"
                                                                        textSize="text-16px"
                                                                        height="h-[40px]"
                                                                    />
                                                                </Form.Item>
                                                                <ModalImage
                                                                    indexVariant={i}
                                                                    images={images}
                                                                    handleSetImages={setImages}
                                                                    setImagesVariants={setImagesVariants}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-6 gap-x-8">
                                                                {variation.images.map((image: IImage) => (
                                                                    <div key={image.id}>
                                                                        <img
                                                                            src={image.url}
                                                                            alt=""
                                                                            className="border"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="text-end">
                                                                <ButtonPrimary
                                                                    width="w-[100px]"
                                                                    height="h-[50px]"
                                                                    htmlType="submit"
                                                                >
                                                                    Submit
                                                                </ButtonPrimary>
                                                            </div>
                                                        </>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </ConfigProvider>
                                </Form>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default UpdateVariant;
