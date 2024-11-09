import { message } from 'antd';
import { useCallback } from 'react';
import useUser from '../../../../hooks/useUser';
import Heading from '../../components/Heading';
import FormUser from '../FormUser';

const AddUser = () => {
    const { addUser } = useUser();

    const handleAddUser = useCallback(
        async (values: any) => {
            try {
                await addUser(values);
                message.success('User added successfully');
            } catch (error) {
                message.error('Failed to add user');
                console.error(error);
            }
        },
        [addUser],
    );

    return (
        <section>
            <Heading>Add User</Heading>
            <FormUser onFinish={handleAddUser} />
            {/* Include delete functionality where needed */}
        </section>
    );
};

export default AddUser;
