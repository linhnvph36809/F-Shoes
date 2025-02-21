import { Modal, Tag } from 'antd';
import { formatPrice, formatTime, handleChangeMessage } from '../../../../utils';
import useOrder from '../../../../hooks/useOrder';
import { FormattedMessage } from 'react-intl';
import { paymentMethodString, paymentStatusString, shippingMessage, statusString } from '../../../../interfaces/IOrder';
import {
    BringToFront,
    CircleDollarSign,
    CircleUserRound,
    CreditCard,
    DollarSign,
    MapPin,
    MessageCircleX,
    NotebookPen,
    Repeat,
    TicketPercent,
    Truck,
} from 'lucide-react';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import ModalReason from './components/ModalReason';
import ModalDeniedReturn from './components/ModalDeniedReturn';
import PermissionElement from '../../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../../constants';
import { useEffect, useState } from 'react';
import { useContextGlobal } from '../../../../contexts';

const statusColors: Record<string, string> = {
    '0': '#EF4444',
    '1': '#6B7280',
    '2': '#F59E0B',
    '3': '#F97316',
    '4': '#3B82F6',
    '5': '#00f227',
    '6': '#294781',
    '7': '#d67309',
    '8': '#741111',
    '9': '#125070',
};

const ModalOrder = ({ orderDetail, handleCancel }: { orderDetail: any; handleCancel: () => void }) => {
    const { loading, putOrder } = useOrder();

    const handleChangeStatus = async (status: number) => {
        if (orderDetail?.orderDetail?.id) {
            let value: any = {
                status,
            };
            if (status === 5) {
                value = {
                    ...value,
                    payment_status: 'paid',
                };
            }
            await putOrder(orderDetail.orderDetail.id, value);
            handleCancel();
        }
    };

    const color = statusColors[orderDetail?.orderDetail?.status + 1] || 'default';
    const colorStatus = statusColors[orderDetail?.orderDetail?.status] || 'default';

    const subtotal =
        orderDetail?.orderDetail?.order_details?.reduce((acc: number, cur: any) => +cur.total_amount + acc, 0) || 0;
    const [discountVoucher, setDiscountVoucher] = useState<number>(0);
    const { locale } = useContextGlobal();

    useEffect(() => {
        if (orderDetail?.orderDetail?.voucher_id) {
            if (orderDetail?.orderDetail?.voucher_id?.type === 'fixed') {
                if (orderDetail?.orderDetail?.voucher_id?.discount > subtotal) {
                    setDiscountVoucher(subtotal || 0);
                } else {
                    setDiscountVoucher(orderDetail?.orderDetail?.voucher_id?.discount || 0);
                }
            } else {
                const max = orderDetail?.orderDetail.voucher_id?.max_total_amount;
                if (subtotal === 0) {
                    setDiscountVoucher(0);
                } else {
                    const discount1 = (subtotal * orderDetail?.orderDetail.voucher_id?.discount) / 100;
                    if (discount1 > max) {
                        setDiscountVoucher(max);
                    } else {
                        setDiscountVoucher(discount1);
                    }
                }
            }
        }
    }, [orderDetail, subtotal]);

    return (
        <>
            <Modal
                width={700}
                footer={''}
                title={
                    <h3 className="text-[28px] font-medium color-primary">
                        <FormattedMessage id="Order Detail" />
                    </h3>
                }
                open={orderDetail.isModalOpen}
                onCancel={handleCancel}
            >
                <div>
                    <div className="border-b pb-8">
                        <div className="flex items-start gap-x-4 py-3">
                            <div>
                                <BringToFront className="w-6 color-gray" />
                            </div>
                            <div>
                                <p className="font-medium text-[15px] color-primary">
                                    <FormattedMessage id="orderId" />
                                </p>
                                <span className="color-gray text-[14px]">{orderDetail?.orderDetail?.id}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-x-4 py-3">
                            <div>
                                <MapPin className="w-6 color-gray" />
                            </div>
                            <div>
                                <p className="font-medium text-[15px] color-primary">
                                    <FormattedMessage id="delivery_address" />
                                </p>
                                <span className="color-gray text-[14px]">{orderDetail?.orderDetail?.address}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-x-4 py-3">
                            <div>
                                <CircleUserRound className="w-6 color-gray" />
                            </div>
                            <div>
                                <p className="font-medium text-[15px] color-primary">
                                    <FormattedMessage id="Information" />
                                </p>
                                <div>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">
                                            <FormattedMessage id="admin.name" />
                                        </span>{' '}
                                        : {orderDetail?.orderDetail?.receiver_full_name}{' '}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">
                                            <FormattedMessage id="email" />
                                        </span>{' '}
                                        : {orderDetail?.orderDetail?.receiver_email}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">
                                            <FormattedMessage id="phone" />
                                        </span>{' '}
                                        : {orderDetail?.orderDetail?.phone}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">
                                            <FormattedMessage id="country" />
                                        </span>{' '}
                                        : {orderDetail?.orderDetail?.country}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">
                                            <FormattedMessage id="date" /> :
                                        </span>{' '}
                                        {formatTime(orderDetail?.orderDetail?.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="h-[200px] overflow-auto">
                            {orderDetail?.orderDetail?.order_details.map((order_detail: any, index: number) => (
                                <div key={index} className="flex justify-between items-center mb-5 pb-5 border-b pr-2">
                                    <div className="flex gap-x-5 items-start">
                                        <img
                                            className="w-[80px] h-[80px] object-cover"
                                            src={
                                                order_detail?.product_variation_id
                                                    ? order_detail?.variation?.product?.image_url
                                                    : order_detail?.product?.image_url
                                            }
                                            alt=""
                                        />
                                        <div>
                                            <h3 className="font-medium text-[16px]">
                                                {' '}
                                                {order_detail?.product_variation_id
                                                    ? order_detail?.variation?.product?.name
                                                    : order_detail?.product?.name}{' '}
                                            </h3>
                                            <p className="color-gray text-[13px] font-medium">
                                                {Object.entries(JSON.parse(order_detail?.detail_item) || {}).map(
                                                    ([key, value]: any) => (
                                                        <li key={key}>
                                                            <strong>{key}:</strong> {value}
                                                        </li>
                                                    ),
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[16px] text-red-500">
                                            {formatPrice(order_detail?.price)}đ
                                        </p>
                                        <p className="color-gray text-[13px] text-end">x{order_detail?.quantity}</p>
                                        {orderDetail?.orderDetail?.reason_return ? (
                                            <p className="text-[14px] text-red-500 text-end">
                                                {JSON.parse(
                                                    orderDetail?.orderDetail?.reason_return,
                                                ).return_detail.includes(order_detail.id) ? (
                                                    <FormattedMessage id="orderDetail.return" />
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <Repeat className="w-7" /> <FormattedMessage id="status" /> :{' '}
                                </p>
                                <p className="color-gray text-[14px] flex justify-end">
                                    <Tag
                                        className="px-5 rounded-[30px] w-[90%] flex items-center justify-center m-0"
                                        color={colorStatus}
                                    >
                                        {statusString(orderDetail?.orderDetail?.status).text}
                                    </Tag>
                                </p>
                            </div>
                            {orderDetail?.orderDetail?.voucher_id ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <TicketPercent className="w-7" /> <FormattedMessage id="voucher" /> :
                                    </p>
                                    -{formatPrice(discountVoucher)}đ{' '}
                                    {orderDetail?.orderDetail?.voucher_id?.type === 'percentage'
                                        ? `(${handleChangeMessage(locale, 'Voucher', 'Mã giảm')} ${orderDetail?.orderDetail?.voucher_id?.discount
                                        }% - ${handleChangeMessage(locale, 'Max', 'Tối đa')} ${formatPrice(
                                            orderDetail?.orderDetail?.voucher_id?.max_total_amount,
                                        )}đ)`
                                        : ''}
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <Truck className="w-7" /> <FormattedMessage id="shipping_method" /> :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {shippingMessage(orderDetail?.orderDetail?.shipping_method)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <DollarSign className="w-7" /> <FormattedMessage id="Shipping_Cost" /> :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {formatPrice(orderDetail?.orderDetail?.shipping_cost)}đ
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <Repeat className="w-7" /> <FormattedMessage id="Payment_status" /> :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {paymentStatusString(orderDetail?.orderDetail?.payment_status)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <CreditCard className="w-7" /> <FormattedMessage id="payment_method" /> :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {paymentMethodString(orderDetail?.orderDetail?.payment_method)}
                                </p>
                            </div>
                            {orderDetail?.orderDetail?.note ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <NotebookPen className="w-7" /> <FormattedMessage id="note" /> :{' '}
                                    </p>
                                    <p className="color-gray text-[14px] font-medium">
                                        {orderDetail?.orderDetail?.note}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}

                            {orderDetail?.orderDetail?.status == 8 && orderDetail?.orderDetail?.reason_denied_return ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <FormattedMessage id="Reason_Denied_Return" /> :{' '}
                                    </p>
                                    <p className="color-gray text-[14px] font-medium">
                                        {orderDetail?.orderDetail?.reason_denied_return}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}

                            {orderDetail?.orderDetail?.reason_return ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <FormattedMessage id="orderDetail.reasonOrder" /> :{' '}
                                    </p>
                                    <p className="color-gray text-[14px] font-medium text-red-500">
                                        {JSON.parse(orderDetail.orderDetail.reason_return).reason_return}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}

                            {orderDetail?.orderDetail?.reason_return ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <FormattedMessage id="Refund_amount" /> :{' '}
                                    </p>
                                    <p className="color-gray text-[14px] font-medium text-red-500">
                                        {formatPrice(JSON.parse(orderDetail.orderDetail.reason_return).return_price)}đ
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}

                            {orderDetail?.orderDetail?.reason_cancelled ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <MessageCircleX className="w-7" /> <FormattedMessage id="reason_cancelled" /> :{' '}
                                    </p>
                                    <p className="color-gray text-[14px] font-medium">
                                        {orderDetail.orderDetail.reason_cancelled}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="flex justify-between items-center font-medium py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[18px]">
                                    <CircleDollarSign className="w-7" /> <FormattedMessage id="box.Cart.Total" /> :{' '}
                                </p>
                                <p className="font-medium text-red-500 text-[18px]">
                                    {formatPrice(orderDetail?.orderDetail?.total_amount)}đ
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-x-5 mt-3">
                        {orderDetail?.orderDetail?.status &&
                            orderDetail?.orderDetail?.status !== 0 &&
                            orderDetail?.orderDetail?.status < 3 ? (
                            <ModalReason orderId={orderDetail?.orderDetail?.id} handleCancelDetail={handleCancel} />
                        ) : (
                            ''
                        )}

                        {orderDetail?.orderDetail?.status &&
                            orderDetail?.orderDetail?.status > 1 &&
                            orderDetail?.orderDetail?.status < 5 ? (
                            <div>
                                <PermissionElement keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_EDIT}>
                                    <button
                                        style={{
                                            backgroundColor: color,
                                        }}
                                        onClick={() => handleChangeStatus(orderDetail.orderDetail.status + 1)}
                                        className="px-8 py-3 bg-primary text-white rounded-[4px] text-[12px] font-medium transition-global hover:opacity-80"
                                    >
                                        {loading ? (
                                            <LoadingSmall />
                                        ) : (
                                            statusString((orderDetail?.orderDetail?.status || 0) + 1).text || 'Trống'
                                        )}
                                    </button>
                                </PermissionElement>
                            </div>
                        ) : (
                            ''
                        )}

                        {orderDetail?.orderDetail?.status && orderDetail?.orderDetail?.status === 6 ? (
                            <div className="flex items-center gap-x-5">
                                <ModalDeniedReturn
                                    orderId={orderDetail?.orderDetail?.id}
                                    handleCancelDetail={handleCancel}
                                />
                                <PermissionElement keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_EDIT}>
                                    <button
                                        onClick={() => handleChangeStatus(7)}
                                        className="px-8 py-3 bg-primary text-white rounded-[4px] text-[12px] font-medium transition-global hover:opacity-80"
                                    >
                                        {loading ? <LoadingSmall /> : <FormattedMessage id="agree" />}
                                    </button>
                                </PermissionElement>
                            </div>
                        ) : (
                            ''
                        )}

                        {orderDetail?.orderDetail?.status && orderDetail?.orderDetail?.status === 7 ? (
                            <PermissionElement keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_EDIT}>
                                <button
                                    onClick={() => handleChangeStatus(9)}
                                    className="px-8 py-3 bg-primary text-white rounded-[4px] text-[12px] font-medium transition-global hover:opacity-80"
                                >
                                    {loading ? <LoadingSmall /> : <FormattedMessage id="returned" />}
                                </button>
                            </PermissionElement>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalOrder;
