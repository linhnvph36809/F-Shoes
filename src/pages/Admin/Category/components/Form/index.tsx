import { Form, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';

import ButtonPrimary from '../../../../../components/Button';
import '../../style.scss';
import InputPrimary from '../../../components/Forms/InputPrimary';
import ButtonAdd from '../../../components/Button/ButtonAdd';
import { FormattedMessage, useIntl } from 'react-intl';

const FormCategory = ({
    onFinish,
    mainCategories,
    initialValues,
    isModalVisible,
    setIsModalVisible,
    setCateUpdate,
}: any) => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false); // State quản lý trạng thái loading

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                parent: initialValues.parents,
            });
            console.log(initialValues.parents);
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

            <ButtonAdd onClick={showModal} title={<FormattedMessage id="category.add_button" />} />

            {/* Modal chứa Form */}
            <Modal
                title={
                    <h3 className="text-[23px] font-bold">
                        {initialValues ? (
                            <FormattedMessage id="category.modal_title_update" />
                        ) : (
                            <FormattedMessage id="category.modal_title_add" />
                        )}
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
                            label={<FormattedMessage id="category.name_label" />}
                            className="font-medium"
                            labelCol={{ span: 24 }} // Căn label theo chiều ngang
                            rules={[{ required: true, message: <FormattedMessage id="category.name_required" /> }]}
                        >
                            <InputPrimary
                                placeholder={intl.formatMessage({ id: 'category.name_placeholder' })}
                                width={'w-[395px]'}
                            />
                        </Form.Item>

                        {/* Select Parent Category */}
                        <Form.Item
                            name="parent"
                            className="font-medium"
                            label={<FormattedMessage id="category.parent_label" />}
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: <FormattedMessage id="category.parent_required" /> }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder={intl.formatMessage({ id: 'category.parent_placeholder' })}
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
                                <FormattedMessage id="category.submit" />
                            </ButtonPrimary>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default FormCategory;
