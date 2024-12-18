import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { IPost } from '../interfaces/IPost';
import { useQueryClient } from 'react-query';
export const QUERY_KEY = 'posts';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
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
           if ((error as any).response.data.message) {
                           showMessageClient((error as any)?.response?.data?.message, '', 'error');
                       } else if ((error as any)?.response?.data?.errors) {
                           showMessageClient(
                               handleChangeMessage(
                                   locale,
                                   'Something is missing.Please check again!',
                                   'Một số trường đã bị sót.Hãy kiểm tra lại',
                               ),
                               '',
                               'error',
                           );
                       } else if ((error as any)?.response?.data?.error) {
                           showMessageClient((error as any)?.response?.data?.error, '', 'error');
                       } else {
                           showMessageClient(
                               handleChangeMessage(
                                   locale,
                                   'Something went wrong!',
                                   'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                               ),
                               '',
                               'error',
                           );
                       }
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
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
