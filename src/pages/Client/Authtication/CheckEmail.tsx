import { Form } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';
import { FormattedMessage, useIntl } from 'react-intl';

const CheckEmail = ({ handleCheckEmail, loading }: any) => {
    const intl = useIntl();
    return (
        <section>
            <div className="my-10">
                <Title>
                    <FormattedMessage id="Enter your email address to register or log in." />
                </Title>
            </div>
            <div>
                <Form
                    onFinish={(e) => {
                        handleCheckEmail(e);
                    }}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: <FormattedMessage id="emailPlaceholder" />,
                            },
                            {
                                type: 'email',
                                message: <FormattedMessage id="Please enter a valid email address!" />,
                            },
                        ]}
                    >
                        <InputPrimary placeholder={intl.formatMessage({ id: 'Email' })} type="email" />
                    </Form.Item>

                    <p className="w-[80%] text-[#757575] sm:text-[12px] md:text-base font-medium sm:my-5 md:my-10">
                        <FormattedMessage id="By continuing, I agree to Nike's" />
                        <a href="#" className="underline">
                            {' '}
                            <FormattedMessage id="Privacy Policy" />
                        </a>{' '}
                        <FormattedMessage id="And" />
                        <a href="#" className="ml-2 underline">
                            <FormattedMessage id="Terms of Service." />
                        </a>{' '}
                        <FormattedMessage id="de Nike." />
                    </p>
                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">
                            {loading ? <LoadingSmall /> : <FormattedMessage id="Continuer" />}
                        </ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default CheckEmail;
