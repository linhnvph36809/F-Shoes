import { useState } from 'react';

import { tokenManagerInstance } from '../api';

const API_WISHLIST = '/api/wishlist';

const useWishlist = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const postWishlist = async (value: { user_id: string | number; product_id: any }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_WISHLIST, value);
            alert('Add Wishlist Successfully')
        } catch (error) {
            console.log(error);
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
