import { Form, Input, Radio } from 'antd';
import Heading from '../../components/Heading';
import ButtonComponent from '../../../Client/Authtication/components/Button';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import useOrder from '../../../../hooks/useOrder';
import { useParams } from 'react-router-dom';
const UpdateOrder = () => {
    const [form] = Form.useForm();
    const { putOrder } = useOrder();
    const { id } = useParams();

    const onFinish = (values: any) => {
        const newValues = {
            ...values,
            payment_status: 0,
        };
        if (id) putOrder(id, newValues);
    };

    return (
        <>
            <div>
                <Heading>Order Update</Heading>
                <Form
                    form={form}
                    name="status_form"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ status: '' }}
                >
                    <Form.Item
                        label="Amount Collected"
                        name="amount_collected"
                        initialValue={0}
                        rules={[
                            { required: true, message: 'Please enter an Amount Collected' },
                            {
                                validator: (_, value) =>
                                    value >= 0
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Amount Collected cannot be negative')),
                            },
                        ]}
                    >
                        <Input placeholder="Enter your Amount Collected" type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select a status' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Cancelled</Radio>
                            <Radio value={2}>Waiting Confirm</Radio>
                            <Radio value={3}>Pending</Radio>
                            <Radio value={4}>Transporting</Radio>
                            <Radio value={5}>Done</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item className="text-end">
                        <ButtonComponent htmlType="submit">{false ? <LoadingSmall /> : 'Submit'}</ButtonComponent>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UpdateOrder;
