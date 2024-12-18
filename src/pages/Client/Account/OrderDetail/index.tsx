import { Skeleton, Tag } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeftToLine } from 'lucide-react';

import UseOrder from '../../../../hooks/profile/useOrder';
import Heading from '../Order/components/Heading';
import ButtonPrimary from '../../../../components/Button';
import NotFound from '../../../../components/NotFound';
import ModalCancel from './components/ModalCancel';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { paymentMethodString, statusString } from '../../../../interfaces/IOrder';
import { formatPrice, formatTime } from '../../../../utils';
import { showMessageActive } from '../../../../utils/messages';
import { FormattedMessage } from 'react-intl';

const OrderDetail = () => {
    const { reOrder } = UseOrder();
    const { id } = useParams();
    const { data, isFetching, error, refetch } = useQueryConfig(`order-detail-profile-${id}`, `api/orders/${id}`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const prevUrl = location.state?.prevUrl;
    const navigator = useNavigate();
    console.log(data);

    if (error) {
        return <NotFound />;
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const order: any = data?.data;
    console.log(order);

    const handleCanCelOrder = (id: string) => {
        if (id) {
            showModal();
        } else {
            console.log('ID not found');
        }
    };

    const handleBuyAgain = (id: string | number) => {
        showMessageActive('Buy Again', 'This will add the order items to your cart.Are you sure?', 'warning', () => {
            reOrder(id);
            navigator('/cart');
        });
    };

    const status:
        | {
            className: string;
            text: string;
        }
        | undefined = statusString(order?.status);

    return (
        <>
            {isFetching ? (
                <Skeleton />
            ) : (
                <section>
                    <Heading>
                        <FormattedMessage id="Order Detail" />
                    </Heading>
                    <Link
                        to={prevUrl}
                        className="w-[100px] h-[40px] flex items-center
                        justify-center gap-x-2 text-[16px] border-[1px] border-[#cacacb] font-medium
                        mb-10 hover:bg-gray-200 transition-global"
                    >
                        <ArrowLeftToLine className="w-[16px]" />
                        <FormattedMessage id="Back" />
                    </Link>
                    <div>
                        <div className="bg-whitesmoke p-8 rounded-lg min-h-[650px]">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-medium text-[25px]">
                                        <FormattedMessage id="Ordering information" />
                                    </h3>
                                    <div className="flex items-center gap-x-2">
                                        <Tag
                                            className={`flex justify-center items-center text-[16px]
                                        rounded-lg px-6 py-2 ${status?.className}`}
                                        >
                                            {status?.text}
                                        </Tag>
                                        <p className="text-[15px] color-gray">
                                            <FormattedMessage id="admin.id" /> : {order?.id}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-x-10">
                                    <div className="w-6/12">
                                        <h3 className="text-[15px] font-medium color-primary">
                                            <FormattedMessage id="admin.name" /> : {order?.user.name}
                                        </h3>
                                        <p className="text-[14px] color-gray my-3">
                                            <FormattedMessage id="phone" /> : {order?.phone}{' '}
                                        </p>
                                        <p className="text-[14px] color-gray mb-3">
                                            <FormattedMessage id="address" /> : {order?.address}
                                        </p>
                                        <p className="text-[14px] color-gray my-3">
                                            <FormattedMessage id="admin.date" /> : {formatTime(order?.created_at)}
                                        </p>
                                    </div>
                                    <div className="w-6/12 pl-10 border-l">
                                        <div className="flex justify-between pb-5 mb-5 border-b text-[14px] color-gray">
                                            <p>
                                                {' '}
                                                <p>
                                                    <FormattedMessage id="shipping_method" /> :
                                                </p>
                                            </p>
                                            <p className="font-medium">{order?.shipping_method}</p>
                                        </div>
                                        <div className="flex justify-between pb-5 mb-5 border-b text-[14px] color-gray">
                                            <p>
                                                {' '}
                                                <p>
                                                    <FormattedMessage id="box.Cart.Subtotal" /> :
                                                </p>
                                            </p>
                                            <p className="font-medium">
                                                {+order?.voucher_id?.discount
                                                    ? order.total_amount <= 0
                                                        ? 0
                                                        : formatPrice(
                                                            +order.total_amount /
                                                            (1 - +order?.voucher_id?.discount / 100) -
                                                            +order.shipping_cost,
                                                        )
                                                    : formatPrice(+order.total_amount - +order.shipping_cost)}
                                                đ
                                            </p>
                                        </div>

                                        <div className="flex justify-between pb-5 mb-5 border-b text-[14px] color-gray">
                                            <p>
                                                {' '}
                                                <p>
                                                    <FormattedMessage id="Shipping_Cost" /> :
                                                </p>
                                            </p>
                                            <p className="font-medium">{formatPrice(order?.shipping_cost)}đ</p>
                                        </div>

                                        {order?.voucher_id ? (
                                            <div className="flex justify-between pb-5 mb-5 border-b text-[14px] color-gray">
                                                <p>
                                                    {' '}
                                                    <p>
                                                        <FormattedMessage id="voucher" /> :
                                                    </p>
                                                </p>

                                                {order?.voucher_id && order?.voucher_id?.type == 'fixed' ? (
                                                    <p className="font-medium">
                                                        -{formatPrice(order.voucher_id?.discount)}đ
                                                    </p>
                                                ) : (
                                                    <p className="font-medium">{order.voucher_id?.discount}%</p>
                                                )}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <div className="flex justify-between pb-5 mb-5 border-b text-[14px] color-gray">
                                            <p>
                                                {' '}
                                                <p>
                                                    <FormattedMessage id="paymentMethod" /> :
                                                </p>
                                            </p>
                                            <p className="font-medium">{paymentMethodString(order?.payment_method)}</p>
                                        </div>
                                        <div className="flex justify-between pb-5 mb-5 border-b text-[14px] color-gray">
                                            <p>
                                                {' '}
                                                <p className="font-medium text-[20px]">
                                                    <FormattedMessage id="admin.total" /> :
                                                </p>
                                            </p>
                                            <p className="font-medium text-[20px]">
                                                {formatPrice(order?.total_amount)}đ
                                            </p>
                                        </div>
                                        <div className="mt-10 flex justify-end gap-x-3">
                                            {order.status &&
                                                order.status !== 0 &&
                                                order.status < 3 &&
                                                order.payment_method === 'cash_on_delivery' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleCanCelOrder(order?.id)}
                                                        className="w-[140px] h-[50px] bg-red-500
                                                        rounded-[30px] text-[16px] font-medium transition-global hover:opacity-70 text-white"
                                                    >
                                                        <FormattedMessage id="button.cancel" />
                                                    </button>
                                                    <ModalCancel
                                                        isModalOpen={isModalOpen}
                                                        setIsModalOpen={setIsModalOpen}
                                                        orderId={order.id}
                                                        refetch={refetch}
                                                    />
                                                </>
                                            ) : order.status > 3 ? (
                                                <p className="text-[16px] color-gray">
                                                    <FormattedMessage id="The Order is" />{' '}
                                                    <span className="color-primary">{status.text}</span>
                                                </p>
                                            ) : (
                                                ''
                                            )}
                                            {order.status === 0 ? (
                                                <ButtonPrimary
                                                    onClick={() => handleBuyAgain(order?.id)}
                                                    width="w-[140px]"
                                                    height="h-[50px]"
                                                >
                                                    <FormattedMessage id="Buy Again" />
                                                </ButtonPrimary>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-10 mt-20 pt-10 border-t">
                                    {order?.order_details.map((orderDetail: any) => (
                                        <div
                                            key={orderDetail.id}
                                            className="flex justify-between items-center bg-white p-8 rounded-xl"
                                        >
                                            <div className="flex items-start gap-x-5">
                                                <div>
                                                    <img
                                                        src={
                                                            orderDetail?.product
                                                                ? orderDetail?.product.image_url
                                                                : orderDetail?.variation?.image_url
                                                        }
                                                        alt=""
                                                        className="w-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-[18px]">
                                                        {orderDetail?.product
                                                            ? orderDetail?.product.name
                                                            : orderDetail?.variation?.name}
                                                    </h3>
                                                    {orderDetail?.variation?.classify ? (
                                                        <p className="font-medium color-gray text-[14px] my-2">
                                                            <FormattedMessage id="Variant" /> :{' '}
                                                            {orderDetail?.variation?.classify}
                                                        </p>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <p className="font-medium color-gray text-[14px]">
                                                        x{orderDetail?.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between items-end h-full">
                                                <p className="font-medium text-[18px] text-red-500">
                                                    {formatPrice(orderDetail?.total_amount)}đ
                                                </p>
                                                {order.status > 3 ? (
                                                    <Link to={`/detail/${orderDetail?.product?.slug}`}>
                                                        <button className="w-[80px] h-[36px] bg-gray-300 hover:bg-gray-200 transition-global rounded-xl color-primary font-medium text-[16px]">
                                                            <FormattedMessage id="admin.review" />
                                                        </button>
                                                    </Link>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default OrderDetail;
