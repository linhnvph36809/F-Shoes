import { Form, Modal } from 'antd';
import UseOrder from '../../../../../../hooks/profile/useOrder';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';

const ModalCancel = ({
    isModalOpen,
    setIsModalOpen,
    orderId,
    refetch,
}: {
    isModalOpen: boolean;
    setIsModalOpen: any;
    orderId: string;
    refetch: any;
}) => {
    const { cancelOrder } = UseOrder();
    const [form] = useForm();

    const handleOk = () => {
        form.submit();
        const reason_cancelled = form.getFieldValue('reason_cancelled');
        cancelOrder(orderId, {
            reason_cancelled,
        });
        refetch();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                okButtonProps={{ type: 'primary', style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }}
                cancelButtonProps={{ type: 'default' }}
                title={<h3 className="text-[22px]">Reason</h3>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <button
                        key="cancel"
                        className="hover:bg-red-500 mr-5 w-[80px] h-[32px] border 
                        rounded-lg transition-global hover:text-white"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>,
                    <button
                        key="ok"
                        className="w-[80px] h-[32px] bg-primary text-white rounded-lg
                        hover:opacity-80 transition-global"
                        onClick={handleOk}
                    >
                        Submit
                    </button>,
                ]}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item name="reason_cancelled" rules={[{ required: true, message: 'Required' }]}>
                        <TextArea rows={6} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalCancel;
