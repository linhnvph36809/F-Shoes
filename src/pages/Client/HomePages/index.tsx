import { SwiperSlide } from 'swiper/react';
import ClassicsSpotlight from './ClassicsSpotlight';
import Heading from './components/Heading';
import Outstanding from './components/Outstanding';
import SlidesScroll from '../../../components/SlidesScroll';

import SkeletonComponent from '../../Admin/components/Skeleton';
import { Link } from 'react-router-dom';
import useHome from '../../../hooks/page/useHome.tsx';
import { formatPrice } from '../../../utils';

const HomePage = () => {
    const { loading, thisWeekProducts, productsBySport } = useHome();

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
                    title="EXTRA-ORDINARY"
                    category="Lifestyle Running Shoes"
                    description="Meet the latest collection of retro running inspired shoes.The unlikely heroes of your easiest styling hack."
                />
                {/*<div className="my-20">*/}
                {/*    <Heading title="Featured" />*/}
                {/*    <div className="grid md:grid-cols-3 gap-x-4">*/}
                {/*        <div>*/}
                {/*            <a href="">*/}
                {/*                <div>*/}
                {/*                    <img*/}
                {/*                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/e6eee382-1d15-485f-a5ad-87889f8658cc/nike-just-do-it.jpg"*/}
                {/*                        alt=""*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </a>*/}
                {/*            <div>*/}
                {/*                <h3 className="text-20px font-medium color-primary py-7">For Leading With Style</h3>*/}
                {/*                <a href="#" className="text-[1.3rem] font-medium color-primary">*/}
                {/*                    Explore*/}
                {/*                </a>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <a href="">*/}
                {/*                <div>*/}
                {/*                    <img*/}
                {/*                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/e6eee382-1d15-485f-a5ad-87889f8658cc/nike-just-do-it.jpg"*/}
                {/*                        alt=""*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </a>*/}
                {/*            <div>*/}
                {/*                <h3 className="text-20px font-medium color-primary py-7">For Leading With Style</h3>*/}
                {/*                <a href="#" className="text-[1.3rem] font-medium color-primary">*/}
                {/*                    Explore*/}
                {/*                </a>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <a href="">*/}
                {/*                <div>*/}
                {/*                    <img*/}
                {/*                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/e6eee382-1d15-485f-a5ad-87889f8658cc/nike-just-do-it.jpg"*/}
                {/*                        alt=""*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </a>*/}
                {/*            <div>*/}
                {/*                <h3 className="text-20px font-medium color-primary py-7">For Leading With Style</h3>*/}
                {/*                <a href="#" className="text-[1.3rem] font-medium color-primary">*/}
                {/*                    Explore*/}
                {/*                </a>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="my-20">
                    <div>
                        <Heading title="Trending This Week" />
                        <SlidesScroll className="slidesProducts pb-20">
                            {loading ? (
                                <SkeletonComponent />
                            ) : (
                                thisWeekProducts.map((item) => (
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
                    <Heading title="Best Selling" />
                </div>
                <ClassicsSpotlight />
            </section>
            <section className="container">
                <div>
                    <Heading title="Shop By Sport" />
                    <SlidesScroll className="slidesShopBySport pb-12 mb-20">
                        {loading ? (
                            <SkeletonComponent />
                        ) : (
                            productsBySport.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <img src={item.image_url} alt="" />
                                        <Link
                                            to={`detail/${item.slug}`}
                                            className="absolute left-[8%] bottom-[10%] px-6 py-2
                                bg-white rounded-[30px] color-primary text-[12px] font-semibold
                                hover:bg-[#cacacb]"
                                        >
                                            Running
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
                        title="EARTH TONES"
                        category="Jordan Apparel"
                        description="Ground your look in earthy tones inspired by outdoor courts.
                        Details like knits, ripcords, and cargo pockets add rich texture to your fit."
                    />
                    {/*<div className="mt-20">*/}
                    {/*    <Heading title="Member Benefits" />*/}
                    {/*</div>*/}
                    {/*<SlidesScroll className="pb-12">*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <div className="relative">*/}
                    {/*            <img*/}
                    {/*                src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/cb28c551-b85b-479f-8fc3-40ad4e7c9ca4/nike-just-do-it.jpg"*/}
                    {/*                alt=""*/}
                    {/*            />*/}
                    {/*            <div className="absolute bottom-[30px] left-[30px] text-white font-medium">*/}
                    {/*                <p className="text-[1.2rem] font-bold mb-2">Member Product</p>*/}
                    {/*                <h3 className="text-[2.2rem] mb-8">Your Exclusive Access</h3>*/}
                    {/*                <div>*/}
                    {/*                    <a*/}
                    {/*                        href="#"*/}
                    {/*                        className="inline-block text-[1.2rem] font-bold py-2 px-6 color-primary */}
                    {/*                        bg-white rounded-[30px] hover-opacity"*/}
                    {/*                    >*/}
                    {/*                        Shop*/}
                    {/*                    </a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </SwiperSlide>*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <div className="relative">*/}
                    {/*            <img*/}
                    {/*                src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/cb28c551-b85b-479f-8fc3-40ad4e7c9ca4/nike-just-do-it.jpg"*/}
                    {/*                alt=""*/}
                    {/*            />*/}
                    {/*            <div className="absolute bottom-[30px] left-[30px] text-white font-medium">*/}
                    {/*                <p className="text-[1.2rem] font-bold mb-2">Member Product</p>*/}
                    {/*                <h3 className="text-[2.2rem] mb-8">Your Exclusive Access</h3>*/}
                    {/*                <div>*/}
                    {/*                    <a*/}
                    {/*                        href="#"*/}
                    {/*                        className="inline-block text-[1.2rem] font-bold py-2 px-6 color-primary */}
                    {/*                        bg-white rounded-[30px] hover-opacity"*/}
                    {/*                    >*/}
                    {/*                        Shop*/}
                    {/*                    </a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </SwiperSlide>*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <div className="relative">*/}
                    {/*            <img*/}
                    {/*                src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/cb28c551-b85b-479f-8fc3-40ad4e7c9ca4/nike-just-do-it.jpg"*/}
                    {/*                alt=""*/}
                    {/*            />*/}
                    {/*            <div className="absolute bottom-[30px] left-[30px] text-white font-medium">*/}
                    {/*                <p className="text-[1.2rem] font-bold mb-2">Member Product</p>*/}
                    {/*                <h3 className="text-[2.2rem] mb-8">Your Exclusive Access</h3>*/}
                    {/*                <div>*/}
                    {/*                    <a*/}
                    {/*                        href="#"*/}
                    {/*                        className="inline-block text-[1.2rem] font-bold py-2 px-6 color-primary */}
                    {/*                        bg-white rounded-[30px] hover-opacity"*/}
                    {/*                    >*/}
                    {/*                        Shop*/}
                    {/*                    </a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </SwiperSlide>*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <div className="relative">*/}
                    {/*            <img*/}
                    {/*                src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/h_750,c_limit/cb28c551-b85b-479f-8fc3-40ad4e7c9ca4/nike-just-do-it.jpg"*/}
                    {/*                alt=""*/}
                    {/*            />*/}
                    {/*            <div className="absolute bottom-[30px] left-[30px] text-white font-medium">*/}
                    {/*                <p className="text-[1.2rem] font-bold mb-2">Member Product</p>*/}
                    {/*                <h3 className="text-[2.2rem] mb-8">Your Exclusive Access</h3>*/}
                    {/*                <div>*/}
                    {/*                    <a*/}
                    {/*                        href="#"*/}
                    {/*                        className="inline-block text-[1.2rem] font-bold py-2 px-6 color-primary */}
                    {/*                        bg-white rounded-[30px] hover-opacity"*/}
                    {/*                    >*/}
                    {/*                        Shop*/}
                    {/*                    </a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </SwiperSlide>*/}
                    {/*</SlidesScroll>*/}
                </div>
                {/*<div className="xl:w-[900px] mx-auto mt-5">*/}
                {/*    <div className="grid md:grid-cols-4 sm:grid-cols-2 sm:gap-10 justify-items-center">*/}
                {/*        <div>*/}
                {/*            <h4 className="color-primary mb-4 font-medium text-20px">Icons</h4>*/}
                {/*            <ul>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <h4 className="color-primary mb-4 font-medium text-20px">Icons</h4>*/}
                {/*            <ul>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <h4 className="color-primary mb-4 font-medium text-20px">Icons</h4>*/}
                {/*            <ul>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <h4 className="color-primary mb-4 font-medium text-20px">Icons</h4>*/}
                {/*            <ul>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="#" className="inline-block text-[1.4rem] font-medium mb-3 color-gray">*/}
                {/*                        Air Force 1*/}
                {/*                    </a>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </section>
        </>
    );
};

export default HomePage;
