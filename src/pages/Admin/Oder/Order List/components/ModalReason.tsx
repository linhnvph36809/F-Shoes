import { useState } from 'react';
import { Form, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import useOrder from '../../../../../hooks/useOrder';
import LoadingSmall from '../../../../../components/Loading/LoadingSmall';

const ModalReason = ({ orderId, handleCancelDetail }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();
    const { loading, putOrder } = useOrder();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (value: { reason_cancelled: string }) => {
        await putOrder(orderId, {
            status: 0,
            reason_cancelled: value.reason_cancelled,
        });
        handleCancelDetail();
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={showModal}>
                <button className="px-8 py-3 bg-red-500 text-white rounded-[4px] text-[12px] font-medium transition-global hover:opacity-80">
                    <FormattedMessage id="button.cancel" />
                </button>
            </div>
            <Modal
                title={
                    <h3 className="text-[28px]">
                        <FormattedMessage id="reason_cancelled" />
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ type: 'primary', style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }}
                cancelButtonProps={{ type: 'default' }}
                footer={[
                    <button
                        key="cancel"
                        className="hover:bg-red-500 mr-5 w-[80px] h-[32px] border 
                        rounded-lg transition-global hover:text-white"
                        onClick={handleCancel}
                    >
                        <FormattedMessage id="button.cancel" />
                    </button>,
                    <button
                        key="ok"
                        className="w-[80px] h-[32px] bg-primary text-white rounded-lg
                        hover:opacity-80 transition-global"
                        onClick={handleOk}
                    >
                        {loading ? <LoadingSmall /> : <FormattedMessage id="button.submit" />}
                    </button>,
                ]}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        className="font-medium"
                        name="reason_cancelled"
                        rules={[
                            { required: true, message: <FormattedMessage id="Please enter reason for cancellation" /> },
                        ]}
                    >
                        <TextArea rows={6} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalReason;
