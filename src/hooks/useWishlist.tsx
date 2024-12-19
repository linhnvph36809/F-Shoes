import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { QUERY_KEY as QUERY_KEY_PROFILE } from './page/useProfile';

const API_WISHLIST = 'api/user/add-favorite/product/';

export const QUERY_KEY = 'favorites';
const useWishlist = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient()
    const postWishlist = async (product_id: number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_WISHLIST + product_id);
            showMessageClient('Add Wishlist successfully', '', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROFILE] });
        } catch (error) {
            if((error as any).response.data.message){
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            }else if((error as any)?.response?.data?.errors){
                showMessageClient('Something is missing.Please check again!', '', 'error');
            }
            else if((error as any)?.response?.data?.error){
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            }else{
                showMessageClient('Something went wrong!', '', 'error');
            }
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
