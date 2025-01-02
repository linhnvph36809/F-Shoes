import { useState } from 'react';
import { Form, Modal, Radio } from 'antd';
import ButtonEdit from '../../components/Button/ButtonEdit';
import { CopyPlus, X } from 'lucide-react';
import InputPrimary from '../../components/Forms/InputPrimary';
import { FormattedMessage } from 'react-intl';
import { formatPrice } from '../../../../utils';

const ModalAddOrder = ({ initialValues, handleSetProducts, handleHidden }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [quantity, setQuantity] = useState<any>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (quantity !== 0) {
            form.submit();
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        handleHidden();
    };

    const handleGetQuantity = (id: number) => {
        const variation = initialValues?.variations?.find((variations: any) => variations.id === id);
        setQuantity(variation.stock_qty);
    };

    const onFinish = async (values: any) => {
        if (initialValues.variations.length) {
            const variation = initialValues?.variations?.find((variations: any) => variations.id === values.variantId);
            handleSetProducts({
                product_id: null,
                product_variation_id: variation?.id,
                product_name: initialValues?.name,
                product_image: variation?.image_url,
                classify: variation?.classify,
                quantity: +values.quantity,
                price: +variation?.sale_price || +variation?.price,
                total_amount: (+variation?.sale_price || +variation?.price) * +values.quantity,
            });
        } else {
            handleSetProducts({
                product_variation_id: null,
                product_id: initialValues?.id,
                product_name: initialValues?.name,
                product_image: initialValues?.image_url,
                quantity: +values.quantity,
                price: +initialValues?.sale_price || +initialValues?.price,
                total_amount: (+initialValues?.sale_price || +initialValues?.price) * +values.quantity,
            });
        }
        handleHidden();
        handleClose();
    };

    return (
        <>
            <ButtonEdit onClick={showModal}>
                <CopyPlus />
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
                    {initialValues?.variations?.length ? (
                        <>
                            <Form.Item
                                name="variantId"
                                label={<FormattedMessage id="variant" />}
                                className="font-medium"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: <FormattedMessage id="product.priceRequired" /> }]}
                            >
                                <>
                                    <Radio.Group
                                        onChange={(e) => handleGetQuantity(e.target.value)}
                                        options={initialValues?.variations?.map((variation: any) => ({
                                            label: (
                                                <div>
                                                    <img
                                                        className="w-[60px] h-[60px] object-cover"
                                                        src={variation.image_url}
                                                    />
                                                    <p className="text-center">{variation?.classify}</p>
                                                    <p className="text-center">
                                                        {formatPrice(variation?.sale_price || variation?.price)}đ
                                                    </p>
                                                </div>
                                            ),
                                            value: variation.id,
                                        }))}
                                    />
                                </>
                            </Form.Item>
                            <InputPrimary
                                label={'Số lượng sản phẩm'}
                                placeholder={'Nhập số lượng sản phẩm'}
                                name="quantity"
                                type="number"
                                rules={[
                                    { required: true, message: <FormattedMessage id="product.priceRequired" /> },
                                    {
                                        validator: (_: any, value: any) => {
                                            if (value <= 0) {
                                                return Promise.reject(
                                                    new Error('Số lượng phải lớn hơn 0 và không được là số âm.'),
                                                );
                                            }
                                            if (value > quantity) {
                                                return Promise.reject(
                                                    new Error(`Số lượng không được lớn hơn ${quantity}`),
                                                );
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            />
                        </>
                    ) : (
                        <InputPrimary
                            label={'Số lượng sản phẩm'}
                            placeholder={'Nhập số lượng sản phẩm'}
                            name="quantity"
                            type="number"
                            rules={[
                                { required: true, message: <FormattedMessage id="product.priceRequired" /> },
                                {
                                    validator: (_: any, value: any) => {
                                        if (value <= 0) {
                                            return Promise.reject(
                                                new Error('Số lượng phải lớn hơn 0 và không được là số âm.'),
                                            );
                                        }
                                        if (value > initialValues.stock_qty) {
                                            return Promise.reject(
                                                new Error(`Số lượng không được lớn hơn ${initialValues.stock_qty}`),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        />
                    )}
                </Form>
                {quantity == 0 ? <p className="text-red-500 text-end font-medium">Hết hàng</p> : ''}
            </Modal>
        </>
    );
};

export default ModalAddOrder;
