import { useQuery } from 'react-query';
import { tokenManagerInstance } from '../api';

const defautConfig = {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 1,
};

const useQueryConfig = (key:string, api: string, config: any = defautConfig) => {
    const fetchUsers = async () => {
        return await tokenManagerInstance('get', api);
    };

    const { isLoading, data, error, isFetching, refetch } = useQuery([key], fetchUsers, config);

    return {
        isLoading,
        isFetching,
        data,
        error,
        refetch,
    };
};

export default useQueryConfig;
