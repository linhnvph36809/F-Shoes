import { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { SquarePen } from 'lucide-react';
import ButtonAdd from '../components/Button/ButtonAdd';
import ButtonEdit from '../components/Button/ButtonEdit';
import ButtonSubmit from '../components/Button/ButtonSubmit';
import InputPrimary from '../components/Forms/InputPrimary';
import useTopic, { API_TOPIC, QUERY_KEY_TOPIC } from '../../../hooks/useTopic';
import useQueryConfig from '../../../hooks/useQueryConfig';
import SelectPrimary from '../components/Forms/SelectPrimary';

const ModalTopic = ({ initialValues, isUpdate }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, patchTopic, postTopic } = useTopic();
    const { data } = useQueryConfig([QUERY_KEY_TOPIC, 'list-topic'], API_TOPIC);

    const [form] = Form.useForm();
    const intl = useIntl();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (value: any) => {
        if (isUpdate) {
            await patchTopic(initialValues.id, value);
        } else {
            await postTopic(value);
        }
        setIsModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                topic_name: initialValues.topic_name,
                slug: initialValues.slug,
            });
        }
    }, [initialValues]);

    return (
        <>
            {isUpdate ? (
                <ButtonEdit onClick={showModal}>
                    <SquarePen />
                </ButtonEdit>
            ) : (
                <ButtonAdd onClick={showModal} title={<FormattedMessage id="topic.addTopic" />} />
            )}
            <Modal
                title={
                    <h3 className="text-[28px] font-medium">
                        {isUpdate ? (
                            <FormattedMessage id="topic.updateTopic" />
                        ) : (
                            <FormattedMessage id="topic.addTopic" />
                        )}
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    <div className="text-end" onClick={handleOk}>
                        <ButtonSubmit loading={loading} />
                    </div>
                }
            >
                <Form form={form} onFinish={onFinish}>
                    <div>
                        <SelectPrimary
                            label={intl.formatMessage({ id: 'topic.form.parent_Name' })}
                            name="parent_topic_id"
                            allowClear
                            className="text-20px font-medium w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111]"
                            optionFilterProp="name"
                            fieldNames={{ label: 'topic_name', value: 'id' }}
                            options={data?.data}
                            defaultValue={initialValues?.parent_topic_id}
                            placeholder={intl.formatMessage({ id: 'topic.placeholderParentTopic' })}
                        ></SelectPrimary>
                        <InputPrimary
                            label={intl.formatMessage({ id: 'topic.form.name' })}
                            name="topic_name"
                            rules={[{ required: true, message: <FormattedMessage id="topic.form.message.name" /> }]}
                            placeholder={intl.formatMessage({ id: 'topic.placeholderTopicName' })}
                        ></InputPrimary>

                        <InputPrimary
                            label={intl.formatMessage({ id: 'topic.form.slug' })}
                            name="slug"
                            placeholder={intl.formatMessage({ id: 'topic.placeholderSlug' })}
                            rules={[{ required: true, message: <FormattedMessage id="topic.form.message.slug" /> }]}
                        ></InputPrimary>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalTopic;
