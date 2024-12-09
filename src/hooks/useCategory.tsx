import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_CATEGORY } from '../constants';
import { ICategory } from '../interfaces/ICategory';
import { showMessageAdmin } from '../utils/messages';

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
            const { data } = await tokenManagerInstance(
                'get',
                API_CATEGORY + '?include=parents,products&times=category',
            );
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
            showMessageAdmin('Delete Topic successfully', '', 'success');
        } catch (error) {
            showMessageAdmin('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const postCategory = async (category: ICategory) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_CATEGORY, category);
            getAllCategory();
            showMessageAdmin('Create Topic successfully', '', 'success');
        } catch (error) {
            showMessageAdmin('Error', (error as any).message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const putCategory = async (id: string | number, category: ICategory) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_CATEGORY}/${id}`, category);
            getAllCategory();
            navigate(PATH_LIST_CATEGORY);
            showMessageAdmin('Update Topic successfully', '', 'success');
        } catch (error) {
            showMessageAdmin('Error', (error as any).message, 'error');
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

    const deleteProductFromCategory = async (categoryId: any, productId: string | number | (string | number)[]) => {
        try {
            // Chuyển productId thành mảng nếu là giá trị đơn lẻ
            const productIds = Array.isArray(productId) ? productId : [productId];

            if (!productIds.length) throw new Error('Product IDs must not be empty.');

            const response = await tokenManagerInstance('delete', `${API_CATEGORY}/${categoryId}/products`, {
                data: { products: productIds },
            });
            const message =
                response.status === 200 || response.status === 204
                    ? 'Products deleted successfully!'
                    : 'Unexpected response status';
            showMessageAdmin(message, '', response.status === 200 || response.status === 204 ? 'success' : 'warning');
        } catch (error: any) {
            showMessageAdmin('Error', error.response?.data?.message || 'Something went wrong.', 'error');
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
