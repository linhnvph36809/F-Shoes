import { Form, message } from 'antd';
import ButtonPrimary from '../../../../components/Button';
import InputPrimary from '../../../../components/Input';
import useUser from '../../../../hooks/useUser';

const FormUser = ({ initialValues }: any) => {
    const [form] = Form.useForm();
    const { addUser } = useUser(); // Get the addUser function from useUser hook

    // Handle form submission
    const onFinish = async (values: any) => {
        try {
            // Call addUser with form values
            await addUser(values);
            message.success('User added successfully');
            form.resetFields(); // Clear the form after submission
        } catch (error) {
            message.error('Failed to add user');
            console.error(error);
        }
    };
    return (
        <Form form={form} initialValues={initialValues} onFinish={onFinish}>
            <div className="grid grid-cols-2 gap-5">
                <Form.Item name="name" rules={[{ required: true, message: 'Please enter name' }]}>
                    <InputPrimary placeholder="Name" />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true, message: 'Please enter Email' }]}>
                    <InputPrimary placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please enter Password' }]}>
                    <InputPrimary placeholder="Password" />
                </Form.Item>
            </div>
            {/* <ModalImage images={images} handleSetImages={setImages} /> */}

            <div className="text-end mt-10">
                <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                    Submit
                </ButtonPrimary>
            </div>
        </Form>
    );
};

export default FormUser;
