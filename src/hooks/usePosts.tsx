import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { IPost } from '../interfaces/IPost';

export const API_POST = '/api/posts';

const usePost = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const deletePost = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_POST}/forceDelete/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const softPost = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_POST}/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const restorePost = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_POST + `/restore/${id}`);
        } catch (error) {
            console.error(error);
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
        } catch (error: any) {
            if (error?.response?.data?.message && error?.response?.status) {
                alert(error?.response?.data?.message as any);
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const patchPost = async (id: string | number, post: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_POST + `/${id}`, post);
            navigate('/admin/posts');
        } catch (error: any) {
            if (error?.response?.data?.message) {
                alert(error?.response?.data?.message as any);
            } else {
                console.log(error);
            }
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
