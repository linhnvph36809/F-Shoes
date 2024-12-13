import { Form, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';

import ButtonPrimary from '../../../../../components/Button';
import '../../style.scss';
import InputPrimary from '../../../components/Forms/InputPrimary';

const FormCategory = ({
    onFinish,
    mainCategories,
    initialValues,
    isModalVisible,
    setIsModalVisible,
    setCateUpdate,
}: any) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false); // State quản lý trạng thái loading

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                parent: initialValues.parents ? initialValues.parents.map((paren: any) => paren.id) : [],
            });
        }
    }, [initialValues, form]);

    const handleFinish = async () => {
        setIsLoading(true); // Bắt đầu loading
        const newCategory = {
            name: form.getFieldValue('name'),
            parents: form.getFieldValue('parent'),
        };

        // Gọi hàm onFinish (có thể là API) và đợi xử lý xong
        await onFinish(newCategory);

        setIsLoading(false); // Kết thúc loading sau khi dữ liệu được xử lý
        setIsModalVisible(false); // Đóng modal sau khi submit
    };

    const showModal = () => {
        setIsModalVisible(true);
        setCateUpdate('');
        form.setFieldsValue({
            name: '',
            parent: [],
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Đóng modal khi nhấn Cancel
    };

    return (
        <>
            {/* Nút mở modal */}
            <ButtonPrimary width="w-[150px]" height="h-[50px]" onClick={showModal}>
                Add Category
            </ButtonPrimary>

            {/* Modal chứa Form */}
            <Modal
                title={
                    <h3 className="text-[23px] font-bold">
                        {initialValues ? 'Update New Category' : 'Add New Category'}
                    </h3>
                }
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Loại bỏ footer để chỉ dùng nút trong form
                centered
                width={450}
            >
                <Form onFinish={handleFinish} form={form} initialValues={initialValues}>
                    <div className="flex flex-col items-center gap-y-6 mt-10">
                        {/* Input Tên Category */}
                        <Form.Item
                            name="name"
                            label="Category Name"
                            className="font-medium"
                            labelCol={{ span: 24 }} // Căn label theo chiều ngang
                            rules={[{ required: true, message: 'Please enter category name' }]}
                        >
                            <InputPrimary placeholder={'Category Name'} width={'w-[395px]'} />
                        </Form.Item>

                        {/* Select Parent Category */}
                        <Form.Item
                            name="parent"
                            className="font-medium"
                            label="Parent Category"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Please select a parent category' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select Parent Category"
                                options={mainCategories}
                                fieldNames={{ label: 'name', value: 'id' }}
                                style={{ width: '395px', height: '52px' }}
                            />
                        </Form.Item>

                        {/* Nút Submit */}
                        <Form.Item>
                            <ButtonPrimary
                                width="w-[247px]"
                                height="h-[56px]"
                                htmlType="submit"
                                className="bg-blue-500 text-white rounded hover:bg-blue-600"
                                loading={isLoading} // Thêm thuộc tính loading
                            >
                                Submit
                            </ButtonPrimary>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default FormCategory;
