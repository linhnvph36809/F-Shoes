import { useQuery } from 'react-query';
import { tokenManagerInstance } from '../api';

const defautConfig = {
    cacheTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 30,
    retry: false,
};

const useQueryConfig = (key: string|Array<string>, api: string, config: any = defautConfig) => {
    const fetchData = async () => {
        try {
            return await tokenManagerInstance('get', api);
        } catch (error: any) {
            throw error;
        }
    };

    const { isLoading, data, error, isFetching, refetch } = useQuery(key, fetchData, config);

    return {
        isLoading,
        isFetching,
        data,
        error,
        refetch,
    };
};

export default useQueryConfig;
