import { useEffect, useState } from 'react';
import { Button, Form, Switch, Upload } from 'antd';
import dayjs from 'dayjs';

import InputPrimary from '../../components/Forms/InputPrimary';
import { showMessageAdmin } from '../../../../utils/messages';
import { UploadOutlined } from '@ant-design/icons';
import SelectPrimary from '../../components/Forms/SelectPrimary';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { API_GROUP, KEY_GROUP } from '../../../../hooks/useGroup';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

interface FormUserProps {
    onFinish: (values: any) => void;
    initialValues?: any;
    loading: boolean;
}

const FormUser: React.FC<FormUserProps> = ({ onFinish, initialValues, loading }) => {
    const [form] = Form.useForm();
    const { data, isFetching } = useQueryConfig([KEY_GROUP, 'all-groups'], API_GROUP);
    const groups = data?.data || [];
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('name', `${values.given_name} ${values.family_name}`);
        formData.append('email', values.email);
        values.password && formData.append('password', values.password);
        formData.append('group_id', values.group_id);
        formData.append('is_admin', values?.is_admin ? true : false);
        formData.append('status', values?.active ? 'active' : 'banned');
        formData.append('profile[given_name]', values.given_name);
        formData.append('profile[family_name]', values.family_name);
        formData.append('profile[birth_date]', values.birth_date);
        formData.append('_method', initialValues ? 'put' : 'post');

        if (imageFile) {
            formData.append('avatar', imageFile);
        }
        onFinish(formData);
    };

    const handleImageUpload = (file: any) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            showMessageAdmin('You can only upload image files!', '', 'warning');
        } else {
            setImageFile(file);
        }
        return false;
    };

    useEffect(() => {
        form.setFieldsValue({
            email: initialValues?.email,
            birth_date: dayjs(initialValues?.profile?.birth_date).format('YYYY-MM-DD'),
            given_name: initialValues?.name,
            family_name: initialValues?.name,
            group_id: initialValues?.group_id,
            is_admin: initialValues?.is_admin ? true : false,
            active: initialValues?.status === 'active' ? true : false,
        });
    }, [form, initialValues]);

    const validatePassword = initialValues
        ? null
        : [
            { required: true, message: 'Please enter Password' },
            { min: 8, message: 'Password must be at least 8 characters!' },
        ];

    return (
        <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
                <InputPrimary
                    name="given_name"
                    label="Given Name"
                    placeholder="Enter Given Name"
                    rules={[{ required: true, message: 'Please enter given name' }]}
                ></InputPrimary>
                <InputPrimary
                    name="family_name"
                    label="Family Name"
                    placeholder="Enter Family Name"
                    rules={[{ required: true, message: 'Please enter family name' }]}
                ></InputPrimary>
                <InputPrimary
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                    rules={[
                        { required: true, message: 'Please enter Email' },
                        {
                            type: 'email',
                            message: 'Please enter a valid email address!',
                        },
                    ]}
                ></InputPrimary>

                <InputPrimary
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    rules={validatePassword}
                ></InputPrimary>

                <InputPrimary name="birth_date" label="Date Of Birth" type="date"></InputPrimary>
                <SelectPrimary
                    name="group_id"
                    rules={[{ required: true, message: 'Please enter group' }]}
                    allowClear
                    label="Group"
                    placeholder="Choose groups"
                    optionFilterProp="group_name"
                    fieldNames={{ label: 'group_name', value: 'id' }}
                    key={'value'}
                    options={groups}
                    loading={isFetching}
                />
            </div>
            <div className="flex items-center gap-x-5">
                <Form.Item label="Is Admin" className="font-medium" name="is_admin">
                    <Switch className="w- text-16px font-medium" />
                </Form.Item>
                <Form.Item label="Active" className="font-medium" name="active">
                    <Switch className="w- text-16px font-medium" />
                </Form.Item>
            </div>

            {initialValues?.avatar_url && !imageFile ? (
                <div>
                    <img src={initialValues.avatar_url} className="w-[80px] mb-10" alt="" />
                </div>
            ) : (
                ''
            )}

            <Form.Item className="font-medium" name="theme">
                <Upload name="image" listType="picture" accept="image/*" beforeUpload={handleImageUpload}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item>
            <div className="text-end mt-10">
                <ButtonSubmit loading={loading} />
            </div>
        </Form>
    );
};

export default FormUser;
