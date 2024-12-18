import { useEffect } from 'react';
import { ConfigProvider, Form, Select } from 'antd';

import Heading from '../components/Heading';
import { ITopic } from '../../../interfaces/ITopic';
import useQueryConfig from '../../../hooks/useQueryConfig';
import InputPrimary from '../components/Forms/InputPrimary';

import { FormattedMessage, useIntl } from 'react-intl';
import ButtonPrimary from '../../../components/Button';

const FormTopic = ({ title, initialValues, onFinish }: { title: string; initialValues: any; onFinish: any }) => {
    const intl = useIntl();
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
                        label={intl.formatMessage({ id: 'topic.form.parent_Name' })} 
                        name="parent_topic_id"
                        className='font-medium'
                        rules={[{ required: true, message: <FormattedMessage id="topic.form.parent_name" /> }]}
                    >
                        <Select
                            allowClear
                            className="text-20px font-medium w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111]"
                            placeholder=""
                            optionFilterProp="name"
                            fieldNames={{ label: 'topic_name', value: 'id' }}
                            options={data?.data}
                            defaultValue={initialValues?.parent_topic_id}
                        />
                    </Form.Item>
                </ConfigProvider>
                <InputPrimary
                    label={intl.formatMessage({ id: 'topic.form.name' })}
                    name="topic_name"
                    rules={[{ required: true, message: <FormattedMessage id="topic.form.message.name" /> }]}
                    placeholder=""
                ></InputPrimary>
                

                <InputPrimary
                    label={intl.formatMessage({ id: 'topic.form.slug' })}
                    name="slug"
                    placeholder=""
                    rules={[{ required: true, message: <FormattedMessage id="topic.form.message.slug" /> }]}
                ></InputPrimary>

<ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
        <FormattedMessage id="group.Group_button" />
    </ButtonPrimary>
            </div>
        </Form>
    );
};

export default FormTopic;
