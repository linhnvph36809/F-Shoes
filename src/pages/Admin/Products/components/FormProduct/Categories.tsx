import { memo } from 'react';
import useCategory from '../../../../../hooks/useCategory';
import SelectPrimary from '../../../components/Forms/SelectPrimary';

const Categories = memo(() => {
    const { categories, loading } = useCategory();

    return (
        <SelectPrimary
            name="categories"
            rules={[{ required: true, message: 'Please enter quantity' }]}
            allowClear
            label="Category"
            placeholder="Category"
            optionFilterProp="name"
            fieldNames={{ label: 'name', value: 'id' }}
            options={categories}
            loading={loading}
            key={'value'}
        />
    );
});

export default Categories;
