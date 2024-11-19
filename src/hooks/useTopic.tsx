import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { ITopic } from '../interfaces/ITopic';

export const API_TOPIC = '/api/topics';

const useTopic = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const deleteTopic = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_TOPIC}/forceDelete/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const softTopic = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_TOPIC}/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const restoreTopic = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_TOPIC + `/restore/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const postTopic = async (topic: ITopic) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_TOPIC, topic);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const patchTopic = async (id: string | number, group: { group_name: string; permissions: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_TOPIC + `/${id}`, group);
            navigate('/admin/topic');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        deleteTopic,
        softTopic,
        postTopic,
        patchTopic,
        restoreTopic,
    };
};

export default useTopic;
