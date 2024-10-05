import { Button, Form } from 'antd';
import { Plus, X } from 'lucide-react';

import InputPrimary from '../../../../../components/Input';
import ButtonPrimary from '../../../../../components/Button';

const FormAttribute = ({ handleAddVariant }: { handleAddVariant: any }) => {
    const [form] = Form.useForm();

    const onFinish = ({ inputs }: any) => {
        const newValues = inputs.map((input: any) => input.values);
        handleAddVariant((preVariant: any) => {
            const updatedVariants = [...preVariant, ...newValues];
            return updatedVariants;
        });
    };

    return (
        <Form form={form} name="form-attribute" onFinish={onFinish} autoComplete="off">
            <Form.List name="inputs" initialValue={[]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                            <div key={key} className="bg-gray-100 p-8 rounded-[12px] mb-10 relative">
                                <Form.Item
                                    required={false}
                                    {...restField}
                                    name={[name, 'attribute']}
                                    fieldKey={[fieldKey, 'attribute']}
                                >
                                    <InputPrimary placeholder="Attribute Name" height="h-[50px]" margin="mb-0" />
                                </Form.Item>

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
                                                            <Form.Item
                                                                required={false}
                                                                {...valueRestField}
                                                                name={valueName} // Không cần thêm 'value'
                                                                fieldKey={valueFieldKey}
                                                                className="w-full"
                                                            >
                                                                <InputPrimary
                                                                    placeholder="Value"
                                                                    width="w-full"
                                                                    margin="mb-0"
                                                                    height="h-[50px]"
                                                                />
                                                            </Form.Item>
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

                                <div
                                    className="absolute flex-row-center rounded-full
                                    justify-center w-10 bg-primary -top-6 -right-5 hover:opacity-70 cursor-pointer"
                                >
                                    <X className="w-7 text-white" onClick={() => remove(name)} />
                                </div>
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
            <Form.Item>
                <div className="text-end">
                    <ButtonPrimary type="default" htmlType="submit" width="w-[100px]" height="h-[50px]">
                        Save
                    </ButtonPrimary>
                </div>
            </Form.Item>
        </Form>
    );
};

export default FormAttribute;
