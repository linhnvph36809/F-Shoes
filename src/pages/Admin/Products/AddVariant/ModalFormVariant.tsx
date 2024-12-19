import { useEffect, useState } from 'react';
import { Checkbox, ConfigProvider, Form, Modal, Skeleton } from 'antd';
import ButtonEdit from '../../components/Button/ButtonEdit';
import { CopyPlus, X } from 'lucide-react';
import InputPrimary from '../../components/Forms/InputPrimary';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { IImage } from '../../../../interfaces/IImage';
import PaginationComponent from '../../../../components/Pagination';
import { FormattedMessage, useIntl } from 'react-intl';

const ModalFormVariant = ({ index, ids, setDatas, setError, setImages }: any) => {
    const intl = useIntl();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching, refetch } = useQueryConfig(
        'image-add-product',
        `/api/image?paginate=true&page=${currentPage}`,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const images = data?.data.data || [];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setDatas((preValues: any) => {
            const newValues = [...preValues];
            newValues[index] = null;
            return newValues;
        });
        setError((preValues: any) => {
            const newValues = [...preValues];
            newValues[index] = null;
            return newValues;
        });
        setImages((preImages: any) => {
            const newImages = preImages.slice(0, index);
            return newImages;
        });
        form.setFieldsValue({
            price: '',
            stock_qty: '',
            sku: '',
            images: null,
        });
        setIsModalOpen(false);
    };

    const onFinish = (value: any) => {
        setDatas((preValues: any) => {
            const newValues = [...preValues];
            newValues[index] = {
                ...value,
                values: ids,
            };
            return newValues;
        });

        setError((preValues: any) => {
            const newValues = [...preValues];
            newValues[index] = {
                ...value,
                values: ids,
            };
            return newValues;
        });

        setImages((preImage: any) => {
            const newValues = images.filter((image: any) => {
                if (value?.images?.includes(image.id)) {
                    return image.url;
                }
            });
            const newImages = [...preImage];
            newImages[index] = newValues;
            return newImages;
        });

        setIsModalOpen(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        refetch();
    }, [currentPage]);

    return (
        <>
            <ButtonEdit onClick={showModal}>
                <CopyPlus />
            </ButtonEdit>
            <Modal
                title={
                    <h3 className="text-[25px] font-medidum">
                        <FormattedMessage id="variant.addValue" />
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                closeIcon={<X onClick={handleClose} />}
                footer={[
                    <div className="mt-10">
                        <button
                            key="cancel"
                            className="hover:bg-red-500 mr-5 w-[80px] h-[32px] border 
                        rounded-lg transition-global hover:text-white"
                            onClick={handleCancel}
                        >
                            <FormattedMessage id="button.cancel" />
                        </button>
                        <button
                            key="ok"
                            className="w-[80px] h-[32px] bg-primary text-white rounded-lg
                        hover:opacity-80 transition-global"
                            onClick={handleOk}
                        >
                            <FormattedMessage id="button.submit" />
                        </button>
                    </div>,
                ]}
            >
                <Form form={form} onFinish={onFinish}>
                    <InputPrimary
                        label={<FormattedMessage id="admin.price" />}
                        placeholder={intl.formatMessage({ id: 'product.enterPrice' })}
                        name="price"
                        type="number"
                        rules={[{ required: true, message: <FormattedMessage id="product.priceRequired" /> }]}
                    />
                    <InputPrimary
                        label={<FormattedMessage id="product.stockQuantity" />}
                        placeholder={intl.formatMessage({ id: 'product.enterStockQuantity' })}
                        name="stock_qty"
                        type="number"
                        rules={[{ required: true, message: <FormattedMessage id="product.quantityRequired" /> }]}
                    />
                    <InputPrimary label="SKU" placeholder="Enter SKU" name="sku" />

                    <ConfigProvider
                        theme={{
                            components: {
                                Radio: {
                                    buttonCheckedBg: '#ccc',
                                },
                            },
                        }}
                    >
                        {isFetching ? (
                            <Skeleton className="mb-10" />
                        ) : (
                            <Form.Item
                                name="images"
                                label={<FormattedMessage id="admin.image" />}
                                className="font-medium"
                                labelCol={{ span: 24 }}
                            >
                                <>
                                    <Checkbox.Group
                                        options={images.map((image: IImage) => ({
                                            label: <img className="w-[60px] h-[60px] object-cover" src={image.url} />,
                                            value: image.id,
                                        }))}
                                    />
                                </>
                            </Form.Item>
                        )}
                    </ConfigProvider>
                    <PaginationComponent
                        page={data?.data?.paginator?.current_page || 1}
                        totalItems={data?.data?.paginator?.total_item || 0}
                        pageSize={data?.data?.paginator?.per_page || 15}
                        handlePageChange={handlePageChange}
                    />
                </Form>
            </Modal>
        </>
    );
};

export default ModalFormVariant;
