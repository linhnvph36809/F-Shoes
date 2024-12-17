import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';

const API_WISHLIST = 'api/user/add-favorite/product/';

export const QUERY_KEY = 'favorites';
const useWishlist = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const postWishlist = async (product_id: number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_WISHLIST + product_id);
            showMessageClient('Add Wishlist successfully', '', 'success');
        } catch (error) {
            showMessageClient('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postWishlist,
    };
};

export default useWishlist;
