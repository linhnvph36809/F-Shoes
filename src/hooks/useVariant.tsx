import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_LIST_PRODUCT } from '../constants';

const useVariant = () => {
    const [variantByIds, setVariantByIds] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const getVariantById = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `/api/product/${id}}/variation`);
            setVariantByIds(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postVariant = async (value: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/product/${id}}/variation`, value);
            navigate(PATH_LIST_PRODUCT);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const putVariant = async (value: any, idVariant: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `/api/product/${id}}/variation/${idVariant}`, value);
            getVariantById();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getVariantById();
    }, [id]);

    return {
        variantByIds,
        loading,
        putVariant,
        postVariant,
    };
};

export default useVariant;
