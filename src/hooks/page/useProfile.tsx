import {useEffect, useState} from 'react';
import {tokenManagerInstance} from '../../api';
import {IProduct} from "../../interfaces/IProduct.ts";
import {IUser} from "../../interfaces/IUser.ts";


const useProfile = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser>();
    const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const getCurrentUser = async () => {
        try {
            setLoading(true);
            const {data} = await tokenManagerInstance('get', 'api/auth/me?include=profile,favoriteProducts&times=user');
            setCurrentUser(data.user);
            setFavoriteProducts(data.user.favoriteProducts);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const updateProfile = async (data: {
        given_name: string,
        family_name: string,
        birth_date: string,
        detail_address: string,
    }) => {
        try {
            setLoadingUpdate(true);
            const user = await tokenManagerInstance('post','api/update-profile',data);
            console.log(user);
        }catch (error)
        {
            console.log(error)
        }finally {
            setLoadingUpdate(false);
        }
    }
    useEffect(() => {
        getCurrentUser();
    }, []);

    return {
        loading,
        currentUser,
        favoriteProducts,
        updateProfile,
        loadingUpdate

    };
};

export default useProfile;
