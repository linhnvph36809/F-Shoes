import { useState } from 'react';
import { Modal } from 'antd';
import { PackagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import SkeletonComponent from '../../components/Skeleton';
import TableAdmin from '../../components/Table';
import PaginationComponent from '../../../../components/Pagination';
import { columnsAttribute } from '../../Products/datas';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { API_PRODUCT, QUERY_KEY } from '../../../../hooks/useProduct';
import InputSearch from '../../components/Forms/InputSearch';
import { IProduct } from '../../../../interfaces/IProduct';
import { formatPrice } from '../../../../utils';
import ModalAddOrder from './ModalAddOrder';

const ModalChooseProduct = ({ handleSetProducts }: any) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;
    const { data: products, isFetching } = useQueryConfig(
        [QUERY_KEY, `all-product-admin-${page}-${search}`],
        API_PRODUCT +
        `?paginate=true&per_page=5&page=${page}&search=${search}&include=categories,sale_price,variations`,
    );

    const totalItems = products?.data?.paginator?.total_item || 0;
    const pageSize = products?.data?.paginator?.per_page || 8;

    const handlePageChange = (page: number) => {
        params.set('page', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue);
        params.set('search', searchValue);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={showModal}>
                <PackagePlus
                    width={30}
                    height={30}
                    className="hover:cursor-pointer hover:opacity-70 transition-global"
                />
            </div>
            <Modal
                width={1500}
                title={<h3 className="text-[32px] font-medium">Choose Product</h3>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex justify-end">
                    <InputSearch
                        placeholder={intl.formatMessage({ id: 'Search Product Name' })}
                        onSearch={handleSearch}
                    />
                </div>
                <div>
                    {isFetching ? (
                        <SkeletonComponent className="mt-10" />
                    ) : (
                        <TableAdmin
                            scroll={{ x: 'max-content' }}
                            rowKey="id"
                            expandable={{
                                expandedRowRender: (record: any) => {
                                    return (
                                        <>
                                            <div>
                                                <div className="flex items-center gap-x-5 pb-5 border-b">
                                                    <p className="text-[14px] color-primary">
                                                        <FormattedMessage id="Variant Name" /> :{' '}
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
                                                {record?.description ? (
                                                    <div className="flex items-center gap-x-5 py-5 border-b">
                                                        <p className="text-[14px] color-primary">Description :</p>
                                                        <p dangerouslySetInnerHTML={{ __html: record?.description }}>
                                                            { }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">Quantity Sold :</p>
                                                    <p>{record?.qty_sold}</p>
                                                </div>
                                                <div className="flex items-center gap-x-5 py-5 border-b">
                                                    <p className="text-[14px] color-primary">Stock Quantity :</p>
                                                    <p>{record.stock_qty}</p>
                                                </div>
                                                {record?.variations.length ? (
                                                    <div className="py-5 border-b">
                                                        <p className="text-[14px] color-primary mb-3">Variants : </p>
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
                                                                            Stock Quantity : {variation?.stock_qty}
                                                                        </p>
                                                                        <p className="text-[13px] color-primary">
                                                                            Quantity Sold : {variation?.qty_sold}
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
                            columns={[
                                ...columnsAttribute,
                                {
                                    title: <FormattedMessage id="category.table.action" />,
                                    dataIndex: 'slug',
                                    key: '8',
                                    render: (_: any, values: IProduct) =>
                                        values.stock_qty > 0 ? (
                                            <ModalAddOrder
                                                initialValues={values}
                                                handleSetProducts={handleSetProducts}
                                                handleHidden={handleCancel}
                                            />
                                        ) : (
                                            'Hết hàng !'
                                        ),
                                },
                            ]}
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
            </Modal>
        </>
    );
};

export default ModalChooseProduct;
