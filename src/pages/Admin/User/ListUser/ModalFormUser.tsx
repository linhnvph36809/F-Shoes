import { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Modal, Switch, Upload } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';

import { SquarePen } from 'lucide-react';
import ButtonEdit from '../../components/Button/ButtonEdit';
import ButtonAdd from '../../components/Button/ButtonAdd';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import InputPrimary from '../../components/Forms/InputPrimary';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { API_GROUP, KEY_GROUP } from '../../../../hooks/useGroup';
import useUser from '../../../../hooks/useUser';
import SelectPrimary from '../../components/Forms/SelectPrimary';
import { showMessageAdmin } from '../../../../utils/messages';
import { handleChangeMessage, handleGetLocalStorage } from '../../../../utils';
import { LANGUAGE, LANGUAGE_VI } from '../../../../constants';

const ModalFormUser = ({ initialValues, isUpdate }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const intl = useIntl();
    const [form] = Form.useForm();
    const { data, isFetching } = useQueryConfig([KEY_GROUP, 'all-groups'], API_GROUP);
    const groups = data?.data || [];
    const [imageFile, setImageFile] = useState(null);
    const { loading, addUser, editUser } = useUser();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleImageUpload = (file: any) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            showMessageAdmin(
                handleChangeMessage(
                    handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI,
                    'You can only upload image files!',
                    'Bạn có thể upload file!',
                ),
                '',
                'warning',
            );
        } else {
            setImageFile(file);
        }
        return false;
    };

    const onFinish = async (values: any) => {
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
        formData.append('profile[phone]', values.phone);
        formData.append('_method', initialValues ? 'put' : 'post');
        if (imageFile) {
            formData.append('avatar', imageFile);
        }

        if (isUpdate) {
            await editUser(initialValues.id, formData);
        } else {
            await addUser(formData);
        }
        setIsModalOpen(false);
        form.setFieldsValue({
            email: '',
            birth_date: '',
            given_name: '',
            family_name: '',
            group_id: [],
            is_admin: false,
            active: false,
            phone: '',
        });
    };

    useEffect(() => {
        form.setFieldsValue({
            email: initialValues?.email,
            birth_date: dayjs(initialValues?.profile?.birth_date).format('YYYY-MM-DD'),
            given_name: initialValues?.profile?.given_name,
            family_name: initialValues?.profile?.family_name,
            group_id: initialValues?.group_id,
            is_admin: initialValues?.is_admin ? true : false,
            active: initialValues?.status === 'active' ? true : false,
            phone: initialValues?.profile?.phone,
        });
    }, [form, initialValues]);

    const validatePassword = initialValues
        ? null
        : [
              { required: true, message: <FormattedMessage id="group.form_password.success" /> },
              { min: 8, message: <FormattedMessage id="user.password_8" /> },
          ];

    return (
        <>
            {isUpdate ? (
                <ButtonEdit onClick={showModal}>
                    <SquarePen />
                </ButtonEdit>
            ) : (
                <ButtonAdd onClick={showModal} title={<FormattedMessage id="admin.addUser" />} />
            )}
            <Modal
                title={
                    <h3 className="text-[28px] font-medium">
                        {isUpdate ? (
                            <FormattedMessage id="user.User_Update" />
                        ) : (
                            <FormattedMessage id="admin.addUser" />
                        )}
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={
                    <div className="text-end" onClick={handleOk}>
                        <ButtonSubmit loading={loading} width={'w-[150px]'} />
                    </div>
                }
            >
                <Form form={form} onFinish={onFinish}>
                    <div>
                        <InputPrimary
                            name="given_name"
                            label={intl.formatMessage({ id: 'user.User_Form_name' })}
                            placeholder={intl.formatMessage({ id: 'user.User_Form_name' })}
                            rules={[
                                { required: true, message: <FormattedMessage id="user.User_Form_name_required" /> },
                            ]}
                        ></InputPrimary>
                        <InputPrimary
                            name="family_name"
                            label={intl.formatMessage({ id: 'user.User_family' })}
                            placeholder={intl.formatMessage({ id: 'user.User_family' })}
                            rules={[
                                { required: true, message: <FormattedMessage id="Please_enter_your_family_name" /> },
                            ]}
                        ></InputPrimary>

                        <InputPrimary
                            name="phone"
                            type="number"
                            label={<FormattedMessage id="phone" />}
                            placeholder={intl.formatMessage({ id: 'phone_placeholder' })}
                            rules={[
                                {
                                    validator: (_: any, value: any) => {
                                        const phoneRegex = /^(?:\+84|0)(3|5|7|8|9)\d{8}$/;
                                        if (!value || phoneRegex.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(intl.formatMessage({ id: 'invalid_phone_message' })),
                                        );
                                    },
                                },
                            ]}
                        />

                        <InputPrimary
                            name="email"
                            type="email"
                            label={intl.formatMessage({ id: 'user.User_gmail' })}
                            placeholder={intl.formatMessage({ id: 'user.User_gmail' })}
                            rules={[
                                { required: true, message: <FormattedMessage id="user.User_Form_email_required" /> },
                                {
                                    type: 'email',
                                    message: <FormattedMessage id="user.email.vaild" />,
                                },
                            ]}
                        ></InputPrimary>
                        {isUpdate ? (
                            ''
                        ) : (
                            <InputPrimary
                                label={intl.formatMessage({ id: 'user.User_Form_password' })}
                                type="password"
                                name="password"
                                placeholder={intl.formatMessage({ id: 'group.form_password' })}
                                rules={validatePassword}
                            ></InputPrimary>
                        )}

                        <InputPrimary
                            name="birth_date"
                            label={intl.formatMessage({ id: 'user.date' })}
                            type="date"
                            rules={[
                                () => ({
                                    validator(_: any, value: any) {
                                        if (value) {
                                            const inputDate = new Date(value);
                                            const currentDate = new Date();
                                            inputDate.setHours(0, 0, 0, 0);
                                            currentDate.setHours(0, 0, 0, 0);

                                            if (inputDate < currentDate) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(intl.formatMessage({ id: 'validateDateUser' })),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        ></InputPrimary>

                        <SelectPrimary
                            name="group_id"
                            allowClear
                            rules={[{ required: true, message: <FormattedMessage id="Please_select_a_user_group" /> }]}
                            label={intl.formatMessage({ id: 'admin.groups' })}
                            placeholder={intl.formatMessage({ id: 'admin.groups' })}
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
                            <Button icon={<UploadOutlined />}>
                                <FormattedMessage id="user.User_Upload_image" />
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalFormUser;
