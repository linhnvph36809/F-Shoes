import FormPost from './FormPost';
import usePost, { API_POST } from '../../../hooks/usePosts';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { KEY } from './index';
import ButtonBack from '../components/ButtonBack';

const AddPost = () => {
    const { loading, addPost } = usePost();
    const { refetch } = useQueryConfig(KEY, API_POST);

    const onFinish = (value: any) => {
        addPost(value);
        refetch();
    };

    return <div>
        <ButtonBack to="/admin/posts" />
        <FormPost title="Add Post" onFinish={onFinish} loading={loading} />
    </div>;
};

export default AddPost;
