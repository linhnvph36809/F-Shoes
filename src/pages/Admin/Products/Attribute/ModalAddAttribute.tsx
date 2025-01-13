import React, { useState } from 'react';
import { Form, Modal, Switch } from 'antd';
import ButtonAdd from '../../components/Button/ButtonAdd';
import { FormattedMessage, useIntl } from 'react-intl';
import InputPrimary from '../../components/Forms/InputPrimary';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import useAttribute from '../../../../hooks/useAttribute';

const ModalAddAttribute: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const intl = useIntl();
    const { postAttributeName, loading } = useAttribute();
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
        await postAttributeName(value);
        setIsModalOpen(false);
        form.setFieldValue('name', '');
    };

    return (
        <>
            <ButtonAdd onClick={showModal} title={<FormattedMessage id="attribute.add_button" />} />
            <Modal
                title={<h3 className="text-[23px] font-medium"><FormattedMessage id="add_attriBute_word" /></h3>}
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
                        <InputPrimary
                            name="name"
                            label={<FormattedMessage id="attribute.attribute_name" />}
                            className="font-medium"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: <FormattedMessage id="attribute.name_required" /> }]}
                            placeholder={intl.formatMessage({ id: 'attribute.name_placeholder' })}
                        ></InputPrimary>
                        <Form.Item label={<FormattedMessage id="attribute_is_filter" />} className="font-medium" name="is_filter">
                            <Switch className="w- text-16px font-medium" />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddAttribute;
