import { EyeOutlined, StarFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { Ban, CircleX, Power, Search } from 'lucide-react';
import LoadingBlock from '../../../../components/Loading/LoadingBlock';
import useReview, { QUERY_KEY } from '../../../../hooks/useReview';
import { IReview } from '../../../../interfaces/IReview';
import ButtonEdit from '../../components/Button/ButtonEdit';
import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useContextGlobal } from '../../../../contexts';
import PaginationComponent from '../../../../components/Pagination';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import ButtonDelete from '../../components/Button/ButtonDelete';

const { Text } = Typography;

const ListReview = () => {
    const { locale } = useContextGlobal();
    const intl = useIntl();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;
    const search = params.get('search') || '';
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState('');
    const { loading, deleteReview,restoreReview,loadingDelete,loadingRestore } = useReview(); // Use the useReview hook
    const [reviewBannedId, setReviewBannedId] = useState<number|string>(0);
    const [reviewRestoreId, setReviewRestoreId] = useState<number|string>(0);
    useEffect(() => {
        if (reviewBannedId !== 0) {
            deleteReview(reviewBannedId);
        }
        if(reviewRestoreId !== 0) {
            restoreReview(reviewRestoreId);
        }
    }, [reviewBannedId, reviewRestoreId]);
    useEffect(() => {
        if (!loadingDelete && reviewBannedId !== 0) {
            setReviewBannedId(0);
        }
        if (!loadingRestore && reviewRestoreId !== 0) {
            setReviewRestoreId(0);
        }
    }, [loadingDelete,loadingRestore]);
    const { data: cachingReviewsData, isLoading } = useQueryConfig(
        [QUERY_KEY, `admin/list/all/reviews?page=${page}&search=${search}`],
        `api/review?include=user,product&paginator=true&per_page=10&page=${page}&with_trash=true&times=review&search=${search}`,
    );

    const totalItems = cachingReviewsData?.data?.reviews?.paginator?.total_item || 0;
    const pageSize = cachingReviewsData?.data?.reviews?.paginator?.per_page || 10;
    const [reviews, setReviews] = useState<IReview[]>([]);
    useEffect(() => {
        if (cachingReviewsData?.data?.reviews?.data) {
            setReviews([...cachingReviewsData?.data?.reviews?.data]);
        }
    }, [cachingReviewsData]);
    const handlePageChange = (page: number) => {
        params.set('page', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };
    const handleDeleteReview = async (id: string | number) => {
        setReviewBannedId(id);
    }
    const handleRestoreReview = async (id: string | number) => {
        setReviewRestoreId(id);
    }
    const handleSearch = () => {
        params.set('search',searchKey);
        navigate(`?${params.toString()}`, { replace: true });
    }
    const columns = [
        {
            title: <FormattedMessage id="review.table.product" />,
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        {/* Display the product image */}
                        <img
                            src={record.product.image_url}
                            alt="Product"
                            style={{ width: '250px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <br />
                    </div>
                </div>
            ),
        },
        {
            title: <FormattedMessage id="review.table.title" />,
            dataIndex: 'title',
            key: 'title',
            render: (_: any, record: IReview) => (
                <Text style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{record.title}</Text>
            ),
        },
        {
            title: <FormattedMessage id="review.table.text" />,
            dataIndex: 'text',
            key: 'text',
            render: (_: any, record: IReview) => (
                <Text style={{ fontStyle: 'italic', fontSize: '14px', color: '#555' }}>{record.text}</Text>
            ),
        },
        {
            title: <FormattedMessage id="review.table.rating" />,
            dataIndex: 'rating',
            key: 'rating',
            width: 150,
            render: (rating: number) => (
                <div>
                    {Array.from({ length: rating }, (_, index) => (
                        <StarFilled key={index} style={{ color: 'gold', width: '20px' }} />
                    ))}
                </div>
            ),
        },
        {
            title: <FormattedMessage id="review.table.action" />,
            key: 'actions',
            render: (_: any, record: any) => {
                let btnRestore =  (
                    <Button onClick={() => handleRestoreReview(record?.id)} className="w-[50px] h-[40px] font-medium">
                       <Power />
                    </Button>
                );
                let btnBan = (
                    <Button onClick={() => handleDeleteReview(record?.id)} className="w-[50px] h-[40px] font-medium">
                        <Ban />
                    </Button>
                );
                if(loadingDelete && record?.id === reviewBannedId){
                    btnBan = <ButtonDelete loading={true} />
                }else if (loadingDelete && record?.id !== reviewBannedId){
                    <Button  className="w-[50px] h-[40px] font-medium">
                        <Power />
                    </Button>
                }
                if(loadingRestore && record?.id === reviewRestoreId){
                    btnRestore = <ButtonDelete loading={true} />
                }else if (loadingRestore && record?.id !== reviewRestoreId){
                    <Button  className="w-[50px] h-[40px] font-medium">
                        <Power />
                    </Button>
                }
                return (
                    <div className="flex-row-center gap-x-5">
                        {record?.deleted_at ? btnRestore : btnBan}
                        <ButtonEdit>
                            <Link to={`/detail/${record?.product?.slug}`}>
                                <EyeOutlined />
                            </Link>
                        </ButtonEdit>
                    </div>
                );
            },
        },
    ];
    if (isLoading) {
        return <LoadingPage />;
    }
    return (
        <div style={{ padding: '20px' }}>
            <Heading>
                <FormattedMessage id="review.List_Review" />
            </Heading>
            <div className="relative text-end">
                <input
                    className={`w-[400px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    placeholder={intl.formatMessage({ id: 'review.search' })}
                    onChange={(e:any) => setSearchKey(e?.target?.value)}
                />
                <Search onClick={handleSearch} className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                <Link to="/admin/list-review" className=' absolute rounded-md top-1/2 -translate-y-1/2 mx-2 h-[50px] w-[50px] flex items-center justify-center right-10 placeholder-opacity-70 '><CircleX /></Link>
            </div>
            
            {loading ? (
                <LoadingBlock />
            ) : (
                <section>
                    <TableAdmin
                        columns={columns}
                        dataSource={reviews}
                        pagination={false}
                        rowKey="id" // Ensure each row has a unique key
                    />
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
        </div>
    );
};

export default ListReview;
