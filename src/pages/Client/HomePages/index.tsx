import { SwiperSlide } from 'swiper/react';
import ClassicsSpotlight from './ClassicsSpotlight';
import Heading from './components/Heading';
import Outstanding from './components/Outstanding';
import SlidesScroll from '../../../components/SlidesScroll';

import SkeletonComponent from '../../Admin/components/Skeleton';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';
import { IProduct } from '../../../interfaces/IProduct.ts';
import { FormattedMessage } from 'react-intl';

const HomePage = () => {
    const { data: thisWeek, isFetching: fetchingThisWeekProducts } = useQueryConfig(
        `home-list__this__week__products`,
        `api/trend/this-week/products?include=categories`,
    );
    const { data: bySport, isFetching: fetchProductsBySport } = useQueryConfig(
        `home-shop__by__sports__products`,
        `api/shop-by-sports/products`,
    );
    let thisWeekProducts = thisWeek?.data?.products || [];
    let productsBySport = bySport?.data?.products || [];

    return (
        <>
            <section className="container">
                <div>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1719,c_limit/cde1c26f-aaf1-4449-912e-e5f0debb75d8/nike-just-do-it.png"
                        alt=""
                    />
                </div>
                <Outstanding
                    title={<FormattedMessage id="body.EXTRA-ORDINARY" />}
                    category={<FormattedMessage id="body.lifestyleRunningShoes" />}
                    description={
                        <FormattedMessage id="body.Meet the latest collection of retro running inspired shoes.The unlikely heroes of your easiest styling hack." />
                    }
                />

                <div className="my-20">
                    <div>
                        <Heading title={<FormattedMessage id="title.Trending This Week" />} />
                        <SlidesScroll
                            className="slidesProducts pb-20"
                            nextEl="next-trending-this-week"
                            prevEl="pre-trending-this-week"
                        >
                            {fetchingThisWeekProducts ? (
                                <SkeletonComponent />
                            ) : (
                                thisWeekProducts.map((item: IProduct) => (
                                    <SwiperSlide key={item.id}>
                                        <div>
                                            <Link to={`detail/${item.slug}`}>
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
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))
                            )}
                        </SlidesScroll>
                    </div>
                </div>
            </section>
            <section className="my-20">
                <div className="container">
                    <Heading title={<FormattedMessage id="title.Best Selling" />} />
                </div>
                <ClassicsSpotlight />
            </section>
            <section className="container">
                <div>
                    <Heading title={<FormattedMessage id="title.Shop By Sport" />} />
                    <SlidesScroll
                        className="slidesShopBySport pb-12 mb-20"
                        nextEl="next-shop-by-sport"
                        prevEl="pre-shop-by-sport"
                    >
                        {fetchProductsBySport ? (
                            <SkeletonComponent />
                        ) : (
                            productsBySport.map((item: IProduct, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <img src={item.image_url} alt="" />
                                        <Link
                                            to={`detail/${item.slug}`}
                                            className="absolute left-[8%] bottom-[10%] px-6 py-2
                                bg-white rounded-[30px] color-primary text-[12px] font-semibold
                                hover:bg-[#cacacb]"
                                        >
                                            {<FormattedMessage id="box.Running" />}
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </SlidesScroll>
                </div>
                <div>
                    <Heading title="Don't Miss" />
                    <iframe
                        width={'100%'}
                        height={'950px'}
                        src="https://www.youtube.com/embed/UR9zWdWvRXI?si=mVB6TIue4Mi4_oXE&autoplay=1&mute=1"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen={true}
                    />
                </div>
                <div>
                    <Outstanding
                        title={<FormattedMessage id="body.EARTH TONES" />}
                        category={<FormattedMessage id="body.Jordan Apparel" />}
                        description={
                            <FormattedMessage id="body.Ground your look in earthy tones inspired by outdoor courts. Details like knits, ripcords, and cargo pockets add rich texture to your fit." />
                        }
                    />
                </div>
            </section>
        </>
    );
};

export default HomePage;
