import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useParams } from 'react-router-dom';

const useReview = () => {
    const [reviews, setReviews] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

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
            tokenManagerInstance('delete', '/api/review/' + id);
            getAllReview(id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getAllReview(id);
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
