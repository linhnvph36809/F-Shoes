import { memo } from 'react';
import { ConfigProvider, Form, Select } from 'antd';
import useCategory from '../../../../../hooks/useCategory';

const Categories = memo(() => {
    const { categories, loading } = useCategory();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        multipleItemHeight: 40,
                    },
                },
            }}
        >
            <Form.Item name="categories" rules={[{ required: true, message: 'Please enter quantity' }]}>
                <Select
                    mode="multiple"
                    allowClear
                    className="h-[56px] text-20px font-medium"
                    placeholder="Category"
                    optionFilterProp="name"
                    fieldNames={{ label: 'name', value: 'id' }}
                    options={categories}
                    loading={loading}
                    key={'value'}
                />
            </Form.Item>
        </ConfigProvider>
    );
});

export default Categories;
