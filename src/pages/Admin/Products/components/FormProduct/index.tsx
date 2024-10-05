import { useCallback, useEffect, useState } from 'react';
import { Checkbox, ConfigProvider, Form, Radio } from 'antd';
import { X } from 'lucide-react';
import '../../style.scss';

import { IImage } from '../../../../../interfaces/IImage';
import { IProduct } from '../../../../../interfaces/IProduct';
import ButtonPrimary from '../../../../../components/Button';
import InputPrimary from '../../../../../components/Input';
import ModalImage from '../../AddProduct/ModalImage';
import Categories from './Categories';
import EditorComponent from './Editor';

const FormProduct = ({ onFinish, images, setImages, initialValues }: any) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState<string>('');
    const [shortDescription, setShortDescription] = useState<string>('');

    const handleDeleteImage = useCallback((id: string | number) => {
        setImages((preImage: any) => ({
            ...preImage,
            images: preImage.images.filter((fileId: IImage) => fileId.id !== id),
        }));
    }, []);

    const handleFinish = useCallback(
        (values: IProduct) => {
            const imageArray = images.images.map((image: IImage) => image.id);
            if (!imageArray.length) {
                alert('Please choose image');
                return;
            }
            const datas = {
                ...values,
                description,
                short_description: shortDescription,
                images: imageArray,
            };

            onFinish(datas);
        },
        [images, description, shortDescription],
    );

    useEffect(() => {
        form.setFieldsValue({
            ...initialValues,
            categories: initialValues?.categories?.map((category: any) => category.id),
        });
    }, [initialValues]);

    return (
        <Form onFinish={handleFinish} form={form} initialValues={initialValues}>
            <div className="grid grid-cols-2 gap-5">
                <Form.Item name="name" rules={[{ required: true, message: 'Please enter product name' }]}>
                    <InputPrimary placeholder="Product Name" />
                </Form.Item>

                <Form.Item name="price" rules={[{ required: true, message: 'Please enter price' }]}>
                    <InputPrimary placeholder="Price" />
                </Form.Item>

                <Form.Item
                    name="stock_qty"
                    rules={[
                        { required: true, message: 'Please enter quantity' },
                        {
                            validator: (_, value) => {
                                if (value > 100000) {
                                    return Promise.reject('Quantity cannot be greater than 100000');
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputPrimary placeholder="Quantity" type="number" />
                </Form.Item>
                <Categories />
            </div>
            <Form.Item name="status" valuePropName="checked" initialValue={false}>
                <Checkbox className="w- text-16px font-medium">Status</Checkbox>
            </Form.Item>
            <ModalImage images={images} handleSetImages={setImages} />
            {images.isShow && (
                <ConfigProvider
                    theme={{
                        components: {
                            Radio: {
                                buttonSolidCheckedBg: '#ccc',
                                buttonSolidCheckedHoverBg: '#ccc',
                                buttonSolidCheckedColor: '#111111',
                            },
                        },
                    }}
                >
                    <Form.Item name="image_url" rules={[{ required: true, message: 'Choose main image' }]}>
                        <Radio.Group buttonStyle="solid" defaultValue={initialValues?.image_url}>
                            <div className="grid grid-cols-12 gap-x-6 mt-10">
                                {images.images.map((image: any) => (
                                    <Radio.Button value={image.url} key={image.id}>
                                        <div className="relative">
                                            <img src={image.url} alt="" className="rounded-lg w-[70px]" />
                                            <X
                                                className="absolute -top-6 -right-4 w-6
                                                hover:cursor-pointer hover:opacity-50 transition-global"
                                                onClick={() => handleDeleteImage(image.id)}
                                            />
                                        </div>
                                    </Radio.Button>
                                ))}
                            </div>
                        </Radio.Group>
                    </Form.Item>
                </ConfigProvider>
            )}

            <div className="my-20">
                <h5 className="text-[18px] font-medium color-primary mb-5">Short Description</h5>
                <EditorComponent
                    initialValues={initialValues?.short_description}
                    setDescription={(content: string) => {
                        setDescription(content);
                    }}
                />
            </div>

            <div>
                <h5 className="text-[18px] font-medium color-primary mb-5">Description</h5>

                <EditorComponent
                    initialValues={initialValues?.short_description}
                    setDescription={(content: string) => {
                        setShortDescription(content);
                    }}
                />
            </div>
            <div className="text-end mt-10">
                <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                    Submit
                </ButtonPrimary>
            </div>
        </Form>
    );
};

export default FormProduct;
