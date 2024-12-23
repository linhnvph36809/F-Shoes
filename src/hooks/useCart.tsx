import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { showMessageClient } from '../utils/messages';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';

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
            if((error as any).response.data.message){
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            }else if((error as any)?.response?.data?.errors){
                showMessageClient(handleChangeMessage(locale,'Something is missing.Please check again!','Một số trường đã bị sót.Hãy kiểm tra lại'), '', 'error');
            }
            else if((error as any)?.response?.data?.error){
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            }else{
                showMessageClient(handleChangeMessage(locale,'Something went wrong!','Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!'), '', 'error');
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
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
