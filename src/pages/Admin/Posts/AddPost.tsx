import { useParams } from 'react-router-dom';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useTopic from '../../../hooks/useTopic';
import LoadingBlock from '../../../components/Loading/LoadingBlock';

const AddPost = () => {
    const { id } = useParams();
    const { data, isFetching, refetch } = useQueryConfig('topic-add', 'api/topics/');
    const { patchGroup } = useTopic();

    const onFinish = (value: any) => {
        if (id) {
            patchGroup(1, value);
            refetch();
        }
    };

    return <div>{isFetching ? <LoadingBlock /> : <div></div>}</div>;
};

export default AddPost;
