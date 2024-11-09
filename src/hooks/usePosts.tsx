import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { ITopic } from '../interfaces/ITopic';

const API_POST = '/api/posts';

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

    const postPost = async (topic: ITopic) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_POST, topic);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const patchPost = async (id: string | number, group: { group_name: string; permissions: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_POST + `/${id}`, group);
            navigate('/admin/post');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        deletePost,
        softPost,
        postPost,
        patchPost,
        restorePost,
    };
};

export default usePost;
