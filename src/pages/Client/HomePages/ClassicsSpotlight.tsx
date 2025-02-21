import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Navigation } from 'swiper/modules';
import SkeletonComponent from '../../Admin/components/Skeleton';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../interfaces/IProduct.ts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ICategory } from '../../../interfaces/ICategory.ts';

type Props = {
    products: IProduct[] | [];
    category?: ICategory | null;
    loading: boolean;
};
export default function ClassicsSpotlight({ products, loading }: Props) {
    return (
        <>
            <div className="relative">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode, Navigation]}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.pre-best-selling',
                        prevEl: '.next-best-selling',
                    }}
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
                    ) : (
                        products.map((item: IProduct) => (
                            <SwiperSlide key={item.id}>
                                <Link to={`detail/${item.slug}`}>
                                    <img src={item.image_url} alt="" className="w-[500px] h-[400px] object-cover" />
                                </Link>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
                <div
                    className={`absolute top-1/2 -translate-y-1/2 z-10 left-10 next-best-selling md:w-[40px] sm:w-[30px] md:h-[40px] sm:h-[30px] rounded-full bg-gray-300 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]`}
                >
                    <ChevronLeft />
                </div>
                <div
                    className={`absolute right-10 top-1/2 -translate-y-1/2 z-10 pre-best-selling md:w-[40px] sm:w-[30px] md:h-[40px] sm:h-[30px] rounded-full bg-gray-300 
                        flex-row-center justify-center transition-global hover:cursor-pointer hover:bg-[#e5e5e5]`}
                >
                    <ChevronRight />
                </div>
            </div>
        </>
    );
}
