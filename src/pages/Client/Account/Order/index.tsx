import { ConfigProvider, Pagination, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import Heading from './components/Heading';
import ListOrder from './components/ListOrder';
import { useNavigate } from 'react-router-dom';

const OrderProfile = () => {
    const navigate = useNavigate();

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;
    const statusQueryUrl = params.get('status');

    const [currentPage, setCurrentPage] = useState<number | string>(page);
    const { data, isFetching } = useQueryConfig(`order-all-${page}`, `/api/me/orders?per_page=5&page=${page}`);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    const totalItems = data?.data?.paginator?.total_item || 0;
    const pageSize = data?.data?.paginator?.per_page || 5;

    useEffect(() => {
        navigate(`?page=${currentPage}`);
    }, []);

    return (
        <section>
            <Heading>All Order</Heading>
            {isFetching ? <Skeleton /> : <ListOrder data={data?.data?.data || []} />}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#11111',
                    },
                }}
            >
                {' '}
                <Pagination
                    align="end"
                    current={page || (1 as any)}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </ConfigProvider>
        </section>
    );
};

export default OrderProfile;
