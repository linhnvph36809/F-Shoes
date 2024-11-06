import { useEffect, useState } from 'react';
import { tokenManagerInstance } from '../api';

const API_USER = '/api/user';

const useUser = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch all users
    const getAllUser = async () => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_USER);
            setUsers(data.users.data); // Assuming `users.data` contains the list of users
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new user
    const addUser = async (userData: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', API_USER, userData);
            // Update the user list with the newly added user
            setUsers((prevUsers) => [...prevUsers, data.user]); // Assuming API response returns the new user in `data.user`
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
            // Update the user list after deletion
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
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
    };
};

export default useUser;
