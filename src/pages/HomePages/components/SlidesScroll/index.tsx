import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';

import { Scrollbar, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlidesScroll({ children, className }: { children: ReactNode; className: string }) {
    return (
        <>
            <div className="relative">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    scrollbar={{
                        hide: true,
                        draggable: true,
                    }}
                    navigation={{
                        nextEl: '.next-slider',
                        prevEl: '.pre-slider',
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 12,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                    }}
                    modules={[Scrollbar, Navigation]}
                    className={className}
                >
                    {children}
                </Swiper>
                <div className="absolute right-0 -top-[70px] z-10 flex-row-center gap-x-5">
                    <div
                        className="pre-slider w-[48px] h-[48px] rounded-full bg-whitesmoke 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]"
                    >
                        <ChevronLeft />
                    </div>
                    <div
                        className="next-slider w-[48px] h-[48px] rounded-full bg-whitesmoke 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]"
                    >
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </>
    );
}
