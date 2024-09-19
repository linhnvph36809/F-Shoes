import CartItem from './components';
import Summary from './components/BoxSummary';
import Heading from '../HomePages/components/Heading';
import SlidesScroll from '../../components/SlidesScroll';
import { SwiperSlide } from 'swiper/react';

const Cart = () => {
    const product = {
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/29bcefdd-ff30-466f-abfb-c4e2759910de/free-rn-nn-road-running-shoes-jt4vDT.png',
        name: 'Nike Free RN NN',
        description: "Women's Road Running Shoes",
        color: 'Light Silver/Jade Horizon',
        size: '36',
        quantity: '1',
        price: '2,929,000₫',
    };

    const subtotal = '2,929,000₫';
    const delivery = '250,000₫';
    const total = '3,179,000₫';

    return (
        <div className="container">
            <div className="container mx-auto" style={{ width: '1100px' }}>
                <div className="flex gap-10">
                    <div style={{ width: '733px' }}>
                        <h2 className="text-[24px] font-bold m-6">Bag</h2>
                        <CartItem product={product} />
                    </div>

                    <div style={{ width: '350px' }}>
                        <Summary subtotal={subtotal} delivery={delivery} total={total} />
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-[24px] ">Favourites</h2>
                    <p className="color-gray text-[15px]">
                        Want to view your favourites?{' '}
                        <a href="#" className="text-blue-500">
                            Join us
                        </a>{' '}
                        or{' '}
                        <a href="#" className="text-blue-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
            <div className="my-20">
                <div>
                    <Heading title="You Might Also Like" />
                    <SlidesScroll className="slidesProducts pb-20">
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
        </div>
    );
};

export default Cart;
