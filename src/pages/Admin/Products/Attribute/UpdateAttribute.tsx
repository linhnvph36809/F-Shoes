import { CircleX } from 'lucide-react';
import { Button, Form, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useQueryConfig from '../../../../hooks/useQueryConfig';
import { KEY, API_ATTRIBUTE_ADD } from './index';
import { PATH_ADMIN } from '../../../../constants/path';
import Heading from '../../components/Heading';
import InputPrimary from '../../../../components/Input';
import ButtonPrimary from '../../../../components/Button';
import useAttribute from '../../../../hooks/useAttribute';

const UpdateAttribute = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const { data, refetch } = useQueryConfig(KEY, API_ATTRIBUTE_ADD);
    const { postAttributeValue, deleteAttributeValue } = useAttribute();
    const [attributeValues, setAttributeValues] = useState<any>([]);
    const initialValues = data?.data[0]?.data?.find((item: any) => item.id == id);

    if (!initialValues) {
        return <Navigate to={PATH_ADMIN.ADD_ATTRIBUTE} />;
    }

    const onFinish = (value: any) => {
        const { newAttribute } = value;

        const newAttributeValues = newAttribute
            ? newAttribute?.map((newAttribute: any) => ({
                id: '',
                value: newAttribute,
            }))
            : [];

        if (id) {
            postAttributeValue(id, {
                values: [...attributeValues, ...newAttributeValues],
            });
            refetch();
        }
    };

    const handleDeleteAttribute = (idValue: any) => {
        setAttributeValues((preAttributeValues: any) => preAttributeValues.filter((item: any) => item.id != idValue));
        if (id) deleteAttributeValue(idValue, id);
    };

    const handleChangeAttribute = (index: any, value: string) => {
        setAttributeValues((preAttributeValues: any) => {
            preAttributeValues[index].value = value;
            return [...preAttributeValues];
        });
    };

    useEffect(() => {
        setAttributeValues(initialValues.values);
    }, []);

    return (
        <>
            <section>
                <Heading>Update Attribute</Heading>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <div className="my-4 w-6/12">
                        {attributeValues?.map((item: any, index: number) => (
                            <Form.Item
                                label="Attribute Value"
                                name={`attribute_value-${index}`}
                                initialValue={item.value}
                                className="relative"
                                rules={[{ required: true, message: 'Please enter Attribute Value' }]}
                            >
                                <InputPrimary
                                    placeholder="Attribute Value"
                                    width="100%"
                                    height="h-[56px]"
                                    margin="mb-0"
                                    defaultValue={item.value}
                                    onChange={(e: any) => handleChangeAttribute(index, e.target.value)}
                                />
                                <span
                                    className="absolute -top-5 -right-5 z-[10] hover:cursor-pointer"
                                    onClick={() => handleDeleteAttribute(item.id)}
                                >
                                    <CircleX />
                                </span>
                            </Form.Item>
                        ))}

                        <Form.List name="newAttribute">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <Space key={key} className="w-full" align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={name}
                                                fieldKey={fieldKey}
                                                rules={[{ required: true, message: 'Please enter a value' }]}
                                            >
                                                <InputPrimary
                                                    placeholder="Attribute Value"
                                                    width="100%"
                                                    height="h-[56px]"
                                                    margin="mb-0"
                                                />
                                            </Form.Item>
                                            <Button type="text" onClick={() => remove(name)} danger>
                                                Remove
                                            </Button>
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block>
                                            Add Attribute Value
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                    <Form.Item className="mt-20">
                        <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                            Submit
                        </ButtonPrimary>
                    </Form.Item>
                </Form>
            </section>
        </>
    );
};

export default UpdateAttribute;
