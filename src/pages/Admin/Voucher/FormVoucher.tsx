import { Button, DatePicker, Form, message } from 'antd';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import InputPrimary from '../../../components/Input';
import ButtonPrimary from '../../../components/Button';
import Heading from '../components/Heading';
import LoadingSmall from '../../../components/Loading/LoadingSmall';
import { FormattedMessage, useIntl } from 'react-intl';

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
    const intl = useIntl();
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
            type: typeVoucher,
        });
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
                <Form.Item
                    label={intl.formatMessage({ id: 'voucher.table.code' })}
                    name="code"
                    rules={[{ required: true, message: <FormattedMessage id="voucher.required.code" /> }]}
                >
                    <InputPrimary placeholder="Code" width="100%" height="h-[56px]" margin="mb-0" />
                </Form.Item>

                <Form.Item
                    label={intl.formatMessage({ id: 'voucher.table.discount' })}
                    name="discount"
                    rules={[
                        { required: true, message: <FormattedMessage id="voucher.required.discount" /> },
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
                                <FormattedMessage id="voucher.table.fixed" />
                            </Button>
                            <Button
                                className={`${typeVoucher == initTypeVoucher.percentage ? 'bg-[#111111] text-white' : 'bg-white'
                                    }`}
                                onClick={() => handleChangeType(initTypeVoucher.percentage)}
                            >
                                <FormattedMessage id="voucher.percentage" />
                            </Button>
                        </div>
                        {typeVoucher === initTypeVoucher.fixed && (
                            <InputPrimary
                                placeholder={intl.formatMessage({ id: 'voucher.table.discount' })}
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
                    label={intl.formatMessage({ id: 'voucher.table.date_start' })}
                    name="date_start"
                    rules={[{ required: true, message: <FormattedMessage id="voucher.required.date_start" /> }]}
                >
                    <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime className="w-full h-[56px] border-[#111111]" />
                </Form.Item>

                <Form.Item
                    label={intl.formatMessage({ id: 'voucher.table.date_end' })}
                    name="date_end"
                    dependencies={['date_start']}
                    rules={[
                        { required: true, message: <FormattedMessage id="voucher.required.date_end" /> },
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
                    label={intl.formatMessage({ id: 'voucher.table.quantity' })}
                    name="quantity"
                    rules={[{ required: true, message: <FormattedMessage id="voucher.required.quantity" /> }]}
                >
                    <InputPrimary
                        placeholder={intl.formatMessage({ id: 'voucher.table.quantity' })}
                        width="100%"
                        height="h-[56px]"
                        margin="mb-0"
                    />
                </Form.Item>
                <Form.Item
                    label={intl.formatMessage({ id: 'voucher.table.min_total_amount' })}
                    name="min_total_amount"
                    rules={[
                        { required: true, message: <FormattedMessage id="voucher.required.min_total_amount" /> },
                        {
                            validator: (_: any, value: number) => {
                                if (value > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Vui lòng nhập lớn hơn 0!');
                            },
                        },
                    ]}
                >
                    <InputPrimary
                        type="number"
                        placeholder={intl.formatMessage({ id: 'voucher.table.min_total_amount' })}
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
