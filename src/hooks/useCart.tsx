import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';
import { notification } from 'antd';

const API_CART = '/api/cart';

const useCart = () => {
    const {  locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const { refetchQuantityCart } = useContextGlobal();
    const postCart = async (cart: any) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_CART, cart);
            showMessageClient(handleChangeMessage(locale, 'Add to cart successfully','Thêm vào giỏ hàng thành công'), '', 'success');
            refetchQuantityCart();
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
            
            
        } finally {
            setLoading(false);
        }
    };

    const putCart = async (id: string | number, quantity: { quantity: number }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('patch', API_CART + `/${id}`, quantity);
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
            setLoading(false);
        }
    };

    const deleteCart = async (id: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', API_CART + `/${id}`);
            showMessageClient(handleChangeMessage(locale,'Delete cart successfully','Xóa giỏ hàng thành công'), '', 'success');
        } catch (error) {
            const e = error as any;
            if(e?.response?.data?.errors){
                
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m:any) => {
                    notification.error({
                        message: '',
                        description: m[0]
                    });
                })
            }else {
                showMessageAdmin(
                    (error as any)?.response?.data?.message ||
                        handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                    '',
                    'error',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postCart,
        putCart,
        deleteCart,
    };
};

export default useCart;
