import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';

export default function ClassicsSpotlight() {
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
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_2279,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png"
                        alt=""
                        className="w-[500px]"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
