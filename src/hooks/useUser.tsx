import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';

const API_USER = '/api/user';

const useUser = () => {
    const [users, setUser] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllUser = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_USER);
            console.log(data);
            setUser(data.users.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // const deleteImage = async (id?: string | number) => {
    //     try {
    //         setLoading(true);
    //         await tokenManagerInstance('delete', API_IMAGE + id);
    //         getAllImages();
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const postImage = async (image: IImage) => {
    //     try {
    //         setLoading(true);
    //         await tokenManagerInstance('post', API_IMAGE, image);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        getAllUser();
    }, []);

    return {
        users,
        loading,
    };
};

export default useUser;
