import { Modal, Select } from 'antd';
import { Link } from 'react-router-dom';
import { formatPrice, formatTime } from '../../../../utils';
import { STATUS_ORDER } from '../../../../constants';
import { Option } from 'antd/es/mentions';
import useOrder, { API_ORDER } from '../../../../hooks/useOrder';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { FormattedMessage, useIntl } from 'react-intl';
import { paymentMethodString, paymentStatusString } from '../../../../interfaces/IOrder';

const ModalOrder = ({ orderDetail, handleCancel }: { orderDetail: any; handleCancel: () => void }) => {
    const intl = useIntl();
    const { refetch } = useQueryConfig('order-admin', API_ORDER);
    const { putOrder } = useOrder();

    const handleChangeStatus = (status: string) => {
        if (orderDetail?.orderDetail.id) {
            putOrder(orderDetail.orderDetail.id, {
                status,
            });
            handleCancel();
            refetch();
        }
    };
    

    return (
        <>
            <Modal width={600} footer={''} title="Order Detail" open={orderDetail.isModalOpen} onCancel={handleCancel}>
                <div>
                    <div className="grid grid-cols-2 mb-10">
                        <div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                <FormattedMessage id="admin.name" /> : {orderDetail.orderDetail?.user?.name}
                            </div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                <FormattedMessage id="receiver_email" /> : {orderDetail.orderDetail?.user?.email}
                            </div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                <FormattedMessage id="phone" /> : {orderDetail.orderDetail?.phone}
                            </div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                <FormattedMessage id="address" /> : {orderDetail.orderDetail?.address}
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                <FormattedMessage id="category.table.created_at" /> :{' '}
                                {formatTime(orderDetail.orderDetail?.created_at)}
                            </div>
                            {orderDetail.orderDetail?.voucher ? (
                                <div className="font-medium text-[14px] color-gray mb-2">
                                    <FormattedMessage id="voucher" /> : {formatPrice(orderDetail.orderDetail?.voucher)}
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="font-medium text-[14px] color-gray mb-2">
                                <FormattedMessage id="Shipping_Cost" />:{' '}
                                {formatPrice(orderDetail.orderDetail?.shipping_cost)} đ
                            </div>
                            <div className="font-medium text-[15px] color-primary mb-2">
                                <FormattedMessage id="box.Cart.Total" /> :{' '}
                                {formatPrice(orderDetail.orderDetail?.total_amount)} đ
                            </div>
                        </div>
                    </div>
                    {orderDetail?.orderDetail?.status == 0 ? (
                        ''
                    ) : (
                        <div className="mb-10">
                            <Select
                                style={{ width: 200, marginRight: 8 }}
                                placeholder={intl.formatMessage({ id: 'Please_select_status' })}
                                onChange={handleChangeStatus}
                            >
                                {STATUS_ORDER.map((status: string, index: number) => {
                                    if (
                                        orderDetail?.orderDetail?.status == 0 ||
                                        orderDetail?.orderDetail?.status < index
                                    ) {
                                        return (
                                            <Option key={String(index)} value={String(index)}>
                                                {status}
                                            </Option>
                                        );
                                    } else {
                                        return '';
                                    }
                                })}
                            </Select>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-x-5 border p-6">
                        <div>
                            <p className="font-medium color-primary">
                                <FormattedMessage id="shipping_method" />:
                            </p>
                            <span className="color-primary font-normal color-gray">
                                {orderDetail?.orderDetail?.shipping_method}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium color-primary">
                                <FormattedMessage id="paymentMethod" />:
                            </p>
                            <span className="color-primary font-normal color-gray">
                                {paymentMethodString(orderDetail?.orderDetail?.payment_method)}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium color-primary">
                                <FormattedMessage id="Payment_status" />:
                            </p>
                            <span className="color-primary font-normal color-gray">
                                {paymentStatusString(orderDetail?.orderDetail?.payment_status)}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium color-primary">
                                <FormattedMessage id="status" /> :
                            </p>
                            <span className="color-primary font-normal color-gray">
                                {STATUS_ORDER[orderDetail?.orderDetail?.status]}
                            </span>
                        </div>
                    </div>
                    <div className="h-[300px] overflow-auto">
                        {orderDetail?.orderDetail?.order_details?.map((orderDetail: any) => (
                            <Link to={`/detail/${orderDetail?.product?.slug}`} key={orderDetail?.orderDetail?.id}>
                                <div className="flex gap-x-5 h-[80px] my-5 border-b pb-3">
                                    <img src={orderDetail?.variation?.image_url} alt="Product Image" />
                                    <div>
                                        <div className="flex justify-between items-center gap-x-2 mt-2">
                                            <h3 className="text-[16px] color-primary font-medium">
                                                {orderDetail?.variation?.name}
                                            </h3>
                                            <span className="text-[12px] color-gray font-medium">
                                                x{orderDetail?.quantity}
                                            </span>
                                        </div>
                                        <p className="text-[12px] color-gray font-medium">
                                            {orderDetail?.variation?.classify}
                                        </p>
                                        <p className="text-[12px] color-primary font-medium mt-2">
                                            {formatPrice(orderDetail?.price)} đ
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalOrder;
