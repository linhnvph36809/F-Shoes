import { FormattedMessage } from 'react-intl';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import ClassicsSpotlight from './ClassicsSpotlight';
import Heading from './components/Heading';
import Outstanding from './components/Outstanding';
import SlidesScroll from '../../../components/SlidesScroll';
import SkeletonComponent from '../../Admin/components/Skeleton';
import { formatPrice } from '../../../utils';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';
import { IProduct } from '../../../interfaces/IProduct.ts';
import { ICategory } from '../../../interfaces/ICategory.ts';
import { QUERY_KEY as QUERY_KEY_PRODUCT } from '../../../hooks/useProduct.tsx';

const HomePage = () => {
    const { data: data1, isFetching: fetchingDisplay1 } = useQueryConfig(
        [QUERY_KEY_PRODUCT, `list-products-display-1`],
        `api/display/home-page/products?serial=1`,
    );
    const { data: data2, isFetching: fetchingDisplay2 } = useQueryConfig(
        [QUERY_KEY_PRODUCT, `list-products-display-2`],
        `api/display/home-page/products?serial=2`,
    );
    const { data: data3, isFetching: fetchingDisplay3 } = useQueryConfig(
        ['products', `list-products-display-3`],
        `api/display/home-page/products?serial=3`,
        {
            cacheTime: 1000 * 60 * 10,
            staleTime: 1000 * 60 * 10,
            retry: false,
        },
    );
    const category1: ICategory = data1?.data?.category.category;
    const category2: ICategory = data2?.data?.category.category;
    const category3: ICategory = data3?.data?.category.category;
    const productsDisplay1 = data1?.data?.category?.products || [];
    const productsDisplay2 = data2?.data?.category?.products || [];
    const productsDisplay3 = data3?.data?.category?.products || [];
    console.log(productsDisplay1);

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
                        <Heading title={category1?.name} />
                        <SlidesScroll
                            className="slidesProducts pb-20"
                            nextEl="next-trending-this-week"
                            prevEl="pre-trending-this-week"
                        >
                            {fetchingDisplay1 ? (
                                <SkeletonComponent />
                            ) : (
                                productsDisplay1.map((item: IProduct) => (
                                    <SwiperSlide key={item.id}>
                                        <div>
                                            <Link to={`detail/${item.slug}`} className="flex flex-col justify-between">
                                                <div>
                                                    <img
                                                        src={item.image_url}
                                                        alt=""
                                                        className="h-[678px] object-cover"
                                                    />
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
                                                        {item.sale_price
                                                            ? formatPrice(item.sale_price)
                                                            : formatPrice(item.price)}{' '}
                                                        ₫
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
                    <Heading title={category3?.name} />
                </div>
                <ClassicsSpotlight products={productsDisplay3} loading={fetchingDisplay3} category={category3} />
            </section>
            <section className="container">
                <div>
                    <Heading title={category2?.name} />
                    <SlidesScroll
                        className="slidesShopBySport pb-12 mb-20"
                        nextEl="next-shop-by-sport"
                        prevEl="pre-shop-by-sport"
                    >
                        {fetchingDisplay2 ? (
                            <SkeletonComponent />
                        ) : (
                            productsDisplay2.map((item: IProduct, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <img src={item.image_url} alt="" className="h-[678px] object-cover" />
                                        <Link
                                            to={`detail/${item.slug}`}
                                            className="absolute left-[5%] bottom-[5%] px-8 py-4
                                            bg-white rounded-[30px] color-primary text-[12px] font-semibold
                                            hover:bg-[#cacacb] transition-global"
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
                    <Heading title={<FormattedMessage id="title.Don't Miss" />} />
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
