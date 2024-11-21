import { SwiperSlide } from 'swiper/react';

import Heading from './Heading';
import SlidesScroll from './../../../components/SlidesScroll/index';
import MemberBenefits from './MemberBenefits';
import { IProduct } from '../../../interfaces/IProduct.ts';
import SkeletonComponent from '../../Admin/components/Skeleton';
import { formatPrice, formatTime } from '../../../utils';
import useCookiesConfig from '../../../hooks/useCookiesConfig.tsx';
import { COOKIE_USER } from '../../../constants';
import { IUser } from '../../../interfaces/IUser.ts';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';

const ProfilePage = () => {
    const { cookies } = useCookiesConfig(COOKIE_USER);
    const userNameCookie = cookies?.userName;
    const { data, isFetching } = useQueryConfig(
        'user-profile',
        'api/auth/me?include=profile,favoriteProducts&times=user',
        {
            cacheTime: 1000 * 60 * 10,
            staleTime: 1000 * 60 * 10,
        },
    );

    let userD: IUser = {
        id: '',
        avatar_url: '',
        nickname: '',
        name: '',
        email: '',
        email_verified_at: '',
        google_id: '',
        status: '',
        profile: {
            given_name: '',
            family_name: '',
            detail_address: '',
            birth_date: '',
        },
        favoriteProducts: [],
        created_at: '',
    };

    if (data?.data.user) {
        userD = data?.data.user;
    }
    let listFavoriteProducts: Array<IProduct> = [];

    if (data?.data.user.favoriteProducts) {
        listFavoriteProducts = data?.data.user.favoriteProducts;
    }

    return (
        <>
            <div className="bg-white w-full p-6 mt-0 rounded-lg shadow-md relative">
                <div className="flex items-center">
                    <div className="w-40 h-40 bg-gray-200 rounded-full ">
                        {' '}
                        <img className="w-full h-full object-cover rounded-full" src={userD?.avatar_url} alt="" />
                    </div>
                    <div className="ml-8">
                        <Heading title={userD.name ? userD.name : userNameCookie} />
                        <p className="text-[16px] font-medium text-gray-500">
                            Fshoes Member Since {formatTime(userD?.created_at)}
                        </p>
                    </div>
                </div>
                <div className="my-20">
                    <div>
                        <Heading title="Favourites" />
                        {isFetching ? (
                            <div className="py-8">
                                <SkeletonComponent />
                            </div>
                        ) : (
                            <SlidesScroll className="slidesProducts pb-20 mt-[50px]">
                                {listFavoriteProducts.map((item: IProduct) => (
                                    <SwiperSlide>
                                        <div>
                                            <a href={`detail/${item.slug}`}>
                                                <div>
                                                    <img src={item.image_url} alt="" />
                                                </div>
                                                <div>
                                                    <h3 className="text-15px color-primary font-medium pt-4">
                                                        {item.name}
                                                    </h3>
                                                    <h5 className="text-[#707072] text-15px">
                                                        {item?.categories
                                                            ? item?.categories.map((cat, index, array) => {
                                                                  if (array.length < 2) {
                                                                      return ' ' + cat?.name;
                                                                  } else {
                                                                      if (index == 2) return;
                                                                      if (index == 1) return ' ' + cat?.name;
                                                                      return ' ' + cat?.name + ',';
                                                                  }
                                                              })
                                                            : ' '}
                                                    </h5>
                                                    <h3 className="text-15px color-primary font-medium mt-3">
                                                        {formatPrice(item.price)} ₫
                                                    </h3>
                                                </div>
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </SlidesScroll>
                        )}
                    </div>
                </div>
                <MemberBenefits />
            </div>
        </>
    );
};

export default ProfilePage;
