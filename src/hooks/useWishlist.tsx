import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { QUERY_KEY as QUERY_KEY_PROFILE } from './page/useProfile';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';
import { notification } from 'antd';

const API_WISHLIST = 'api/user/add-favorite/product/';

export const QUERY_KEY = 'favorites';
const useWishlist = () => {
    const {  locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient()
    const postWishlist = async (product_id: number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_WISHLIST + product_id);
            showMessageClient(handleChangeMessage(locale,'Add Wishlist successfully','Thêm vào danh sách thành công'), '', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROFILE] });
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postWishlist,
    };
};

export default useWishlist;
