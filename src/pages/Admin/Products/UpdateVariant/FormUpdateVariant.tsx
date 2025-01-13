import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Checkbox, ConfigProvider, Form, Modal, Skeleton, Switch } from 'antd';

import ButtonEdit from '../../components/Button/ButtonEdit';
import { SquarePen, X } from 'lucide-react';
import InputPrimary from '../../components/Forms/InputPrimary';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { IImage } from '../../../../interfaces/IImage';
import PaginationComponent from '../../../../components/Pagination';

const FormUpdateVariant = ({ initialValues, setDatas, setError, index, ids }: any) => {
    const intl = useIntl();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching, refetch } = useQueryConfig('image', `/api/image?paginate=true&page=${currentPage}`);
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
        setIsModalOpen(false);
    };

    const onFinish = async (value: any) => {
        setDatas((preValues: any) => {
            const newValues = [...preValues];
            newValues[index] = {
                ...value,
                values: ids,
                listImages: images.filter((image: any) => value.images.includes(image.id)),
                status: value.status,
            };
            return newValues;
        });

        setError((preValues: any) => {
            const newValues = [...preValues];
            newValues[index] = {
                ...value,
                values: ids,
                listImages: images.filter((image: any) => value.images.includes(image.id)),
                status: value.status,
            };
            return newValues;
        });

        setIsModalOpen(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        refetch();
    }, [currentPage]);

    useEffect(() => {
        form.setFieldsValue({});
    }, [initialValues]);

    return (
        <>
            <ButtonEdit onClick={showModal}>
                <SquarePen />
            </ButtonEdit>
            <Modal
                title={
                    <h3 className="text-[25px] font-medidum">
                        <FormattedMessage id="Update Value Variant" />
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
                <Form form={form} onFinish={onFinish} initialValues={initialValues}>
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
                        rules={[
                            { required: true, message: <FormattedMessage id="product.stockQuantityRequired" /> },
                            {
                                validator: (_: any, value: any) => {
                                    if (value > 10000) {
                                        return Promise.reject(<FormattedMessage id="product.quantityLimit" />);
                                    }
                                    return Promise.resolve();
                                },
                            },
                            {
                                validator: (_: any, value: number) => {
                                    if (value > 0) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(<FormattedMessage id="product.quantityInvalid" />);
                                },
                            },
                        ]}
                    />
                    <InputPrimary label="SKU" placeholder="Enter SKU" name="sku" />

                    <Form.Item
                        label={<FormattedMessage id="product.status" />}
                        className="font-medium flex items-center"
                        name="status"
                    >
                        <Switch className="w- text-16px font-medium" />
                    </Form.Item>

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

export default FormUpdateVariant;
