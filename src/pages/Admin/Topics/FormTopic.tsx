import { useEffect } from 'react';
import { ConfigProvider, Form, Select } from 'antd';

import InputPrimary from '../../../components/Input';
import ButtonPrimary from '../../../components/Button';
import Heading from '../components/Heading';
import { ITopic } from '../../../interfaces/ITopic';
import useQueryConfig from '../../../hooks/useQueryConfig';

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
                <Form.Item
                    label="Topic Name"
                    name="topic_name"
                    rules={[{ required: true, message: 'Please enter group name' }]}
                >
                    <InputPrimary placeholder="Group name" width="100%" height="h-[56px]" margin="mb-0" />
                </Form.Item>

                <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Please enter slug' }]}>
                    <InputPrimary placeholder="Group name" width="100%" height="h-[56px]" margin="mb-0" />
                </Form.Item>

                <Form.Item className="mt-20">
                    <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                        Submit
                    </ButtonPrimary>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FormTopic;
