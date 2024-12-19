import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import ButtonAdd from '../../components/Button/ButtonAdd';
import { FormattedMessage, useIntl } from 'react-intl';
import InputPrimary from '../../components/Forms/InputPrimary';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import useGroups from '../../../../hooks/useGroup';
import ButtonEdit from '../../components/Button/ButtonEdit';
import { SquarePen } from 'lucide-react';

const ModalAddGroup = ({ initialValues, isUpdate }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, postGroup, patchGroup } = useGroups();

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
            await patchGroup(initialValues.id, value);
        } else {
            await postGroup(value);
        }
        setIsModalOpen(false);
        form.setFieldValue('group_name', '');
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldValue('group_name', initialValues.group_name)
        }
    }, [initialValues])

    return (
        <>
            {isUpdate ? (
                <ButtonEdit onClick={showModal}>
                    <SquarePen />
                </ButtonEdit>
            ) : (
                <ButtonAdd onClick={showModal} title={<FormattedMessage id="group.addGroup" />} />
            )}
            <Modal
                title={
                    <h3 className="text-[23px] font-medium">
                        {isUpdate ? (
                            <FormattedMessage id="group.editGroup" />
                        ) : (
                            <FormattedMessage id="group.addGroup" />
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
                        <InputPrimary
                            className="font-medium"
                            labelCol={{ span: 24 }}
                            label={<FormattedMessage id="group.Group_name_form" />}
                            name="group_name"
                            placeholder={intl.formatMessage({ id: 'group.groupName' })}
                            rules={[{ required: true, message: <FormattedMessage id="group.Group_name_requie" /> }]}
                        ></InputPrimary>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddGroup;
