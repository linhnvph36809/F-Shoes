import { useEffect } from 'react';
import { Form, Select } from 'antd';

import InputPrimary from '../../../../../components/Input';
import ButtonPrimary from '../../../../../components/Button';

const FormCategory = ({ onFinish, mainCategories, initialValues }: any) => {
    const [form] = Form.useForm();

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
    };

    return (
        <Form onFinish={handleFinish} form={form} initialValues={initialValues}>
            <div className="flex justify-between gap-x-5">
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter category name' }]}
                    className="mb-0 flex-1"
                >
                    <InputPrimary placeholder="Category name" />
                </Form.Item>

                <Form.Item
                    name="parent"
                    rules={[{ required: true, message: 'Please select a parent category' }]}
                    className="mb-0 flex-1 w-[250px] h-[50px]"
                >
                    <Select
                        mode="multiple"
                        placeholder="Select Parent Category"
                        options={mainCategories}
                        fieldNames={{ label: 'name', value: 'id' }}
                        className="w-full sm:h-[32px] md:h-[56px] border-1 border-[#111111]"
                    />
                </Form.Item>

                <Form.Item className="mb-0 mr-10">
                    <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                        Submit
                    </ButtonPrimary>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormCategory;
