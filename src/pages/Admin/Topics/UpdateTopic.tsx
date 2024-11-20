import { Navigate, useParams } from 'react-router-dom';

import { ITopic } from '../../../interfaces/ITopic';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useTopic, { API_TOPIC } from '../../../hooks/useTopic';
import FormTopic from './FormTopic';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import { PATH_ADMIN } from '../../../constants/path';
import { KEY } from './index';

const UpdateTopic = () => {
    const { id } = useParams();
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_TOPIC);
    const { patchTopic } = useTopic();

    const initialValues = data?.data.find((item: ITopic) => item.id == id);

    if (!initialValues) {
        return <Navigate to={PATH_ADMIN.TOPIC} />;
    }

    const onFinish = (value: any) => {
        if (id) {
            patchTopic(id, value);
            refetch();
        }
    };

    return (
        <div>
            {isFetching ? (
                <LoadingBlock />
            ) : (
                <FormTopic title="Update Topic" initialValues={initialValues} onFinish={onFinish} />
            )}
        </div>
    );
};

export default UpdateTopic;
