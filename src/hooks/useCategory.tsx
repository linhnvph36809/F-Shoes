import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_CATEGORY } from '../constants';
import { ICategory } from '../interfaces/ICategory';

export const API_CATEGORY = '/api/category';

const useCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [mainCategories, setMainCategoires] = useState<ICategory[]>([]);
    const navigate = useNavigate();

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
    // Hàm sử lý
    const addProductsToCategory = async (id: any, selectedProducts: string[], allProducts: any[]) => {
        try {
            // Filter the products to add
            const productsToAdd = allProducts.filter((product) => selectedProducts.includes(String(product.id)));

            if (productsToAdd.length === 0) {
                throw new Error('No products selected to add.');
            }
            const apiUrl = `${API_CATEGORY}/${id}/products?include=products`;
            console.log('API URL:', apiUrl);
            const payload = { products: productsToAdd.map((product) => product.id) };
            console.log('Payload:', payload);
            const { status } = await tokenManagerInstance('post', apiUrl, payload);
            if (status === 200 || status === 201) {
                return {
                    success: true,
                    addedProducts: productsToAdd,
                };
            } else {
                throw new Error('Failed to add products.');
            }
        } catch (error: any) {
            // Improved error handling
            if (error.response) {
                console.error('API Error:', error.response.data);
            } else {
                console.error('Error adding products:', error);
            }
            throw error;
        }
    };
    const deleteProductFromCategory = async (categoryId: any, productIds: (string | number)[]) => {
        try {
            setLoading(true);
            const response = await tokenManagerInstance('delete', `${API_CATEGORY}/${categoryId}/products`, {
                data: { products: productIds },
            });

            if (response.status === 200 || response.status === 204) {
                console.log('Products deleted successfully:', response.data);
                return { success: true, message: 'Products deleted successfully!' };
            } else {
                console.warn('Unexpected response status:', response.status);
                return { success: false, message: 'Unexpected response status' };
            }
        } catch (error) {
            console.error('Failed to delete products from category:', error);
            return { success: false, message: 'Failed to delete products. Please try again.' };
        } finally {
            setLoading(false);
        }
    };
    const getCategoryById = async (id: number | string) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `${API_CATEGORY}/${id}`);
            return data.category; // Assuming the response has a `category` field
        } catch (error) {
            console.error('Failed to fetch category:', error);
            throw error;
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
        setProducts,
        products,
        loading,
        mainCategories,
        getAllCategory,
        deleteProductFromCategory,
        deleteCategory,
        postCategory,
        putCategory,
        getCategoryById,
        addProductsToCategory,
    };
};

export default useCategory;
