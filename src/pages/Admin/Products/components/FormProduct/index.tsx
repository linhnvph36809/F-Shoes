import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, Form, Radio, Switch } from 'antd';
import { X } from 'lucide-react';
import '../../style.scss';

import { IImage } from '../../../../../interfaces/IImage';
import { IProduct } from '../../../../../interfaces/IProduct';
import ModalImage from '../../AddProduct/ModalImage';
import Categories from './Categories';
import EditorComponent from './Editor';
import { showMessageClient } from '../../../../../utils/messages';
import InputPrimary from '../../../components/Forms/InputPrimary';
import ButtonSubmit from '../../../components/Button/ButtonSubmit';

const FormProduct = ({ onFinish, images, setImages, initialValues, loading }: any) => {
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
                showMessageClient('Please choose image', '', 'error');
                return;
            }
            const datas = {
                ...values,
                description,
                short_description: shortDescription || initialValues?.shortDescription,
                images: imageArray,
                status: values.status ? 1 : 0,
                image_url: images.images.length == 1 ? images.images[0].url : values.image_url,
            };

            onFinish(datas);
        },
        [images, description, shortDescription, initialValues],
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
                <InputPrimary
                    label="Product Name"
                    placeholder="Enter Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter product name' }]}
                />
                <InputPrimary
                    label="Price"
                    placeholder="Enter Price"
                    name="price"
                    type="number"
                    rules={[{ required: true, message: 'Please enter price' }]}
                />

                <InputPrimary
                    name="stock_qty"
                    label="Quantity"
                    placeholder="Quantity"
                    type="number"
                    rules={[
                        { required: true, message: 'Please enter quantity' },
                        {
                            validator: (_: any, value: any) => {
                                if (value > 100000) {
                                    return Promise.reject('Quantity cannot be greater than 100000');
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                />

                <Categories />
            </div>
            <Form.Item label="Status" className="font-medium" name="status">
                <Switch className="w- text-16px font-medium" />
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
                                {images.images.map((image: any, index: number) => (
                                    <Radio.Button
                                        value={image.url}
                                        className="relative"
                                        key={index}
                                        style={{ width: '100px', height: '100px' }}
                                    >
                                        <div>
                                            <img
                                                src={image.url}
                                                alt=""
                                                className="rounded-lg w-[80px] h-[80px] object-cover"
                                            />
                                        </div>
                                        <X
                                            className="absolute -top-6 -right-4 w-6
                                                hover:cursor-pointer hover:opacity-50 transition-global"
                                            onClick={() => handleDeleteImage(image.id)}
                                        />
                                    </Radio.Button>
                                ))}
                            </div>
                        </Radio.Group>
                    </Form.Item>
                </ConfigProvider>
            )}

            <div className="my-20">
                <h5 className="text-[14px] font-medium color-primary mb-5">Short Description</h5>
                <EditorComponent
                    initialValues={initialValues?.short_description}
                    setDescription={(content: string) => {
                        setDescription(content);
                    }}
                />
            </div>

            <div>
                <h5 className="text-[14px] font-medium color-primary mb-5">Description</h5>

                <EditorComponent
                    initialValues={initialValues?.short_description}
                    setDescription={(content: string) => {
                        setShortDescription(content);
                    }}
                />
            </div>
            <div className="text-end mt-10">
                <ButtonSubmit loading={loading} width={'w-[180px]'} />
            </div>
        </Form>
    );
};

export default FormProduct;
