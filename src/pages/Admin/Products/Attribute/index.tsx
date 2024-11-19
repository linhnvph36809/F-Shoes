import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { SquarePen, Trash2 } from 'lucide-react';

import InputPrimary from '../../../../components/Input';
import Heading from '../../components/Heading';
import ButtonPrimary from '../../../../components/Button';
import TableAdmin from '../../components/Table';
import { columnsAttribute } from './datas';
import useAttribute from '../../../../hooks/useAttribute';
import SkeletonComponent from '../../components/Skeleton';
import ButtonEdit from '../../components/Button/ButtonEdit';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { PATH_ADMIN } from '../../../../constants/path';

export const API_ATTRIBUTE_ADD = '/api/attribute?include=values';
export const KEY = 'attribute';

const AddAttribute = () => {
    const [form] = Form.useForm();
    const { data, refetch } = useQueryConfig(KEY, API_ATTRIBUTE_ADD);
    const { loading, postAttributeName, deleteAttribute } = useAttribute();
    const handleDeleteAttribute = (id: string | number) => {
        if (id) {
            deleteAttribute(id);
            refetch();
        }
    };

    const Edit = {
        title: '',
        dataIndex: 'id',
        key: '5',
        render: (id: any) => {
            return (
                <div className="flex gap-2">
                    <Link to={PATH_ADMIN.UPDATE_ATTRIBUTE + id}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    <ButtonEdit onClick={() => handleDeleteAttribute(id)}>
                        <Trash2 />
                    </ButtonEdit>
                </div>
            );
        },
    };

    const onFinish = (value: { name: string }) => {
        postAttributeName(value);
        form.setFieldsValue({
            name: '',
        });
        refetch();
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
                            <InputPrimary placeholder="Attribute Name" width="w-1/2" />
                        </Form.Item>
                        <Form.Item>
                            <div className="text-start">
                                <ButtonPrimary width="w-[120px]" height="h-[56px]" htmlType="submit">
                                    Submit
                                </ButtonPrimary>
                            </div>
                        </Form.Item>
                    </Form>
                    <div>
                        <TableAdmin columns={[...columnsAttribute, Edit]} rowKey="id" datas={data?.data[0].data} />
                    </div>
                </section>
            )}
        </>
    );
};
export default AddAttribute;
