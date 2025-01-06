import { useEffect, useState } from 'react';

import axios from 'axios';
import { showMessageClient } from '../utils/messages';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';

const TOKEN = '2081020d-8fac-11ef-866e-82ec7f121ab7';

const useDelivery = () => {
    const { locale } = useContextGlobal();
    const [provinces, setProvinces] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [wards, setWards] = useState<any>([]);
    const [fee, setFee] = useState<any>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const getAllProvince = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    token: TOKEN,
                },
            });

            setProvinces(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllDistrict = async (id: any) => {
        try {
            setLoading(true);
            const { data } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                headers: {
                    token: TOKEN,
                },
                params: {
                    province_id: id,
                },
            });

            setDistricts(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllWard = async (id: any) => {
        try {
            setLoading(true);
            const { data } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                headers: {
                    token: TOKEN,
                },
                params: {
                    district_id: id,
                },
            });

            setWards(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getFee = async (values: any) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
                values,
                {
                    headers: {
                        token: 'c20983f0-8ab1-11ef-9db4-127d7400f642',
                        shop_id: '5389777',
                    },
                    params: {
                        to: values, // nếu bạn muốn truyền thêm params từ values.
                    },
                },
            );
            setFee(data.data);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'), '', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setDistricts([]);
        setWards([]);
    };

    useEffect(() => {
        getAllProvince();
    }, []);

    return {
        provinces,
        districts,
        wards,
        fee,
        loading,
        getAllDistrict,
        getAllWard,
        getFee,
        handleReset,
        setDistricts,
        setFee,
    };
};

export default useDelivery;
