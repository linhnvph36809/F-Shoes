import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';
import SkeletonComponent from "../../Admin/components/Skeleton";
import {Link} from "react-router-dom";
import useHome from "../../../hooks/page/useHome.tsx";


export default function ClassicsSpotlight() {
    const {loading,bestSellingProducts } = useHome();

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
                {loading ? (
                    <SkeletonComponent />
                ) : bestSellingProducts.map(item => (
                    <SwiperSlide key={item.id}>
                        <Link to={`detail/${item.slug}`}>
                            <img
                                src={item.image_url}
                                alt=""
                                className="w-[500px]"
                            />
                        </Link>

                    </SwiperSlide>
                ))}


            </Swiper>
        </>
    );
}
