import { Navigate, useParams } from 'react-router-dom';

import FormPost from './FormPost';
import usePost, { API_POST } from '../../../hooks/usePosts';
import useQueryConfig from '../../../hooks/useQueryConfig';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import { PATH_ADMIN } from '../../../constants/path';
import { KEY } from './index';
import ButtonBack from '../components/ButtonBack';
import { useIntl } from 'react-intl';

const UpdatePost = () => {
    const intl = useIntl()
    const { id } = useParams();
    const { loading, patchPost } = usePost();
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_POST);
    const initialValues = data?.data.find((item: any) => item.id == id);

    if (!initialValues) {
        return <Navigate to={PATH_ADMIN.LIST_POST} />;
    }

    const onFinish = async (value: any) => {
        if (id) {
            patchPost(id, value);
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
                    <FormPost title={intl.formatMessage({ id: 'post.add' })} onFinish={onFinish} initialValues={initialValues} loading={loading} />
                </div>
            )}
        </>
    );
};

export default UpdatePost;
