import { useState } from 'react';
import { tokenManagerInstance } from '../api';

const API_IMAGE = '/api/image';

const useImage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const deleteImage = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_IMAGE + `/${id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postImage = async (image: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_IMAGE, image, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        deleteImage,
        postImage,
    };
};

export default useImage;
