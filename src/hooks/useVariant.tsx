import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { PATH_LIST_PRODUCT } from '../constants';
import { showMessageAdmin } from '../utils/messages';
import { QUERY_KEY } from './useProduct';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';

const useVariant = () => {
    const {  locale } = useContextGlobal();
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
            showMessageAdmin(handleChangeMessage(locale,'Add Variant Sussccess','Thêm Biến Thể Thành Công'), '', 'success');
            navigate(PATH_LIST_PRODUCT);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
            
        } finally {
            setLoading(false);
        }
    };

    const putVariant = async (value: any, idVariant: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `/api/product/${id}}/variation/${idVariant}`, value);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(handleChangeMessage(locale,'Update Variant Sussccess','Cập nhật biến thể thành công'), '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteVariant = async (idVariant: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `/api/product/${id}}/variation/${idVariant}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(handleChangeMessage(locale,'Delete Variant Sussccess','Xóa biến thể thành công'), '', 'success');
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
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
