import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { formatPrice, formatTime } from '../../../../utils';

const ModalOrder = ({ orderDetail, handleCancel }: { orderDetail: any; handleCancel: () => void }) => {
    return (
        <>
            <Modal width={1000} footer={''} title="Order Detail" open={orderDetail.isModalOpen} onCancel={handleCancel}>
                <div>
                    <div className="grid grid-cols-2 mb-10">
                        <div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                Name : {orderDetail.orderDetail?.user?.name}
                            </div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                Email : {orderDetail.orderDetail?.user?.email}
                            </div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                Phone : {orderDetail.orderDetail?.phone}
                            </div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                Address : {orderDetail.orderDetail?.address}
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-[14px] color-gray mb-2">
                                Create At : {formatTime(orderDetail.orderDetail?.created_at)}
                            </div>
                            {orderDetail.orderDetail?.voucher ? (
                                <div className="font-medium text-[14px] color-gray mb-2">
                                    Voucher : {formatPrice(orderDetail.orderDetail?.voucher)}
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="font-medium text-[14px] color-gray mb-2">
                                Shipping Cost : {formatPrice(orderDetail.orderDetail?.shipping_cost)} đ
                            </div>
                            <div className="font-medium text-[15px] color-primary mb-2">
                                Total : {formatPrice(orderDetail.orderDetail?.total_amount)} đ
                            </div>
                        </div>
                    </div>
                    <h1 className="color-gray font-normal mb-2">Order id: {orderDetail?.orderDetail?.id}</h1>
                    <div className="grid grid-cols-4 gap-x-5 border p-6">
                        <div>
                            <p className="font-medium color-primary">Shipping method:</p>
                            <span className="color-primary font-normal color-gray">
                                {orderDetail?.orderDetail?.shipping_method}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium color-primary">Payment method:</p>
                            <span className="color-primary font-normal color-gray">
                                {orderDetail?.orderDetail?.payment_method}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium color-primary">Payment status:</p>
                            <span className="color-primary font-normal color-gray">
                                {orderDetail?.orderDetail?.payment_status}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium color-primary">Status :</p>
                            <span className="color-primary font-normal color-gray">
                                {orderDetail?.orderDetail?.status}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-10 mt-10">
                        {orderDetail?.orderDetail?.order_details?.map((orderDetail: any) => (
                            <Link to={`/detail/${orderDetail?.product.slug}`} key={orderDetail?.orderDetail?.id}>
                                <div>
                                    <img src={orderDetail.product.image_url} alt="Product Image" />
                                    <div className="flex justify-between items-center mt-2">
                                        <h3 className="text-[14px] color-primary font-medium">
                                            {orderDetail?.product?.name}
                                        </h3>
                                        <span className="text-[12px] color-gray font-medium">
                                            x{orderDetail?.quantity}
                                        </span>
                                    </div>
                                    <p className="text-[12px] color-primary font-medium mt-2">
                                        {formatPrice(orderDetail?.price)} đ
                                    </p>
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
