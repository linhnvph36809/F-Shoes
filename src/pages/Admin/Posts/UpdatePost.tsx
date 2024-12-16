import { Navigate, useParams } from 'react-router-dom';

import FormPost from './FormPost';
import usePost, { API_POST } from '../../../hooks/usePosts';
import useCookiesConfig from '../../../hooks/useCookiesConfig';
import useQueryConfig from '../../../hooks/useQueryConfig';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import { PATH_ADMIN } from '../../../constants/path';
import { KEY } from './index';
import { COOKIE_USER } from '../../../constants';
import ButtonBack from '../components/ButtonBack';

const UpdatePost = () => {
    const { id } = useParams();
    const { loading, patchPost } = usePost();
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_POST);
    const { cookies } = useCookiesConfig(COOKIE_USER);
    const initialValues = data?.data.find((item: any) => item.id == id);

    if (!initialValues) {
        return <Navigate to={PATH_ADMIN.LIST_POST} />;
    }

    const onFinish = async (value: any) => {
        if (cookies.adminId && id) {
            await patchPost(id, value);
            refetch();
        }
    };

    return (
        <>
            {isFetching ? (
                <LoadingBlock />
            ) : (
                <div>
                    <ButtonBack to="/admin/posts" />
                    <FormPost title="Update Post" onFinish={onFinish} initialValues={initialValues} loading={loading} />
                </div>
            )}
        </>
    );
};

export default UpdatePost;
