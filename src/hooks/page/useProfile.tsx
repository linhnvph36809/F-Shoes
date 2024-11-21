import { useState } from 'react';
import { tokenManagerInstance } from '../../api';

const useProfile = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

    const updateProfile = async (data: {
        given_name: string;
        family_name: string;
        birth_date: string;
        detail_address: string;
    }): Promise<any> => {
        try {
            setLoadingUpdate(true);
            const response = await tokenManagerInstance('put', 'api/update-profile', data);
            alert(response.data.message);
            return response.data.user;
        } catch (error) {
            console.log(error);
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
