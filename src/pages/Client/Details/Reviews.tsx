import { ChevronDown, Ellipsis, Heart, Star } from 'lucide-react';
import useReview from '../../../hooks/useReview';
import { useMemo } from 'react';
import ReviewForm from '../../../components/FormReview';
import { Dropdown, Menu } from 'antd';
import { useContextGlobal } from '../../../contexts';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { useParams } from 'react-router-dom';

const Reviews = ({ productId }: { productId?: string | number }) => {
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }
    const { loading, deleteReview, putReview, postReview } = useReview();
    const { data } = useQueryConfig('get-review', `/api/product/${id}/reviews?times=review`);
    const { user } = useContextGlobal();
    console.log(data);

    const starElements = (rating: number) => {
        const list = [];
        for (let i = 0; i <= 5; i++) {
            list.push(<Star className={`w-[16px] ${i < rating && 'text-yellow-500'}`} />);
        }
        return list;
    };

    const averageRating: any = useMemo(() => {
        if (data?.data?.reviews?.length === 0) return 0;
        const total = data?.data?.reviews?.reduce((sum: number, item: any) => sum + item.rating, 0);
        return (total / data?.data?.reviews?.length).toFixed(1);
    }, [data]);

    return (
        <ul>
            <li className="py-10 border-b">
                <div
                    className="flex-row-center justify-between color-primary text-[18px]
            font-medium"
                >
                    Free Delivery and Returns <ChevronDown />
                </div>
                <div className="hidden">
                    <p className="color-primary text-16px my-8">
                        Your order of 5.000.000₫ or more gets free standard delivery.
                    </p>
                    <ul className="list-disc list-outside pl-10 my-8">
                        <li className="color-primary text-16px">Standard delivered 4-5 Business Days</li>
                        <li className="color-primary text-16px">Express delivered 2-4 Business Days</li>
                    </ul>
                    <p className="color-primary text-16px my-8">
                        Orders are processed and delivered Monday-Friday (excluding public holidays)
                    </p>
                </div>
            </li>
            <li className="py-10 border-b">
                <div
                    className="flex-row-center justify-between color-primary text-[18px]
            font-medium"
                >
                    Reviews {data?.data?.reviews?.length}
                    <div className="flex-row-center gap-x-4">
                        <span className="flex-row-center gap-x-1">
                            <Star className="w-[16px]" />
                            <Star className="w-[16px]" />
                            <Star className="w-[16px]" />
                            <Star className="w-[16px]" />
                        </span>
                        <ChevronDown />
                    </div>
                </div>
                <div>
                    <div className="my-8 h-[350px] overflow-auto relative">
                        <div className="flex-row-center gap-x-6">
                            <p className="color-primary text-16px">{isNaN(averageRating) ? 0 : averageRating} Stars</p>
                        </div>
                        {user?.id ? (
                            <ReviewForm productId={productId} isUpdate={false} handleSubmit={postReview} />
                        ) : (
                            ''
                        )}
                        <div>
                            {loading ? (
                                <LoadingBlock />
                            ) : (
                                data?.data?.reviews.map((review: any, index: number) => (
                                    <div key={index} className="my-12">
                                        <div>
                                            <div>
                                                <img
                                                    src={review.user.avatar_url}
                                                    alt=""
                                                    className="w-[40px] h-[40px] rounded-full mb-3"
                                                />
                                            </div>
                                            <p className="color-primary text-16px font-medium mb-3">
                                                {review.user.name}
                                            </p>
                                        </div>
                                        <div className="flex-row-center justify-between mb-5">
                                            <span className="flex gap-x-1">{starElements(review.rating)}</span>
                                            <p className="text-16px color-gray">{review.created_at}</p>
                                            <div className="flex gap-x-2">
                                                <p className="flex items-center gap-x-2 text-[12px] pr-2">
                                                    <Heart className="w-[16px] hover:text-red-500 hover:cursor-pointer" />{' '}
                                                    {review.likes_count}
                                                </p>
                                                {user?.id == review?.user?.id ? (
                                                    <p className="hover:cursor-pointer hover:text-gray-500 transition-global">
                                                        <Dropdown
                                                            overlay={
                                                                <Menu>
                                                                    <Menu.Item
                                                                        key="1"
                                                                        onClick={() => deleteReview(review?.id)}
                                                                    >
                                                                        Delete
                                                                    </Menu.Item>
                                                                    <ReviewForm
                                                                        isUpdate
                                                                        defaultValues={review}
                                                                        handleSubmit={putReview}
                                                                    />
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
                                        <p className="color-primary text-16px">{review.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
};
export default Reviews;
