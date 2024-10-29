import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/IProduct';
import { tokenManagerInstance } from '../../api';


const useHome = () => {
    const [loading, setLoading] = useState<boolean>(false);

    // -------------
    const [thisWeekProducts, setThisWeekProducts] = useState<IProduct[]>([]);
    const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([]);
    const [productsBySport, setProductsBySport] = useState<IProduct[]>([]);
    // -------------
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
    }
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
    }
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
    }
    useEffect(() => {
        getThisWeekProducts();
        getBestSellingProducts();
        getProductsBySport();
    },[]);

    return {
        thisWeekProducts,
        bestSellingProducts,
        productsBySport,
        loading,
    };
};

export default useHome;
