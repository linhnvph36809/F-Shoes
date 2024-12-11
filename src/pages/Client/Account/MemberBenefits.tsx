import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FormattedMessage } from 'react-intl';

const MemberBenefits = () => {
    return (
        <div className="my-20">
            <div>
                {/* Centered Heading */}
                <h2 className="text-[24px] font-semibold mb-8">
                    {<FormattedMessage id="Member Benefits (Coming Soon)" />}
                </h2>

                {/* Slider Component */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={5}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    loop={false}
                    className="slidesProducts"
                >
                    {/* First Slide */}
                    <SwiperSlide>
                        <div className="max-w-[350px] ">
                            <a href="">
                                <div>
                                    <img
                                        className="max-w-[350px] max-h-[250px] object-cover"
                                        src="https://static.nike.com/a/images/w_1920,c_limit/wnvgdvk039burostgbdb/member-home-carousel.jpg"
                                        alt="Member-Only Products"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[16px] text-black font-medium pt-4">
                                        {<FormattedMessage id="Member-Only Products" />}
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>

                    {/* Second Slide */}
                    <SwiperSlide>
                        <div className="max-w-[350px] mx-auto">
                            <a href="">
                                <div>
                                    <img
                                        className="max-w-[350px] max-h-[250px] object-cover"
                                        src="https://static.nike.com/a/images/w_1920,c_limit/gkq1c6xpvais2s9cvre6/member-home-carousel.jpg"
                                        alt="Free Returns With Every Order"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[16px] text-black font-medium pt-4">
                                        {<FormattedMessage id="Free Returns With Every Order" />}
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>

                    {/* Third Slide */}
                    <SwiperSlide>
                        <div className="max-w-[350px] mx-auto">
                            <a href="">
                                <div>
                                    <img
                                        className="max-w-[350px] max-h-[250px] object-cover"
                                        src="https://static.nike.com/a/images/w_1920,c_limit/dwchwjfhrmorbr1qapdx/member-home-carousel.jpg"
                                        alt="Exclusive Deals"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[16px] text-black font-medium pt-4">
                                        {<FormattedMessage id="Exclusive Deals" />}
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>

                    {/* Fourth Slide */}
                    <SwiperSlide>
                        <div className="max-w-[350px] mx-auto">
                            <a href="">
                                <div>
                                    <img
                                        className="max-w-[350px] max-h-[250px] object-cover"
                                        src="https://static.nike.com/a/images/w_1920,c_limit/70c351cb-82c0-49f6-b5b9-6941ed9754bc/member-home-carousel.jpg"
                                        alt="Free Running and Training Apps"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[16px] text-black font-medium pt-4">
                                        {<FormattedMessage id="Free Running and Training Apps" />}
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>

                    {/* Fifth Slide */}
                    <SwiperSlide>
                        <div className="max-w-[350px] mx-auto">
                            <a href="">
                                <div>
                                    <img
                                        className="max-w-[350px] max-h-[250px] object-cover"
                                        src="https://static.nike.com/a/images/w_1920,c_limit/mb8zpthvbkhnfympqhht/member-home-carousel.jpg"
                                        alt="Fshoes Events"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[16px] text-black font-medium pt-4">
                                        {<FormattedMessage id="Fshoes Events" />}
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default MemberBenefits;
