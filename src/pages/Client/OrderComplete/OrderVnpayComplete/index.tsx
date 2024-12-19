import { Card } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { formatPrice } from '../../../../utils';
import useCookiesConfig from '../../../../hooks/useCookiesConfig';
import useOnlinePayment from '../../../../hooks/useOnlinePayment';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

const OrderVnpayComplete = () => {
    const location = useLocation();
    const {
        cookies: { order },
        removeCookie,
    } = useCookiesConfig('order');

    const {
        cookies: { orderId },
        removeCookie: removeCookieOrderId,
    } = useCookiesConfig('orderId');

    const { putOrder } = useOnlinePayment();

    const queryParams = new URLSearchParams(location.search);
    const params: any = {
        vnp_Amount: queryParams.get('vnp_Amount'),
        vnp_BankCode: queryParams.get('vnp_BankCode'),
        vnp_BankTranNo: queryParams.get('vnp_BankTranNo'),
        vnp_CardType: queryParams.get('vnp_CardType'),
        vnp_OrderInfo: queryParams.get('vnp_OrderInfo'),
        vnp_PayDate: queryParams.get('vnp_PayDate'),
        vnp_ResponseCode: queryParams.get('vnp_ResponseCode'),
        vnp_TmnCode: queryParams.get('vnp_TmnCode'),
        vnp_TransactionNo: queryParams.get('vnp_TransactionNo'),
        vnp_TransactionStatus: queryParams.get('vnp_TransactionStatus'),
        vnp_TxnRef: queryParams.get('vnp_TxnRef'),
        vnp_SecureHash: queryParams.get('vnp_SecureHash'),
    };

    if (params.vnp_TransactionStatus != '00' || !order) {
        removeCookie('order');
        return <Navigate to="/profile/orders?status=waiting_confirm" />;
    }

    useEffect(() => {
        if (orderId) {
            putOrder(
                {
                    payment_status: true,
                    payment_method: 'vnpay',
                },
                orderId,
            );
            removeCookieOrderId('orderId');
        }
    }, []);

    return (
        <>
            {params.vnp_TransactionStatus == '00' && order ? (
                <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 p-12">
                    <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-4xl text-center animate-fadeIn">
                        {/* Icon và văn bản thông báo */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="bg-green-100 p-4 rounded-full mb-10">
                                <CheckCircleOutlined className="text-[50px] text-green-500" />
                            </div>
                            <h1 className="text-[25px] font-bold mb-4 color-primary">
                                <FormattedMessage id="thank_you_purchase" />
                            </h1>
                            <h3 className="text-[14px] text-gray-600 mb-8">
                                <FormattedMessage id="order_received_message" />
                                <br />
                            </h3>
                        </div>

                        <Card className="mb-8 border rounded-lg" bordered={false}>
                            {order?.order_details
                                ? order.order_details.map((order: any) => (
                                      <div className="flex justify-between items-start mb-6 border-b pb-4">
                                          <img
                                              src={order?.product_image}
                                              alt="Nike Air Force One"
                                              className="w-[80px] h-[100px] object-cover rounded-md"
                                          />
                                          <div className="flex-1 ml-6 text-left">
                                              <p className="font-medium color-primary text-[15px]">
                                                  {order?.product_name}
                                              </p>
                                              <p className="text-[13px] color-gray font-medium">{order?.classify}</p>
                                              <p className="color-primary text-[13px]">Qty: {order?.quantity}</p>
                                          </div>
                                          <p className="font-semibold text-gray-800 text-2xl">
                                              {' '}
                                              {formatPrice(order?.total_amount)} đ
                                          </p>
                                      </div>
                                  ))
                                : ''}

                            <div className="mt-20">
                                <div className="flex justify-between items-center mt-6 pt-4">
                                    <span className="text-[14px] font-medium color-primary">
                                        {<FormattedMessage id="address" />}:
                                    </span>
                                    <span className="text-[13px] color-gray"> {order?.address}</span>
                                </div>

                                <div className="flex justify-between items-center mt-6 border-t pt-4">
                                    <span className="text-[14px] font-medium color-primary">
                                        {<FormattedMessage id="title.Payment" />}
                                    </span>
                                    <span className="font-semibold text-xl text-gray-800"> VNPAY</span>
                                </div>

                                <div className="flex justify-between items-center mt-6 border-t pt-4">
                                    <span className="text-[14px] font-medium color-primary">
                                        {<FormattedMessage id="shipping" />}
                                    </span>
                                    <span className="font-semibold text-xl text-gray-800">
                                        {order.shipping_method}-{formatPrice(+order.shipping_cost)}đ
                                    </span>
                                </div>
                                {order?.voucher_cost ? (
                                    <div className="flex justify-between items-center mt-6 border-t pt-4">
                                        <span className="text-[14px] font-medium color-primary">
                                            {<FormattedMessage id="voucher" />}
                                        </span>
                                        <span className="font-semibold text-xl text-gray-800">
                                            {' '}
                                            {formatPrice(+order.voucher_cost)} đ
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}

                                <div className="flex justify-between items-center mt-6 border-t pt-4">
                                    <span className="font-semibold text-[18px] color-primary">
                                        {<FormattedMessage id="box.Cart.Total" />}
                                    </span>
                                    <span className="font-semibold text-[18px] text-gray-800">
                                        {' '}
                                        {formatPrice(order.total_amount)}đ
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Nút quay lại trang chủ */}
                        <Link to="/" type="primary">
                            <div className="flex justify-center items-center gap-x-2 text-[16px] hover:opacity-70">
                                <ArrowLeft className="w-6" /> {<FormattedMessage id="back_to_home" />}
                            </div>
                        </Link>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default OrderVnpayComplete;
