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
import { ACTIONS, LANGUAGE, LANGUAGE_VI, PERMISSION } from '../../../constants';
import { formatPrice, handleChangeMessage, handleGetLocalStorage } from '../../../utils';
import { ICategory } from '../../../interfaces/ICategory';

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
            `?paginate=true&per_page=10&page=${page}&search=${search}&include=categories,sale_price,variations,images`,
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
                                expandable={{
                                    expandedRowRender: (record: any) => {
                                        return (
                                            <>
                                                <div>
                                                    <div className="flex items-center gap-x-5 pb-5 border-b">
                                                        <p className="text-[14px] color-primary">
                                                            <FormattedMessage id="product.name" /> :{' '}
                                                        </p>
                                                        <p>{record?.name}</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">
                                                            <FormattedMessage id="admin.price" /> :{' '}
                                                        </p>
                                                        <p>
                                                            {formatPrice(record?.sale_price || record?.price)}đ{' '}
                                                            {record?.sale_price ? (
                                                                <span className="color-gray line-through text-[12px]">
                                                                    {formatPrice(record?.price)}đ
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">
                                                            <FormattedMessage id="user.table.status" /> :{' '}
                                                        </p>
                                                        <p>
                                                            {record?.status
                                                                ? handleChangeMessage(
                                                                      handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI,
                                                                      'Selling',
                                                                      'Đang bán',
                                                                  )
                                                                : handleChangeMessage(
                                                                      handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI,
                                                                      'Stop selling',
                                                                      'Ngừng bán',
                                                                  )}
                                                        </p>
                                                    </div>
                                                    {record?.short_description ? (
                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                            <p className="text-[14px] color-primary">
                                                                <FormattedMessage id="product.shortDescription" /> :
                                                            </p>
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html: record?.short_description,
                                                                }}
                                                            >
                                                                {}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {record?.description ? (
                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                            <p className="text-[14px] color-primary">
                                                                <FormattedMessage id="product.description" /> :
                                                            </p>
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html: record?.description,
                                                                }}
                                                            >
                                                                {}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">
                                                            <FormattedMessage id="sale_qty_sold" /> :
                                                        </p>
                                                        <p>{record?.qty_sold}</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">
                                                            <FormattedMessage id="admin.stock_qty" /> :
                                                        </p>
                                                        <p>{record.stock_qty}</p>
                                                    </div>
                                                    {record?.categories?.length ? (
                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                            <p className="text-[14px] color-primary">
                                                                <FormattedMessage id="admin.category" /> :
                                                            </p>
                                                            <div className="flex gap-x-3">
                                                                {record.categories.map((categorie: ICategory) => (
                                                                    <div className="px-5 py-2 bg-white rounded-xl">
                                                                        {categorie.name}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {record?.images?.length ? (
                                                        <div className="flex items-center gap-x-5 py-5 border-b">
                                                            <p className="text-[14px] color-primary">
                                                                <FormattedMessage id="admin.image" /> :
                                                            </p>
                                                            <div className="flex gap-x-3">
                                                                {record.images.map((image: any) => (
                                                                    <div>
                                                                        <img
                                                                            src={image.url}
                                                                            alt=""
                                                                            className="w-[80px] h-[80px] object-cover"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {record?.variations.length ? (
                                                        <div className="py-5 border-b">
                                                            <p className="text-[14px] color-primary mb-3">
                                                                <FormattedMessage id="Variants" /> :{' '}
                                                            </p>
                                                            <div className="grid grid-cols-6 gap-10">
                                                                {record?.variations?.map((variation: any) => (
                                                                    <div className="flex gap-x-5 items-start">
                                                                        <img
                                                                            src={variation?.image_url}
                                                                            alt=""
                                                                            className="w-[80px] h-[80px] object-corver"
                                                                        />
                                                                        <div>
                                                                            <p className="text-[13px] color-primary">
                                                                                <FormattedMessage id="Variant Name" /> :{' '}
                                                                                {variation?.classify}
                                                                            </p>
                                                                            <p className="text-[13px] color-primary">
                                                                                <FormattedMessage id="admin.price" /> :{' '}
                                                                                {formatPrice(variation?.price)}đ
                                                                            </p>
                                                                            <p className="text-[13px] color-primary">
                                                                                <FormattedMessage id="admin.stock_qty" />{' '}
                                                                                : {variation?.stock_qty}
                                                                            </p>
                                                                            <p className="text-[13px] color-primary">
                                                                                <FormattedMessage id="sale_qty_sold" />{' '}
                                                                                : {variation?.qty_sold}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </>
                                        );
                                    },

                                    rowExpandable: (record: any) => record.id !== '',
                                }}
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
