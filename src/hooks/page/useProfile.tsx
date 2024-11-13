import {useState} from 'react';
import {tokenManagerInstance} from '../../api';
import {IProduct} from "../../interfaces/IProduct.ts";
import {IUser, model} from "../../interfaces/IUser.ts";


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
    }) :Promise<IUser> => {
        try {
            setLoadingUpdate(true);
            const response = await tokenManagerInstance('put','api/update-profile',data);
            alert(response.data.message);
            return response.data.user;
        }catch (error)
        {
            console.log(error)
            return model;

        }finally {
            setLoadingUpdate(false);

        }
    }


    return {
        loading,
        currentUser,
        favoriteProducts,
        updateProfile,
        loadingUpdate,
        getCurrentUser

    };
};

export default useProfile;
