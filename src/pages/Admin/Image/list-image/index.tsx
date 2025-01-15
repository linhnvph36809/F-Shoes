import { Image, Upload, UploadProps, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import Heading from '../../components/Heading';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { IImage } from '../../../../interfaces/IImage';
import useImage from '../../../../hooks/useImage';
import { FormattedMessage } from 'react-intl';
import SkeletonComponent from '../../components/Skeleton';
import PermissionElement from '../../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../../constants';

const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const MediaLibrary = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, refetch } = useQueryConfig(
        'image-all',
        `/api/image?paginate=true&page=${currentPage}&per_page=55`,
    );
    const { loading, postImage, deleteImage } = useImage();
    const [fileList, setFileList] = useState<any>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async (file: any) => {
        const latestFile = file.file.originFileObj;
        const isFileNew = latestFile && !latestFile.status;
        if (isFileNew) {
            const formData = new FormData();
            formData.append('images[]', latestFile);
            postImage(formData);
            refetch();
        }
    };

    const handleDeleteImage = (value: any) => {
        deleteImage(value.uid);
        refetch();
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            +
            <div style={{ marginTop: 8 }}>
                <FormattedMessage id="media.upload" />
            </div>
        </button>
    );

    useEffect(() => {
        if (Array.isArray(data?.data?.data)) {
            const formattedData = data.data.data.map((item: IImage) => ({
                uid: item.id.toString(),
                name: item.alt_text || 'image',
                status: 'done',
                url: item.url,
            }));
            setFileList(formattedData);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>
                        <FormattedMessage id="media.List_Media" />
                    </Heading>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        onRemove={handleDeleteImage}
                    >
                        <PermissionElement keyName={PERMISSION.PERMISSION_MEDIA} action={ACTIONS.ACTIONS_ADD}>
                            {uploadButton}
                        </PermissionElement>
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                    <Pagination
                        className="flex justify-end"
                        current={data?.data?.paginator?.current_page || 1}
                        total={data?.data?.paginator?.total_item || 0}
                        pageSize={data?.data?.paginator?.per_page || 15}
                        onChange={handlePageChange}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    />
                </section>
            )}
        </>
    );
};

export default MediaLibrary;
