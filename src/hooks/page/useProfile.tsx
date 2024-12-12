import { useState } from 'react';
import { tokenManagerInstance } from '../../api';
import { showMessageClient } from '../../utils/messages';
import { useQueryClient } from 'react-query';
export const QUERY_KEY = 'users';
const useProfile = () => {
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
                showMessageClient('Error', "Something went wrong!", 'error');
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
