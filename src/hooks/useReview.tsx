import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';
import { useQueryClient } from 'react-query';

export const QUERY_KEY = 'review';
const useReview = () => {
    const {  locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [loadingRestore, setLoadingRestore] = useState<boolean>(false);
     const queryClient = useQueryClient();
    const postReview = async (review: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', '/api/review', review);
            showMessageClient('Successful product reviews', '', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            const e = error as any;
            showMessageClient('Error', e?.response.data?.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('delete', `/api/review/${id}`);
            showMessageClient(handleChangeMessage(locale,'Review banned successfully','Đánh giá đã bị hạn chế!'), '', 'success');
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
            setLoadingDelete(false);
        }
    }
    const restoreReview = async (id: string | number) => {
        try {
            setLoadingRestore(true);
            await tokenManagerInstance('post', `/api/restore/review/${id}`);
            showMessageClient(handleChangeMessage(locale,'Review restored successfully','Đánh giá đã được khôi phục'), '', 'success');
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
        restoreReview,
        postReview,
        deleteReview,
        postLikeReview
    };
};

export default useReview;
