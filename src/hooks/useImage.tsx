import { useState } from 'react';
import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';

const API_IMAGE = '/api/image';

const useImage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { locale } = useContextGlobal();
    const deleteImage = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_IMAGE + `/${id}`);
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

    const postImage = async (image: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_IMAGE, image, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.log(error);
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
