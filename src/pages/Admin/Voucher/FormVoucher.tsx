import { Button, DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import InputPrimary from '../../../components/Input';
import ButtonPrimary from '../../../components/Button';
import Heading from '../components/Heading';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

interface FormVoucherProps {
    title: string;
    initialValues?: {
        code?: string;
        discount?: number;
        date_start?: Date | string;
        date_end?: Date | string;
        quantity?: number;
        min_total_amount: number;
    };
    onFinish: (values: any) => void;
    loading?: boolean;
}

const initTypeVoucher = {
    fixed: 'fixed',
    percentage: 'percentage',
};
const FormVoucher = ({ title, initialValues, onFinish, loading }: FormVoucherProps) => {
    const [form] = Form.useForm();

    const [typeVoucher, setTypeVoucher] = useState(initTypeVoucher.fixed);

    let validateType: any = [];

    if (typeVoucher === initTypeVoucher.percentage) {
        validateType = [
            ...validateType,
            {
                validator: (_: any, value: number) =>
                    value && value > 100
                        ? Promise.reject(new Error('Discount must not exceed 100'))
                        : Promise.resolve(),
            },
        ];
    }

    const handleChangeType = (type: string) => {
        setTypeVoucher(type);
    };

    const handleFinish = (values: any) => {
        onFinish({
            ...values,
            date_start: `${values?.date_start?.$y}-${values?.date_start?.$M + 1}-${values?.date_start?.$D}`,
            date_end: `${values?.date_end?.$y}-${values?.date_end?.$M + 1}-${values?.date_end?.$D}`,
            status: 1,
            type: typeVoucher
        });
        form.resetFields();
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                code: initialValues?.code,
                discount: initialValues?.discount,
                quantity: initialValues?.quantity,
                date_start: dayjs(initialValues?.date_start, 'DD/MM/YYYY HH:mm:ss'),
                date_end: dayjs(initialValues?.date_end, 'DD/MM/YYYY HH:mm:ss'),
                min_total_amount: initialValues?.min_total_amount,
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
                    rules={[
                        { required: true, message: 'Please enter discount' },
                        {
                            validator: (_, value) =>
                                value && value < 1
                                    ? Promise.reject(new Error('Discount must be at least 1'))
                                    : Promise.resolve(),
                        },
                        ...validateType,
                    ]}
                >
                    <div className="relative">
                        <div className="absolute mb-3 flex gap-x-2 z-10 right-5 top-5">
                            <Button
                                className={`${typeVoucher == initTypeVoucher.fixed ? 'bg-[#111111] text-white' : 'bg-white'
                                    }`}
                                onClick={() => handleChangeType(initTypeVoucher.fixed)}
                            >
                                Fixed
                            </Button>
                            <Button
                                className={`${typeVoucher == initTypeVoucher.percentage ? 'bg-[#111111] text-white' : 'bg-white'
                                    }`}
                                onClick={() => handleChangeType(initTypeVoucher.percentage)}
                            >
                                Percentage
                            </Button>
                        </div>
                        {typeVoucher === initTypeVoucher.fixed && (
                            <InputPrimary
                                placeholder="Discount"
                                width="100%"
                                height="h-[56px]"
                                margin="mb-0"
                                type="number"
                                defaultValue={initialValues?.discount}
                            />
                        )}
                        {typeVoucher === initTypeVoucher.percentage && (
                            <InputPrimary
                                placeholder="Discount"
                                width="100%"
                                height="h-[56px]"
                                margin="mb-0"
                                type="number"
                                defaultValue={initialValues?.discount}
                            />
                        )}
                    </div>
                </Form.Item>

                <Form.Item
                    label="Select Date Start"
                    name="date_start"
                    rules={[{ required: true, message: 'Please select a start date and time!' }]}
                >
                    <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime className="w-full h-[56px] border-[#111111]" />
                </Form.Item>

                <Form.Item
                    label="Select Date End"
                    name="date_end"
                    dependencies={['date_start']}
                    rules={[
                        { required: true, message: 'Please select an end date and time!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const startDate = getFieldValue('date_start');
                                if (!value || !startDate) {
                                    return Promise.resolve();
                                }
                                if (value.isBefore(startDate)) {
                                    return Promise.reject(
                                        new Error('End date must be greater than or equal to start date!'),
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
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
                <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                    {loading ? <LoadingSmall /> : 'Submit'}
                </ButtonPrimary>
            </Form.Item>
        </Form>
    );
};

export default FormVoucher;
