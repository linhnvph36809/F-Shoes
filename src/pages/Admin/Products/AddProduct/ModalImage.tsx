import { useState } from 'react';
import { Button, Modal } from 'antd';
import UploadImage from './UploadImage';
import { IImage } from '../../../../interfaces/IImage';

const ModalImage = ({ images, handleSetImages }: any) => {
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
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        handleSetImages((prev: any) => ({
            ...prev,
            isShow: false,
            images: [],
        }));
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
                Choose Image
            </Button>
            <Modal
                title="Image Product"
                width={1200}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Save'}
            >
                <UploadImage imagesObj={images} handleCheckboxChange={handleCheckboxChange} />
            </Modal>
        </section>
    );
};

export default ModalImage;
