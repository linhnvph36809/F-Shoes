import { memo } from 'react';
import useCategory from '../../../../../hooks/useCategory';
import SelectPrimary from '../../../components/Forms/SelectPrimary';
import { FormattedMessage, useIntl } from 'react-intl';

const Categories = memo(() => {
    const intl = useIntl();
    const { categories, loading } = useCategory();

    return (
        <SelectPrimary
            name="categories"
            rules={[{ required: true, message: <FormattedMessage id="category.name_required" /> }]}
            allowClear
            label={<FormattedMessage id="admin.category" />}
            placeholder={intl.formatMessage({ id: 'admin.category' })}
            optionFilterProp="name"
            fieldNames={{ label: 'name', value: 'id' }}
            options={categories}
            loading={loading}
            key={'value'}
            mode="multiple"
        />
    );
});

export default Categories;
