import { Form, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';

import '../../style.scss';
import ButtonAdd from '../../../components/Button/ButtonAdd';
import { FormattedMessage, useIntl } from 'react-intl';
import InputPrimary from '../../../components/Forms/InputPrimary';
import SelectPrimary from '../../../components/Forms/SelectPrimary';
import ButtonSubmit from '../../../components/Button/ButtonSubmit';

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
                parent: initialValues.parents.map((parent: any) => parent.id),
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
                width={500}
            >
                <Form onFinish={handleFinish} form={form} initialValues={initialValues}>
                    <InputPrimary
                        name="name"
                        label={<FormattedMessage id="category.name_label" />}
                        className="font-medium"
                        placeholder={intl.formatMessage({ id: 'category.name_placeholder' })}
                        rules={[{ required: true, message: <FormattedMessage id="category.name_required" /> }]}
                    />

                    {/* Select Parent Category */}
                    <SelectPrimary
                        name="parent"
                        className="font-medium"
                        label={<FormattedMessage id="category.parent_label" />}
                        labelCol={{ span: 24 }}
                       
                        mode="multiple"
                        placeholder={intl.formatMessage({ id: 'category.parent_placeholder' })}
                        options={mainCategories}
                        fieldNames={{ label: 'name', value: 'id' }}
                    />
                    <div className="text-end mt-10">
                        <ButtonSubmit loading={isLoading} />
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default FormCategory;
