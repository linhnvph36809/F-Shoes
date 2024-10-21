import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { Navigation, Thumbs } from 'swiper/modules';
import { Image } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {IImage} from "../../../interfaces/IImage.ts";

export default function SlidesImage({images} : { images: IImage[] }) {
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
                    {images ? images?.map((item:IImage) => {
                       return  <SwiperSlide key={item.id}>
                            <img
                                src={item.url}
                                className="rounded hover:cursor-pointer"
                            />
                        </SwiperSlide>
                    }) : ''}



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
                    {images ? images?.map((item:IImage) => {
                        return   <SwiperSlide key={item.url}>
                            <Image
                                className="rounded-xl hover:cursor-pointer"
                                src={item.url}
                            />
                        </SwiperSlide>
                    }) : ''}


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
