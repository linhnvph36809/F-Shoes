import { DatePicker, Form } from 'antd';
import { useEffect } from 'react';
import InputPrimary from '../../../components/Input';
import ButtonPrimary from '../../../components/Button';
import Heading from '../components/Heading';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

interface FormVoucherProps {
    title: string;
    initialValues: {
        code?: string;
        discount?: number;
        date_start?: Date | string;
        date_end?: Date | string;
        quantity?: number;
    };
    onFinish: (values: any) => void;
    loading: boolean;
}

const FormVoucher = ({ title, initialValues, onFinish, loading }: FormVoucherProps) => {
    const [form] = Form.useForm();

    const validateDateStart = (_: any, value: Date) => {
        const currentDate = new Date();
        if (!value) {
            return Promise.reject(new Error('Please select a start date and time!'));
        }
        if (value > currentDate) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Start date must be in the future!'));
    };

    const validateDateEnd = (_: any, value: Date) => {
        const startDate = form.getFieldValue('date_start');
        if (!value) {
            return Promise.reject(new Error('Please select an end date and time!'));
        }
        if (!startDate) {
            return Promise.reject(new Error('Please select a start date first!'));
        }
        if (value > startDate) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('End date must be after the start date!'));
    };

    const handleFinish = (values: any) => {
        onFinish({
            ...values,
            date_start: `${values?.date_start?.$y}-${values?.date_start?.$M + 1}-${values?.date_start?.$D}`,
            date_end: `${values?.date_end?.$y}-${values?.date_end?.$M + 1}-${values?.date_end?.$D}`,
            status: 1,
        });
        form.resetFields();
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                code: initialValues?.code,
                discount: initialValues?.discount,
                quantity: initialValues?.quantity,
            });
        }
    }, [initialValues, form]);

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Heading>{title}</Heading>
            <div className="my-4 grid grid-cols-2 gap-x-5">
                <Form.Item label="Code" name="code" rules={[{ required: true, message: 'Please enter code' }]}>
                    <InputPrimary placeholder="Code" width="100%" height="h-[56px]" margin="mb-0" />
                </Form.Item>

                <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please enter discount' }]}
                >
                    <InputPrimary placeholder="Discount" width="100%" height="h-[56px]" margin="mb-0" type="number" />
                </Form.Item>

                <Form.Item
                    label="Select Date Start"
                    name="date_start"
                    rules={[
                        { required: true, message: 'Please select a start date and time!' },
                        { validator: validateDateStart },
                    ]}
                >
                    <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime className="w-full h-[56px] border-[#111111]" />
                </Form.Item>

                <Form.Item
                    label="Select Date End"
                    name="date_end"
                    dependencies={['date_start']}
                    rules={[
                        { required: true, message: 'Please select an end date and time!' },
                        { validator: validateDateEnd },
                    ]}
                >
                    <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime className="w-full h-[56px] border-[#111111]" />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please enter quantity' }]}
                >
                    <InputPrimary placeholder="Quantity" width="100%" height="h-[56px]" margin="mb-0" />
                </Form.Item>
                <Form.Item label="Min Total Amount" name="min_total_amount">
                    <InputPrimary
                        type="number"
                        placeholder="Min Total Amount"
                        width="100%"
                        height="h-[56px]"
                        margin="mb-0"
                    />
                </Form.Item>
            </div>
            <Form.Item className="mt-20">
                <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit" loading={loading}>
                    {loading ? <LoadingSmall /> : 'Submit'}
                </ButtonPrimary>
            </Form.Item>
        </Form>
    );
};

export default FormVoucher;
