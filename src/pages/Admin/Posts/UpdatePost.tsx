import FormPost from './FormPost';
import usePost from '../../../hooks/usePosts';
import useCookiesConfig from '../../../hooks/useCookiesConfig';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const { loading, patchPost } = usePost();
    const { cookies } = useCookiesConfig('user');
    const { data, refetch } = useQueryConfig('posts-update', '/api/posts/' + id);
    const navigate = useNavigate();

    if (!data?.data) {
        navigate('/admin/posts');
    }

    const onFinish = (value: any) => {
        if (cookies.adminId && id)
            patchPost(id, {
                ...value,
                author_id: cookies.adminId,
            });
        refetch();
    };

    return <FormPost title="Update Post" onFinish={onFinish}
        initialValues={data?.data} loading={loading} />;
};

export default UpdatePost;
