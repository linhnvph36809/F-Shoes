import { useEffect, useState } from 'react';
import { Form } from 'antd';
import ButtonPrimary from '../../../../components/Button';
import InputPrimary from '../../../../components/Input';
import { FormattedMessage, useIntl } from 'react-intl';

interface FormUserProps {
    onFinish: (values: any) => void;
    initialValues?: any;
}

const FormUser: React.FC<FormUserProps> = ({ onFinish, initialValues }) => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues); // Load initial values when editing
            if (initialValues.avatar_url) {
                setPreviewUrl(initialValues.avatar_url);
            }
        }
    }, [initialValues, form]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);

        if (selectedImage) {
            formData.append('avatar_url', selectedImage);
        }

        onFinish(formData);
    };

    return (
        <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
            <Form.Item 
    name="name" 
    rules={[
        { 
            required: true, 
            message: <FormattedMessage id="user.User_Form_name_required" /> 
        }
    ]}
>
    <InputPrimary placeholder={intl.formatMessage({ id: 'user.User_Form_name' })} />
</Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: <FormattedMessage id="user.User_Form_email_required" /> }]}>
                    <InputPrimary placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: <FormattedMessage id="user.User_Form_password_required" /> }]}>
                    <InputPrimary placeholder={intl.formatMessage({ id: 'user.User_Form_password' })}/>
                </Form.Item>
                <Form.Item>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {previewUrl && (
                        <img src={previewUrl} alt="Avatar Preview" className="mt-2 w-20 h-20 object-cover" />
                    )}
                </Form.Item>
            </div>
            <div className="text-end mt-10">
    <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
        <FormattedMessage id="group.Group_button" />
    </ButtonPrimary>
</div>
        </Form>
    );
};

export default FormUser;
