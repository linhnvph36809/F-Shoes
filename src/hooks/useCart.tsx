import { useState } from 'react';

import { tokenManagerInstance } from '../api';

const API_CART = '/api/cart';

const useCart = () => {
    const [carts, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllCart = async (userId: string | number) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_CART + `?user_id=${userId}`);
            console.log(userId);
            setCart(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postCart = async (cart: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_CART, cart);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const putCart = async (id: string | number, quantity: { quantity: number }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_CART + `/${id}`, quantity);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCart = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_CART + `/${id}`);
            setCart([])
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        carts,
        loading,
        postCart,
        getAllCart,
        putCart,
        deleteCart,
    };
};

export default useCart;
