import { Form, Input, Radio } from 'antd';
import Heading from '../../components/Heading';
import ButtonComponent from '../../../Client/Authtication/components/Button';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import useOrder from '../../../../hooks/useOrder';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
const UpdateOrder = () => {
    const intl = useIntl();
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
                <Heading>
                    <FormattedMessage id="admin.Update_Order" />
                </Heading>
                <Form
                    form={form}
                    name="status_form"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ status: '' }}
                >
                    <Form.Item
                        label={<FormattedMessage id="admin.amountCollected" />}
                        name="amount_collected"
                        initialValue={0}
                        rules={[
                            { required: true, message: <FormattedMessage id="admin.pleaseEnterAmount" /> },
                            {
                                validator: (_, value) =>
                                    value >= 0
                                        ? Promise.resolve()
                                        : Promise.reject(new Error(intl.formatMessage({ id: 'Error.Amount_must' }))),
                            },
                        ]}
                    >
                        <Input placeholder={intl.formatMessage({ id: 'admin.amountCollected' })} type="number" />
                    </Form.Item>

                    <Form.Item
                        label={<FormattedMessage id="admin.status" />}
                        name="status"
                        rules={[{ required: true, message: <FormattedMessage id="Please_select_status" /> }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>
                                <FormattedMessage id="status.cancelled" />
                            </Radio>
                            <Radio value={2}>
                                <FormattedMessage id="status.waiting_confirm" />
                            </Radio>
                            <Radio value={3}>
                                <FormattedMessage id="status.pending" />
                            </Radio>
                            <Radio value={4}>
                                <FormattedMessage id="status.transporting" />
                            </Radio>
                            <Radio value={5}>
                                <FormattedMessage id="status.done" />
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item className="text-end">
                        <ButtonComponent htmlType="submit">
                            {false ? <LoadingSmall /> : <FormattedMessage id="submit" />}
                        </ButtonComponent>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UpdateOrder;
