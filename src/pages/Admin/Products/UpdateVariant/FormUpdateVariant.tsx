import { useEffect, useState } from 'react';
import { Checkbox, ConfigProvider, Form, Modal, Skeleton } from 'antd';
import ButtonEdit from '../../components/Button/ButtonEdit';
import { SquarePen, X } from 'lucide-react';
import InputPrimary from '../../components/Forms/InputPrimary';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { IImage } from '../../../../interfaces/IImage';
import PaginationComponent from '../../../../components/Pagination';
import useVariant from '../../../../hooks/useVariant';

const FormUpdateVariant = ({ initialValues }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching, refetch } = useQueryConfig('image', `/api/image?paginate=true&page=${currentPage}`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { loading, putVariant } = useVariant();

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
        await putVariant(
            {
                ...value,
                values: initialValues.values,
            },
            initialValues.id,
        );
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
                title={<h3 className="text-[25px] font-medidum">Update Value Variant</h3>}
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
                            Cancel
                        </button>
                        <button
                            key="ok"
                            className="w-[80px] h-[32px] bg-primary text-white rounded-lg
                        hover:opacity-80 transition-global"
                            onClick={handleOk}
                        >
                            Submit
                        </button>
                    </div>,
                ]}
            >
                {loading ? (
                    <Skeleton />
                ) : (
                    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
                        <InputPrimary
                            label="Price"
                            placeholder="Enter Price"
                            name="price"
                            type="number"
                            rules={[{ required: true, message: 'Please enter price' }]}
                        />
                        <InputPrimary
                            label="Stock Quantity"
                            placeholder="Enter Stock Quantity"
                            name="stock_qty"
                            type="number"
                            rules={[{ required: true, message: 'Please enter stock quantity' }]}
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
                                    label="Choose Images"
                                    className="font-medium"
                                    labelCol={{ span: 24 }}
                                >
                                    <>
                                        <Checkbox.Group
                                            options={images.map((image: IImage) => ({
                                                label: (
                                                    <img className="w-[60px] h-[60px] object-cover" src={image.url} />
                                                ),
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
                )}
            </Modal>
        </>
    );
};

export default FormUpdateVariant;
