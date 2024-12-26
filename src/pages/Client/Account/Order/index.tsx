import { ConfigProvider, Pagination, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import useQueryConfig from '../../../../hooks/useQueryConfig';
import Heading from './components/Heading';
import ListOrder from './components/ListOrder';
import { useNavigate } from 'react-router-dom';
import { statusArr } from '../../../../interfaces/IOrder';
import { FormattedMessage } from 'react-intl';
import { QUERY_KEY as QUERY_KEY_ORDER } from '../../../../hooks/useOrder';

const OrderProfile = () => {
    const navigate = useNavigate();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;
    const statusQueryUrl = params.get('status');
    const [indexStatus, setIndexStatus] = useState<number | null | undefined>();
    let indexInArr: number | null | undefined = null;
    const statusInArr = statusArr.find((s, index) => {
        indexInArr = index;
        return s === statusQueryUrl;
    });

    useEffect(() => {
        if (!statusQueryUrl) {
            indexInArr = null;
        }
        if (statusInArr !== undefined || statusInArr !== null) {
            setIndexStatus(indexInArr);
        } else {
            setIndexStatus(null);
        }
    }, [statusInArr]);


    const { data, isFetching } = useQueryConfig(
        [QUERY_KEY_ORDER, `order-all-${page}-status-${indexStatus || indexStatus === 0 ? indexStatus : 'empty'}`],
        `/api/me/orders?per_page=5&page=${page}&status=${indexStatus || indexStatus === 0 ? indexStatus : ''}`,
    );

    const handlePageChange = (page: number) => {
        params.set('page', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const totalItems = data?.data?.paginator?.total_item || 0;
    const pageSize = data?.data?.paginator?.per_page || 5;

    return (
        <section>
            <Heading>{<FormattedMessage id="All Order" />}</Heading>
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
