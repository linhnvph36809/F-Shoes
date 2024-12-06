import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useParams } from 'react-router-dom';
import { showMessageClient } from '../utils/messages';

const useReview = () => {
    const [reviews, setReviews] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }
    const getList = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', '/api/review?include=user,product');
            setReviews(data.reviews.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllReview = async (id: string | number) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `/api/product/${id}/reviews?times=review`);
            setReviews(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postReview = async (review: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', '/api/review', review);
        } catch (error) {
            console.log(error);
            const e = error as any;
            showMessageClient('Error',e?.response.data?.message,'error');
        } finally {
            setLoading(false);
        }
    };

    const putReview = async (review: any, id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', '/api/review/' + id, review);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `/api/review/${id}`);
            await getList(); // Refresh the list to show updated data after deletion
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList();
    }, []);
    return {
        reviews,
        loading,
        postReview,
        deleteReview,
        putReview,
    };
};

export default useReview;
