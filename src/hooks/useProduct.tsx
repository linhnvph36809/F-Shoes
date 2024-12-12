import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IProduct } from '../interfaces/IProduct';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_PRODUCT } from '../constants';
import { showMessageAdmin } from '../utils/messages';
import { useQueryClient } from 'react-query';
export const QUERY_KEY = 'products';
export const API_PRODUCT = '/api/product';

const useProduct = () => {
     const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const deleteProduct = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_PRODUCT}/${id}`);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
            showMessageAdmin('Delete Product Sussccess', '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const postProduct = async (product: IProduct) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_PRODUCT, product);
            navigate(PATH_LIST_PRODUCT);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
            showMessageAdmin('Add Product Sussccess', '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const putProduct = async (product: IProduct) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_PRODUCT}/${id}`, product);
            navigate(PATH_LIST_PRODUCT);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
            showMessageAdmin('Update Product Sussccess', '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postProduct,
        putProduct,
        deleteProduct,
    };
};

export default useProduct;
