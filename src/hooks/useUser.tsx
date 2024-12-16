import { useEffect, useState } from 'react';
import { tokenManagerInstance } from '../api';
import { IUser } from '../interfaces/IUser';
import { useNavigate } from 'react-router-dom';
import { PATH_LIST_USER } from '../constants';

const API_USER = '/api/user';
export const QUERY_KEY = 'users';
const useUser = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    // Function to fetch all users
    const getAllUser = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_USER);
            setUsers(data.users.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (userData: IUser) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', `${API_USER}?time=user`, userData);
            navigate(PATH_LIST_USER);
            setUsers((prevUsers) => [...prevUsers, data.user]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a user by ID
    const deleteUser = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_USER}/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

   
    const editUser = async (id: any, userData: IUser) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('put', `${API_USER}/${id}`, userData);
            setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...data.user } : user)));
            navigate(PATH_LIST_USER);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUser();
    }, []);

    return {
        users,
        loading,
        getAllUser,
        addUser,
        deleteUser,
        editUser, // Return the editUser function to make it accessible in components
    };
};

export default useUser;
