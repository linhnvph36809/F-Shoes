import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IProduct } from '../interfaces/IProduct';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_PRODUCT } from '../constants';

export const API_PRODUCT = '/api/product';

const useProduct = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const {
                data: { data },
            } = await tokenManagerInstance('get', API_PRODUCT + '?include=images,categories,sale_price,variations');
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_PRODUCT}/${id}`);
            getAllProduct();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postProduct = async (product: IProduct) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_PRODUCT, product);
            navigate(PATH_LIST_PRODUCT);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const putProduct = async (product: IProduct) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_PRODUCT}/${id}`, product);
            navigate(PATH_LIST_PRODUCT);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, [id]);

    return {
        products,
        loading,
        postProduct,
        getAllProduct,
        putProduct,
        deleteProduct,
    };
};

export default useProduct;
