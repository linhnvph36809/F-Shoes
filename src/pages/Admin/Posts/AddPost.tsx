import FormPost from './FormPost';
import usePost from '../../../hooks/usePosts';
import useCookiesConfig from '../../../hooks/useCookiesConfig';
import useQueryConfig from '../../../hooks/useQueryConfig';

const AddPost = () => {
    const { loading ,addPost } = usePost();
    const { cookies } = useCookiesConfig('user');
    const { refetch } = useQueryConfig('posts', '/api/posts');

    const onFinish = (value: any) => {
        if (cookies.adminId) addPost(value);
        refetch();
    };

    return <FormPost title="Add Post" onFinish={onFinish} loading={loading} />;
};

export default AddPost;
