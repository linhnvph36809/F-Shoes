import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';

export const QUERY_KEY = 'review';
const useReview = () => {
    const { locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [loadingRestore, setLoadingRestore] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const postReview = async (review: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', '/api/review', review);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('delete', `/api/review/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoadingDelete(false);
        }
    }
    const ownerDeleteReview = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('delete', `/api/force/delete/review/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoadingDelete(false);
        }
    };
    const restoreReview = async (id: string | number) => {
        try {
            setLoadingRestore(true);
            await tokenManagerInstance('post', `/api/restore/review/${id}`);
            showMessageClient(
                handleChangeMessage(locale, 'Review restored successfully', 'Đánh giá đã được khôi phục'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoadingRestore(false);
        }
    };
    const postLikeReview = async (id: number) => {
        try {
            await tokenManagerInstance('post', `api/review/${id}/like`);

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

    return {
        loading,
        loadingDelete,
        loadingRestore,
        ownerDeleteReview,
        restoreReview,
        postReview,
        deleteReview,
        postLikeReview,
    };
};

export default useReview;
