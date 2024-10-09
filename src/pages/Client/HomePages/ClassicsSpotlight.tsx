import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';
import useProduct from '../../../hooks/useProduct.tsx';


export default function ClassicsSpotlight() {
    const {bestSellingProducts } = useProduct();
    console.log(bestSellingProducts);
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
                {bestSellingProducts.map((item) => (
                    <SwiperSlide>
                        <img
                            src={item.image_url}
                            alt=""
                            className="w-[500px]"
                        />

                    </SwiperSlide>
                ))}






            </Swiper>
        </>
    );
}
