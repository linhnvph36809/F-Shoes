import React from 'react';
import { useParams } from 'react-router-dom';
import useUser, { QUERY_KEY } from '../../../../hooks/useUser';
import Heading from '../../components/Heading';
import FormUser from '../FormUser';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { Skeleton } from 'antd';
import ButtonBack from '../../components/ButtonBack';

const UpdateUser: React.FC = () => {
    const { nickname } = useParams<{ nickname: string }>();
    const { data, isFetching } = useQueryConfig(
        [QUERY_KEY, `user-detail-${nickname}`],
        `/api/user/${nickname}?include=profile&times=user`,
    );

    const { editUser, loading } = useUser();

    const handleUpdateUser = async (values: any) => {
        editUser(data?.data?.user.id, values);
    };

    return (
        <>
            <section>
                <ButtonBack to="/admin/list-user" />
                <Heading>Update User</Heading>
                {isFetching ? (
                    <Skeleton />
                ) : (
                    <FormUser loading={loading} onFinish={handleUpdateUser} initialValues={data?.data?.user} />
                )}
            </section>
        </>
    );
};

export default UpdateUser;
