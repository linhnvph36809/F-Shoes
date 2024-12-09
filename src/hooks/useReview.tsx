import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';

const useReview = () => {
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
            showMessageClient('Review removed successfullys', '', 'success');
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
            showMessageClient('Likes success reviews', '', 'success');
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
