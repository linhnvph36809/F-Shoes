import { useMemo, useState } from 'react';

import useCart from '../../../hooks/useCart';
import { useContextGlobal } from '../../../contexts';
import CartItem from './components';
import Summary from './components/BoxSummary';
import useQueryConfig from '../../../hooks/useQueryConfig';
import LoadingPage from '../../../components/Loading/LoadingPage';

const Cart = () => {
    const [cartId, setCartId] = useState<number[]>([]);

    const { deleteCart } = useCart();
    const {
        data: carts,
        isFetching,
        refetch,
    } = useQueryConfig('cart', '/api/cart', {
        cacheTime: 0,
        staleTime: 0,
        retry: false,
    });

    const { user } = useContextGlobal();

    const handleDeleteCart = (idCart: string | number) => {
        setCartId((preIds: number[]) => {
            const newData = preIds.filter((id) => id !== +idCart);
            localStorage.setItem('orderId', JSON.stringify(newData));
            return newData;
        });
        deleteCart(idCart);
        refetch();
    };

    const handleTotalPrice = useMemo(() => {
        if (cartId.length) {
            const newCarts = carts?.data.filter((cart: any) => cartId.includes(cart.id));
            return newCarts?.reduce((sum: any, curr: any) => {
                if (curr?.product?.price) {
                    return sum + (curr.product.sale_price || curr.product.price) * curr.quantity;
                } else if (curr?.product_variation?.price) {
                    return sum + (curr.product_variation.sale_price || curr.product_variation.price) * curr.quantity;
                }
                return sum;
            }, 0);
        } else {
            return 0;
        }
    }, [carts, user, cartId]);


    return (
        <div className="container">
            <div className="container mx-auto" style={{ width: '1100px' }}>
                <div className="flex gap-10">
                    <div style={{ width: '733px' }}>
                        <h2 className="text-[24px] font-bold my-6">Bag</h2>
                        <div className="min-h-[300px]">
                            {carts?.data.length ? (
                                carts?.data.map((cart: any) => (
                                    <CartItem
                                        key={cart.id}
                                        product={cart}
                                        handleDeleteCart={handleDeleteCart}
                                        setCartId={setCartId}
                                        refetch={refetch}
                                    />
                                ))
                            ) : (
                                <p className="text-center color-primary text-[16px]">Emty</p>
                            )}
                            {isFetching && <LoadingPage />}
                        </div>
                    </div>

                    <div style={{ width: '350px' }}>
                        <Summary total={handleTotalPrice} cartId={cartId} />
                    </div>
                </div>
            </div>
            {/* <div className="my-20">
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
            </div> */}
        </div>
    );
};

export default Cart;
