import { Form } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

const Register = ({ handleRegister, email, loading }: any) => {
    const onFinish = async (values: any) => {
        await handleRegister({
            name: values.name,
            ...email,
            password: values.password,
            profile: {
                given_name: values.given_name,
                family_name: values.family_name,
                birth_date: `${values.year}-${values.month}-${values.day}`,
            },
            verify_code: values.verify_code,
        });
    };

    return (
        <section>
            <div className="my-10">
                <Title>Become a Nike member.</Title>
            </div>
            <div>
                <Form onFinish={onFinish} layout="vertical">
                    {/* <Form.Item name="code" rules={[{ required: true, message: 'Please enter your code!' }]}>
                        <InputPrimary placeholder="Code" />
                    </Form.Item> */}

                    <Form.Item name="verify_code" rules={[{ required: true, message: 'Please enter code!' }]}>
                        <InputPrimary placeholder=" Code" />
                    </Form.Item>

                    <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                        <InputPrimary placeholder=" Name" />
                    </Form.Item>

                    <Form.Item name="given_name" rules={[{ required: true, message: 'Please enter your given name!' }]}>
                        <InputPrimary placeholder="Given Name" />
                    </Form.Item>

                    <Form.Item
                        name="family_name"
                        rules={[{ required: true, message: 'Please enter your family name!' }]}
                    >
                        <InputPrimary placeholder="Family Name" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' },
                        ]}
                    >
                        <InputPrimary placeholder="Password" type="password" />
                    </Form.Item>

                    <label htmlFor="" className="mb-3 block color-primary text-[14px] font-medium">
                        Date of Birth
                    </label>
                    <div className="flex gap-x-5">
                        <Form.Item
                            name="day"
                            rules={[
                                { required: true, message: 'Please enter your day of birth!' },
                                {
                                    validator: (_, value) => {
                                        if ((value && value < 1) || value > 31) {
                                            return Promise.reject(new Error('Day must be between 1 and 31!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputPrimary placeholder="Day" />
                        </Form.Item>
                        <Form.Item
                            name="month"
                            rules={[
                                { required: true, message: 'Please enter your month of birth!' },
                                {
                                    validator: (_, value) => {
                                        if ((value && value < 1) || value > 12) {
                                            return Promise.reject(new Error('Month must be between 1 and 12!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputPrimary placeholder="Month" />
                        </Form.Item>
                        <Form.Item
                            name="year"
                            rules={[
                                { required: true, message: 'Please enter your year of birth!' },
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
                            <InputPrimary placeholder="Year" />
                        </Form.Item>
                    </div>

                    <p className="w-[80%] text-[#757575] text-[16px] font-medium my-10">
                        By continuing, I accept the{' '}
                        <a href="#" className="underline">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline">
                            Terms of Use
                        </a>{' '}
                        of Nike.
                    </p>

                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">{loading ? <LoadingSmall /> : 'Register'}</ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Register;
