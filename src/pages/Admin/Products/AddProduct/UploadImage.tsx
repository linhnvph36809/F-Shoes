import { ReactNode, useState } from 'react';
import { Checkbox, Image, Upload, GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import useImage from '../../../../hooks/useImage';
import { IImage } from '../../../../interfaces/IImage';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = ({
    imagesObj,
    handleCheckboxChange,
}: {
    imagesObj: any;
    handleCheckboxChange: (image: IImage) => void;
}) => {
    const { images } = useImage();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList }: any) => {
        const formData = new FormData();
        formData.append('images[]', fileList);
        console.log(fileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const itemRender = (originNode: ReactNode, file: IImage) => {
        return (
            <div className="relative hover:cursor-pointer" onClick={() => handleCheckboxChange(file)}>
                <Checkbox
                    className="absolute z-10 right-0 top-0"
                    checked={imagesObj.images.some((image: any) => image.id == file.id)}
                />
                {originNode}
            </div>
        );
    };

    return (
        <>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={images as any}
                itemRender={itemRender as any}
                onPreview={handlePreview}
                onChange={handleChange}
                
                multiple
            >
                {uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default UploadImage;
