import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';
import useAuth from '../../../hooks/useAuth';
import { FormattedMessage, useIntl } from 'react-intl';

const ForgotPassword = ({
    email,
    handleResetPassword,
    loading,
    timeSendEmail,
}: {
    email: any;
    handleResetPassword: any;
    loading: boolean;
    timeSendEmail: number;
}) => {
    const intl = useIntl();
    const [timeOut, setTimeOut] = useState<number>(timeSendEmail || 0);
    const { postForgotPassword } = useAuth();
    const onFinish = async (values: any) => {
        handleResetPassword({
            ...email,
            new_password: values.password,
            verify_code: values.verify_code,
        });
    };

    useEffect(() => {
        if (timeOut >= 0) {
            const intervalId = setInterval(() => {
                setTimeOut((preIndex: number) => --preIndex);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [timeSendEmail, timeOut]);

    return (
        <section>
            <div className="my-10">
                <Title>
                    <FormattedMessage id="title" />
                </Title>
            </div>
            <div>
                <Form onFinish={onFinish} layout="vertical">
                    <div className="relative">
                        <Form.Item
                            name="verify_code"
                            style={{ marginBottom: 0 }}
                            rules={[{ required: true, message: <FormattedMessage id="enterCode" /> }]}
                        >
                            <InputPrimary placeholder={intl.formatMessage({ id: 'codePlaceholder' })} margin="mb-0" />
                        </Form.Item>
                        <div className="mb-2">
                            {timeOut > 0 ? (
                                <div className="text-end text-gray">
                                    <FormattedMessage id="resendCodeAfter" />{' '}
                                    <span className="font-medium">{timeOut}</span> <FormattedMessage id="seconds" />
                                </div>
                            ) : (
                                <p
                                    onClick={async () => {
                                        try {
                                            await postForgotPassword(email);
                                            setTimeOut(60);
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}
                                    className={`text-end color-gray hover hover:cursor-pointer hover:opacity-80 underline`}
                                >
                                    <FormattedMessage id="resendCode" />
                                </p>
                            )}
                        </div>
                    </div>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: <FormattedMessage id="enterPassword" /> },
                            { min: 6, message: <FormattedMessage id="passwordMinLength" /> },
                        ]}
                    >
                        <Input.Password
                            placeholder={intl.formatMessage({ id: 'passwordPlaceholder' })}
                            type="password"
                            className={`w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] px-8 rounded-[8px] text-[18px]`}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: <FormattedMessage id="enterConfirmPassword" /> },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(intl.formatMessage({ id: 'passwordMismatch' })));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder={intl.formatMessage({ id: 'confirmPasswordPlaceholder' })}
                            type="password"
                            className={`w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] px-8 rounded-[8px] text-[18px]`}
                        />
                    </Form.Item>

                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">
                            {loading ? <LoadingSmall /> : <FormattedMessage id="button.submit" />}
                        </ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default ForgotPassword;
