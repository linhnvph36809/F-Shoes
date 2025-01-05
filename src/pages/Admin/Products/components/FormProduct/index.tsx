import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, Form, Radio, Switch } from 'antd';
import { X } from 'lucide-react';
import { FormattedMessage, useIntl } from 'react-intl';
import '../../style.scss';

import { IImage } from '../../../../../interfaces/IImage';
import { IProduct } from '../../../../../interfaces/IProduct';
import ModalImage from '../../AddProduct/ModalImage';
import Categories from './Categories';
import EditorComponent from './Editor';
import { showMessageClient } from '../../../../../utils/messages';
import InputPrimary from '../../../components/Forms/InputPrimary';
import ButtonSubmit from '../../../components/Button/ButtonSubmit';
import AddVariant from '../../AddVariant';
import { handleChangeMessage } from '../../../../../utils';
import { useContextGlobal } from '../../../../../contexts';

const FormProduct = ({ onFinish, images, setImages, initialValues, loading }: any) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [description, setDescription] = useState<string>('');
    const [shortDescription, setShortDescription] = useState<string>('');
    const [variants, setVariants] = useState<any>([]);
    const [listAttribute, setListAttribute] = useState<any>([]);
    const [errors, setError] = useState<any>([]);
    const [isVariant, setIsVariant] = useState<boolean>(false);
    const { locale } = useContextGlobal();

    const handleDeleteImage = useCallback((id: string | number) => {
        setImages((preImage: any) => ({
            ...preImage,
            images: preImage.images.filter((fileId: IImage) => fileId.id !== id),
        }));
    }, []);

    const handleFinish = (values: IProduct) => {
        const imageArray = images.images.map((image: IImage) => image.id);
        if (!imageArray.length) {
            showMessageClient(handleChangeMessage(locale, 'Please choose image', 'Vui lòng chọn ảnh'), '', 'warning');
            return;
        }

        if (listAttribute.length == 0 && isVariant === true) {
            showMessageClient(handleChangeMessage(locale, 'Please choose variant', 'Vui lòng chọn biến thể'), '', 'warning');
            return;
        }

        setError(variants);
        const isSubmit = variants.some((data: any) => data === null);

        const datas = {
            ...values,
            description: description || initialValues?.description,
            short_description: shortDescription || initialValues?.shortDescription,
            images: imageArray,
            status: values.status ? 1 : 0,
            image_url: images.images.length == 1 ? images.images[0].url : values.image_url,
            variations: variants,
        };

        if (!isSubmit) {
            onFinish(datas);
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            ...initialValues,
            categories: initialValues?.categories?.map((category: any) => category.id),
        });
    }, [initialValues]);

    return (
        <Form onFinish={handleFinish} form={form} initialValues={initialValues}>
            <div className="grid grid-cols-2 gap-8">
                <InputPrimary
                    label={<FormattedMessage id="product.name" />}
                    placeholder={intl.formatMessage({ id: 'product.enterName' })}
                    name="name"
                    rules={[{ required: true, message: <FormattedMessage id="product.nameRequired" /> }]}
                />
                <InputPrimary
                    label={<FormattedMessage id="product.price" />}
                    placeholder={intl.formatMessage({ id: 'product.enterPrice' })}
                    name="price"
                    min={0}
                    type="number"
                    rules={[
                        { required: true, message: <FormattedMessage id="product.priceRequired" /> },
                        {
                            validator: (_: any, value: number) => {
                                if (value > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(<FormattedMessage id="product.priceInvalid" />);
                            },
                        },
                    ]}
                />
                <Categories />
                <Form.Item
                    label={<FormattedMessage id="product.status" />}
                    className="font-medium flex items-center"
                    name="status"
                >
                    <Switch className="w- text-16px font-medium" />
                </Form.Item>
            </div>
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
                    <Form.Item
                        name="image_url"
                        rules={[{ required: true, message: <FormattedMessage id="product.chooseMainImage" /> }]}
                    >
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
                <h5 className="text-[14px] font-medium color-primary mb-5">
                    <FormattedMessage id="product.shortDescription" />
                </h5>
                <EditorComponent
                    initialValues={initialValues?.description}
                    setDescription={(content: string) => {
                        setDescription(content);
                    }}
                />
            </div>

            <div>
                <h5 className="text-[14px] font-medium color-primary mb-5">
                    <FormattedMessage id="product.description" />
                </h5>

                <EditorComponent
                    initialValues={initialValues?.short_description}
                    setDescription={(content: string) => {
                        setShortDescription(content);
                    }}
                />
            </div>

            <Form.Item
                label={<FormattedMessage id="isVariant" />}
                name="is_variant"
                className="font-medium mt-10"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: <FormattedMessage id="messageTypeProduct" /> }]}
            >
                <Radio.Group onChange={(e) => setIsVariant(e.target.value)}>
                    <Radio value={false}>
                        <FormattedMessage id="singleProduct" />
                    </Radio>
                    <Radio value={true}>
                        <FormattedMessage id="variantProducts" />
                    </Radio>
                </Radio.Group>
            </Form.Item>
            {isVariant ? (
                <div>
                    <AddVariant
                        setDatas={setVariants}
                        datas={variants}
                        setError={setError}
                        errors={errors}
                        listAttribute={listAttribute}
                        setListAttribute={setListAttribute}
                    />
                </div>
            ) : (
                ''
            )}
            <div className="text-end mt-10">
                <ButtonSubmit loading={loading} width={'w-[180px]'} />
            </div>
        </Form>
    );
};

export default FormProduct;
