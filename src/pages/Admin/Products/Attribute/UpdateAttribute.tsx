import { CircleX } from 'lucide-react';
import { Button, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Heading from '../../components/Heading';
import useAttribute from '../../../../hooks/useAttribute';
import ButtonBack from '../../components/ButtonBack';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { FormattedMessage } from 'react-intl';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { showMessageActive } from '../../../../utils/messages';
import { handleChangeMessage } from '../../../../utils';
import { useContextGlobal } from '../../../../contexts';
import LoadingPage from '../../../../components/Loading/LoadingPage';

const UpdateAttribute = () => {
    const [form] = Form.useForm();
     const {  locale } = useContextGlobal();
    const { id } = useParams();
    const { loading, postAttributeValue, deleteAttributeValue } = useAttribute();
    const [attributeValues, setAttributeValues] = useState<any>([]);
    const { data,isFetching,refetch } = useQueryConfig(`attribute-detail-${id}`, `/api/attribute/${id}?include=values`, {
        cacheTime: 0,
        staleTime: 0,
        retry: false,
    });

    const initialValues = data?.data.attribute.values || [];

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
        }
    };

    const handleDeleteAttribute = (idValue: any) => {
        showMessageActive( handleChangeMessage(
                                locale,
                                'Are you sure want to delete?',
                                'Bạn có chắc muốn xóa giá trị này?',
                            ), '', 'warning', () => {
            setAttributeValues((preAttributeValues: any) =>
                preAttributeValues.filter((item: any) => item.id != idValue),
            );
            if (id) {
                deleteAttributeValue(idValue, id);
                refetch();
            }
        });
    };

    const handleChangeAttribute = (index: any, value: string) => {
        setAttributeValues((preAttributeValues: any) => {
            preAttributeValues[index].value = value;
            return [...preAttributeValues];
        });
    };

    useEffect(() => {
        setAttributeValues(initialValues);
    }, [id, data, initialValues]);
    if(isFetching){
        return <LoadingPage/>
    }
    return (
        <>
            <section>
                <ButtonBack to="/admin/add-attribute" />
                <Heading>
                    <FormattedMessage id="Update Attribute" />
                </Heading>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <div className="my-4 w-6/12">
                        {attributeValues?.map((item: any, index: number) => (
                            <Form.Item
                                label="Attribute Value"
                                name={`attribute_value-${index}`}
                                initialValue={item.value}
                                className="relative font-medium"
                                rules={[{ required: true, message: 'Please enter Attribute Value' }]}
                            >
                                <Input
                                    placeholder="Attribute Value"
                                    width="100%"
                                    className={`h-[56px] border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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
                                                <Input
                                                    placeholder="Attribute Value"
                                                    width="100%"
                                                    className={`h-[56px] border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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
                        <ButtonSubmit loading={loading} />
                    </Form.Item>
                </Form>
            </section>
        </>
    );
};

export default UpdateAttribute;
