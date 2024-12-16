import { useEffect } from 'react';
import { ConfigProvider, Form, Select } from 'antd';

import Heading from '../components/Heading';
import { ITopic } from '../../../interfaces/ITopic';
import useQueryConfig from '../../../hooks/useQueryConfig';
import InputPrimary from '../components/Forms/InputPrimary';
import ButtonSubmit from '../components/Button/ButtonSubmit';

const FormTopic = ({ title, initialValues, onFinish }: { title: string; initialValues: any; onFinish: any }) => {
    const [form] = Form.useForm();
    const { data, refetch } = useQueryConfig('topic-form', 'api/topics');

    const handleFinish = (value: ITopic) => {
        onFinish(value);
        refetch();
        form.resetFields();
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                parent_topic_id: initialValues.parent_topic_id,
                topic_name: initialValues.topic_name,
                slug: initialValues.slug,
            });
        }
    }, [form]);

    return (
        <Form form={form} initialValues={initialValues} onFinish={handleFinish} layout="vertical">
            <Heading>{title}</Heading>
            <div className="my-4 w-6/12">
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                multipleItemHeight: 40,
                            },
                        },
                    }}
                >
                    <Form.Item
                        label="Parent Topic"
                        name="parent_topic_id"
                        className='font-medium'
                        rules={[{ required: true, message: 'Please enter parent topic' }]}
                    >
                        <Select
                            allowClear
                            className="text-20px font-medium w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111]"
                            placeholder="Please select"
                            optionFilterProp="name"
                            fieldNames={{ label: 'topic_name', value: 'id' }}
                            options={data?.data}
                            defaultValue={initialValues?.parent_topic_id}
                        />
                    </Form.Item>
                </ConfigProvider>
                <InputPrimary
                    label="Topic Name"
                    name="topic_name"
                    rules={[{ required: true, message: 'Please enter group name' }]}
                    placeholder="Group name"
                ></InputPrimary>

                <InputPrimary
                    label="Slug"
                    name="slug"
                    placeholder="Group name"
                    rules={[{ required: true, message: 'Please enter slug' }]}
                ></InputPrimary>

                <Form.Item className="mt-20">
                    <ButtonSubmit />
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormTopic;
