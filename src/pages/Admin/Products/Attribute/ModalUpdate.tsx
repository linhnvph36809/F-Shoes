import { Button, Form, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import useAttribute from '../../../../hooks/useAttribute';
import { Plus, X } from 'lucide-react';
import InputPrimary from '../../../../components/Input';

const ModalAUpdate = ({ isModalOpen, setIsModalOpen }: any) => {
    const [loading, setLoading] = useState<boolean>(false);

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Form values:', values.inputs);
    };

    const { getValueAttributeById } = useAttribute();

    const handleOk = () => {
        setIsModalOpen((preModal: any) => ({ ...preModal, isShow: false, id: null }));
    };

    const handleCancel = () => {
        setIsModalOpen((preModal: any) => ({ ...preModal, isShow: false, id: null }));
    };

    useEffect(() => {
        (async function () {
            if (isModalOpen.id) {
                try {
                    setLoading(true);
                    const res = await getValueAttributeById(isModalOpen.id);
                    console.log(res);
                    form.setFieldsValue({
                        inputs: res.values.map((valueAttribute: any) => valueAttribute.value), // Thiết lập giá trị mặc định cho từng input
                    });
                } catch (error) {
                    console.error('Failed to fetch attribute values', error);
                } finally {
                    setLoading(false);
                }
            }
        })();
    }, [isModalOpen.id, form]);

    return (
        <>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <Modal title="Update Attribute Value" open={isModalOpen.isShow} onOk={handleOk} onCancel={handleCancel}>
                    <Form form={form} name="dynamic_form" onFinish={onFinish} autoComplete="off">
                        <Form.List name="inputs">
                            {(fields, { add, remove }) => (
                                <div className="grid grid-cols-2 gap-2">
                                    {fields.map((field) => (
                                        <Space
                                            key={field.key}
                                            style={{ display: 'flex', marginBottom: 8 }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...field}
                                                name={[field.name]} // Đảm bảo đúng tên
                                                fieldKey={[field.fieldKey as any]} // Đảm bảo đúng fieldKey
                                                rules={[{ required: true, message: 'Please input value!' }]}
                                            >
                                                <InputPrimary
                                                    height={'h-[40px]'}
                                                    margin={'mb-0'}
                                                    placeholder="Please enter a variant value"
                                                    textSize="text-[14px]"
                                                    onChange={(e: any) => {
                                                        form.setFieldsValue({
                                                            inputs: fields.map((f, index) =>
                                                                index === field.name
                                                                    ? e.target.value
                                                                    : form.getFieldValue('inputs')[index],
                                                            ),
                                                        });
                                                    }}
                                                />
                                                {fields.length > 1 ? (
                                                    <X
                                                        onClick={() => remove(field.name)}
                                                        className="absolute -top-6 -right-2 w-7 hover:cursor-pointer
                                                hover:opacity-60 transition-global"
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add('')} // Thêm input với giá trị trống
                                            block
                                            icon={<Plus />}
                                            className="h-[40px]"
                                        >
                                            Add Input
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </div>
                            )}
                        </Form.List>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default ModalAUpdate;
