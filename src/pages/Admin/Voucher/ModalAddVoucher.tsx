import { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { SquarePen } from 'lucide-react';
import useVoucher from '../../../hooks/useVoucher';
import ButtonEdit from '../components/Button/ButtonEdit';
import ButtonAdd from '../components/Button/ButtonAdd';
import ButtonSubmit from '../components/Button/ButtonSubmit';
import InputPrimary from '../components/Forms/InputPrimary';

const initTypeVoucher = {
    fixed: 'fixed',
    percentage: 'percentage',
};

const ModalAddVoucher = ({ initialValues, isUpdate }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, addVoucher, patchVoucher } = useVoucher();
    const [typeVoucher, setTypeVoucher] = useState(initTypeVoucher.fixed);

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

    const onFinish = async (values: any) => {
        const newValues = {
            ...values,
            date_start: dayjs(values.date_start).format('YYYY-MM-DD HH:mm:ss'),
            date_end: dayjs(values.date_end).format('YYYY-MM-DD HH:mm:ss'),
            status: 1,
            type: typeVoucher,
            max_total_amount: typeVoucher === initTypeVoucher.fixed ? values.discount : values.max_total_amount,
        };
        console.log(newValues);

        if (isUpdate) {
            await patchVoucher(initialValues.id, newValues);
        } else {
            await addVoucher(newValues);
        }
        setIsModalOpen(false);
        form.setFieldsValue({
            code: '',
            discount: '',
            quantity: '',
            date_start: '',
            date_end: '',
            min_total_amount: '',
            max_total_amount: '',
        });
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                code: initialValues?.code,
                discount: initialValues?.discount,
                quantity: initialValues?.quantity,
                date_start: dayjs(initialValues?.date_start, 'DD-MM-YYYY HH:mm:ss'),
                date_end: dayjs(initialValues?.date_end, 'DD-MM-YYYY HH:mm:ss'),
                min_total_amount: initialValues?.min_total_amount,
                max_total_amount: initialValues?.max_total_amount,
            });
        }
    }, [initialValues, form]);

    let validateType: any = [];

    if (typeVoucher === initTypeVoucher.percentage) {
        validateType = [
            ...validateType,
            {
                validator: (_: any, value: number) =>
                    value && value > 100
                        ? Promise.reject(new Error(intl.formatMessage({ id: 'Discount_must_not_exceed_100' })))
                        : Promise.resolve(),
            },
        ];
    }

    const handleChangeType = (type: string) => {
        setTypeVoucher(type);
    };

    const parsedDateStart = dayjs(initialValues?.date_start, 'DD-MM-YYYY HH:mm:ss');
    const parsedDateEnd = dayjs(initialValues?.date_end, 'DD-MM-YYYY HH:mm:ss');
    const currentDate = dayjs();
    const isValid = currentDate.isAfter(parsedDateStart) && currentDate.isBefore(parsedDateEnd);

    return (
        <>
            {isUpdate ? (
                <ButtonEdit onClick={showModal}>
                    <SquarePen />
                </ButtonEdit>
            ) : (
                <ButtonAdd onClick={showModal} title={<FormattedMessage id="voucher.add" />} />
            )}
            <Modal
                title={
                    <h3 className="text-[23px] font-medium">
                        {isUpdate ? <FormattedMessage id="voucher.update" /> : <FormattedMessage id="voucher.add" />}
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={
                    <div className="text-end" onClick={handleOk}>
                        <ButtonSubmit loading={loading} width={'w-[150px]'} />
                    </div>
                }
            >
                <Form form={form} onFinish={onFinish}>
                    <div>
                        <InputPrimary
                            disabled={isUpdate ? (isValid ? true : false) : false}
                            className="font-medium"
                            labelCol={{ span: 24 }}
                            label={intl.formatMessage({ id: 'voucher.table.code' })}
                            name="code"
                            placeholder={intl.formatMessage({ id: 'placeholderCode' })}
                            rules={[{ required: true, message: <FormattedMessage id="voucher.required.code" /> }]}
                        ></InputPrimary>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            className="font-medium"
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
                                        disabled={isUpdate && isValid}
                                        className={`${typeVoucher == initTypeVoucher.fixed
                                                ? 'bg-[#111111] text-white'
                                                : 'bg-white'
                                            }`}
                                        onClick={() => handleChangeType(initTypeVoucher.fixed)}
                                    >
                                        <FormattedMessage id="voucher.table.fixed" />
                                    </Button>
                                    <Button
                                        disabled={isUpdate && isValid}
                                        className={`${typeVoucher == initTypeVoucher.percentage
                                                ? 'bg-[#111111] text-white'
                                                : 'bg-white'
                                            }`}
                                        onClick={() => handleChangeType(initTypeVoucher.percentage)}
                                    >
                                        <FormattedMessage id="voucher.percentage" />
                                    </Button>
                                </div>
                                {typeVoucher === initTypeVoucher.fixed && (
                                    <input
                                        disabled={isUpdate && isValid}
                                        placeholder={intl.formatMessage({ id: 'voucher.table.discount' })}
                                        className={`w-full h-[52px] border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                        type="number"
                                        defaultValue={initialValues?.discount}
                                    />
                                )}
                                {typeVoucher === initTypeVoucher.percentage && (
                                    <input
                                        disabled={isUpdate && isValid}
                                        placeholder={intl.formatMessage({ id: 'voucher.table.discount' })}
                                        className={`w-full h-[52px] border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                        type="number"
                                        defaultValue={initialValues?.discount}
                                    />
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            className="font-medium"
                            label={intl.formatMessage({ id: 'voucher.table.date_start' })}
                            name="date_start"
                            rules={[{ required: true, message: <FormattedMessage id="voucher.required.date_start" /> }]}
                        >
                            <DatePicker
                                disabled={isUpdate && isValid}
                                placeholder={intl.formatMessage({ id: 'select_date_start' })}
                                format="DD-MM-YYYY HH:mm:ss"
                                showTime
                                className={`w-full h-[52px] border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            className="font-medium"
                            label={intl.formatMessage({ id: 'voucher.table.date_end' })}
                            name="date_end"
                            dependencies={['date_start']}
                            rules={[
                                { required: true, message: <FormattedMessage id="voucher.required.date_end" /> },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const startDate = getFieldValue('date_start');
                                        const now = dayjs();

                                        if (!value) {
                                            return Promise.resolve();
                                        }

                                        if (startDate && dayjs(value).isBefore(dayjs(startDate))) {
                                            return Promise.reject(
                                                new Error(intl.formatMessage({ id: 'End_date_must' })),
                                            );
                                        }

                                        if (dayjs(value).isBefore(now)) {
                                            return Promise.reject(
                                                new Error(intl.formatMessage({ id: 'End_date_must_be_in_future' })),
                                            );
                                        }

                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <DatePicker
                                placeholder={intl.formatMessage({ id: 'select_date_end' })}
                                format="DD-MM-YYYY HH:mm:ss"
                                showTime
                                className="w-full h-[52px] border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </Form.Item>

                        <InputPrimary
                            label={intl.formatMessage({ id: 'voucher.table.quantity' })}
                            name="quantity"
                            rules={[{ required: true, message: <FormattedMessage id="voucher.required.quantity" /> }]}
                            className="font-medium"
                            placeholder={intl.formatMessage({ id: 'voucher.table.quantity' })}
                        ></InputPrimary>

                        <InputPrimary
                            disabled={isUpdate && isValid}
                            label={intl.formatMessage({ id: 'voucher.table.min_total_amount' })}
                            name="min_total_amount"
                            rules={[
                                {
                                    required: true,
                                    message: <FormattedMessage id="voucher.required.min_total_amount" />,
                                },
                                {
                                    validator: (_: any, value: number) => {
                                        if (value > 0) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            intl.formatMessage({ id: 'Please_enter_a_value_greater_than_0' }),
                                        );
                                    },
                                },
                            ]}
                            className="font-medium"
                            placeholder={intl.formatMessage({ id: 'voucher.table.min_total_amount' })}
                        ></InputPrimary>

                        {initialValues?.discount !== initTypeVoucher.fixed || typeVoucher !== initTypeVoucher.fixed ? (
                            <InputPrimary
                                disabled={isUpdate && isValid}
                                label={intl.formatMessage({ id: 'voucher.table.max_total_amount' })}
                                name="max_total_amount"
                                rules={[
                                    {
                                        required: true,
                                        message: <FormattedMessage id="voucher.required.max_total_amount" />,
                                    },
                                    {
                                        validator: async (_: any, value: number) => {
                                            if (value <= 0) {
                                                return Promise.reject(
                                                    intl.formatMessage({ id: 'Please_enter_a_value_greater_than_0' }),
                                                );
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                className="font-medium"
                                placeholder={intl.formatMessage({ id: 'voucher.table.max_total_amount' })}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddVoucher;
