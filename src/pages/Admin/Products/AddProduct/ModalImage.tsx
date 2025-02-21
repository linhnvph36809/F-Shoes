import { useState } from 'react';
import { Button, Modal } from 'antd';
import UploadImage from './UploadImage';
import { IImage } from '../../../../interfaces/IImage';
import { FormattedMessage } from 'react-intl';

const ModalImage = ({ images, handleSetImages, indexVariant, setImagesVariants }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        handleSetImages((prev: any) => ({
            ...prev,
            isShow: true,
        }));

        if (indexVariant || indexVariant == 0) {
            setImagesVariants((preImage: any) => ({
                ...preImage,
                [indexVariant]: images.images.map((image: any) => image.id),
            }));
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        handleSetImages((prev: any) => ({
            ...prev,
            isShow: false,
            images: [],
        }));

        if (indexVariant || indexVariant == 0) {
            setImagesVariants((preImage: any) => {
                delete preImage[indexVariant];
                return preImage;
            });
        }
    };

    const handleCheckboxChange = (image: IImage) => {
        handleSetImages((prev: any) => {
            const exists = prev.images.some((item: any) => item.id === image.id);
            if (exists) {
                return {
                    ...prev,
                    images: prev.images.filter((fileId: IImage) => fileId.id !== image.id),
                };
            } else {
                return {
                    ...prev,
                    images: [...prev.images, image],
                };
            }
        });
    };

    return (
        <section>
            <Button type="default" className="bg-primary text-white text-16px font-medium h-[40px]" onClick={showModal}>
                <FormattedMessage id="product.Choose Image" />
            </Button>
            <Modal
                title={
                    <h3 className="font-medium text-[28px] mb-10">
                        <FormattedMessage id="product.Choose Image" />
                    </h3>
                }
                width={1200}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={<FormattedMessage id="submit" />}
                cancelText={<FormattedMessage id="button.cancel" />}
            >
                <UploadImage imagesObj={images} handleCheckboxChange={handleCheckboxChange} />
            </Modal>
        </section>
    );
};

export default ModalImage;
