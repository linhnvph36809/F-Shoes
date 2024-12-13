import FormPost from './FormPost';
import usePost, { API_POST } from '../../../hooks/usePosts';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { KEY } from './index';

const AddPost = () => {
    const { loading, addPost } = usePost();
    const { refetch } = useQueryConfig(KEY, API_POST);

    const onFinish = (value: any) => {
        addPost(value);
        refetch();
    };

    return <FormPost title="Add Post" onFinish={onFinish} loading={loading} />;
};

export default AddPost;
