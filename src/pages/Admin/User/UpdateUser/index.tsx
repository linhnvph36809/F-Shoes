import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingBlock from '../../../../components/Loading/LoadingBlock';
import useUser from '../../../../hooks/useUser';
import Heading from '../../components/Heading';
import FormUser from '../FormUser';
import { FormattedMessage } from 'react-intl';

const UpdateUser: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Assuming the user ID is in the URL params
    const { users, editUser, getAllUser, loading } = useUser();
    const [initialValues, setInitialValues] = useState<any>(null);

    // Fetch the user details and set as initial values
    useEffect(() => {
        // Gọi getAllUser nếu users chưa có dữ liệu
        if (!users.length) {
            getAllUser();
        } else {
            const user = users.find((u) => u.id === Number(id));
            if (user) {
                setInitialValues(user);
            }
        }
    }, [id, users, getAllUser]);

    const handleUpdateUser = useCallback(
        async (values: any) => {
            try {
                await editUser(id, values);
                message.success(<FormattedMessage id="user.User_Update_succes_pass" />);
            } catch (error) {
                message.error(<FormattedMessage id="user.User_Update_succes_fail" />);
                console.error(error);
            }
        },
        [editUser, id],
    );

    return (
        <>
            {loading ? (
                <LoadingBlock />
            ) : (
                <section>
                    <Heading><FormattedMessage id="user.User_Update" /></Heading>
                    <FormUser onFinish={handleUpdateUser} initialValues={initialValues} />
                </section>
            )}
        </>
    );
};

export default UpdateUser;
