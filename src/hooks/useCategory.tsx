import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { ICategory } from '../interfaces/ICategory';

const API_CATEGORY = '/api/category';

const useCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllCategory = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_CATEGORY);
            setCategories(data.categories.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_CATEGORY + id);
            getAllCategory();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postCategory = async (category: ICategory) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_CATEGORY, category);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return {
        categories,
        loading,
        deleteCategory,
        postCategory,
    };
};

export default useCategory;
