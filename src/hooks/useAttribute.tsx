import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useParams } from 'react-router-dom';
import { IAttribute } from '../interfaces/IAttribute';

const API_ATTRIBUTE_GET = '/api/get/attribute/values/product/';
const API_ATTRIBUTE_ADD = '/api/add/attribute/values/product/';

const useAttribute = () => {
    const [attributes, setAttributes] = useState<IAttribute[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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

    //     try {
    //         setLoading(true);
    //         await tokenManagerInstance('delete', API_ATTRIBUTE + id);
    //         getAllAttributes();
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const postAttribute = async (attribute: { attribute: string; values: string[] }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_ATTRIBUTE_ADD + id, attribute);
            getAllAttributes()
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getAllAttributes();
    }, []);

    return {
        attributes,
        loading,
        postAttribute,
    };
};

export default useAttribute;
