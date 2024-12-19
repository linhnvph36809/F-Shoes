import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { IPost } from '../interfaces/IPost';
import { useQueryClient } from 'react-query';
export const QUERY_KEY = 'posts';
import { showMessageAdmin } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';

export const API_POST = '/api/posts';
const usePost = () => {
    const {  locale } = useContextGlobal();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const deletePost = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_POST}/forceDelete/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const softPost = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_POST}/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const restorePost = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_POST + `/restore/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const addPost = async (post: IPost) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_POST, post, {
                headers: { 'Content-Type': 'application/form-data' },
            });
            navigate('/admin/posts');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error: any) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const patchPost = async (id: string | number, post: any) => {
        try {
            setLoading(true);
            tokenManagerInstance('post', API_POST + `/${id}`, post, {
                headers: { 'Content-Type': 'application/form-data' },
            });
            navigate('/admin/posts');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error: any) {
            showMessageAdmin((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        deletePost,
        softPost,

        addPost,
        patchPost,
        restorePost,
    };
};

export default usePost;
