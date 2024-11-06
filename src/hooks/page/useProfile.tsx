import {useEffect, useState} from 'react';
import { tokenManagerInstance } from '../../api';
import {IProduct} from "../../interfaces/IProduct.ts";
import {IUser} from "../../interfaces/IUser.ts";


const useProfile = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser>();
    const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);

    const getCurrentUser = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/auth/me?include=profile,favoriteProducts&times=user');
            setCurrentUser(data.user);
            setFavoriteProducts(data.user.favoriteProducts);
        }catch (error)
        {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }
    const changePassword = async(data:{password:string, newPassword:string}) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', 'api/change-password',data);
            alert('Add Wishlist Successfully')
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getCurrentUser();
    },[]);

    return {
        loading,
        currentUser,
        favoriteProducts,
        changePassword
    };
};

export default useProfile;
