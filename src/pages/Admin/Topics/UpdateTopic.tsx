import { useParams } from 'react-router-dom';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useTopic from '../../../hooks/useTopic';
import FormTopic from './FormTopic';
import LoadingBlock from '../../../components/Loading/LoadingBlock';

const UpdateTopic = () => {
    const { id } = useParams();
    const { data, isFetching, refetch } = useQueryConfig('topic-update', 'api/topics/' + id);
    const { patchGroup } = useTopic();

    const onFinish = (value: any) => {
        if (id) {
            patchGroup(1, value);
            refetch();
        }
    };

    return (
        <div>
            {isFetching ? (
                <LoadingBlock />
            ) : (
                <FormTopic title="Update Topic" initialValues={data?.data} onFinish={onFinish} />
            )}
        </div>
    );
};

export default UpdateTopic;
