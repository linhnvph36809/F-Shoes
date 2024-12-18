import FormVoucher from './FormVoucher';
import { Navigate, useParams } from 'react-router-dom';
import useCookiesConfig from '../../../hooks/useCookiesConfig';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useVoucher, { API_VOUCHER } from '../../../hooks/useVoucher';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import { KEY } from './index';
import { PATH_ADMIN } from '../../../constants/path';
import { useIntl } from 'react-intl';

const UpdateVoucher = () => {
    const intl = useIntl();
    const { loading, patchVoucher } = useVoucher();
    const { id } = useParams();
    const { cookies } = useCookiesConfig('user');
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_VOUCHER);
    const initialValues = data?.data.find((item: any) => item.id == id);

    if (!initialValues) {
        return <Navigate to={PATH_ADMIN.VOUCHER} />;
    }

    const onFinish = (value: any) => {
        if (cookies?.adminId && id) {
            patchVoucher(id, value);
            refetch();
        }
    };

    return (
        <>
            {isFetching ? (
                <LoadingBlock />
            ) : (
                <FormVoucher
                title={intl.formatMessage({ id: 'voucher.update' })}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    loading={loading}
                />
            )}
        </>
    );
};

export default UpdateVoucher;
