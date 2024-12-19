import { FormattedMessage } from 'react-intl';
import useUser from '../../../../hooks/useUser';
import ButtonBack from '../../components/ButtonBack';
import Heading from '../../components/Heading';
import FormUser from '../FormUser';

const AddUser = () => {
    const { loading, addUser } = useUser();

    const handleAddUser = (values: any) => {
        addUser(values);
    };

    return (
        <>
            <section>
                <ButtonBack to="/admin/list-user" />
                <Heading><FormattedMessage id="user.add_user" /></Heading>
                <FormUser onFinish={handleAddUser} loading={loading} />
            </section>
        </>
    );
};

export default AddUser;
