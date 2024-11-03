import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { tokenManagerInstance } from '../../api';


const API_PRODUCT = '/api/product';

const useProductDetail = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProduct] = useState<any>();

    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }


    const getDetailProduct = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `${API_PRODUCT}/detail/${id}`);
            setProduct(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        if (id) {
            getDetailProduct();
        }
    }, [id]);

    return {
        loading,
        products,
        setProduct
    };
};

export default useProductDetail;
