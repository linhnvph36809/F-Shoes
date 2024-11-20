import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ADMIN } from '../constants/path';

const API_ATTRIBUTE_ADD = '/api/add/attribute/values/product/';
const API_ATTRIBUTE = '/api/attribute/';

const useAttribute = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

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
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postAttributeValue = async (id: string | number, values: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/attribute/${id}/value`, values);
            navigate(PATH_ADMIN.ADD_ATTRIBUTE);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAttribute = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_ATTRIBUTE + id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAttributeValue = async (idValue: string | number, idAttribute: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_ATTRIBUTE}${idAttribute}/value/${idValue}`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postAttribute,
        postAttributeName,
        getValueAttributeById,
        deleteAttribute,
        postAttributeValue,
        deleteAttributeValue
    };
};

export default useAttribute;
