import { Modal, Tag } from 'antd';
import { formatPrice, formatTime } from '../../../../utils';
import { STATUS_ORDER } from '../../../../constants';
import useOrder from '../../../../hooks/useOrder';
import { FormattedMessage, useIntl } from 'react-intl';
import { paymentMethodString, paymentStatusString } from '../../../../interfaces/IOrder';
import { useContextGlobal } from '../../../../contexts';
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

const statusColors: Record<string, string> = {
    '0': 'red',
    '1': 'purple',
    '2': 'orange',
    '3': 'blue',
    '4': 'green',
    '5': 'pink',
    '6': '#930510',
    '7': 'gray',
    '8': '#9c27b0',
    '9': '#000000',
};

const ModalOrder = ({ orderDetail, handleCancel }: { orderDetail: any; handleCancel: () => void }) => {
    const intl = useIntl();
    const { loading, putOrder } = useOrder();
    const { locale } = useContextGlobal();

    const handleChangeStatus = async (status: number) => {
        if (orderDetail?.orderDetail?.id) {
            await putOrder(orderDetail.orderDetail.id, {
                status,
            });
            handleCancel();
        }
    };

    const color = statusColors[orderDetail?.orderDetail?.status] || 'default';

    return (
        <>
            <Modal
                width={600}
                footer={''}
                title={<h3 className="text-[28px] font-medium color-primary">Order Detail</h3>}
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
                                <p className="font-medium text-[15px] color-primary">Order Id</p>
                                <span className="color-gray text-[14px]">{orderDetail?.orderDetail?.id}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-x-4 py-3">
                            <div>
                                <MapPin className="w-6 color-gray" />
                            </div>
                            <div>
                                <p className="font-medium text-[15px] color-primary">Delivery address</p>
                                <span className="color-gray text-[14px]">{orderDetail?.orderDetail?.address}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-x-4 py-3">
                            <div>
                                <CircleUserRound className="w-6 color-gray" />
                            </div>
                            <div>
                                <p className="font-medium text-[15px] color-primary">Information</p>
                                <div>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">Name</span> :{' '}
                                        {orderDetail?.orderDetail?.receiver_full_name}{' '}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">Email</span> :{' '}
                                        {orderDetail?.orderDetail?.receiver_email}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">Phone</span> : {orderDetail?.orderDetail?.phone}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">Country</span> :{' '}
                                        {orderDetail?.orderDetail?.country}
                                    </p>
                                    <p className="color-gray text-[13px]">
                                        <span className="font-medium">Date :</span>{' '}
                                        {formatTime(orderDetail?.orderDetail?.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="h-[200px] overflow-auto">
                            {orderDetail?.orderDetail?.order_details.map((orderDetail: any, index: number) => (
                                <div key={index} className="flex justify-between items-center mb-5 pb-5 border-b pr-2">
                                    <div className="flex gap-x-5 items-start">
                                        <img
                                            className="w-[80px] h-[80px] object-cover"
                                            src={
                                                orderDetail?.product_variation_id
                                                    ? orderDetail?.variation?.product?.image_url
                                                    : orderDetail?.product?.image_url
                                            }
                                            alt=""
                                        />
                                        <div>
                                            <h3 className="font-medium text-[16px]">
                                                {' '}
                                                {orderDetail?.product_variation_id
                                                    ? orderDetail?.variation?.product?.name
                                                    : orderDetail?.product?.name}{' '}
                                            </h3>
                                            <p className="color-gray text-[13px] font-medium">
                                                {Object.entries(JSON.parse(orderDetail?.detail_item) || {}).map(
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
                                        <p className="font-medium text-[14px] text-red-500">
                                            {formatPrice(orderDetail?.price)}đ
                                        </p>
                                        <p className="color-gray text-[13px] text-end">x{orderDetail?.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <Repeat className="w-7" /> Status :{' '}
                                </p>
                                <p className="color-gray text-[14px] flex justify-end">
                                    <Tag
                                        className="px-5 rounded-[30px] w-[90%] flex items-center justify-center m-0"
                                        color={color}
                                    >
                                        {STATUS_ORDER[orderDetail?.orderDetail?.status]}
                                    </Tag>
                                </p>
                            </div>
                            {orderDetail?.orderDetail?.voucher_id ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <TicketPercent className="w-7" /> <FormattedMessage id="voucher" /> :
                                    </p>
                                    {orderDetail?.orderDetail?.voucher &&
                                        orderDetail?.orderDetail?.voucher?.type == 'fixed' ? (
                                        <p className="font-medium color-gray">
                                            -{formatPrice(orderDetail?.orderDetail?.voucher?.discount)}đ
                                        </p>
                                    ) : (
                                        <p className="font-medium color-gray">
                                            {orderDetail?.orderDetail?.voucher?.discount}%
                                        </p>
                                    )}
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <Truck className="w-7" /> Shipping Method :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {orderDetail?.orderDetail?.shipping_method}
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <DollarSign className="w-7" /> Shipping Cost :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {formatPrice(orderDetail?.orderDetail?.shipping_cost)}đ
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <Repeat className="w-7" /> Payment Status :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {paymentStatusString(orderDetail?.orderDetail?.payment_status)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <CreditCard className="w-7" /> Payment Method :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">
                                    {paymentMethodString(orderDetail?.orderDetail?.payment_method)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                    <NotebookPen className="w-7" /> Note :{' '}
                                </p>
                                <p className="color-gray text-[14px] font-medium">{orderDetail?.orderDetail?.note}</p>
                            </div>
                            {orderDetail?.orderDetail?.reason_cancelled ? (
                                <div className="flex justify-between items-center py-2">
                                    <p className="flex items-center color-gray gap-x-3 text-[14px]">
                                        <MessageCircleX className="w-7" /> Reason Cancelled :{' '}
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
                                    <CircleDollarSign className="w-7" /> Total :{' '}
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
                            orderDetail?.orderDetail?.status < 4 ? (
                            <ModalReason orderId={orderDetail?.orderDetail?.id} handleCancelDetail={handleCancel} />
                        ) : (
                            ''
                        )}

                        {orderDetail?.orderDetail?.status &&
                            orderDetail?.orderDetail?.status > 1 &&
                            orderDetail?.orderDetail?.status < 5 ? (
                            <div>
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
                                        STATUS_ORDER[(orderDetail?.orderDetail?.status || 0) + 1] || 'Empty'
                                    )}
                                </button>
                            </div>
                        ) : (
                            ''
                        )}


                        {orderDetail?.orderDetail?.status && orderDetail?.orderDetail?.status === 6 ? (
                            <div className="flex items-center gap-x-5">
                                {
                                    orderDetail?.orderDetail?.reason_return ?
                                        <p className="text-[16px] font-medium text-red-500">
                                            Reason Return : {orderDetail.orderDetail.reason_return}
                                        </p> : ""
                                }
                                <ModalDeniedReturn
                                    orderId={orderDetail?.orderDetail?.id}
                                    handleCancelDetail={handleCancel}
                                />
                                <button
                                    onClick={() => handleChangeStatus(7)}
                                    className="px-8 py-3 bg-primary text-white rounded-[4px] text-[12px] font-medium transition-global hover:opacity-80"
                                >
                                    {loading ? <LoadingSmall /> : "Return Processing"}
                                </button>
                            </div>
                        ) : (
                            ''
                        )}

                        {orderDetail?.orderDetail?.status == 8 && orderDetail?.orderDetail?.reason_denied_return ? (
                            <p className="text-[16px] font-medium text-red-500">
                                Reason Denied Return : {orderDetail?.orderDetail?.reason_denied_return}
                            </p>
                        ) : (
                            ''
                        )}



                        {
                            orderDetail?.orderDetail?.status && orderDetail?.orderDetail?.status === 7 ?
                                < button
                                    onClick={() => handleChangeStatus(9)}
                                    className="px-8 py-3 bg-primary text-white rounded-[4px] text-[12px] font-medium transition-global hover:opacity-80"
                                >
                                    {loading ? <LoadingSmall /> : "Returned"}
                                </button> : ""
                        }
                    </div>
                </div>
            </Modal >
        </>
    );
};

export default ModalOrder;
