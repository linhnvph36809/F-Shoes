import { useEffect, useState } from 'react';
import { Form, Modal, Radio } from 'antd';
import ButtonEdit from '../../components/Button/ButtonEdit';
import { SquarePen, X } from 'lucide-react';
import InputPrimary from '../../components/Forms/InputPrimary';
import { FormattedMessage } from 'react-intl';

const ModalAddOrder = ({ initialValues, index, setOrderDetail }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setOrderDetail((preDetail: any) => {
            const newData = preDetail.slice(index);
            return newData;
        });
        setIsModalOpen(false);
        form.setFieldsValue({
            variantId: null,
            quantity: '',
        });
    };

    const onFinish = async (values: any) => {
        if (initialValues.variations.length) {
            setOrderDetail((preDetail: any) => {
                const variant = initialValues.variations.find((variations: any) => variations.id == values.variantId);
                const newData = [...preDetail];
                newData[index] = {
                    ...newData[index],
                    quantity: values.quantity,
                    variant,
                };
                return newData;
            });
        } else {
            setOrderDetail((preDetail: any) => {
                const newData = [...preDetail];
                newData[index] = {
                    ...initialValues,
                    quantity: values.quantity,
                };
                return newData;
            });
        }

        setIsModalOpen(false);
    };

    useEffect(() => {
        form.setFieldsValue({});
    }, [initialValues]);

    // let validateVariant;

    // if (initialValues?.variations?.length) {
    //     validateVariant = [
    //         { required: true, message: <FormattedMessage id="product.priceRequired" /> },
    //         ({ getFieldValue }: any) => ({
    //             validator: (_: any, value: any) => {
    //                 if (!value) {
    //                     return Promise.resolve();
    //                 }
    //                 if (value <= 0) {
    //                     return Promise.reject(new Error('Số lượng phải lớn hơn 0'));
    //                 }
    //                 const selectedVariantId = getFieldValue('images');
    //                 const selectedVariant = initialValues.variations.find(
    //                     (variant: any) => variant.id === selectedVariantId,
    //                 );

    //                 if (!selectedVariant) {
    //                     return Promise.reject(new Error('Bạn phải chọn một biến thể trước.'));
    //                 }

    //                 if (value >= selectedVariant.stock_qty) {
    //                     return Promise.reject(new Error(`Số lượng phải nhỏ hơn ${selectedVariant.stock_qty}`));
    //                 }

    //                 return Promise.resolve();
    //             },
    //         }),
    //     ];
    // } else {
    //     validateVariant = [
    //         { required: true, message: <FormattedMessage id="product.priceRequired" /> },
    //         {
    //             validator: (_: any, value: any) => {
    //                 if (!value) {
    //                     return Promise.resolve(); // Bỏ qua nếu value không tồn tại (đã có required check).
    //                 }
    //                 if (value <= 0) {
    //                     return Promise.reject(new Error('Số lượng phải lớn hơn 0'));
    //                 }
    //                 if (value >= +initialValues.stock_qty) {
    //                     return Promise.reject(new Error(`Số lượng phải nhỏ hơn ${+initialValues.stock_qty}`));
    //                 }
    //                 return Promise.resolve();
    //             },
    //         },
    //     ];
    // }

    return (
        <>
            <ButtonEdit onClick={showModal}>
                <SquarePen />
            </ButtonEdit>
            <Modal
                title={
                    <h3 className="text-[25px] font-medidum">
                        <FormattedMessage id="Update Value Variant" />
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                closeIcon={<X onClick={handleClose} />}
                footer={[
                    <div className="mt-10">
                        <button
                            key="cancel"
                            className="hover:bg-red-500 mr-5 w-[80px] h-[32px] border 
                        rounded-lg transition-global hover:text-white"
                            onClick={handleCancel}
                        >
                            <FormattedMessage id="button.cancel" />
                        </button>
                        <button
                            key="ok"
                            className="w-[80px] h-[32px] bg-primary text-white rounded-lg
                        hover:opacity-80 transition-global"
                            onClick={handleOk}
                        >
                            <FormattedMessage id="button.submit" />
                        </button>
                    </div>,
                ]}
            >
                <Form form={form} onFinish={onFinish} initialValues={initialValues}>
                    {initialValues.variations.length ? (
                        <Form.Item
                            name="variantId"
                            label={<FormattedMessage id="admin.image" />}
                            className="font-medium"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: <FormattedMessage id="product.priceRequired" /> }]}
                        >
                            <>
                                <Radio.Group
                                    options={initialValues?.variations?.map((image: any) => ({
                                        label: (
                                            <div>
                                                <img className="w-[60px] h-[60px] object-cover" src={image.image_url} />
                                                <p className="text-center">{image?.classify}</p>
                                            </div>
                                        ),
                                        value: image.id,
                                    }))}
                                />
                            </>
                        </Form.Item>
                    ) : (
                        ''
                    )}

                    <InputPrimary
                        label={'Số lượng sản phẩm'}
                        placeholder={'Nhập số lượng sản phẩm'}
                        name="quantity"
                        type="number"
                    />
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddOrder;
