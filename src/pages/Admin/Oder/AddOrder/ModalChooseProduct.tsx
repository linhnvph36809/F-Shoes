import React, { useState } from 'react';
import { Modal } from 'antd';
import { PackagePlus } from 'lucide-react';
import SkeletonComponent from '../../components/Skeleton';
import TableAdmin from '../../components/Table';
import PaginationComponent from '../../../../components/Pagination';
import { columnsAttribute } from '../../Products/datas';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { API_PRODUCT, QUERY_KEY } from '../../../../hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import ButtonAdd from '../../components/Button/ButtonAdd';
import InputSearch from '../../components/Forms/InputSearch';
import { FormattedMessage, useIntl } from 'react-intl';

const ModalChooseProduct: React.FC = () => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;
    const { data: products, isFetching } = useQueryConfig(
        [QUERY_KEY, `all-product-admin-${page}-${search}`],
        API_PRODUCT + `?paginate=true&per_page=5&page=${page}&search=${search}&include=categories,sale_price,variations`,
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
            >
                <div className="flex justify-between">
                    <ButtonAdd to="/admin/add-product" title={<FormattedMessage id="admin.addProduct" />} />
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
                            columns={[...columnsAttribute]}
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
