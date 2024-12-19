import { useState } from 'react';
import { tokenManagerInstance } from '../../api';
import { showMessageClient } from '../../utils/messages';
import { useQueryClient } from 'react-query';
import { handleChangeMessage } from '../../utils';
import { useContextGlobal } from '../../contexts';
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
            showMessageClient('Update Profile',response.data.message,'success');
            
        } catch (error) {
            
            if((error as any)?.response?.data?.message){
                showMessageClient((error as any).response.data.message, '', 'error');
            }else{
                showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
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
