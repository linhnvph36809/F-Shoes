import { Card } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formatPrice } from '../../../../utils';
import useCookiesConfig from '../../../../hooks/useCookiesConfig';

const OrderCashOnDelivery = () => {
    const {
        cookies: { order },
    } = useCookiesConfig('order');

    return (
        <>
            {order ? (
                <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 p-12">
                    <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-4xl text-center animate-fadeIn">
                        {/* Icon và văn bản thông báo */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="bg-green-100 p-4 rounded-full mb-10">
                                <CheckCircleOutlined className="text-8xl text-green-500" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4 color-primary">Thank you for your purchase</h1>
                            <h3 className="text-2xl text-gray-600 mb-8">
                                We've received your order and it will ship in 5-7 business days.
                                <br />
                            </h3>
                        </div>

                        {/* Thông tin chi tiết sản phẩm */}
                        <Card className="mb-8 border rounded-lg" bordered={false}>
                            {order?.order_details
                                ? order.order_details.map((order: any) => (
                                      <div className="flex justify-between items-center mb-6 border-b pb-4">
                                          <img
                                              src={order?.product_image}
                                              alt="Nike Air Force One"
                                              className="w-[60px] h-[60px] rounded-md"
                                          />
                                          <div className="flex-1 ml-6 text-left">
                                              <p className="font-medium text-gray-700 text-2xl">
                                                  {order?.product_name}
                                              </p>
                                              <p className="text-gray-700 text-lg">Qty: {order?.quantity}</p>
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
                                    <span className="text-xl text-gray-800">Address</span>
                                    <span className="text-lg text-gray-800"> {order?.address}</span>
                                </div>

                                <div className="flex justify-between items-center mt-6 border-t pt-4">
                                    <span className="text-xl text-gray-800">Payment</span>
                                    <span className="font-semibold text-xl text-gray-800">Cash On Delivery</span>
                                </div>

                                <div className="flex justify-between items-center mt-6 border-t pt-4">
                                    <span className="text-xl text-gray-800">Shipping</span>
                                    <span className="font-semibold text-xl text-gray-800">
                                        {' '}
                                        {formatPrice(+order.shipping_cost)} đ
                                    </span>
                                </div>
                                {order?.voucher_cost ? (
                                    <div className="flex justify-between items-center mt-6 border-t pt-4">
                                        <span className="text-xl text-gray-800">Voucher</span>
                                        <span className="font-semibold text-xl text-gray-800">
                                            {' '}
                                            {formatPrice(+order.voucher_cost)} đ
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}

                                <div className="flex justify-between items-center mt-6 border-t pt-4">
                                    <span className="font-semibold text-3xl text-gray-800">Total</span>
                                    <span className="font-semibold text-3xl text-gray-800">
                                        {' '}
                                        {formatPrice(order.total_amount)}đ
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Nút quay lại trang chủ */}
                        <Link to="/" type="primary">
                            <div className="flex justify-center items-center gap-x-2 text-[16px] hover:opacity-70">
                                <ArrowLeft className="w-6" /> Back to Home
                            </div>
                        </Link>
                    </div>
                </div>
            ) : (
                <Navigate to="/order" />
            )}
        </>
    );
};

export default OrderCashOnDelivery;
