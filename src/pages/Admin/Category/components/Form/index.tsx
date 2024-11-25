import { useState, useEffect } from 'react';
import { Form, Select, Modal } from 'antd';

import InputPrimary from '../../../../../components/Input';
import ButtonPrimary from '../../../../../components/Button';

const FormCategory = ({ onFinish, mainCategories, initialValues }: any) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                parent: initialValues.parents ? initialValues.parents.map((paren: any) => paren.id) : [],
            });
        }
    }, [initialValues, form]);

    const handleFinish = () => {
        const newCategory = {
            name: form.getFieldValue('name'),
            parents: form.getFieldValue('parent'),
        };

        onFinish(newCategory);
        setIsModalVisible(false); // Đóng modal sau khi submit
    };

    const showModal = () => {
        setIsModalVisible(true);
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
                title="Add New Category"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Loại bỏ footer để chỉ dùng nút trong form
                centered
                width={450}
            >
                <Form onFinish={handleFinish} form={form} initialValues={initialValues}>
                    <div className="flex flex-col gap-y-4 text-white">
                        {/* Input tên category */}
                        <Form.Item name="name" rules={[{ required: true, message: 'Please enter category name' }]}>
                            <InputPrimary placeholder="Category name" />
                        </Form.Item>

                        {/* Select Parent Category */}
                        <Form.Item
                            name="parent"
                            rules={[{ required: true, message: 'Please select a parent category' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select Parent Category"
                                options={mainCategories}
                                fieldNames={{ label: 'name', value: 'id' }}
                                className="w-full"
                            />
                        </Form.Item>

                        {/* Nút Submit */}
                        <Form.Item>
                            <ButtonPrimary width="w-full" height="h-[50px]" htmlType="submit">
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
