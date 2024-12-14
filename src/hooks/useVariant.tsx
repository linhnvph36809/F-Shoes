import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { PATH_LIST_PRODUCT } from '../constants';
import { showMessageAdmin } from '../utils/messages';
import { QUERY_KEY } from './useProduct';

const useVariant = () => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const postVariant = async (value: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/product/${id}}/variation`, value);
            showMessageAdmin('Add Variant Sussccess', '', 'success');
            navigate(PATH_LIST_PRODUCT);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const putVariant = async (value: any, idVariant: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `/api/product/${id}}/variation/${idVariant}`, value);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin('Update Variant Sussccess', '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteVariant = async (idVariant: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `/api/product/${id}}/variation/${idVariant}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin('Delete Variant Sussccess', '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        putVariant,
        postVariant,
        deleteVariant,
    };
};

export default useVariant;
