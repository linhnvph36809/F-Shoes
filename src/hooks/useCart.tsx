import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';
import { useContextGlobal } from '../contexts';

const API_CART = '/api/cart';

const useCart = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { refetchQuantityCart } = useContextGlobal();
    const postCart = async (cart: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_CART, cart);
            showMessageClient('Add to cart successfully', '', 'success');
            refetchQuantityCart();
        } catch (error) {
            if((error as any).response.data.message){
                showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
            }else if((error as any)?.response?.data?.error){
                showMessageClient((error as any)?.response?.data?.error || 'Something went wrong!', '', 'error');
            }
            
            
        } finally {
            setLoading(false);
        }
    };

    const putCart = async (id: string | number, quantity: { quantity: number }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_CART + `/${id}`, quantity);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteCart = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_CART + `/${id}`);
            showMessageClient('Delete cart successfully', '', 'success');
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postCart,
        putCart,
        deleteCart,
    };
};

export default useCart;
