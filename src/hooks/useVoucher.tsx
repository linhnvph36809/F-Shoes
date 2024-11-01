import { useState } from 'react';

import { tokenManagerInstance } from '../api';

const API_VOUCHER = 'api/vouchers/code/';

const useVoucher = () => {
    const [voucher, setVoucher] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const postVoucher = async (voucher: any) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', API_VOUCHER + `${voucher}`);
            setVoucher(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        voucher,
        loading,
        postVoucher,
    };
};

export default useVoucher;
