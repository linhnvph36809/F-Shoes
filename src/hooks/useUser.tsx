import { useState } from 'react';
import { tokenManagerInstance } from '../api';
import { IUser } from '../interfaces/IUser';
import { useNavigate } from 'react-router-dom';
import { PATH_LIST_USER } from '../constants';
import { useQueryClient } from 'react-query';
import { showMessageAdmin } from '../utils/messages';

const API_USER = '/api/user';
export const QUERY_KEY = 'users';
const useUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Function to fetch all users

    const addUser = async (userData: IUser) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `${API_USER}`, userData, {
                headers: { 'Content-Type': 'application/form-data' },
            });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            navigate(PATH_LIST_USER);
        } catch (error) {
            showMessageAdmin((error as any)?.response?.data?.errors?.email || 'Something went wrong!', '', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a user by ID
    const deleteUser = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_USER}/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id: any, userData: IUser) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_USER}/${id}`, userData);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            navigate(PATH_LIST_USER);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        addUser,
        deleteUser,
        editUser, // Return the editUser function to make it accessible in components
    };
};

export default useUser;
