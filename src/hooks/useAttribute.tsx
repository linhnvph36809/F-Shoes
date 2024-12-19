import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ADMIN } from '../constants/path';
import { showMessageAdmin } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';

const API_ATTRIBUTE_ADD = '/api/add/attribute/values/product/';
const API_ATTRIBUTE = '/api/attribute/';

export const QUERY_KEY = 'query-key-attribute';

const useAttribute = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { locale } = useContextGlobal();

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
            showMessageAdmin(
                (error as any)?.response?.data?.message ||
                    handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi !'),
                '',
                'error',
            );
        } finally {
            setLoading(false);
        }
    };

    const postAttribute = async (attribute: { attribute: string; values: string[] }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_ATTRIBUTE_ADD + id, attribute);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            return data;
        } catch (error) {
            showMessageAdmin(
                (error as any)?.response?.data?.message ||
                    handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi !'),
                '',
                'error',
            );
        } finally {
            setLoading(false);
        }
    };

    const postAttributeName = async (attributeName: { name: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/attribute`, attributeName);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const postAttributeValue = async (id: string | number, values: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/attribute/${id}/value`, values);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });

            navigate(PATH_ADMIN.ADD_ATTRIBUTE);
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteAttribute = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_ATTRIBUTE + id);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteAttributeValue = async (idValue: string | number, idAttribute: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_ATTRIBUTE}${idAttribute}/value/${idValue}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
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
        deleteAttributeValue,
    };
};

export default useAttribute;
