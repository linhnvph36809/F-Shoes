import FormPost from './FormPost';
import usePost, { API_POST } from '../../../hooks/usePosts';
import useCookiesConfig from '../../../hooks/useCookiesConfig';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { COOKIE_USER } from '../../../constants';
import { KEY } from './index';

const AddPost = () => {
    const { loading, addPost } = usePost();
    const { cookies } = useCookiesConfig(COOKIE_USER);
    const { refetch } = useQueryConfig(KEY, API_POST);

    const onFinish = (value: any) => {
        if (cookies.adminId) {
            addPost(value);
            refetch();
        }
    };

    return <FormPost title="Add Post" onFinish={onFinish} loading={loading} />;
};

export default AddPost;
