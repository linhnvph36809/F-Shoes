import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IProduct } from '../interfaces/IProduct';
import { tokenManagerInstance } from '../api';
import { PATH_LIST_PRODUCT } from '../constants';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { handleChangeMessage } from '../utils';
import { useContextGlobal } from '../contexts';
import {  notification } from 'antd';
export const QUERY_KEY = 'products';
export const API_PRODUCT = '/api/product';

const useProduct = () => {
    const { locale } = useContextGlobal();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const deleteProduct = async (id?: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_PRODUCT}/${id}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Delete Product Sussccess', 'Xóa sản phẩm thành công'),
                '',
                'success',
            );
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

    const postProduct = async (product: IProduct) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', API_PRODUCT, product);
            navigate(PATH_LIST_PRODUCT);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Add Product Success', 'Thêm sản phẩm thành công'),
                '',
                'success',
            );
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

    const putProduct = async (product: IProduct) => {
        try {
            setLoading(true);
            await tokenManagerInstance('put', `${API_PRODUCT}/${id}`, product);
            navigate(PATH_LIST_PRODUCT);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageAdmin(
                handleChangeMessage(locale, 'Update Product Sussccess', 'Cập nhật sản phẩm thành công'),
                '',
                'success',
            );
        } catch (error) {
            showMessageAdmin(
                (error as any)?.response?.data?.message ||
                    handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                '',
                'error',
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        postProduct,
        putProduct,
        deleteProduct,
    };
};

export default useProduct;
