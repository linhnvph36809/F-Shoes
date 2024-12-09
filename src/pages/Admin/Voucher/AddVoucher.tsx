import useQueryConfig from '../../../hooks/useQueryConfig';
import useVoucher, { API_VOUCHER } from '../../../hooks/useVoucher';
import FormVoucher from './FormVoucher';

const AddVoucher = () => {
    const { addVoucher, loading } = useVoucher();
    const { refetch } = useQueryConfig('list-voucher', API_VOUCHER);
    const onFinish = (value: any) => {
        addVoucher(value);
        refetch();
    };

    return (
        <section>
            <FormVoucher title="Add Voucher" onFinish={onFinish} loading={loading} />
        </section>
    );
};

export default AddVoucher;
