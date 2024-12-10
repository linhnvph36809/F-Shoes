import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';

import { Scrollbar, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlidesScroll({
    children,
    className,
    nextEl = 'next',
    prevEl = 'prev',
}: {
    children: ReactNode;
    className: string;
    nextEl?: string;
    prevEl?: string;
}) {
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
                        nextEl: `.${nextEl}`,
                        prevEl: `.${prevEl}`,
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
                <div className="absolute right-0 -top-[65px] z-10 flex-row-center gap-x-5">
                    <div
                        className={`${prevEl} pre-slider md:w-[48px] sm:w-[40px] md:h-[48px] sm:h-[40px] rounded-full bg-whitesmoke 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]`}
                    >
                        <ChevronLeft />
                    </div>
                    <div
                        className={`${nextEl} md:w-[48px] sm:w-[40px] md:h-[48px] sm:h-[40px] rounded-full bg-whitesmoke 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]`}
                    >
                        <ChevronRight />
                    </div>
                </div>
            </div>
        </>
    );
}
