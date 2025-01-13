import { useState } from 'react';
import { tokenManagerInstance } from '../../api';
import { showMessageClient } from '../../utils/messages';
import { useQueryClient } from 'react-query';
import { handleChangeMessage } from '../../utils';
import { useContextGlobal } from '../../contexts';
import { message } from 'antd';
export const QUERY_KEY = 'users';
const useProfile = () => {
    const {  locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
     const queryClient = useQueryClient();
    const updateProfile = async (data: {
        given_name: string;
        family_name: string;
        birth_date: string;
        detail_address: string;
    }): Promise<any> => {
        try {
            setLoadingUpdate(true);
            const response = await tokenManagerInstance('put', 'api/update-profile', data);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
            message.info(response.data.message);
            
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
            setLoadingUpdate(false);
        }
    };

    return {
        loading,
        updateProfile,
        loadingUpdate,
    };
};

export default useProfile;
