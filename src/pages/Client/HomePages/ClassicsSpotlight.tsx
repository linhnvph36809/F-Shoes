import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import SkeletonComponent from '../../Admin/components/Skeleton';
import { Link } from 'react-router-dom';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';
import { IProduct } from '../../../interfaces/IProduct.ts';


export default function ClassicsSpotlight() {
    const { data: bestSelling, isFetching: fetchBestSellingProducts } = useQueryConfig(
        `home-best__selling__products`,
        `api/best-selling/products`,
        {
            cacheTime: 1000 * 60 * 10,
            staleTime: 1000 * 60 * 10,
            retry: false,
        },
    );
    let bestSellingProducts = bestSelling?.data?.products || [];    
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                }}
                className="classicsSpotlight"
            >
                {fetchBestSellingProducts ? (
                    <SkeletonComponent />
                ) : (
                    bestSellingProducts.map((item: IProduct) => (
                        <SwiperSlide key={item.id}>
                            <Link to={`detail/${item.slug}`}>
                                <img src={item.image_url} alt="" className="w-[500px]" />
                            </Link>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </>
    );
}
