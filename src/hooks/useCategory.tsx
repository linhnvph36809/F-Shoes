import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_CATEGORY } from '../constants';
import { ICategory } from '../interfaces/ICategory';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
export const QUERY_KEY = 'categories';
export const API_CATEGORY = '/api/category';

const useCategory = () => {
    const { locale } = useContextGlobal();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_CATEGORY}/${id}`);
            getAllCategory();
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Delete Topic successfully', 'Xóa chủ đề thành công'),
                '',
                'success',
            );
        } catch (error) {
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const postCategory = async (category: ICategory) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_CATEGORY, category);
            getAllCategory();
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Create Topic successfully', 'Tạo chủ đề thành công'),
                '',
                'success',
            );
        } catch (error) {
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const putCategory = async (id: string | number, category: ICategory) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_CATEGORY}/${id}`, category);
            getAllCategory();
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            navigate(PATH_LIST_CATEGORY);
            showMessageAdmin(
                handleChangeMessage(locale, 'Update Topic successfully', 'Cập nhật chủ đề thành công'),
                '',
                'success',
            );
        } catch (error) {
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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

            const payload = { products: productsToAdd.map((product) => product.id) };

            const { status } = await tokenManagerInstance('post', apiUrl, payload);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            if (status === 200 || status === 201) {
                return {
                    success: true,
                    addedProducts: productsToAdd,
                };
            } else {
                throw new Error('Failed to add products.');
            }
        } catch (error: any) {
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
            throw error;
        }
    };

    const deleteProductFromCategory = async (categoryId: any, productId: string | number) => {
        try {
            const data = {
                products: [productId],
                _method: 'DELETE',
            };
            const response = await tokenManagerInstance('post', `${API_CATEGORY}/${categoryId}/products`, data);

            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            const message =
                response.status === 200 || response.status === 204
                    ? 'Products deleted successfully!'
                    : 'Unexpected response status';

            showMessageAdmin(message, '', response.status === 200 || response.status === 204 ? 'success' : 'warning');
        } catch (error: any) {
            showMessageAdmin(
                error?.response?.data?.message ||
                    handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                '',
                'error',
            );
        }
    };

    const getCategoryById = async (id: number | string) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `${API_CATEGORY}/${id}`);
            return data.category; // Assuming the response has a `category` field
        } catch (error) {
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
