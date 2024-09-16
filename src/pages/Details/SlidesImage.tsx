import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { Navigation, Thumbs } from 'swiper/modules';
import { Image } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlidesImage() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <>
            <div className="relative flex gap-x-10 md:h-[669px] sm:h-[300px]">
                <Swiper
                    direction="vertical"
                    onSwiper={setThumbsSwiper}
                    spaceBetween={30}
                    slidesPerView={6}
                    freeMode={true}
                    loop={true}
                    navigation={true}
                    watchSlidesProgress={true}
                    modules={[Navigation, Thumbs]}
                    className="slidesImageChildren md:w-[80px] sm:w-[40px]"
                >
                    <SwiperSlide>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2aa26621-d74e-4242-a879-3a8583d923b3/WMNS+AIR+MAX+90+NN.png"
                            className="rounded	 hover:cursor-pointer"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80bc90db-df6d-4f96-a9f4-401c5749a169/WMNS+AIR+MAX+90+NN.png"
                            className="rounded	 hover:cursor-pointer"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a20f4f6-a444-41e9-acad-f0196598899b/WMNS+AIR+MAX+90+NN.png"
                            className="rounded hover:cursor-pointer"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a34cde44-715a-43b7-9d46-6e2150a83cec/WMNS+AIR+MAX+90+NN.png"
                            className="rounded hover:cursor-pointer"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cdbad85e-b793-4645-9a68-cdcef8ec41d5/WMNS+AIR+MAX+90+NN.png"
                            className="rounded hover:cursor-pointer"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/93e0bf9b-6bbc-4417-a43f-d020459de1d1/WMNS+AIR+MAX+90+NN.png"
                            className="rounded hover:cursor-pointer"
                        />
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    navigation={{
                        nextEl: '.next-slider-large',
                        prevEl: '.pre-slider-large',
                    }}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[Navigation, Thumbs]}
                    className="slidesImage w-full flex-1 rounded-xl"
                >
                    <SwiperSlide>
                        <Image
                            className="rounded-xl hover:cursor-pointer"
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2aa26621-d74e-4242-a879-3a8583d923b3/WMNS+AIR+MAX+90+NN.png"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded-xl hover:cursor-pointer"
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80bc90db-df6d-4f96-a9f4-401c5749a169/WMNS+AIR+MAX+90+NN.png"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded-xl hover:cursor-pointer"
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a20f4f6-a444-41e9-acad-f0196598899b/WMNS+AIR+MAX+90+NN.png"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded-xl hover:cursor-pointer"
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a34cde44-715a-43b7-9d46-6e2150a83cec/WMNS+AIR+MAX+90+NN.png"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded-xl hover:cursor-pointer"
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cdbad85e-b793-4645-9a68-cdcef8ec41d5/WMNS+AIR+MAX+90+NN.png"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded-xl hover:cursor-pointer"
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/93e0bf9b-6bbc-4417-a43f-d020459de1d1/WMNS+AIR+MAX+90+NN.png"
                        />
                    </SwiperSlide>
                </Swiper>
                <div className="absolute right-8 bottom-8 z-10 flex-row-center gap-x-4">
                    <div
                        className="pre-slider-large w-[35px] h-[35px] rounded-full bg-white 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]"
                    >
                        <ChevronLeft />
                    </div>
                    <div
                        className="next-slider-large w-[35px] h-[35px] rounded-full bg-white 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]"
                    >
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </>
    );
}
