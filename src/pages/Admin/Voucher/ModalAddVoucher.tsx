import { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';


import { SquarePen } from 'lucide-react';
import useVoucher from '../../../hooks/useVoucher';
import ButtonEdit from '../components/Button/ButtonEdit';
import ButtonAdd from '../components/Button/ButtonAdd';
import ButtonSubmit from '../components/Button/ButtonSubmit';
import InputPrimary from '../components/Forms/InputPrimary';

const ModalAddVoucher = ({ initialValues, isUpdate }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, addVoucher, patchVoucher } = useVoucher();

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
            await patchVoucher(initialValues.id, value);
        } else {
            await addVoucher(value);
        }
        setIsModalOpen(false);
        // form.setFieldValue('group_name', '');
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldValue('group_name', initialValues.group_name);
        }
    }, [initialValues]);

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
                            <FormattedMessage id="voucher.add" />
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

export default ModalAddVoucher;
