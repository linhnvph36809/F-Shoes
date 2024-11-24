import { Form } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

const Password = ({ handleLogin, email, loading }: any) => {
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
                                message: 'Please enter your first name!',
                            },
                        ]}
                    >
                        <InputPrimary placeholder="Password" type="password" />
                    </Form.Item>

                    <p className="w-[80%] text-[#757575] md:text-base font-medium sm:my-5 md:my-10">
                        <a href="#" className="underline">
                            Forgotten password ?
                        </a>
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
