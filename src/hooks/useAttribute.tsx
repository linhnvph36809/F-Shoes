import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { IAttribute } from '../interfaces/IAttribute';
import { PATH_LIST_PRODUCT } from '../constants';

const API_ATTRIBUTE_GET = '/api/get/attribute/values/product/';
const API_ATTRIBUTE_ADD = '/api/add/attribute/values/product/';

const useAttribute = () => {
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [variantById, setVariantById] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const getAllAttributes = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_ATTRIBUTE_GET + id);
            setAttributes(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getVariantById = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `/api/product/${id}}/variation`);
            setVariantById(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postAttribute = async (attribute: { attribute: string; values: string[] }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_ATTRIBUTE_ADD + id, attribute);
            getAllAttributes();
            return data;
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
        getAllAttributes();
        if (id) getVariantById();
    }, [id]);

    return {
        attributes,
        variantById,
        loading,
        postAttribute,
        putVariant,
        postVariant,
    };
};

export default useAttribute;
