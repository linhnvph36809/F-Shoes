import { useState } from 'react';
import { CopyPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { columnsAttribute } from './datas';
import { API_PRODUCT, QUERY_KEY } from '../../../hooks/useProduct';
import { IProduct } from '../../../interfaces/IProduct';
import Heading from '../components/Heading';
import TableAdmin from '../components/Table';
import ButtonEdit from '../components/Button/ButtonEdit';
import SkeletonComponent from '../components/Skeleton';
import useQueryConfig from '../../../hooks/useQueryConfig';
import PaginationComponent from '../../../components/Pagination';
import ButtonUpdate from '../components/Button/ButtonUpdate';
import ButtonAdd from '../components/Button/ButtonAdd';
import InputSearch from '../components/Forms/InputSearch';
import { FormattedMessage, useIntl } from 'react-intl';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../constants';

const ListProduct = () => {
    const intl = useIntl();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;

    const [search, setSearch] = useState('');
    const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;

    const navigate = useNavigate();

    const { data: products, isFetching } = useQueryConfig(
        [QUERY_KEY, `all-product-admin-${page}-${search}`],
        API_PRODUCT +
        `?paginate=true&per_page=10&page=${page}&search=${search}&include=categories,sale_price,variations`,
    );

    const handlePageChange = (page: number) => {
        params.set('page', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);
        params.set('search', searchValue);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const totalItems = products?.data?.paginator?.total_item || 0;
    const pageSize = products?.data?.paginator?.per_page || 8;

    const columnDelete = {
        title: <FormattedMessage id="category.table.action" />,
        dataIndex: 'slug',
        key: '8',
        render: (slug: string | number, values: IProduct) => {
            return (
                <div className="flex-row-center gap-x-3">
                    {values?.is_variant ? (
                        <Link state={{ prevUrl: currentUrl }} to={`/admin/update-variant/${slug}`}>
                            <ButtonEdit>
                                <CopyPlus />
                            </ButtonEdit>
                        </Link>
                    ) : (
                        ''
                    )}
                    <PermissionElement keyName={PERMISSION.PERMISSION_PRODUCT} action={ACTIONS.ACTIONS_EDIT}>
                        <ButtonUpdate state={{ prevUrl: currentUrl }} to={`/admin/update-product/${slug}`} />
                    </PermissionElement>
                </div>
            );
        },
    };

    return (
        <>
            {
                <section>
                    <Heading>
                        <FormattedMessage id="admin.listProduct" />
                    </Heading>
                    <div className="flex justify-between">
                        <PermissionElement keyName={PERMISSION.PERMISSION_PRODUCT} action={ACTIONS.ACTIONS_ADD}>
                            <ButtonAdd to="/admin/add-product" title={<FormattedMessage id="admin.addProduct" />} />
                            <InputSearch
                                placeholder={intl.formatMessage({ id: 'Search Product Name' })}
                                onSearch={handleSearch}
                            />
                        </PermissionElement>
                    </div>
                    <div>
                        {isFetching ? (
                            <SkeletonComponent className="mt-10" />
                        ) : (
                            <TableAdmin
                                scroll={{ x: 'max-content' }}
                                rowKey="id"
                                columns={[...columnsAttribute, columnDelete]}
                                datas={products?.data.data}
                                pagination={false}
                            />
                        )}
                    </div>
                    <div className="mt-8">
                        <PaginationComponent
                            page={page || (1 as any)}
                            totalItems={totalItems}
                            pageSize={pageSize}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </section>
            }
        </>
    );
};

export default ListProduct;
