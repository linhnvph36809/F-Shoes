import { Button, Form } from 'antd';
import { Plus, X } from 'lucide-react';

import ButtonPrimary from '../../../../../components/Button';
import InputPrimary from '../../../components/Forms/InputPrimary';
import LoadingSmall from '../../../../../components/Loading/LoadingSmall';

const FormAttribute = ({
    handlePostAttributes,
    setVariantId,
    loading,
}: {
    handlePostAttributes: any;
    setVariantId: any;
    loading?: boolean;
}) => {
    const [form] = Form.useForm();

    const handleAddSubmit = (name: string, remove: any) => {
        form.validateFields([['inputs', name]])
            .then((values) => {
                handlePostAttributes({
                    attribute: values.inputs[name].attribute,
                    values: values.inputs[name].values,
                }).then((variant: any) => {
                    setVariantId((preId: number[]) => [...preId, variant[0].id]);
                    remove(name);
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Form form={form} name="form-attribute" autoComplete="off">
            <Form.List name="inputs" initialValue={[]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                            <div key={key} className="bg-gray-100 p-8 rounded-[12px] mb-10 relative">
                                <InputPrimary
                                    required={true}
                                    {...restField}
                                    name={[name, 'attribute']}
                                    fieldKey={[fieldKey, 'attribute']}
                                    placeholder="Attribute Name"
                                />

                                <Form.List initialValue={['']} name={[name, 'values']}>
                                    {(valueFields, { add: addValue, remove: removeValue }) => (
                                        <>
                                            <div className="grid grid-cols-4 gap-5">
                                                {valueFields.map(
                                                    ({
                                                        key: valueKey,
                                                        name: valueName,
                                                        fieldKey: valueFieldKey,
                                                        ...valueRestField
                                                    }: any) => (
                                                        <div key={valueKey} className="flex-row-center relative">
                                                            <InputPrimary
                                                                required={true}
                                                                {...valueRestField}
                                                                name={valueName}
                                                                fieldKey={valueFieldKey}
                                                                className="w-full"
                                                                placeholder="Attribute Value"
                                                            />

                                                            <X
                                                                onClick={() => removeValue(name)}
                                                                className="absolute -top-8 right-0 w-7 hover:opacity-70 cursor-pointer"
                                                            />
                                                        </div>
                                                    ),
                                                )}

                                                <Form.Item className="w-[50px]">
                                                    <Button
                                                        type="default"
                                                        className="h-[50px] rounded-full text-16px font-medium"
                                                        onClick={() => addValue()}
                                                        block
                                                    >
                                                        <Plus />
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        </>
                                    )}
                                </Form.List>

                                <div className="absolute flex-row-center rounded-full justify-center w-10 bg-primary -top-6 -right-5 hover:opacity-70 cursor-pointer">
                                    <X className="w-7 text-white" onClick={() => remove(name)} />
                                </div>

                                <Form.Item>
                                    <div className="text-end">
                                        {loading ? (
                                            <ButtonPrimary
                                                type="default"
                                                htmlType="button"
                                                width="w-[100px]"
                                                height="h-[50px]"
                                            >
                                                <LoadingSmall />
                                            </ButtonPrimary>
                                        ) : (
                                            <ButtonPrimary
                                                type="default"
                                                htmlType="button"
                                                onClick={() => {
                                                    handleAddSubmit(name, remove);
                                                }}
                                                width="w-[100px]"
                                                height="h-[50px]"
                                            >
                                                Save
                                            </ButtonPrimary>
                                        )}
                                    </div>
                                </Form.Item>
                            </div>
                        ))}
                        <Form.Item className="w-[150px]">
                            <Button
                                type="default"
                                className="h-[35px] text-16px font-medium"
                                onClick={() => add()}
                                block
                            >
                                <Plus /> Add Attribute
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};

export default FormAttribute;
