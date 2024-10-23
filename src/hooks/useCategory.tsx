import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_CATEGORY } from '../constants';
import { ICategory } from '../interfaces/ICategory';

const API_CATEGORY = '/api/category';

const useCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [mainCategories, setMainCategoires] = useState<ICategory[]>([]);
    const navigate = useNavigate();
    // const { slug } = useParams();

    // let id: string | number | undefined;

    // if (slug) {
    //     const index = slug.lastIndexOf('.');
    //     id = slug.substring(index + 1);
    // }

    const getAllCategory = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_CATEGORY + '?include=parents,products');
            setCategories(data.categories.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getMainCategory = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/main/categories?include=children');
            setMainCategoires(data.categories.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_CATEGORY}/${id}`);
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
            getAllCategory();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const putCategory = async (category: ICategory) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_CATEGORY}/${category.id}`, category);
            navigate(PATH_LIST_CATEGORY);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
        getMainCategory();
    }, []);

    return {
        categories,
        loading,
        mainCategories,
        // getOneCategory,
        getAllCategory,
        deleteCategory,
        postCategory,
        putCategory,
    };
};

export default useCategory;
