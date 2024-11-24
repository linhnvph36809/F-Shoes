import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useContextGlobal } from '../../../contexts';
import CartItem from './components';
import Summary from './components/BoxSummary';
import Heading from '../HomePages/components/Heading';
import SlidesScroll from '../../../components/SlidesScroll';
import { SwiperSlide } from 'swiper/react';
import useCart from '../../../hooks/useCart';
import LoadingBlock from '../../../components/Loading/LoadingBlock';

const Cart = () => {
    const { loading, carts, getAllCart, deleteCart } = useCart();
    const { user } = useContextGlobal();
    const handleDeleteCart = (id: string | number) => {
        deleteCart(id);
        handeGetAllCart();
    };

    const handeGetAllCart = () => {
        if (user?.id) {
            getAllCart(user.id);
        }
    };

    useEffect(() => {
        handeGetAllCart();
    }, [user]);

    const handleTotalPrice = useMemo(() => {
        return carts.reduce((sum, curr) => {
            if (curr?.product?.price) {
                return sum + curr.product.price * curr.quantity;
            } else if (curr?.product_variation?.price) {
                return sum + curr.product_variation.price * curr.quantity;
            }
            return sum;
        }, 0);
    }, [carts, user]);

    return (
        <div className="container">
            <div className="container mx-auto" style={{ width: '1100px' }}>
                <div className="flex gap-10">
                    <div style={{ width: '733px' }}>
                        <h2 className="text-[24px] font-bold m-6">Bag</h2>
                        <div className="relative min-h-[500px]">
                            {carts?.map((cart: any) => (
                                <CartItem
                                    product={cart}
                                    handleDeleteCart={handleDeleteCart}
                                    handeGetAllCart={handeGetAllCart}
                                />
                            ))}
                            {loading && <LoadingBlock />}
                        </div>
                    </div>

                    <div style={{ width: '350px' }}>
                        <Summary total={handleTotalPrice} />
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
                        <Link to="/authentication" className="text-blue-500">
                            Sign in
                        </Link>
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
