import { EyeOutlined, StarFilled } from '@ant-design/icons';
import { message, Typography } from 'antd';
import { Search, Trash2 } from 'lucide-react';
import LoadingBlock from '../../../../components/Loading/LoadingBlock';
import useReview, { QUERY_KEY } from '../../../../hooks/useReview';
import { IReview } from '../../../../interfaces/IReview';
import ButtonEdit from '../../components/Button/ButtonEdit';
import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import { Link } from 'react-router-dom';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { handleChangeMessage } from '../../../../utils';
import { showMessageActive } from '../../../../utils/messages';
import { useContextGlobal } from '../../../../contexts';

const { Text } = Typography;

const ListReview = () => {
    const { locale } = useContextGlobal();
    const intl = useIntl();
    const { loading, deleteReview } = useReview(); // Use the useReview hook
    const { data: cachingReviewsData } = useQueryConfig(
        [QUERY_KEY, 'admin/list/all/reviews'],
        'api/review?include=user,product',
    );
    const [reviews, setReviews] = useState<IReview[]>([]);
    useEffect(() => {
        if (cachingReviewsData?.data?.reviews?.data) {
            setReviews([...cachingReviewsData?.data?.reviews?.data]);
        }
    }, [cachingReviewsData]);

    const handleDeleteUser = async (id: string | number) => {
        if (id) {
            showMessageActive(
                handleChangeMessage(
                    locale,
                    'Are you sure you want to delete this Review?',
                    'Bạn có chắc chắn muốn xóa Review này không?',
                ),
                '',
                'warning',
                async () => {
                    try {
                        await deleteReview(id); // Hàm xóa review từ API
                        message.success(
                            handleChangeMessage(locale, 'Review deleted successfully!', 'Xóa Review thành công!'),
                        );
                    } catch (error) {
                        message.error(
                            handleChangeMessage(
                                locale,
                                'An error occurred while deleting the Review. Please try again.',
                                'Đã xảy ra lỗi khi xóa Review. Vui lòng thử lại.',
                            ),
                        );
                    }
                },
            );
        }
    };
    const handleSearch = (e: any) => {
        const originData = JSON.parse(JSON.stringify([...cachingReviewsData?.data?.reviews?.data]));
        if (e.target.value && e.target.value.length > 0) {
            const filtered = originData.filter((item: IReview) => {
                return (
                    item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.text.includes(e.target.value.toLowerCase())
                );
            });
            setReviews([...filtered]);
        } else {
            setReviews([...originData]);
        }
    };
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
            render: (_: any, record: any) => (
                <div className="flex-row-center gap-x-5">
                    <ButtonEdit onClick={() => handleDeleteUser(record.id)}>
                        <Trash2 />
                    </ButtonEdit>
                    <ButtonEdit>
                        <Link to={`/detail/${record?.product?.slug}`}>
                            <EyeOutlined />
                        </Link>
                    </ButtonEdit>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Heading>
                <FormattedMessage id="review.List_Review" />
            </Heading>
            <div className='relative text-end'>
                <input
                    className={`w-[400px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    placeholder={intl.formatMessage({ id: 'review.search' })} onChange={handleSearch} />
                <Search
                    className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global"
                />
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
                </section>
            )}
        </div>
    );
};

export default ListReview;
