import { Form, Input } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';
import { FormattedMessage, useIntl } from 'react-intl';

const Register = ({ handleRegister, email, loading }: any) => {
    const intl = useIntl();
    const onFinish = async (values: any) => {
        await handleRegister({
            ...email,
            password: values.password,
            profile: {
                given_name: values.given_name,
                family_name: values.family_name,
                birth_date: `${values.year}-${values.month}-${values.day}`,
            },
            name: `${values.family_name} ${values.given_name}`,
            verify_code: values.verify_code,
        });
    };

    return (
        <section>
            <div className="my-10">
                <Title>
                    <FormattedMessage id="registerTitle" />
                </Title>
            </div>
            <div>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="verify_code"
                        rules={[{ required: true, message: <FormattedMessage id="verifyCodeRequired" /> }]}
                    >
                        <InputPrimary placeholder={intl.formatMessage({ id: 'verifyCodePlaceholder' })} />
                    </Form.Item>

                    <Form.Item
                        name="given_name"
                        rules={[{ required: true, message: <FormattedMessage id="givenNameRequired" /> }]}
                    >
                        <InputPrimary placeholder={intl.formatMessage({ id: 'givenNamePlaceholder' })} />
                    </Form.Item>

                    <Form.Item
                        name="family_name"
                        rules={[{ required: true, message: <FormattedMessage id="familyNameRequired" /> }]}
                    >
                        <InputPrimary placeholder={intl.formatMessage({ id: 'familyNamePlaceholder' })} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: <FormattedMessage id="passwordRequired" /> },
                            { min: 6, message: <FormattedMessage id="passwordMin" /> },
                        ]}
                    >
                        <Input.Password
                            placeholder={intl.formatMessage({ id: 'passwordPlaceholder' })}
                            type="password"
                            className={`w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] px-8 rounded-[8px] text-[18px]`}
                        />
                    </Form.Item>

                    <label htmlFor="" className="mb-3 block color-primary text-[14px] font-medium">
                        <FormattedMessage id="dateOfBirth" />
                    </label>
                    <div className="flex gap-x-5">
                        <Form.Item
                            name="day"
                            rules={[
                                { required: true, message: <FormattedMessage id="dayRequired" /> },
                                {
                                    validator: (_, value) => {
                                        if ((value && value < 1) || value > 31) {
                                            return Promise.reject(
                                                new Error(intl.formatMessage({ id: 'dayRangeError' })),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputPrimary placeholder={intl.formatMessage({ id: 'dayPlaceholder' })} />
                        </Form.Item>
                        <Form.Item
                            name="month"
                            rules={[
                                { required: true, message: <FormattedMessage id="monthRequired" /> },
                                {
                                    validator: (_, value) => {
                                        if ((value && value < 1) || value > 12) {
                                            return Promise.reject(
                                                new Error(intl.formatMessage({ id: 'monthRangeError' })),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputPrimary placeholder={intl.formatMessage({ id: 'monthPlaceholder' })} />
                        </Form.Item>
                        <Form.Item
                            name="year"
                            rules={[
                                { required: true, message: <FormattedMessage id="yearRequired" /> },
                                {
                                    validator: (_, value) => {
                                        const currentYear = new Date().getFullYear();
                                        if (value && value > currentYear) {
                                            return Promise.reject(
                                                new Error(`Year must not be greater than ${currentYear}!`),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputPrimary placeholder={intl.formatMessage({ id: 'yearPlaceholder' })} />
                        </Form.Item>
                    </div>

                    <p className="w-[80%] text-[#757575] text-[16px] font-medium my-10">
                        <FormattedMessage id="termsAndPrivacy" />{' '}
                        <a href="#" className="underline">
                            <FormattedMessage id="Privacy Policy" />
                        </a>{' '}
                        <FormattedMessage id="And" />{' '}
                        <a href="#" className="underline">
                            <FormattedMessage id="termsOfUse" />
                        </a>{' '}
                        <FormattedMessage id="of Nike." />
                    </p>

                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">
                            {loading ? <LoadingSmall /> : <FormattedMessage id="Register" />}
                        </ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Register;
