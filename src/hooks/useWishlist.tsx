import { useState } from 'react';

import { tokenManagerInstance } from '../api';

const API_WISHLIST = 'api/user/add-favorite/product/';

const useWishlist = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const postWishlist = async (product_id:number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_WISHLIST+product_id);
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
