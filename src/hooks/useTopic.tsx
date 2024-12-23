import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenManagerInstance } from '../api';
import { ITopic } from '../interfaces/ITopic';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
import { useQueryClient } from 'react-query';

export const API_TOPIC = '/api/topics';
export const QUERY_KEY_TOPIC = 'query_key_topic';

const useTopic = () => {
    const { locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteTopic = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_TOPIC}/forceDelete/${id}`);
            showMessageAdmin(
                handleChangeMessage(locale, 'Delete Topic successfully', 'Xóa chủ đề thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TOPIC] });
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

    const softTopic = async (id: string | number) => {
        try {
            setLoading(true);
            tokenManagerInstance('delete', `${API_TOPIC}/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TOPIC] });
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

    const restoreTopic = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_TOPIC + `/restore/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TOPIC] });
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

    const postTopic = async (topic: ITopic) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_TOPIC, topic);
            showMessageAdmin(
                handleChangeMessage(locale, 'Add Topic successfully', 'Thêm chủ đề thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TOPIC] });
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

    const patchTopic = async (id: string | number, group: { group_name: string; permissions: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_TOPIC + `/${id}`, group);
            showMessageAdmin(
                handleChangeMessage(locale, 'Update Topic successfully', 'Cập nhật chủ đề thành công'),
                '',
                'success',
            );
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TOPIC] });
            navigate('/admin/topic');
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
        deleteTopic,
        softTopic,
        postTopic,
        patchTopic,
        restoreTopic,
    };
};

export default useTopic;
