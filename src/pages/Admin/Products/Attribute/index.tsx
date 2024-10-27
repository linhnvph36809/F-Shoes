import { Form } from 'antd';
import InputPrimary from '../../../../components/Input';
import Heading from '../../components/Heading';
import ButtonPrimary from '../../../../components/Button';
import TableAdmin from '../../components/Table';
import { columnsAttribute } from './datas';
import useAttribute from '../../../../hooks/useAttribute';
import SkeletonComponent from '../../components/Skeleton';
import { useState } from 'react';
import ButtonEdit from '../../components/Button/ButtonEdit';
import { SquarePen } from 'lucide-react';
import ModalAUpdate from './ModalUpdate';

type TypeModal = {
    id?: null | string | number;
    isShow: boolean;
};

const AddAttribute = () => {
    const [form] = Form.useForm();
    const { loading, attributeByIds, postAttributeName } = useAttribute();

    const [isModalOpen, setIsModalOpen] = useState<TypeModal>({
        id: null,
        isShow: false,
    });

    const Edit = {
        title: '',
        dataIndex: 'id',
        key: '5',
        render: (id: any) => {
            return (
                <ButtonEdit onClick={() => setIsModalOpen((preModal: TypeModal) => ({ ...preModal, isShow: true, id: id }))}>
                    <SquarePen />
                </ButtonEdit>
            );
        },
    };

    const onFinish = (value: { name: string }) => {
        postAttributeName(value);
        form.setFieldsValue({
            name: '',
        });
    };

    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>Attribute</Heading>
                    <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
                        <Form.Item name="name" rules={[{ required: true, message: 'Please input Attribute Name!' }]}>
                            <InputPrimary placeholder="Attribute Name" />
                        </Form.Item>
                        <Form.Item>
                            <div className="text-end">
                                <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                                    Submit
                                </ButtonPrimary>
                            </div>
                        </Form.Item>
                    </Form>
                    <div>
                        <TableAdmin columns={[...columnsAttribute, Edit]} rowKey="id" datas={attributeByIds[0]?.data} />
                    </div>
                </section>
            )}
            <ModalAUpdate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};
export default AddAttribute;

{
    /* <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
<Form.Item name="attributeName" rules={[{ required: true, message: 'Please input Attribute Name!' }]}>
    <InputPrimary placeholder="Attribute Name" />
</Form.Item>

<Form.List name="inputs" initialValue={['']}>
    {(fields, { add, remove }) => (
        <>
            <div className="grid grid-cols-3 gap-5">
                {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                    <div key={key}>
                        <Form.Item {...restField} name={[name]} required={false} className="relative">
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


</Form> */
}
