import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { SquarePen } from 'lucide-react';

import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import { columnsAttribute } from './datas';
import useAttribute, { QUERY_KEY } from '../../../../hooks/useAttribute';
import SkeletonComponent from '../../components/Skeleton';
import ButtonEdit from '../../components/Button/ButtonEdit';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { PATH_ADMIN } from '../../../../constants/path';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { showMessageActive } from '../../../../utils/messages';
import InputPrimary from '../../components/Forms/InputPrimary';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { FormattedMessage, useIntl } from 'react-intl';

export const API_ATTRIBUTE_ADD = '/api/attribute?include=values&times=attribute';
export const KEY = 'attribute';

const AddAttribute = () => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const { data, refetch, isFetching } = useQueryConfig([QUERY_KEY, KEY], API_ATTRIBUTE_ADD);
    const { postAttributeName, deleteAttribute } = useAttribute();
    const handleDeleteAttribute = (id: string | number) => {
        if (id) {
            showMessageActive('Are you sure you want to delete Attribute?', '', 'warning', () => {
                deleteAttribute(id);
                refetch();
            });
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
                    <ButtonDelete onClick={() => handleDeleteAttribute(id)} />
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
            <section>
                <Heading>
                    <FormattedMessage id="Attribute" />
                </Heading>
                <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
                    <InputPrimary
                        label={<FormattedMessage id="Attribute_name" />}
                        name="name"
                        rules={[{ required: true, message: <FormattedMessage id="Please enter Attribute Name!" /> }]}
                        placeholder={intl.formatMessage({ id: 'Attribute_name' })}
                        width="w-1/2"
                    />

                    <Form.Item>
                        <div className="text-start">
                            <ButtonSubmit />
                        </div>
                    </Form.Item>
                </Form>
                <div>
                    {isFetching ? (
                        <SkeletonComponent />
                    ) : (
                        <TableAdmin columns={[...columnsAttribute, Edit]} rowKey="id" datas={data?.data[0].data} />
                    )}
                </div>
            </section>
        </>
    );
};
export default AddAttribute;
