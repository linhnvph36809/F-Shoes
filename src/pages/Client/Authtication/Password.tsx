import { Form, Input } from 'antd';
import Title from './components/Title';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

const Password = ({ handleLogin, handleForgotPassword, email, loading }: any) => {
    const onFinish = async (values: { password: string }) => {
        handleLogin({
            ...email,
            ...values,
        });
    };

    return (
        <section>
            <div className="my-10">
                <Title>What is your password?.</Title>
            </div>
            <div>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            type="password"
                            className={`w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] px-8 rounded-[8px] text-[18px]`}
                        />
                    </Form.Item>

                    <p
                        className="w-[80%] text-[#757575] md:text-base font-medium sm:my-5 md:my-10
                    underline hover:cursor-pointer hover:text-gray-400 transition-global"
                        onClick={() => handleForgotPassword(email)}
                    >
                        Forgotten password ?
                    </p>

                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">{loading ? <LoadingSmall /> : 'Login'}</ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Password;
