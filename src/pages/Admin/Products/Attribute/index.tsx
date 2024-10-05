import { Button, Form } from 'antd';
import InputPrimary from '../../../../components/Input';
import Heading from '../../components/Heading';
import ButtonPrimary from '../../../../components/Button';
import TableAdmin from '../../components/Table';
import { columnsAttribute, dataSourceAttribute } from './datas';
import { Plus, X } from 'lucide-react';

const onFinish = (values: any) => {
    console.log(values);
};

const FormComponent = () => {
    const [form] = Form.useForm();

    return (
        <section>
            <Heading>Attribute</Heading>
            <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
                <InputPrimary placeholder="Attribute Name" />
                <Form.List name="inputs" initialValue={['']}>
                    {(fields, { add, remove }) => (
                        <>
                            <div className="grid grid-cols-3 gap-5">
                                {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                                    <div key={key}>
                                        <Form.Item required={false} {...restField} className="relative">
                                            <div>
                                                <InputPrimary placeholder="Value" margin="mb-0" />
                                                <X
                                                    onClick={() => remove(name)}
                                                    className="absolute -top-8 right-0 w-7 hover:opacity-70 cursor-pointer"
                                                />
                                            </div>
                                        </Form.Item>
                                    </div>
                                ))}
                                <Form.Item className="w-[50px]">
                                    <Button
                                        type="default"
                                        className="h-[50px] rounded-full text-16px font-medium"
                                        onClick={() => add()}
                                        block
                                    >
                                        <Plus />
                                    </Button>
                                </Form.Item>
                            </div>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <div className="text-end">
                        <ButtonPrimary width="w-[120px]" height="h-[56px]">
                            Submit
                        </ButtonPrimary>
                    </div>
                </Form.Item>
            </Form>
            <div>
                <TableAdmin columns={columnsAttribute} datas={dataSourceAttribute} />
            </div>
        </section>
    );
};
export default FormComponent;
