import { useEffect, useState } from 'react';

import { IImage } from '../interfaces/IImage';
import { tokenManagerInstance } from '../api';

const API_IMAGE = '/api/image';

const useImage = () => {
    const [images, setImages] = useState<IImage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllImages = async () => {
        try {
            setLoading(true);
            const {
                data: { data },
            } = await tokenManagerInstance('get', API_IMAGE);
            setImages(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_IMAGE + id);
            getAllImages();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postImage = async (image: IImage) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_IMAGE, image);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllImages();
    }, []);

    return {
        images,
        loading,
        deleteImage,
        postImage,
    };
};

export default useImage;
