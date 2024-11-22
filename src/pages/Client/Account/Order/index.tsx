import { ConfigProvider, Pagination, Skeleton } from 'antd';
import { useState } from 'react';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import Heading from './components/Heading';
import ListOrder from './components/ListOrder';

const OrderProfile = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, isFetching } = useQueryConfig(
        `order-all-${currentPage}`,
        `/api/me/orders?per_page=5&page=${currentPage}`,
    );

    console.log(data);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalItems = data?.data?.paginator?.total_item || 0;
    const pageSize = data?.data?.paginator?.per_page || 5;

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
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </ConfigProvider>
        </section>
    );
};

export default OrderProfile;
