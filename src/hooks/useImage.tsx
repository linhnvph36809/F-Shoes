import { useState } from 'react';
import { tokenManagerInstance } from '../api';
import { showMessageAdmin } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
import { notification } from 'antd';

const API_IMAGE = '/api/image';

const useImage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { locale } = useContextGlobal();
    const deleteImage = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_IMAGE + `/${id}`);
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const postImage = async (image: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_IMAGE, image, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        deleteImage,
        postImage,
    };
};

export default useImage;
