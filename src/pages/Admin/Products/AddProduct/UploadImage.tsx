import { ReactNode, useState } from 'react';
import { Checkbox, Image, Upload, GetProp, UploadFile, UploadProps, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { IImage } from '../../../../interfaces/IImage';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import PaginationComponent from '../../../../components/Pagination';
import { FormattedMessage } from 'react-intl';

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
    const [page, setPage] = useState(1);
    const { data, isFetching, refetch } = useQueryConfig(`image-${page}`, `/api/image?paginate=true&page=${page}`);
    const images = data?.data.data || [];

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

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        refetch();
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>
                <FormattedMessage id="Upload Image" />
            </div>
        </button>
    );

    const itemRender = (originNode: ReactNode, file: IImage) => {
        return (
            <div
                className="relative hover:cursor-pointer h-full object-cover"
                onClick={() => handleCheckboxChange(file)}
            >
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
            {isFetching ? (
                <Skeleton />
            ) : (
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={images as any}
                    itemRender={itemRender as any}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple
                    progress={{
                        strokeWidth: 20,
                    }}
                >
                    {uploadButton}
                </Upload>
            )}
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
            <div className="mb-10">
                <PaginationComponent
                    handlePageChange={handlePageChange}
                    page={data?.data?.paginator?.current_page}
                    totalItems={data?.data?.paginator?.total_item}
                    pageSize={data?.data?.paginator?.per_page}
                />
            </div>
        </>
    );
};

export default UploadImage;
