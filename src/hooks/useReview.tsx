import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';

export const QUERY_KEY = 'review';
const useReview = () => {
    const {  locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const postReview = async (review: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', '/api/review', review);
            showMessageClient('Successful product reviews', '', 'success');
        } catch (error) {
            const e = error as any;
            showMessageClient('Error', e?.response.data?.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `/api/review/${id}`);
            showMessageClient(handleChangeMessage(locale,'Review removed successfullys','Đánh giá đã được xóa thành công'), '', 'success');
        } catch (error) {
            const e = error as any;
            showMessageClient('Error', e?.response.data?.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const postLikeReview = async (id: number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `api/review/${id}/like`);
            showMessageClient(handleChangeMessage(locale,'Likes success reviews','Thích đánh giá thành công'), '', 'success');
        } catch (error) {
            const e = error as any;
            showMessageClient('Error', e?.response.data?.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postReview,
        deleteReview,
        postLikeReview
    };
};

export default useReview;
