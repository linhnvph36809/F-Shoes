import { useEffect, useState } from 'react';
import { Button, Form, Modal, Upload } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { UploadOutlined } from '@ant-design/icons';
import { SquarePen } from 'lucide-react';

import ButtonEdit from '../components/Button/ButtonEdit';
import ButtonAdd from '../components/Button/ButtonAdd';
import ButtonSubmit from '../components/Button/ButtonSubmit';
import InputPrimary from '../components/Forms/InputPrimary';
import usePost, { QUERY_KEY } from '../../../hooks/usePosts';
import { useContextGlobal } from '../../../contexts';
import SelectPrimary from '../components/Forms/SelectPrimary';
import useQueryConfig from '../../../hooks/useQueryConfig';
import EditorComponent from '../Products/components/FormProduct/Editor';
import { showMessageAdmin } from '../../../utils/messages';
import { handleChangeMessage, handleGetLocalStorage } from '../../../utils';
import { LANGUAGE, LANGUAGE_VI } from '../../../constants';

const ModalFormPost = ({ initialValues, isUpdate }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, patchPost, addPost } = usePost();
    const [imageFile, setImageFile] = useState(null);
    const { user } = useContextGlobal();
    const { data } = useQueryConfig([QUERY_KEY, 'topic-form'], 'api/topics');

    const [form] = Form.useForm();
    const intl = useIntl();
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
                    'Bạn chỉ có thể tải lên các tệp hình ảnh!',
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
        formData.append('topic_id', values.topic_id);
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('content', values.content);
        formData.append('author_id', user?.id);
        initialValues?.title && formData.append('_method', 'PATCH');
        if (imageFile) {
            formData.append('theme', imageFile);
        }

        if (isUpdate) {
            await patchPost(initialValues.id, formData);
        } else {
            await addPost(formData);
        }
        form.setFieldsValue({
            topic_id: [],
            title: '',
            slug: '',
            content: '',
            theme: '',
        });
        setImageFile(null)
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                topic_id: initialValues.topic_id.id,
                title: initialValues.title,
                slug: initialValues.slug,
                content: initialValues.content,
                theme: initialValues.image,
            });
        }
    }, [initialValues, form, user]);

    return (
        <>
            {isUpdate ? (
                <ButtonEdit onClick={showModal}>
                    <SquarePen />
                </ButtonEdit>
            ) : (
                <ButtonAdd onClick={showModal} title={<FormattedMessage id="post.add" />} />
            )}
            <Modal
                title={
                    <h3 className="text-[23px] font-medium">
                        {isUpdate ? <FormattedMessage id="post.update" /> : <FormattedMessage id="post.add" />}
                    </h3>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={
                    <div className="text-end" onClick={handleOk}>
                        <ButtonSubmit loading={loading} width={'w-[150px]'} />
                    </div>
                }
            >
                <Form form={form} onFinish={onFinish}>
                    <div>
                        <SelectPrimary
                            label={intl.formatMessage({ id: 'admin.topic' })}
                            name="topic_id"
                            className="font-medium"
                            rules={[{ required: true, message: <FormattedMessage id="post.message.topic" /> }]}
                            labelCol={{ span: 24 }}
                            placeholder={intl.formatMessage({ id: 'Choose_a_topic' })}
                            allowClear
                            optionFilterProp="name"
                            fieldNames={{ label: 'topic_name', value: 'id' }}
                            options={data?.data}
                            defaultValue={initialValues?.parent_topic_id}
                        />

                        <InputPrimary
                            label={intl.formatMessage({ id: 'post.table.title' })}
                            name="title"
                            placeholder={intl.formatMessage({ id: 'post.table.title' })}
                            rules={[{ required: true, message: <FormattedMessage id="post.message.title" /> }]}
                        />
                        <InputPrimary
                            label="Slug"
                            placeholder={'Slug'}
                            name="slug"
                            rules={[{ required: true, message: <FormattedMessage id="post.message.slug" /> }]}
                        />
                        <Form.Item
                            label={intl.formatMessage({ id: 'post.form.content' })}
                            className="font-medium"
                            name="content"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: <FormattedMessage id="post.message.content" /> }]}
                        >
                            <EditorComponent
                                height={500}
                                initialValues={initialValues?.content}
                                setDescription={(content: string) => {
                                    form.setFieldsValue({ content: content });
                                }}
                            />
                        </Form.Item>
                        {initialValues?.theme && !imageFile ? (
                            <div>
                                <img src={initialValues.theme} className="w-[80px] h-[80px] object-cover" alt="" />
                            </div>
                        ) : (
                            ''
                        )}
                        <Form.Item
                            label={intl.formatMessage({ id: 'post.form.image' })}
                            className="font-medium"
                            name="theme"
                            labelCol={{ span: 24 }}
                            rules={
                                initialValues?.theme
                                    ? []
                                    : [{ required: true, message: <FormattedMessage id="post.message.image" /> }]
                            }
                        >
                            <Upload name="image" listType="picture" accept="image/*" beforeUpload={handleImageUpload}>
                                <Button icon={<UploadOutlined />}>
                                    <FormattedMessage id="post.upload_image" />
                                </Button>
                            </Upload>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default ModalFormPost;
