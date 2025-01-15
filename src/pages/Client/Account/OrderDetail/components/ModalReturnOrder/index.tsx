import { useState } from 'react';
import { Checkbox, Form, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import useOrder from '../../../../../../hooks/useOrder';
import LoadingSmall from '../../../../../../components/Loading/LoadingSmall';
import { useContextGlobal } from '../../../../../../contexts';
import { showMessageActive } from '../../../../../../utils/messages';
import { formatPrice, handleChangeMessage, isNumber } from '../../../../../../utils';
import { useParams } from 'react-router-dom';

const ModalReturnOrder = ({ order, refetch }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();
    const { loading, putOrder } = useOrder();
    const { locale } = useContextGlobal();
    const { id } = useParams();
    const [idProductReturn, setIdProductReturn] = useState<any>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const return_detail = order?.order_details?.map((cart: any, index: any) => {
        if (cart?.variation) {
            return {
                id: cart.id,
                product_variation_id: cart.product_variation_id,
                product_image: cart?.variation?.image_url,
                product_name: cart?.variation?.product?.name,
                classify: cart?.variation?.classify,
                product_id: null,
                quantity: cart.quantity,
                price: isNumber(cart.variation.sale_price) ? +cart.variation.sale_price : +cart.variation.price,
                total_amount: isNumber(cart.variation.sale_price)
                    ? +cart.variation.sale_price
                    : +cart.variation.price * cart.quantity,
            };
        } else if (cart?.product) {
            return {
                id: cart.id,
                product_variation_id: null,
                product_image: cart.product?.image_url,
                product_name: cart.product.name,
                classify: cart?.product?.classify,
                product_id: cart.product.id,
                quantity: cart.quantity,
                price: isNumber(cart.product.sale_price) ? +cart.product.sale_price : +cart.product.price,
                total_amount: isNumber(cart.product.sale_price)
                    ? +cart.product.sale_price
                    : +cart.product.price * cart.quantity,
            };
        }
    });

    const handleChangeProduct = (values: any) => {
        setIdProductReturn(values);
    };

    const onFinish = (value: { reason_return: string }) => {
        if (id) {
            showMessageActive(
                handleChangeMessage(
                    locale,
                    'Are you sure you want to return your order?',
                    `Bạn có chắc chắn muốn trả đơn hàng không?`,
                ),
                '',
                'warning',
                async () => {
                    await putOrder(id, {
                        status: 6,
                        reason_return: JSON.stringify({
                            reason_return: value.reason_return,
                            return_detail: idProductReturn,
                            return_price: return_detail.filter((value: any) => idProductReturn.includes(value.id)).reduce((acc: any, items: any) => acc + items.total_amount, 0),
                        }),
                    });
                    setIsModalOpen(false);
                    refetch();
                },
            );
        }
    };

    return (
        <>
            <div onClick={showModal}>
                <button className="w-[140px] h-[50px] bg-red-500 text-white text-[16px] font-medium rounded-[30px]">
                    <FormattedMessage id="orderDetail.return" />
                </button>
            </div>
            <Modal
                title={
                    <h3 className="text-[28px]">
                        <FormattedMessage id="orderDetail.reasonOrder" />
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ type: 'primary', style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }}
                cancelButtonProps={{ type: 'default' }}
                footer={[
                    <button
                        key="cancel"
                        className="hover:bg-red-500 mr-5 w-[80px] h-[32px] border
                    rounded-lg transition-global hover:text-white"
                        onClick={handleCancel}
                    >
                        <FormattedMessage id="button.cancel" />
                    </button>,
                    <button
                        key="ok"
                        className="w-[80px] h-[32px] bg-primary text-white rounded-lg
                        hover:opacity-80 transition-global"
                        onClick={handleOk}
                    >
                        {loading ? <LoadingSmall /> : <FormattedMessage id="button.submit" />}
                    </button>,
                ]}
                width={600}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        name="images"
                        label={<FormattedMessage id="choose_product_return" />}
                        className="font-medium mt-5"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: <FormattedMessage id="validate_product_return" /> }]}
                    >
                        <>
                            <Checkbox.Group
                                onChange={handleChangeProduct}
                                options={return_detail.map((order_detail: any) => ({
                                    label: (
                                        <div>
                                            <div className="w-[100px] mt-5">
                                                <img
                                                    className="w-full h-[100px] object-cover"
                                                    src={order_detail.product_image}
                                                />
                                                <p className="text-[12px]">{order_detail.product_name}</p>
                                                <p className="text-[12px] text-red-500">
                                                    {formatPrice(order_detail.price)}đ
                                                </p>
                                                <p className="text-[12px]">{order_detail.classify}</p>
                                            </div>
                                        </div>
                                    ),
                                    value: order_detail.id,
                                }))}
                            />
                        </>
                    </Form.Item>

                    <Form.Item
                        label={<FormattedMessage id="orderDetail.reasonOrder" />}
                        className="font-medium"
                        name="reason_return"
                        rules={[
                            { required: true, message: <FormattedMessage id="Please enter reason for cancellation" /> },
                        ]}
                    >
                        <TextArea rows={6} className="text-[18px] font-normal" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalReturnOrder;
