import { Dropdown, Menu, Skeleton, Collapse } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Ellipsis, Heart, Star } from 'lucide-react';

import './style.scss';

const { Panel } = Collapse;

import useReview, { QUERY_KEY } from '../../../hooks/useReview';
import ReviewForm from '../../../components/FormReview';
import { useContextGlobal } from '../../../contexts';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { formatTime } from '../../../utils';
import { FormattedMessage } from 'react-intl';

const Reviews = ({ productId }: { productId?: string | number }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }
    const { loading, ownerDeleteReview : deleteReview, postReview, postLikeReview } = useReview();
    const { data, refetch } = useQueryConfig(
        [QUERY_KEY, `get-review/${id}`],
        `/api/product/${id}/reviews?times=review`,
    );
    const { user } = useContextGlobal();

    const starElements = (rating: number) => {
        const list = [];
        for (let i = 0; i < 5; i++) {
            list.push(<Star key={i} className={`w-[16px] ${i < rating && 'text-yellow-500'}`} />);
        }
        return list;
    };

    const averageRating: any = useMemo(() => {
        if (data?.data?.reviews?.length === 0) return 0;
        const total = data?.data?.reviews?.reduce((sum: number, item: any) => sum + item.rating, 0);
        return (total / data?.data?.reviews?.length).toFixed(1);
    }, [slug, data]);

    const handleDeleteReview = (id: number) => {
        deleteReview(id);
        refetch();
    };

    const handleLikeReview = (id: number) => {
        if (user) {
            postLikeReview(id);
            refetch();
        } else {
            navigate('/authentication');
        }
    };

    return (
        <ul>
            <Collapse
                defaultActiveKey={['2']}
                style={{
                    border: 0,
                    padding: '25px 0',
                    background: '#fff',
                }}
            >
                <Panel
                    showArrow={false}
                    header={
                        <div
                            className="flex-row-center justify-between color-primary text-[18px]
                            font-medium"
                        >
                            {<FormattedMessage id="body.Detail.Free Delivery and Returns" />}
                            <div className="flex-row-center gap-x-4">
                                <ChevronDown />
                            </div>
                        </div>
                    }
                    key="1"
                >
                    <div>
                        <p className="color-primary text-[16px] font-medium my-8">
                            {
                                <FormattedMessage id="body.Detail.Your order of 5.000.000₫ or more gets free standard delivery." />
                            }
                        </p>
                        <ul className="list-disc list-outside pl-10 my-8">
                            <li className="color-primary text-16px">
                                {<FormattedMessage id="body.Detail.Standard delivered 4-5 Business Days" />}
                            </li>
                            <li className="color-primary text-16px">
                                {' '}
                                {<FormattedMessage id="body.Detail.Express delivered 2-4 Business Days" />}
                            </li>
                        </ul>
                        <p className="color-primary font-medium text-[16px] my-8">
                            {
                                <FormattedMessage id="body.Detail.Orders are processed and delivered Monday-Friday (excluding public holidays)" />
                            }
                        </p>
                    </div>
                </Panel>
                <Panel
                    showArrow={false}
                    header={
                        <div
                            className="flex-row-center justify-between color-primary text-[18px]
                            font-medium"
                        >
                            {<FormattedMessage id="body.Detail.Reviews" />} {data?.data?.reviews?.length}
                            <div className="flex-row-center gap-x-4">
                                <span className="flex-row-center gap-x-1">
                                    {starElements(isNaN(averageRating) ? 0 : Math.floor(averageRating))}
                                </span>
                                <ChevronDown />
                            </div>
                        </div>
                    }
                    key="2"
                >
                    <div>
                        <div className="my-8 h-[350px] overflow-auto relative">
                            <div className="flex-row-center gap-x-6">
                                <p className="text-[#d33918] text-[16px] font-medium">
                                    {isNaN(averageRating) ? 0 : averageRating} <FormattedMessage id="Stars" />
                                </p>
                            </div>
                            {user?.id ? (
                                <ReviewForm productId={productId} isUpdate={false} handleSubmit={postReview} />
                            ) : (
                                ''
                            )}
                            <div>
                                {loading ? (
                                    <Skeleton className="mt-5" />
                                ) : (
                                    data?.data?.reviews.map((review: any, index: number) => (
                                        <div key={index} className="my-12">
                                            <div>
                                                <div>
                                                    <img
                                                        src={review.user.avatar_url}
                                                        alt=""
                                                        className="w-[50px] h-[50px] object-cover rounded-full mb-3"
                                                    />
                                                </div>
                                                <p className="color-primary text-16px font-medium mb-3">
                                                    {review.user.name}
                                                </p>
                                            </div>
                                            <div className="flex-row-center justify-between mb-3">
                                                <span className="flex gap-x-1">{starElements(review.rating)}</span>
                                                <div className="flex gap-x-2">
                                                    <p
                                                        className="flex items-center gap-x-2 text-[14px] font-medium pr-2"
                                                        onClick={() => handleLikeReview(review?.id)}
                                                    >
                                                        <Heart
                                                            className={`"w-[15px] ${review?.liked ? 'text-rose-500' : ''
                                                                }  hover:cursor-pointer" `}
                                                        />{' '}
                                                        {review.likes_count}
                                                    </p>

                                                    {user?.id === review?.user?.id ? (
                                                        <p className="hover:cursor-pointer hover:text-gray-500 transition-global">
                                                            <Dropdown
                                                                overlay={
                                                                    <Menu>
                                                                        <Menu.Item
                                                                            key="1"
                                                                            onClick={() =>
                                                                                handleDeleteReview(review?.id)
                                                                            }
                                                                        >
                                                                            {
                                                                                <FormattedMessage id="body.Reviews.Delete" />
                                                                            }
                                                                        </Menu.Item>
                                                                    </Menu>
                                                                }
                                                                trigger={['click']}
                                                            >
                                                                <Ellipsis />
                                                            </Dropdown>
                                                        </p>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-[13px] color-gray mb-2">
                                                {formatTime(review.created_at)}
                                            </p>
                                            <p className="color-primary text-[16px]">{review.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </ul>
    );
};
export default Reviews;
