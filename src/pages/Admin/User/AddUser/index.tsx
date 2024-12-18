import { message } from 'antd';
import { useCallback } from 'react';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import useUser from '../../../../hooks/useUser';
import Heading from '../../components/Heading';
import FormUser from '../FormUser';
import { FormattedMessage } from 'react-intl';

const AddUser = () => {
    const { loading, addUser } = useUser();

    const handleAddUser = useCallback(
        async (values: any) => {
            try {
                await addUser(values);
                
                message.success(<FormattedMessage id="user.add_User_added_successfully" />);
            } catch (error) {
                message.success(<FormattedMessage id="user.add_Failed_to_add_user" />);

                console.error(error);
            }
        },
        [addUser],
    );

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <section>
                    <Heading><FormattedMessage id="user.add_user" /></Heading>
                    <FormUser onFinish={handleAddUser} />
                    {/* Include delete functionality where needed */}
                </section>
            )}
        </>
    );
};

export default AddUser;
