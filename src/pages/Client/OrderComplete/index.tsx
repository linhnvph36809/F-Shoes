import React from 'react';
import { Button, Card } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const OrderComplete = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 p-12">
            <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-4xl text-center animate-fadeIn">
                {/* Icon và văn bản thông báo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircleOutlined className="text-8xl text-green-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">Thank you for your purchase</h1>
                    <h3 className="text-2xl text-gray-600 mb-8">
                        We've received your order and it will ship in 5-7 business days.
                        <br />
                        Your order number is <span className="font-semibold">#B6CT3</span>
                    </h3>
                </div>

                {/* Thông tin chi tiết sản phẩm */}
                <Card className="mb-8 border rounded-lg" bordered={false}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <img
                            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bfb226ee-c838-4d28-b2fa-e2b3e6be6233/NIKE+C1TY.png"
                            alt="Air Jordan 14"
                            className="w-20 h-20 rounded-md"
                        />
                        <div className="flex-1 ml-6 text-left">
                            <p className="font-medium text-gray-700 text-2xl">Air Jordan 14</p>
                        </div>
                        <p className="font-semibold text-gray-800 text-2xl"> 800 đ</p>
                    </div>

                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <img
                            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bfb226ee-c838-4d28-b2fa-e2b3e6be6233/NIKE+C1TY.png"
                            alt="Nike Air Force One"
                            className="w-20 h-20 rounded-md"
                        />
                        <div className="flex-1 ml-6 text-left">
                            <p className="font-medium text-gray-700 text-2xl">Nike Air Force One</p>
                        </div>
                        <p className="font-semibold text-gray-800 text-2xl"> 800 đ</p>
                    </div>

                    <div className="flex justify-between items-center mt-6 border-t pt-4">
                        <span className="font-semibold text-3xl text-gray-800">Total</span>
                        <span className="font-semibold text-3xl text-gray-800"> 1600 đ</span>
                    </div>
                </Card>
 
                {/* Nút quay lại trang chủ */}
                <Button
                    type="button"
                    onClick={() => alert('Returning to Home')}
                    className="w-full border border-black bg-white text-black text-2xl py-3 hover:bg-gray-100"
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
}

export default OrderComplete;
