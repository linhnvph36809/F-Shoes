import { CopyPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { columnsAttribute } from './datas';
import useProduct, { API_PRODUCT, QUERY_KEY } from '../../../hooks/useProduct';
import { IProduct } from '../../../interfaces/IProduct';
import Heading from '../components/Heading';
import TableAdmin from '../components/Table';
import ButtonEdit from '../components/Button/ButtonEdit';
import SkeletonComponent from '../components/Skeleton';
import useQueryConfig from '../../../hooks/useQueryConfig';
import PaginationComponent from '../../../components/Pagination';
import { showMessageActive } from '../../../utils/messages';
import ButtonDelete from '../components/Button/ButtonDelete';
import ButtonUpdate from '../components/Button/ButtonUpdate';
import ButtonAdd from '../components/Button/ButtonAdd';

const ListProduct = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;

    const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;

    const navigate = useNavigate();
    const { deleteProduct } = useProduct();

    const {
        data: products,
        isFetching,
    } = useQueryConfig(
        [QUERY_KEY, `all-product-admin-${page}`],
        API_PRODUCT + `?per_page=8&page=${page}&include=categories,sale_price,variations`,
    );


    const handleDeleteProduct = (id: string | number) => {
        showMessageActive('Are you sure you want to delete this product', '', 'warning', () => {
            deleteProduct(id);
        });
    };

    const handlePageChange = (page: number) => {
        params.set('page', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const totalItems = products?.data?.paginator?.total_item || 0;
    const pageSize = products?.data?.paginator?.per_page || 8;

    const columnDelete = {
        title: '',
        dataIndex: 'slug',
        key: '8',
        render: (slug: string | number, values: IProduct) => {
            return (
                <div className="flex-row-center gap-x-3">
                    <Link
                        state={{ prevUrl: currentUrl }}
                        to={`/admin/${values?.variations && values.variations.length ? 'update-variant' : 'add-variant'
                            }/${slug}`}
                    >
                        <ButtonEdit>
                            <CopyPlus />
                        </ButtonEdit>
                    </Link>
                    <ButtonUpdate state={{ prevUrl: currentUrl }} to={`/admin/update-product/${slug}`} />
                    <ButtonDelete onClick={() => handleDeleteProduct(values.id)} />
                </div>
            );
        },
    };
    return (
        <>
            {isFetching ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>List Product</Heading>
                    <ButtonAdd to="/admin/add-product" title={'Add Product'} />
                    <div>
                        <TableAdmin
                            scroll={{ x: 'max-content' }}
                            rowKey="id"
                            columns={[...columnsAttribute, columnDelete]}
                            datas={products?.data.data}
                            pagination={false}
                        />
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
            )}
        </>
    );
};

export default ListProduct;
