import { useState } from 'react';
import Heading from './Heading';
import { SwiperSlide } from 'swiper/react';
import SlidesScroll from './../../../components/SlidesScroll/index';
import MemberBenefits from './MemberBenefits';

const ProfilePage = () => {
    const [activeMenu, setActiveMenu] = useState('Profile');
    const [activeInterest, setActiveInterest] = useState('All');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleInterestClick = (interest) => {
        setActiveInterest(interest);
    };

    const getMenuClass = (menu) => {
        return activeMenu === menu
            ? 'inline-block py-7 relative text-[16px] font-medium text-gray-500'
            : 'inline-block py-7 relative text-[16px] font-medium color-primary after:transition-all after:duration-300 after:ease-linear after:absolute after:bottom-5 after:w-0 after:h-[2px] after:left-0 after:right-0 after:bg-[#111111] hover:after:w-full nav__menu';
    };

    const getInterestButtonClass = (interest) => {
        return activeInterest === interest
            ? 'px-4 py-2 bg-white text-black rounded font-medium border-2 border-black'
            : 'px-4 py-2 rounded hover:border-gray-300 hover:bg-gray-100 color-gray';
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            {/* Navbar */}
            <nav className="w-full bg-white p-4 flex justify-center items-center">
                <ul className="flex space-x-6 items-center">
                    <li className={getMenuClass('Profile')}>
                        <a href="#profile" onClick={() => handleMenuClick('Profile')}>
                            Profile
                        </a>
                    </li>
                    <li className={getMenuClass('Inbox')}>
                        <a href="#inbox" onClick={() => handleMenuClick('Inbox')}>
                            Inbox
                        </a>
                    </li>
                    <li className={getMenuClass('Orders')}>
                        <a href="#orders" onClick={() => handleMenuClick('Orders')}>
                            Orders
                        </a>
                    </li>
                    <li className={getMenuClass('Favourites')}>
                        <a href="#favourites" onClick={() => handleMenuClick('Favourites')}>
                            Favourites
                        </a>
                    </li>
                    <li className={getMenuClass('Settings')}>
                        <a href="#settings" onClick={() => handleMenuClick('Settings')}>
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Profile Info - Full Width */}
            <div className="bg-white w-full p-6 mt-0 rounded-lg shadow-md relative">
                <div className="flex items-center">
                    <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                        {' '}
                        {/* Thêm overflow-hidden */}
                        <img
                            className="w-full h-full object-cover"
                            src="https://static.nike.com/a/images/w_1920,c_limit/mb8zpthvbkhnfympqhht/member-home-carousel.jpg"
                            alt=""
                        />
                    </div>
                    <div className="ml-8">
                        <Heading title="Nguyễn Thái" />
                        <p className="text-[16px] font-medium text-gray-500">Nike Member Since September 2024</p>
                    </div>
                </div>

                {/* Interests Section */}
                <div className="mt-[50px] flex justify-between items-center w-full">
                    <h3 className="text-[22px] font-medium">Interests</h3>
                    <button className="text-black text-[16px] font-medium hover:text-gray-600">Edit</button>
                </div>

                {/* Interest Buttons */}
                <div className="flex space-x-6 mb-4 mt-[50px] text-[16px] font-medium">
                    <button className={getInterestButtonClass('All')} onClick={() => handleInterestClick('All')}>
                        All
                    </button>
                    <button className={getInterestButtonClass('Sports')} onClick={() => handleInterestClick('Sports')}>
                        Sports
                    </button>
                    <button
                        className={getInterestButtonClass('Products')}
                        onClick={() => handleInterestClick('Products')}
                    >
                        Products
                    </button>
                    <button className={getInterestButtonClass('Teams')} onClick={() => handleInterestClick('Teams')}>
                        Teams
                    </button>
                    <button
                        className={getInterestButtonClass('Athletes')}
                        onClick={() => handleInterestClick('Athletes')}
                    >
                        Athletes
                    </button>
                    <button className={getInterestButtonClass('Cities')} onClick={() => handleInterestClick('Cities')}>
                        Cities
                    </button>
                </div>

                <hr className="my-4 border-gray-300" />

                <p className="color-black text-[16px] font-medium my-[20px]">
                    Add your interests to shop a collection of products that are based on what you're into.
                </p>

                {/* Interest Items */}
                <div className="grid grid-cols-4 gap-8 mt-6">
                    {' '}
                    {/* Increased gap here */}
                    <div className="bg-gray-200 h-[320px] flex items-center justify-center">
                        <span className="text-[18px] font-medium text-gray-500">Add Interests</span>
                    </div>
                    <div className="bg-gray-200 h-[320px]"></div>
                    <div className="bg-gray-200 h-[320px]"></div>
                    <div className="bg-gray-200 h-[320px]"></div>
                </div>
                <div className="my-20 p-[60px]">
                    <div>
                        <Heading title="Favourites" />
                        <SlidesScroll className="slidesProducts pb-20 mt-[50px]">
                            <SwiperSlide>
                                <div>
                                    <a href="">
                                        <div>
                                            <img
                                                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_0.8/h_599,c_limit/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/giannis-freak-6-ep-basketball-shoes-ThjqbM.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-15px color-primary font-medium pt-4">
                                                Giannis Freak 6 (Team Bank) EP
                                            </h3>
                                            <h5 className="text-[#707072] text-15px">Basketball Shoes</h5>
                                            <h3 className="text-15px color-primary font-medium mt-3">3,829,000₫</h3>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <a href="">
                                        <div>
                                            <img
                                                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_0.8/h_599,c_limit/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/giannis-freak-6-ep-basketball-shoes-ThjqbM.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-15px color-primary font-medium pt-4">
                                                Giannis Freak 6 (Team Bank) EP
                                            </h3>
                                            <h5 className="text-[#707072] text-15px">Basketball Shoes</h5>
                                            <h3 className="text-15px color-primary font-medium mt-3">3,829,000₫</h3>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <a href="">
                                        <div>
                                            <img
                                                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_0.8/h_599,c_limit/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/giannis-freak-6-ep-basketball-shoes-ThjqbM.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-15px color-primary font-medium pt-4">
                                                Giannis Freak 6 (Team Bank) EP
                                            </h3>
                                            <h5 className="text-[#707072] text-15px">Basketball Shoes</h5>
                                            <h3 className="text-15px color-primary font-medium mt-3">3,829,000₫</h3>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <a href="">
                                        <div>
                                            <img
                                                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_0.8/h_599,c_limit/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/giannis-freak-6-ep-basketball-shoes-ThjqbM.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-15px color-primary font-medium pt-4">
                                                Giannis Freak 6 (Team Bank) EP
                                            </h3>
                                            <h5 className="text-[#707072] text-15px">Basketball Shoes</h5>
                                            <h3 className="text-15px color-primary font-medium mt-3">3,829,000₫</h3>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <a href="">
                                        <div>
                                            <img
                                                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_0.8/h_599,c_limit/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/giannis-freak-6-ep-basketball-shoes-ThjqbM.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-15px color-primary font-medium pt-4">
                                                Giannis Freak 6 (Team Bank) EP
                                            </h3>
                                            <h5 className="text-[#707072] text-15px">Basketball Shoes</h5>
                                            <h3 className="text-15px color-primary font-medium mt-3">3,829,000₫</h3>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <a href="">
                                        <div>
                                            <img
                                                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_0.8/h_599,c_limit/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/giannis-freak-6-ep-basketball-shoes-ThjqbM.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-15px color-primary font-medium pt-4">
                                                Giannis Freak 6 (Team Bank) EP
                                            </h3>
                                            <h5 className="text-[#707072] text-15px">Basketball Shoes</h5>
                                            <h3 className="text-15px color-primary font-medium mt-3">3,829,000₫</h3>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                        </SlidesScroll>
                    </div>
                </div>
                {/* Member Benefits */}
                <MemberBenefits />
            </div>
        </div>
    );
};

export default ProfilePage;
