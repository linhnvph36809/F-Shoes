import { useState } from 'react';
import { Modal } from 'antd';
import { Star } from 'lucide-react';

import { formatPrice } from '../../../utils';
import { FormattedMessage } from 'react-intl';

const ModalViewDetail = ({ product }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <p
                className="color-primary text-16px font-medium underline hover:cursor-pointer hover:text-gray-500 transition-global"
                onClick={() => showModal()}
            >

                <FormattedMessage id="View_Product_Details" />

            </p>
            <Modal width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div>
                    <div className="flex gap-x-5 items-start">
                        <img src={product?.image_url} alt="" className="w-[80px]" />
                        <div>
                            <p className="font-medium text-[18px] color-primary">{product?.name}</p>
                            <p className="font-medium text-[16px] color-primary">
                                {formatPrice(product?.sale_price || product?.price)}đ
                            </p>
                        </div>
                    </div>
                    <div
                        className="text-[14px] color-gray font-normal mt-5"
                        dangerouslySetInnerHTML={{ __html: product?.short_description }}
                    ></div>
                    <div
                        className="text-[16px] font-normal my-5 color-primary"
                        dangerouslySetInnerHTML={{ __html: product?.description }}
                    ></div>
                    <div className="font-medium text-[18px] pb-5 color-primary">
                        <FormattedMessage id="Benefits" />
                        <ul className="list-disc list-outside pl-10 my-2">
                            <li className="color-primary text-[16px] font-normal">
                                <FormattedMessage id="detailDescription1" />
                            </li>
                            <li className="color-primary text-[16px] font-normal">
                                <FormattedMessage id="detailDescription2" />
                            </li>
                            <li className="color-primary text-[16px] font-normal">
                                <FormattedMessage id="detailDescription3" />
                            </li>
                            <li className="color-primary text-[16px] font-normal">
                                <FormattedMessage id="detailDescription4" />
                            </li>
                        </ul>
                    </div>
                    <div className="font-medium text-[18px] pb-5 color-primary">
                        <FormattedMessage id="Product_details" />
                        <ul className="list-disc list-outside pl-10 my-2">
                            {product?.variations.length ? (
                                <li className="color-primary text-[16px] font-normal">
                                    <FormattedMessage id="Variants" /> :{' '}
                                    {product?.variations?.map((variation: any) => (
                                        <span key={variation?.id} className="font-medium">
                                            {variation?.classify},
                                        </span>
                                    ))}
                                </li>
                            ) : (
                                ''
                            )}
                            <li className="color-primary text-[16px] font-normal">
                                <FormattedMessage id="admin.stock_qty" /> : <span className="font-medium">{product?.stock_qty}</span>
                            </li>
                            <li className="color-primary text-[16px] font-normal">
                                <FormattedMessage id="admin.qty_sold" />  : <span className="font-medium">{product?.qty_sold}</span>
                            </li>
                            <li className="color-primary text-[16px] font-normal">
                                <div className="flex gap-x-2 items-center">
                                    <FormattedMessage id="Stars" /> : <span className="font-medium">{product?.rating}</span>{' '}
                                    <Star className={`w-[18px] text-yellow-500`} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalViewDetail;
