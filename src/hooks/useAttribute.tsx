import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useParams } from 'react-router-dom';

const API_ATTRIBUTE_GET = '/api/get/attribute/values/product/';
const API_ATTRIBUTE_ADD = '/api/add/attribute/values/product/';

const useAttribute = () => {
    const [attributeByIds, setAttributeByIds] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const getAttributesById = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_ATTRIBUTE_GET + id);
            setAttributeByIds(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllAttributes = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', '/api/attribute?include=values');
            setAttributeByIds(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getValueAttributeById = async (id: string | number) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `/api/attribute/${id}/value`);            
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    
    const putValueAttribute = async (attribute: { attribute: string; values: string[] }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('put', API_ATTRIBUTE_ADD + id, attribute);
            getAttributesById();
            return data;
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
            getAttributesById();
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postAttributeName = async (attributeName: { name: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/attribute`, attributeName);
            getAllAttributes();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllAttributes();
        if (id) getAttributesById();
    }, []);

    return {
        attributeByIds,
        loading,
        postAttribute,
        postAttributeName,
        getValueAttributeById,
    };
};

export default useAttribute;
