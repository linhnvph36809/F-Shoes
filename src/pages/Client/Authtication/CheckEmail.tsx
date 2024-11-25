import { Form } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

const CheckEmail = ({ handleCheckEmail, loading }: any) => {
    return (
        <section>
            <div className="my-10">
                <Title>Enter your email address to register or log in.</Title>
            </div>
            <div>
                <Form
                    onFinish={(e) => {
                        handleCheckEmail(e);
                    }}
                >
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter email',
                            },
                        ]}
                    >
                        <InputPrimary placeholder="Email" type="email" />
                    </Form.Item>
                    <p className="w-[80%] text-[#757575] sm:text-[12px] md:text-base font-medium sm:my-5 md:my-10">
                        By continuing, I agree to Nike's
                        <a href="#" className="underline">
                            {' '}
                            Privacy Policy
                        </a>{' '}
                        and
                        <a href="#" className="ml-2 underline">
                            Terms of Service.
                        </a>{' '}
                        de Nike.
                    </p>
                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">{loading ? <LoadingSmall /> : 'Continuer'}</ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default CheckEmail;
