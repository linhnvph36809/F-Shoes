import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IProduct } from '../interfaces/IProduct';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_PRODUCT } from '../constants';

const API_PRODUCT = '/api/product';

const useProduct = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    // -------------
    const [productDetails, setproductDetails] = useState<any>();
    const [thisWeekProducts, setThisWeekProducts] = useState<IProduct[]>([]);
    const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
    const [productsBySport, setProductsBySport] = useState<IProduct[]>([]);
    // -------------

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
            } = await tokenManagerInstance('get', API_PRODUCT + '?include=images,variations');
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getOneProduct = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `${API_PRODUCT}/${id}?include=categories,images`);
            setProduct(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const getDetailProduct = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `${API_PRODUCT}/detail/${id}`);
            setproductDetails(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const getThisWeekProducts = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/trend/this-week/products?include=categories');
            setThisWeekProducts(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const getBestSellingProducts = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/best-selling/products');
            setBestSellingProducts(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const getProductsBySport = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', 'api/shop-by-sports/products');
            setProductsBySport(data.products);
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
            await tokenManagerInstance('put', API_PRODUCT + id, product);
            navigate(PATH_LIST_PRODUCT);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProduct();
        getThisWeekProducts();
        getBestSellingProducts();
        getProductsBySport();

        if (id) {
            getOneProduct();
            getDetailProduct();
        }
    }, [id]);

    return {
        product,
        products,
        productDetails,
        thisWeekProducts,
        bestSellingProducts,
        productsBySport,
        loading,
        postProduct,
        putProduct,
        deleteProduct,
    };
};

export default useProduct;
