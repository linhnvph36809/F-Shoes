import { useEffect, useState } from 'react';
import { ConfigProvider, Form, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Heading from '../components/Heading';
import useQueryConfig from '../../../hooks/useQueryConfig';
import EditorComponent from '../Products/components/FormProduct/Editor';
import { useContextGlobal } from '../../../contexts';
import InputPrimary from '../components/Forms/InputPrimary';
import ButtonSubmit from '../components/Button/ButtonSubmit';

const FormPost = ({
    title,
    initialValues,
    onFinish,
    loading,
}: {
    title: string;
    initialValues?: any;
    onFinish: any;
    loading: boolean;
}) => {
    const [form] = Form.useForm();
    const { data } = useQueryConfig('topic-form', 'api/topics');
    const [imageFile, setImageFile] = useState(null);
    const { user } = useContextGlobal();

    const handleFinish = (values: any) => {
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

        onFinish(formData);
    };

    const handleImageUpload = (file: any) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        } else {
            setImageFile(file);
        }
        return false;
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
    }, [initialValues, form]);

    return (
        <Form form={form} initialValues={initialValues} onFinish={handleFinish} layout="vertical">
            <Heading>{title}</Heading>

            <div className="my-4 w-6/12">
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                multipleItemHeight: 40,
                            },
                        },
                    }}
                >
                    <Form.Item
                        label="Topic"
                        name="topic_id"
                        className="font-medium"
                        rules={[{ required: true, message: 'Please enter parent topic' }]}
                    >
                        <Select
                            allowClear
                            className="font-medium w-full sm:h-[45px] md:h-[50px] border-1 border-[#111111]"
                            placeholder="Please select"
                            optionFilterProp="name"
                            fieldNames={{ label: 'topic_name', value: 'id' }}
                            options={data?.data}
                            defaultValue={initialValues?.parent_topic_id}
                        />
                    </Form.Item>
                </ConfigProvider>

                <InputPrimary
                    label="Title"
                    name="title"
                    placeholder="Title"
                    rules={[{ required: true, message: 'Please enter Title' }]}
                ></InputPrimary>

                <InputPrimary
                    label="Slug"
                    placeholder="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Please enter slug' }]}
                ></InputPrimary>
            </div>

            <Form.Item
                label="Content"
                className="font-medium"
                name="content"
                rules={[{ required: true, message: 'Please enter content' }]}
            >
                <EditorComponent
                    initialValues={initialValues?.content}
                    setDescription={(content: string) => {
                        form.setFieldsValue({ content: content });
                    }}
                />
            </Form.Item>
            {initialValues?.theme && !imageFile ? (
                <div>
                    <img src={initialValues.theme} className="w-[80px]" alt="" />
                </div>
            ) : (
                ''
            )}
            <Form.Item
                label="Image"
                className="font-medium"
                name="theme"
                rules={initialValues?.theme ? [] : [{ required: true, message: 'Please upload an image' }]}
            >
                <Upload name="image" listType="picture" accept="image/*" beforeUpload={handleImageUpload}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item>

            <Form.Item className="mt-20">
                <ButtonSubmit loading={loading} />
            </Form.Item>
        </Form>
    );
};

export default FormPost;
